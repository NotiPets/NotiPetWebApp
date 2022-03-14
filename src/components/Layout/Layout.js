import React, { useEffect } from "react";
import classes from "../../Layout.css";

import TopNav from "../TopNav/TopNav";
import Sidebar from "../SideBar/SideBar";

import { useSelector, useDispatch } from "react-redux";
import ThemeAction from "../../redux/actions/ThemeAction";

const Layout = (props) => {
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
        <TopNav />
        <div className={classes["layout__content-main"]}>{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
