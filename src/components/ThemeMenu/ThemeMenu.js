import { useDispatch } from "react-redux";
import classes from "./ThemeMenu.module.css";
import ThemeAction from "../../redux/actions/ThemeAction";
import React, { useRef, useState, useEffect } from "react";

const mode_settings = [
  {
    id: "light",
    name: "Light",
    background: "light-background",
    class: "theme-mode-light"
  },
  {
    id: "dark",
    name: "Dark",
    background: "dark-background",
    class: "theme-mode-dark"
  }
];

const color_settings = [
  {
    id: "blue",
    name: "Azul",
    background: "blue-color",
    class: "theme-color-blue"
  },
  {
    id: "cyan",
    name: "Cyan",
    background: "cyan-color",
    class: "theme-color-cyan"
  },
  {
    id: "green",
    name: "Verde",
    background: "green-color",
    class: "theme-color-green"
  }
];

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    // user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};

const ThemeMenu = () => {
  const menu_ref = useRef(null);
  const menu_toggle_ref = useRef(null);

  clickOutsideRef(menu_ref, menu_toggle_ref);

  const setActiveMenu = () => menu_ref.current.classList.add("active");

  const closeMenu = () => menu_ref.current.classList.remove("active");

  const [currMode, setcurrMode] = useState("light");

  const [currColor, setcurrColor] = useState("blue");

  const dispatch = useDispatch();

  const setMode = (mode) => {
    setcurrMode(mode.id);
    localStorage.setItem("themeMode", mode.class);
    dispatch(ThemeAction.setMode(mode.class));
  };

  const setColor = (color) => {
    setcurrColor(color.id);
    localStorage.setItem("colorMode", color.class);
    dispatch(ThemeAction.setColor(color.class));
  };

  const setCurrentMode = (id, currentMode) => {
    return id === currentMode ? "active" : "";
  };

  const setCurrentColor = (id, currentColor) => {
    return id === currentColor ? "active" : "";
  };

  useEffect(() => {
    const themeClass = mode_settings.find(
      (e) => e.class === localStorage.getItem("themeMode", "theme-mode-light")
    );

    const colorClass = color_settings.find(
      (e) => e.class === localStorage.getItem("colorMode", "theme-mode-light")
    );

    if (themeClass !== undefined) setcurrMode(themeClass.id);

    if (colorClass !== undefined) setcurrColor(colorClass.id);
  }, []);

  const bxBxClass = `bx-x`;
  const bxCheckClass = `bx-check`;
  // const bxPaletteClass = `bx-palette`;

  return (
    <div>
      <button
        ref={menu_toggle_ref}
        className={classes["dropdown__toggle"]}
        onClick={() => setActiveMenu()}
      >
        <i className="bx bx-palette"></i>
      </button>
      <div ref={menu_ref} className={classes["theme-menu"]}>
        <h4>Opciones de color</h4>
        <button className={classes["theme-menu__close"]} onClick={() => closeMenu()}>
          <i className={`${classes.bx} ${classes[bxBxClass]}`}></i>
        </button>
        <div className={classes["theme-menu__select"]}>
          <span>Escoja el modo de la aplicación</span>
          <ul className={classes["mode-list"]}>
            {mode_settings.map((item, index) => (
              <li key={index} onClick={() => setMode(item)}>
                <div
                  className={`${classes["mode-list__color"]} ${
                    classes[item.background]
                  } ${setCurrentMode(item.id, currMode)}`}
                >
                  <i className={`${classes.bx} ${classes[bxCheckClass]}`}></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes["theme-menu__select"]}>
          <span>Elija un color</span>
          <ul className={classes["mode-list"]}>
            {color_settings.map((item, index) => (
              <li key={index} onClick={() => setColor(item)}>
                <div
                  className={`${classes["mode-list__color"]} ${
                    classes[item.background]
                  } ${setCurrentColor(item.id, currColor)}`}
                >
                  <i className={`${classes.bx} ${classes[bxCheckClass]}`}></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeMenu;
