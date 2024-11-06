import { FaCalendarAlt, FaHome, FaUsers } from "react-icons/fa";
import { FaSquarePollVertical } from "react-icons/fa6";
import { FiFilePlus } from "react-icons/fi";
import { GiChemicalDrop } from "react-icons/gi";
import { RiFileCopy2Fill } from "react-icons/ri";

export const menu_aside_options = [
  {
    label: "home",
    route: "/",
    icon: <FaHome />,
    selected: false,
  },
  {
    label: "patients",
    route: "/patients",
    icon: <FaUsers />,
    selected: false,
  },
  {
    label: "calendar",
    route: "/calendar",
    icon: <FaCalendarAlt />,
    selected: false,
  },
  {
    label: "consultations",
    route: "/consultations",
    icon: <RiFileCopy2Fill />,
    selected: false,
  },
  {
    label: "lab results",
    route: "/lab-results",
    icon: <GiChemicalDrop />,
    selected: false,
  },
  {
    label: "reports",
    route: "/reports",
    icon: <FaSquarePollVertical />,
    selected: false,
  },
];
