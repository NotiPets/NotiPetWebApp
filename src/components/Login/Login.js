import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../ui/Button/Button";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const usernameInput = useRef();
  const passwordInput = useRef();

  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    isError: false
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredUsername = usernameInput.current.value;
    const enteredPassword = passwordInput.current.value;

    const endpoint = "";
    const method = "POST";
    const reqHeaders = { "Content-Type": "application/json" };
    const reqBody = JSON.stringify({
      username: enteredUsername,
      password: enteredPassword
    });

    try {
      setError({ message: "", isError: false });
      setIsLoading(true);
      const response = await fetch(endpoint, {
        method: method,
        body: reqBody,
        headers: reqHeaders
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        authContext.login(jsonResponse.idToken);
        navigate("/dashboard");
        // Mas logica a partir de la respuesta del api
        return;
      }

      throw new Error("Algo salió mal al iniciar sesión");
    } catch (error) {
      setError({ message: error.message, isError: true });
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.login}>
      <h1>
        Bienvenido de vuelta a <span className={classes.highlight}>Notipet</span>
      </h1>
      <h2>Iniciar sesión</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.inputs}>
          <div className={classes.group}>
            <label htmlFor="username">Nombre de usuario</label>
            <input type="text" name="username" id="username" ref={usernameInput} />
          </div>
          <div className={classes.group}>
            <label htmlFor="username">Contraseña</label>
            <input type="password" name="password" id="password" ref={passwordInput} />
          </div>
        </div>
        <div className={classes.actions}>
          <div className={classes.group}>
            <input type="checkbox" name="remember-me" id="remember-me" />
            <label htmlFor="remember-me">Recuérdame</label>
          </div>
          <a href="/">¿Olvidó su contraseña?</a>
          <Button type="submit" isPrimary={true} isLoading={isLoading}>
            Iniciar sesión
          </Button>
        </div>
        {error.isError && <p className={classes.alert}>{error.message}</p>}
      </form>
    </section>
  );
};

export default Login;
