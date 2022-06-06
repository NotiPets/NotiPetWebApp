import React from "react";
import classes from "./ListItem.module.css";

const ListItem = ({ item: { pictureUrl, name, price, description } }) => (
  <div className={classes["listItem-wrap"]}>
    <img src={pictureUrl} alt="" />
    <header>
      <h4>{name}</h4>
      <span>⭐5</span>
    </header>
    <footer>
      <p>
        <b>{description}</b>
      </p>
      <p>
        <b>{price}</b>
      </p>
    </footer>
  </div>
);

export default ListItem;
