import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(({ input, label }, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input} />
    </div>
  );
});

export default Input;
