import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import classes from "../CheckBox/CheckBox.module.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles({
  root: {
    "&$checked": {
      color: "#00999b"
    }
  },
  checked: {}
});

const CheckBox = ({ changeCheckStatus, service }) => {
  const specialClass = useStyles();

  const { checked, label, id } = service;
  return (
    <div>
      <FormControlLabel
        classes={{
          root: classes["wrap"],
          label: classes["label"]
        }}
        control={
          <Checkbox
            classes={{
              root: specialClass.root,
              checked: specialClass.checked
            }}
            checked={checked}
            onChange={() => changeCheckStatus(id)}
          />
        }
        label={label}
      />
    </div>
  );
};

export default CheckBox;
