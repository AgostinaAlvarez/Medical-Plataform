import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

const PrivateStructure = ({ children }) => {
  const { asideOptions, setAsideOptions } = useContext(AppContext);
  const navigate = useNavigate();
  const [showAsideResponsive, setShowAsideResponsive] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth >= 780) {
        setShowAsideResponsive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openAsideResponsive = () => {
    setShowAsideResponsive(true);
  };

  const closeAsideResponsive = () => {
    setShowAsideResponsive(false);
  };

  function navigateRoute(option) {
    const updateOptions = asideOptions.map((item) => {
      if (option.label === item.label) {
        return { ...item, selected: true };
      }
      return { ...item, selected: false };
    });
    setAsideOptions(updateOptions);
    navigate(option.route);
  }

  return (
    <div className="private-strcuture-bg">
      <aside
        className="private-structure-aside"
        style={{ paddingBottom: "15px" }}
      >
        <div className="private-structure-aside-icon-container">
          {asideOptions.map((item, index) => (
            <div
              className={
                item.selected === true ? "aside-icon-cta" : "aside-icon"
              }
              key={index}
              onClick={() => {
                navigateRoute(item);
              }}
            >
              {item.icon}
            </div>
          ))}
        </div>
        <div className="section-icon" style={{ backgroundColor: "#dbdbdb5f" }}>
          <CiLogin style={{ fontSize: "20px" }} />
        </div>
      </aside>
      <div
        className={
          showAsideResponsive
            ? "private-structure-aside-responsive-cta"
            : "private-structure-aside-responsive"
        }
      >
        <div className="aside-responsive">
          <IoIosCloseCircle
            className="aside-responsive-close-icon"
            onClick={closeAsideResponsive}
          />
          {asideOptions.map((item, index) => (
            <div
              key={index}
              className="row"
              onClick={() => {
                navigateRoute(item);
                closeAsideResponsive();
              }}
            >
              <div>{item.icon}</div>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="row aside-responsive-logout">
            <CiLogin />
            <span>Cerrar sesion</span>
          </div>
        </div>
      </div>
      <div className="private-structure-main-container">
        <nav className="private-structure-navbar">
          <IoMdMenu
            className="private-structure-aside-icon"
            onClick={openAsideResponsive}
          />
          <div className="profile-icon">
            <span>DA</span>
          </div>
        </nav>
        {/*Contenido*/}
        <div className="private-structure-main">{children}</div>
      </div>
    </div>
  );
};

export default PrivateStructure;
