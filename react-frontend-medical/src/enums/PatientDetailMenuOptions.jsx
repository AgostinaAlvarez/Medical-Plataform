import { GiChemicalDrop } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import { LiaPaperclipSolid } from "react-icons/lia";
import { TbNotebook } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

export const patient_menu_options = [
  {
    label: "Historia clinica",
    route: "/",
    icon: <TbNotebook />,
    selected: false,
  },
  {
    label: "Consultas pasadas",
    route: "/consultations",
    icon: <CiViewList />,
    selected: false,
  },
  {
    label: "Resultados de laboratorio",
    route: "/labresults",
    icon: <GiChemicalDrop />,
    selected: false,
  },
  {
    label: "Metricas",
    route: "/metrics",
    icon: <VscGraph />,
    selected: false,
  },
  {
    label: "Archivos adjuntos",
    route: "/files",
    icon: <LiaPaperclipSolid />,
    selected: false,
  },
];
