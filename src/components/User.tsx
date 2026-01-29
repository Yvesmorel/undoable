import React, { memo, useState } from "react";
import { manageNotifocation } from "../timer/manageNotification";
import { notifType } from "../hook/useInit";
import { v4 as uuidv4 } from "uuid";

type User = {
  name: string;
  email: string;
  setNotification: React.Dispatch<React.SetStateAction<notifType[]>>;
};
const UserCard = ({ name, email, setNotification }: User) => {
  const [isPotenialDelete, setIsPotenialDelete] = useState(false);

  // console.log(email, "se rends");
  if (isPotenialDelete) return null;

  const handleDelete = () => {
    setIsPotenialDelete(true);

    const notifId = uuidv4();
    const useNotifState = manageNotifocation(email);

    setNotification((prevNotif) => [
      ...prevNotif,
      {
        setIsPotenialDelete: setIsPotenialDelete,
        useNotifState,
        notifId,
      },
    ]);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 max-w-md w-full">
      {/* Partie Gauche : Avatar + Infos */}
      <div className="flex items-center gap-4">
        {/* Avatar avec initiales */}
        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
          {name.charAt(0).toUpperCase()}
        </div>

        {/* Nom et Email */}
        <div>
          <h3 className="text-gray-900 font-semibold text-lg leading-tight">
            {name}
          </h3>
          <p className="text-gray-500 text-sm">{email || "Utilisateur"}</p>
        </div>
      </div>

      {/* Partie Droite : Bouton Supprimer */}
      <button
        onClick={handleDelete}
        className="group p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200"
        aria-label="Supprimer l'utilisateur"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transform group-hover:scale-110 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default memo(UserCard);
