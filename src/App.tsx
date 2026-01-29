import "./App.css";
import UserCard from "./components/User";
import Notifications from "./components/Notifications";
import { useInit } from "./hook/useInit";
import { Toaster } from "sonner";

export type userListType = {
  name: string;
  email: string;
};
function App() {
  const { notification, setNotification, setUserList, userList } = useInit();

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
        {notification.map(({ useNotifState, setIsPotenialDelete, notifId }) => (
          <Notifications
            key={notifId}
            useNotifState={useNotifState}
            setIsPotenialDelete={setIsPotenialDelete}
            notifId={notifId}
            setNotification={setNotification}
            setUserList={setUserList}
          />
        ))}
      </div>
       <Toaster position="bottom-left" richColors  />
    </div>
  );
}

export default App;
