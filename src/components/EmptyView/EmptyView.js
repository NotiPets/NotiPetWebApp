import React from "react";
import classes from "../EmptyView/EmptyView.module.css";

const EmptyView = () => (
  <div className={classes["emptyView-wrapper"]}>
    <iframe
      className={classes.animation}
      src="https://embed.lottiefiles.com/animation/101307"
    ></iframe>
  </div>
);

export default EmptyView;
