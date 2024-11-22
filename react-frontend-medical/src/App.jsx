import { useEffect, useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoadingLayout from "./screens/LoadingLayout";
import AppRouter from "./routes/AppRouter";
import { AppContext } from "./context/AppContext";
import { apiGet } from "./utils/Api";
import { header_private } from "./utils/Headers";

function App() {
  const { logged, setLogged, setUserData, userData, setToken } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      denyAccess();
      return;
    }
    verifyToken(token);
  }, []);

  const denyAccess = () => {
    setLogged(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const allowAccess = () => {
    setLogged(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const verifyToken = async (token) => {
    const { data, error } = await apiGet(
      `${import.meta.env.VITE_API_BACK_URL}/user/auth`,
      header_private(token)
    );

    if (data) {
      setToken(token);
      setUserData({ ...userData, ...data });
      allowAccess();
    } else {
      localStorage.clear();
      denyAccess();
    }
  };

  return (
    <LoadingLayout loading={loading} children={<AppRouter />}></LoadingLayout>
  );
}

export default App;
