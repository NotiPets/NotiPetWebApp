import React from "react";
import classes from "./Badge.module.css";

const Badge = (props) => {
  const secondaryClass = `badge-${props.type}`;

  return <span className={`${classes.badge} ${classes[secondaryClass]}`}>{props.content}</span>;
};

export default Badge;
