import React from "react";
import classes from "./SideBar.module.css";
import { Link, useLocation } from "react-router-dom";
import sidebar_items from "../../assets/JsonData/sidebar_routes.json";

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

const Sidebar = () => {
  const location = useLocation();
  const activeItem = sidebar_items.findIndex((item) => item.route === location.pathname);

  return (
    <div className={classes["sidebar"]}>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem title={item.display_name} icon={item.icon} active={index === activeItem} />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
