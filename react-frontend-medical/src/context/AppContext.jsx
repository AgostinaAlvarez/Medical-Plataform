import { createContext, useState } from "react";
import { menu_aside_options } from "../enums/MenuOptions";
import { patient_menu_options } from "../enums/PatientDetailMenuOptions";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState({
    email: null,
    id: null,
    name: "Default Hardcoded",
  });
  const [token, setToken] = useState(null);
  //opciones del menu
  const [asideOptions, setAsideOptions] = useState(menu_aside_options);

  //Data del paciente seleccionado
  const [patientData, setPatientData] = useState(null);

  //opciones del aside del paciente
  const [asidePatientMenuOptions, setAsidePatientMenuOptions] =
    useState(patient_menu_options);

  return (
    <AppContext.Provider
      value={{
        logged,
        setLogged,
        userData,
        setUserData,
        token,
        setToken,
        asideOptions,
        setAsideOptions,
        asidePatientMenuOptions,
        setAsidePatientMenuOptions,
        patientData,
        setPatientData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
