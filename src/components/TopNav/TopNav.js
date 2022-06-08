import React from "react";
import { Link } from "react-router-dom";
import classes from "./TopNav.module.css";
import Dropdown from "../DropDown/DropDown";
import ThemeMenu from "../ThemeMenu/ThemeMenu";
import user_image from "../../assets/Images/logoNoFonts.png";
import user_menu from "../../assets/JsonData/user_menus.json";

const curr_user = {
  image: user_image
};

const renderUserToggle = (user) => (
  <div className={classes["topnav__right-user"]}>
    <div className={classes["topnav__right-user__image"]}>
      <img src={user.image} alt="" />
    </div>
    <div className={classes["topnav__right-user__name"]}>{user.display_name}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to="/" key={index}>
    <div className={classes["notification-item"]}>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const Topnav = ({ businessName }) => {
  return (
    <div className={classes["topnav"]}>
      <div>
        <h1>{businessName}</h1>
      </div>
      <div className={classes["topnav__right"]}>
        <div className={classes["topnav__right-item"]}>
          <ThemeMenu />
        </div>
        <div className={classes["topnav__right-item"]}>
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
