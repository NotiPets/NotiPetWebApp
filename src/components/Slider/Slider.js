import React from "react";
import classes from "../Slider/Slider.module.css";
import SliderProton from "@material-ui/core/Slider";

const Slider = ({ value, changePrice }) => {
  return (
    <div className={classes["root"]}>
      <SliderProton
        min={1000}
        max={5000}
        value={value}
        onChange={changePrice}
        valueLabelDisplay="on"
        classes={{
          rail: classes["rail"],
          track: classes["track"],
          thumb: classes["thumb"]
        }}
      />
    </div>
  );
};

export default Slider;
