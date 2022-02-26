import classes from "./Button.module.css";

const Button = ({ className, isPrimary, type, ...props }) => {
  return (
    <button
      className={`${classes.button} ${
        isPrimary ? classes.primary : classes.secondary
      } ${className}`}
      type={type || "button"}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
