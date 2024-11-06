import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import PublicRoutes from "./PublicRoutes/PublicRoutes";

const AppRouter = () => {
  const { logged, setLogged } = useContext(AppContext);
  return <>{logged ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export default AppRouter;
