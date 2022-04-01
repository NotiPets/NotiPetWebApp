import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import classes from "../FiltersListToggle/FiltersListToggle.module.css";

const FiltersListToggle = ({ options, value, selectToggle }) => {
  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      onChange={selectToggle}
      className={classes["toggle-button-group"]}
    >
      {options.map(({ label, id, value }) => (
        <ToggleButton className={classes["toggle-button"]} key={id} value={value}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default FiltersListToggle;
