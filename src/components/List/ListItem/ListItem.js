import React from "react";
import classes from "./ListItem.module.css";

const ListItem = ({ item: { image, name, price, description, rating } }) => (
  <div className={classes["listItem-wrap"]}>
    <img src={image} alt="" />
    <header>
      <h4>{name}</h4>
      <span>⭐{rating}</span>
    </header>
    <footer>
      <p>
        <b>{description}</b>
      </p>
      <p>
        <b>${price}</b>
      </p>
    </footer>
  </div>
);

export default ListItem;
