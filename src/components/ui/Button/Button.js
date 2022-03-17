import classes from "./Button.module.css";
import spinner from "../../../assets/Images/spinner.gif";

const Button = ({ className, isPrimary, type, isLoading, ...props }) => {
  const cssClasses = `${classes.button} ${
    isPrimary ? classes.primary : classes.secondary
  } ${className}`;

  return (
    <button
      className={cssClasses}
      type={type || "button"}
      onClick={props.onClick}
      disabled={isLoading}
      {...props}
    >
      {!isLoading && props.children}
      {isLoading && <img src={spinner} alt="" width="20" height="20" />}
    </button>
  );
};

export default Button;
