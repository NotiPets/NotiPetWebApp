import classes from "./Home.module.css";
import appLogo from "../../assets/logo.png";

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={appLogo} className={classes["app-logo"]} />
        <nav>
          <ul className={classes["nav-menu"]}>
            <li className={classes["nav-item"]}>
              <a href="/">Home</a>
            </li>
            <li className={classes["nav-item"]}>
              <a href="">Tienda</a>
            </li>
            <li className={classes["nav-item"]}>
              <a href="">Servicios</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={classes.content}>
        <div className={classes.text}>
          <h1>¡Bienvenido a NotiPet!</h1>
          <span>Por favor inicie sesión para continuar.</span>
          <a href="login" className={classes.btn}>
            Iniciar sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
