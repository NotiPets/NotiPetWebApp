import React from "react";
import RowOptions from "../../Table/RowOptions";
import classes from "./ListItem.module.css";

const ListItem = ({ item: { pictureUrl, name, price, description }, onEdit, onViewDetails }) => {
  return (
    <div className={classes["listItem-wrap"]}>
      <img src={pictureUrl} alt="" />
      <header>
        <h5>{name}</h5>
        <span>⭐5</span>
      </header>
      <footer>
        <p>
          <p>
            <b className="priceTag">{price}</b>
          </p>
          <b>{description}</b>
        </p>
        <div className={classes["row-options"]}>
          <RowOptions onEdit={onEdit} onViewDetails={onViewDetails}></RowOptions>
        </div>
      </footer>
    </div>
  );
};

export default ListItem;
