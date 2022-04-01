import React from "react";
import classes from "./ListItem.module.css";

const ListItem = ({ item: { serviceImage, serviceName, price, serviceDescription, rating } }) => (
  <div className={classes["listItem-wrap"]}>
    <img src={serviceImage} alt="" />
    <header>
      <h4>{serviceName}</h4>
      <span>⭐{rating}</span>
    </header>
    <footer>
      <p>
        <b>{serviceDescription}</b>
      </p>
      <p>
        <b>${price}</b>
      </p>
    </footer>
  </div>
);

export default ListItem;
