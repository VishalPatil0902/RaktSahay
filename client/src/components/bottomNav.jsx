import React, { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

// importing the icons
import { AiFillHome } from "react-icons/ai";
import { MdPersonSearch } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";

const BottomNav = () => {
  const [selection, setSelection] = useState("Home");
  const location = useLocation();
  console.log(location.pathname);
  const checkPage = () => {
    if (location.pathname === "/login") {
      return false;
    } else if (location.pathname === "/new-profile") {
      return false;
    } else if (location.pathname === "/chat-bot") {
      return false;
    } else {
      return true;
    }
  };

  const menu = [
    {
      icon: AiFillHome,
      name: "Home",
      link: "/",
    },
    {
      icon: MdPersonSearch,
      name: "Donate",
      link: "/donate",
    },
    {
      icon: BsCardChecklist,
      name: "Request",
      link: "/request",
    },
    {
      icon: IoMdPerson,
      name: "Profile",
      link: "/user-profile",
    },
  ];

  return (
    checkPage() && (
      <div className="bottom-navbar p-4 bg-white pb-4 border-solid border-[#EA3A60] border-t-4 rounded-t-3xl fixed w-full bottom-0">
        <ul className="flex justify-around">
          {menu.map((item) => {
            return (
              <NavLink to={item.link}>
                <li
                  onClick={() => setSelection(item.name)}
                  key={item.name}
                  className="flex flex-col justify-center items-center"
                >
                  <Icon
                    as={item.icon}
                    color={selection === item.name ? "red.500" : ""}
                    boxSize={6}
                  />{" "}
                  {item.name}
                </li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default BottomNav;
