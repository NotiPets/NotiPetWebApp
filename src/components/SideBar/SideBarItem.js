import React from "react";
import classes from "./SideBar.module.css";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className={classes["sidebar__item"]}>
      <div className={`${classes["sidebar__item-inner"]} ${classes[active]}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

export default SidebarItem;
