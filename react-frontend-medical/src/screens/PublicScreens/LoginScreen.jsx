import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { UserOutlined } from "@ant-design/icons";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../utils/Api";
import { default_header } from "../../utils/Headers";
import { AppContext } from "../../context/AppContext";

const LoginScreen = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { setLogged, userData, setUserData, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    setError(false);
    setLoading(true);
    const { data: response, error } = await apiPost(
      `${import.meta.env.VITE_API_BACK_URL}/user/login`,
      data,
      default_header
    );
    if (response) {
      console.log(response);

      const { token, ...userDataResponse } = response;
      setToken(token);
      setUserData({ ...userData, ...userDataResponse });
      localStorage.setItem("auth-token", token);

      setTimeout(() => {
        setLogged(true);
        navigate("/");
      }, 2200);
    } else {
      console.log(error);
      setTimeout(() => {
        setError(true);
      }, 2000);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="login-bg">
      <div className="login-col login-left-col">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Iniciar sesion</h2>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "El formato del correo electrónico no es válido",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="email"
                prefix={<UserOutlined />}
                status={errors.email && "error"}
              />
            )}
          />
          {errors.email && (
            <span className="login-form-error-span">
              {errors.email.message}
            </span>
          )}

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "La contraseña es obligatoria" }}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="password"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                status={errors.password && "error"}
              />
            )}
          />
          {errors.password && (
            <span className="login-form-error-span">
              {errors.password.message}
            </span>
          )}
          {error ? (
            <span className="login-form-error-span">
              Email o contraseña incorrectos
            </span>
          ) : (
            <></>
          )}
          <>
            {loading ? (
              <Button loading type="primary">
                Cargando...
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                Iniciar sesión
              </Button>
            )}
          </>
          <span>
            No tienes cuenta? <Link to="/signin">Registrarse</Link>
          </span>
        </form>
      </div>
      <div className="login-col login-right-col"></div>
    </div>
  );
};

export default LoginScreen;
