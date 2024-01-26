import React from "react";
import { MdLogout } from "react-icons/md";

const logOutButton = () => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-xl text-white bg-red-600 text-md fixed top-4 right-4 font-bold">
      Log Out <MdLogout className="text-2xl" />
    </div>
  );
};

export default logOutButton;
