import React, { useContext, useEffect } from "react";
import { ExampleChart } from "../../components/Charts/ExampleChart";
import { updateAsideOptions } from "../../functions/functions";
import { AppContext } from "../../context/AppContext";

const HomePrivate = () => {
  const { asideOptions, setAsideOptions } = useContext(AppContext);

  useEffect(() => {
    console.log("home");
    update_aside();
  }, []);

  const update_aside = () => {
    const array = updateAsideOptions("home", asideOptions);
    setAsideOptions(array);
  };

  return (
    <>
      <div className="home-screen-structure">
        {/*columna derecha*/}
        <div className="home-screen-summary-container column">
          <span>Resumen de la semana</span>
          <span>Graficos</span>
        </div>
        {/*columna izquierda*/}
        <div className="home-screen-report-container column">
          <span>Informe para hoy</span>
          <span>Turnos</span>
        </div>
      </div>
      {/*
        <ExampleChart />
        */}
    </>
  );
};

export default HomePrivate;
