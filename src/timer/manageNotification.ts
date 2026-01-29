import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { deleteUserAPI } from "../api/delete-user";
import { userListType } from "../App";
import { notifType } from "../hook/useInit";
import { toast } from "sonner";

const NOTIF_DURATION = 5500;
export type useNotifStateType = (
  setIsPotenialDelete: Dispatch<SetStateAction<boolean>>,
  setNotification: React.Dispatch<React.SetStateAction<notifType[]>>,
  notifId: string,
  setUserList: React.Dispatch<React.SetStateAction<userListType[]>>,
) => {
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  handleDeleteNotif: (actionType: "deleteNotif" | "deleteUser") => void;
};

export function manageNotifocation(userId: string) {
  let intervalId: NodeJS.Timer;
  let timeOutId: NodeJS.Timeout;

  return (
    setIsPotenialDelete: React.Dispatch<React.SetStateAction<boolean>>,
    setNotification: React.Dispatch<React.SetStateAction<notifType[]>>,
    notifId: string,
    setUserList: React.Dispatch<React.SetStateAction<userListType[]>>,
  ) => {
    const [timer, setTimer] = useState(6);

    const handleDeleteNotif = (actionType: "deleteNotif" | "deleteUser") => {
      if (actionType === "deleteNotif") setIsPotenialDelete(false);
      if (actionType === "deleteUser") handleDeleteUser();

      clearInterval(intervalId);
      clearTimeout(timeOutId);

      setNotification((prevNotif) =>
        prevNotif.filter((notif) => notif.notifId !== notifId),
      );
    };

    const handleDeleteUser = () => {
      setUserList((prevUsers) =>
        prevUsers.filter((user) => user.email !== userId),
      );
    };

    useEffect(() => {
      const closeNotif = async () => {
        try {
          const res = await deleteUserAPI(userId);
          handleDeleteNotif("deleteUser");
          toast.success(res);
        } catch (error) {
          if (error instanceof Error) toast.error(error.message);
          handleDeleteNotif("deleteNotif");
        }
      };

      intervalId ??= setInterval(
        () => setTimer((lastTimer) => lastTimer - 1),
        1000,
      );

      timeOutId ??= setTimeout(() => closeNotif(), NOTIF_DURATION);
    }, []);
    return {
      timer,
      setTimer,
      handleDeleteNotif,
    };
  };
}
