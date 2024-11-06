import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { UserOutlined } from "@ant-design/icons";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { apiPost } from "../../utils/Api";
import { default_header } from "../../utils/Headers";

const SigninScreen = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  // Para obtener el valor del campo password y compararlo con confirm_password
  const password = watch("password");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    setError(false);
    setLoading(true);
    const { data: response, error } = await apiPost(
      `${import.meta.env.VITE_API_BACK_URL}/user/signin`,
      data,
      default_header
    );
    if (response) {
      console.log(response);
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
          <h2>Registro</h2>

          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "El nombre es obligatorio" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nombre"
                prefix={<UserOutlined />}
                status={errors.name && "error"}
              />
            )}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}

          {/* Campo de email */}
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
                placeholder="Email"
                prefix={<MailOutlined />}
                status={errors.email && "error"}
              />
            )}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}

          {/* Campo de contraseña */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Contraseña"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                status={errors.password && "error"}
              />
            )}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}

          {/* Campo de confirmación de contraseña */}
          <Controller
            name="confirm_password"
            control={control}
            defaultValue=""
            rules={{
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Confirma la contraseña"
                prefix={<LockOutlined />}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                status={errors.confirm_password && "error"}
              />
            )}
          />
          {errors.confirm_password && (
            <span style={{ color: "red" }}>
              {errors.confirm_password.message}
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
            Ya tienes una cuenta? <Link to="/login">Iniciar sesion</Link>
          </span>
        </form>
      </div>
      <div className="login-col login-right-col"></div>
    </div>
  );
};

export default SigninScreen;
