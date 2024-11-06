import { LiaRulerVerticalSolid } from "react-icons/lia";
import { IoBodyOutline } from "react-icons/io5";
import { FaTemperatureHigh } from "react-icons/fa";
import { TbActivityHeartbeat } from "react-icons/tb";
import { PiHeartbeat } from "react-icons/pi";
import { PiHeartStraightLight } from "react-icons/pi";
import { BiTachometer } from "react-icons/bi";
import { GiFat } from "react-icons/gi";
import { GiMuscleUp } from "react-icons/gi";
import { FaBrain } from "react-icons/fa6";
import { BsLungs } from "react-icons/bs";
import { IoWaterOutline } from "react-icons/io5";
import { LiaBoneSolid } from "react-icons/lia";
import { PiVirusFill } from "react-icons/pi";
import { PiGraphDuotone } from "react-icons/pi";
import { GiSandsOfTime } from "react-icons/gi";
import { GiAbdominalArmor } from "react-icons/gi";

export const vital_signs_options = [
  {
    label: "Estatura",
    icon: <LiaRulerVerticalSolid />,
    column_name: "stature",
    value: "stature",
    unit: "mts",
  },
  {
    label: "Peso",
    icon: <BiTachometer />,
    column_name: "show_weight",
    value: "weight",
    unit: "kg",
  },
  {
    label: "Masa Corporal",
    icon: <IoBodyOutline />,
    column_name: "show_body_mass",
    value: "body_mass",
    unit: "kg",
  },
  {
    label: "Temperatura",
    icon: <FaTemperatureHigh />,
    column_name: "show_temperature",
    value: "temperature",
    unit: "°C",
  },
  {
    label: "Frecuencia Respiratoria",
    icon: <TbActivityHeartbeat />,
    column_name: "show_respiratory_rate",
    value: "respiratory_rate",
    unit: "r/m",
  },
  {
    label: "Sistólica",
    icon: <PiHeartbeat />,
    column_name: "show_systolic",
    value: "systolic",
    unit: "mmHg",
  },
  {
    label: "Diastólica",
    icon: <PiHeartbeat />,
    column_name: "show_diastolic",
    value: "diastolic",
    unit: "mmHg",
  },
  {
    label: "Frecuencia Cardiaca",
    icon: <PiHeartStraightLight />,
    column_name: "show_heart_rate",
    value: "heart_rate",
    unit: "bpm",
  },
  {
    label: "Porcentaje de Grasa Corporal",
    icon: <GiFat />,
    column_name: "show_body_fat_percentage",
    value: "body_fat_percentage",
    unit: "%",
  },
  {
    label: "Masa Muscular",
    icon: <GiMuscleUp />,
    column_name: "show_muscle_mass",
    value: "muscle_mass",
    unit: "%",
  },
  {
    label: "Perímetro Cefálico",
    icon: <FaBrain />,
    column_name: "show_head_circumference",
    value: "head_circumference",
    unit: "cm",
  },
  {
    label: "Saturación de Oxígeno",
    icon: <BsLungs />,
    column_name: "show_oxygen_saturation",
    value: "oxygen_saturation",
    unit: "",
  },
  {
    label: "% de Agua",
    icon: <IoWaterOutline />,
    column_name: "show_water_percentage",
    value: "water_percentage",
    unit: "%",
  },
  {
    label: "% de Grasa Visceral",
    icon: <IoWaterOutline />,
    column_name: "show_visceral_fat_percentage",
    value: "visceral_fat_percentage",
    unit: "%",
  },
  {
    label: "Huesos",
    icon: <LiaBoneSolid />,
    column_name: "show_bones",
    value: "bones",
    unit: "",
  },
  {
    label: "Metabolismo",
    icon: <PiGraphDuotone />,
    column_name: "show_metabolism",
    value: "metabolism",
    unit: "",
  },
  {
    label: "Porcentaje de Proteinas",
    value: "",
    icon: <PiVirusFill />,
    column_name: "show_protein_percentage",
    value: "protein_percentage",
    unit: "",
  },
  {
    label: "Edad Del Cuerpo",
    icon: <GiSandsOfTime />,
    column_name: "show_body_age",
    value: "body_age",
    unit: "yrs",
  },
  {
    label: "Perímetro abdominal",
    icon: <GiAbdominalArmor />,
    column_name: "show_abdominal_perimeter",
    value: "abdominal_perimeter",
    unit: "",
  },
];
