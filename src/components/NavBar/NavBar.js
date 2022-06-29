import classes from "./NavBar.module.css";
import appLogo from "../../assets/Images/logo.png";

const NavBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={appLogo} className={classes["app-logo"]} />
      </div>
    </div>
  );
};

export default NavBar;
