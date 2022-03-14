import React from "react";
import classes from "./StatusCard.module.css";

const StatusCard = (props) => {
  return (
    <div className={classes["status-card"]}>
      <div className={classes["status-card__icon"]}>
        <i className={props.icon}></i>
      </div>
      <div className={classes["status-card__info"]}>
        <h4>{props.count}</h4>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

export default StatusCard;
