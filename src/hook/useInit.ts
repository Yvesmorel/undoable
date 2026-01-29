import { useState } from "react";
import { useNotifStateType } from "../timer/manageNotification";
import { userListType } from "../App";
export type notifType = {
  useNotifState: useNotifStateType;
  setIsPotenialDelete: React.Dispatch<React.SetStateAction<boolean>>;
  notifId: string;
};

export type notifStateType = notifType & {
 
  setNotification: React.Dispatch<React.SetStateAction<notifType[]>>;
  setUserList: React.Dispatch<React.SetStateAction<userListType[]>>;

};
export function useInit() {
  const [notification, setNotification] = useState<notifType[]>([]);

  const [userList, setUserList] = useState<userListType[]>([
    {
      name: "Alice Dubois",
      email: "alice.dubois@example.com",
      isPotenialDelete: false,
    },
    {
      name: "Marc Latour",
      email: "marc.latour@entreprise.fr",
      isPotenialDelete: false,
    },
    {
      name: "Charlie Scene",
      email: "charlie.s@studio.io",
      isPotenialDelete: false,
    },
    {
      name: "Sarah Connor",
      email: "sarah.c@resistance.net",
      isPotenialDelete: false,
    },
  ]);
  return { notification, setNotification, userList, setUserList };
}
