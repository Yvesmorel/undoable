import { memo, useEffect, useRef, useState } from "react";
import { notifStateType } from "../hook/useInit";
import { deleteUserAPI } from "../api/delete-user";
import { toast } from "sonner";
const NOTIF_DURATION = 6000;
const NotificationTimer = ({
  notifId,
  userId,
  handleDeleteNotif,
  setIsPotenialDelete,
}: notifStateType) => {
  const [timer, setTimer] = useState(6);

  const interval = useRef<NodeJS.Timer>(undefined);
  const timeout = useRef<NodeJS.Timeout>(undefined);


  useEffect(() => {
  
    const closeNotif = async () => {
      try {
        const res = await deleteUserAPI(userId);
        handleDeleteNotif(true, notifId, userId);
        toast.success(res);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        handleDeleteNotif(false, notifId, userId);
        setIsPotenialDelete(false);
      }
    };

    interval.current = setInterval(
      () => setTimer((lastTimer) => lastTimer - 1),
      1000
    );

    timeout.current = setTimeout(() => closeNotif(), NOTIF_DURATION);

    return () => {
      if (interval.current) clearInterval(interval.current);
      if (timeout.current) clearInterval(timeout.current);
    };
  }, []);

  return (
    <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg border border-gray-100 relative">
      <div className="flex items-center w-full p-4">
        <div className="flex-shrink-0 mr-4">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm ring-1 ring-indigo-100">
            {timer}s
          </div>
        </div>

        <div className="flex-1">
          <p className="font-medium text-gray-900">
            Suppression de {userId}...
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            L'action s'exécutera automatiquement.
          </p>
        </div>

        <div className="flex-shrink-0 ml-4 border-l border-gray-100 pl-4">
          <button
            onClick={() => {
              handleDeleteNotif(false, notifId, userId);
              setIsPotenialDelete(false);
            }}
            className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:underline"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(NotificationTimer);
