import React from 'react';
import {
  Activity,
  AddressBook,
  CalendarBlank,
  CaretCircleLeft,
  Kanban
} from 'phosphor-react';

import LogoIcon from '../../../assets/images/logo.387585e1.svg';
import { Link } from 'react-router-dom';

export const SideNav = () => {

  const [open, setOpen] = React.useState(true);

  const Menus = [
    { title: "Dashboard", src: "Chart_fill", gap:false, link:'dashboard', icon:<Kanban color="white" weight="duotone" size={20} /> },
    { title: "Semana", src: "Chat", link:'schedule', icon:<Activity color="white" weight="duotone" size={20} /> },
    { title: "Clientes", src: "User", gap: true, link:'customer', icon:<AddressBook color="white" weight="duotone" size={20} /> },
    { title: "Agenda ", src: "Calendar", link:'schedule', icon:<CalendarBlank color="white" weight="duotone" size={20} /> },
    // { title: "Search", src: "Search", icon:<Cube /> },
    // { title: "Analytics", src: "Chart", icon:<Cube /> },
    // { title: "Files ", src: "Folder", gap: true, icon:<Cube /> },
    // { title: "Setting", src: "Setting", icon:<Cube /> },
  ];

  return (
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        {/* <img
          src="./src/assets/images/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        /> */}
        <CaretCircleLeft
          color="white" weight="fill" size={32} 
          className={`absolute cursor-pointer -right-3 top-9 w-7 ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={LogoIcon}
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            CRECI
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              }`}
            >
              {/* <img src={`./src/assets/${Menu.src}.png`} /> */}
              {Menu.icon}
              {/* <Cube color="white" weight="duotone" size={20} /> */}
              <span className={`${!open && "hidden"} origin-left duration-200`}>

                <Link to={`${Menu.link}`} >
                  {Menu.title}
                </Link>

              </span>
            </li>
          ))}
        </ul>
      </div>
  );
};
