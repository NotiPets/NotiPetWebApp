import React, { useEffect, useContext } from "react";
import BusinessContext from "../../store/business-context";
import classes from "../Layout/Layout.module.css";

import TopNav from "../TopNav/TopNav";
import Sidebar from "../SideBar/SideBar";

import { useSelector, useDispatch } from "react-redux";
import ThemeAction from "../../redux/actions/ThemeAction";

const Layout = (props) => {
  const businessContext = useContext(BusinessContext);

  const themeReducer = useSelector((state) => state.ThemeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  return (
    <div className={`${classes["layout"]} ${themeReducer.mode} ${themeReducer.color}`}>
      <Sidebar {...props} />
      <div className={classes["layout__content"]}>
        <TopNav
          businessName={businessContext?.businessName ? businessContext?.businessName : "NotiPet"}
        />
        <div className={classes["layout__content-main"]}>{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
