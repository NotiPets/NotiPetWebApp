import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from "../ui/Button/Button";
import classes from "./Login.module.css";
import appLogo from "../../assets/logo.png";

const rememberUsernameItem = "NOTIPET_LOGIN_USERNAME";
const rememberPasswordItem = "NOTIPET_LOGIN_PASSWORD";

const updateRememberMeLocalStorage = (username, password, remember) => {
  if (remember) {
    localStorage.setItem(rememberUsernameItem, username);
    localStorage.setItem(rememberPasswordItem, password);
  } else {
    localStorage.removeItem(rememberUsernameItem);
    localStorage.removeItem(rememberPasswordItem);
  }
};

const Login = () => {
  const navigate = useNavigate();

  const usernameInput = useRef();
  const passwordInput = useRef();
  const rememberCredentialsInput = useRef();

  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    usernameInput.current.value = localStorage.getItem(rememberUsernameItem) ?? "";
    passwordInput.current.value = localStorage.getItem(rememberPasswordItem) ?? "";
    rememberCredentialsInput.current.checked = true;
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredUsername = usernameInput.current.value;
    const enteredPassword = passwordInput.current.value;

    const endpoint = "https://notipet-webapi.herokuapp.com/api/login";
    const method = "POST";
    const reqHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
    const reqBody = JSON.stringify({
      username: enteredUsername,
      password: enteredPassword
    });

    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(endpoint, {
        method: method,
        body: reqBody,
        headers: reqHeaders
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        updateRememberMeLocalStorage(
          enteredUsername,
          enteredPassword,
          rememberCredentialsInput.current.checked
        );
        authContext.login(jsonResponse.data.token);
        navigate("/dashboard");
        return;
      } else if (response.status === 401) {
        const json = await response.json();
        if (json.data.credentials.toLowerCase() === "invalid credentials") {
          throw new Error("Usuario o contraseña inválidos.");
        }
      }
      throw new Error(`Error ${response.status}: Algo salió mal al iniciar sesión`);
    } catch (err) {
      setError({ message: err.message });
    }

    setIsLoading(false);
  };

  return (
    <section className={classes["login-container"]}>
      <div className={classes.header}>
        <img src={appLogo} className={classes["app-logo"]} />

        <div className={classes["cart-icon"]}>
          <a href="">
            <img src="https://img.icons8.com/windows/35/02546A/shopping-cart.png" />
          </a>
        </div>
      </div>

      <h1>
        Bienvenido de vuelta a <span className={classes.highlight}>Notipet</span>
      </h1>
      <h2>Iniciar sesión</h2>

      <form onSubmit={submitHandler}>
        <div className={classes.inputs}>
          <div className={classes.group}>
            <label className={classes["username-label"]} htmlFor="username">
              Nombre de usuario
            </label>

            <input
              type="text"
              id="username"
              name="username"
              ref={usernameInput}
              placeholder="Nombre de usuario"
              className={classes["username-input"]}
            />
          </div>

          <div className={classes.group}>
            <label className={classes["password-label"]} htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              placeholder="Contraseña"
              className={classes["password-input"]}
            />
          </div>
        </div>

        <div className={classes.actions}>
          <div className={classes["text-div"]}>
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              ref={rememberCredentialsInput}
              className={classes["checkbox-input"]}
            />
            <label className={classes["checkbox-text"]} htmlFor="remember-me">
              Recuérdame
            </label>

            <a href="/">¿Olvidó su contraseña?</a>
          </div>
          <Button
            type="submit"
            isPrimary={true}
            isLoading={isLoading}
            className={classes["login-button"]}
          >
            Iniciar sesión
          </Button>
        </div>

        {error && <p className={classes.alert}>{error.message}</p>}
      </form>
    </section>
  );
};

export default Login;
