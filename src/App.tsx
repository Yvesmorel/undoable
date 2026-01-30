import "./App.css";
import UserCard from "./components/User";
import Notifications from "./components/Notifications";
import { useInit } from "./hook/useInit";
import { Toaster } from "sonner";
import { RefObject } from "react";

export type userListType = {
  name: string;
  email: string;
};
function App() {
  const { notification, setNotification, setUserList, userList } = useInit();

  const handleDeleteNotif = (
    deleteUser: boolean,
    notifId: string,
    userId: string
  ) => {
    if (deleteUser) handleDeleteUser(userId)

    setNotification((prevNotif) =>
      prevNotif.filter((notif) => notif.notifId !== notifId)
    );
  };

  const handleDeleteUser = (userId: string) =>
    setUserList((prevUsers) =>
      prevUsers.filter((user) => user.email !== userId)
    );

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col items-center gap-5 p-12 relative">
      {userList.map(({ name, email }) => (
        <UserCard
          key={email}
          name={name}
          email={email}
          setNotification={setNotification}
        />
      ))}

      <div className="w-auto h-auto flex flex-col items-center gap-5 absolute bottom-5 right-5 overflow-y-scroll">
        {notification.map(({ notifId, userId, setIsPotenialDelete }) => (
          <Notifications
            handleDeleteNotif={handleDeleteNotif}
            key={notifId}
            notifId={notifId}
            userId={userId}
            setIsPotenialDelete={setIsPotenialDelete}
          />
        ))}
      </div>
      <Toaster position="bottom-left" richColors />
    </div>
  );
}

export default App;
