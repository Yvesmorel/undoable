import { useState } from "react";
import { userListType } from "../App";
export type notifType = {
  notifId: string;
  userId: string;
  setIsPotenialDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

export type notifStateType = notifType & {
  handleDeleteNotif: (
    deleteUser: boolean,
    notifId: string,
    userId: string
  ) => void;
};
export function useInit() {
  const [notification, setNotification] = useState<notifType[]>([]);

  const [userList, setUserList] = useState<userListType[]>([
    {
      name: "Alice Dubois",
      email: "alice.dubois@example.com",
    },
    {
      name: "Marc Latour",
      email: "marc.latour@entreprise.fr",
    },
    {
      name: "Charlie Scene",
      email: "charlie.s@studio.io",
    },
    {
      name: "Sarah Connor",
      email: "sarah.c@resistance.net",
    },
  ]);
  return { notification, setNotification, userList, setUserList };
}
