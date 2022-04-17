import classes from "./NavBar.module.css";
import appLogo from "../../assets/Images/logo.png";

const NavBar = () => {
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
              <a href="/CustomerStore">Tienda</a>
            </li>
            <li className={classes["nav-item"]}>
              <a href="/CustomerServices">Servicios</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
