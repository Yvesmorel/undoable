import { memo } from "react";
import { notifStateType } from "../hook/useInit";

const NotificationTimer = ({
  useNotifState,
  setIsPotenialDelete,
  notifId,
  setNotification,
  setUserList,
  userId
}: notifStateType) => {
  const { timer, handleDeleteNotif } = useNotifState(
    setIsPotenialDelete,
    setNotification,
    notifId,
    setUserList,
  );

  // console.log(notifId, "se rends");

  return (
    <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg border border-gray-100 relative">
      <div className="flex items-center w-full p-4">
        <div className="flex-shrink-0 mr-4">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm ring-1 ring-indigo-100">
            {timer}s
          </div>
        </div>

        <div className="flex-1">
          <p className="font-medium text-gray-900">Suppression de {userId}...</p>
          <p className="text-xs text-gray-500 mt-0.5">
            L'action s'exécutera automatiquement.
          </p>
        </div>

        <div className="flex-shrink-0 ml-4 border-l border-gray-100 pl-4">
          <button
            onClick={() => handleDeleteNotif("deleteNotif")}
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
