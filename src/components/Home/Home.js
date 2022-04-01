import classes from "./Home.module.css";
import NavBar from "../NavBar/NavBar";

const Home = () => {
  return (
    <div className={classes.container}>
      <NavBar />

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
