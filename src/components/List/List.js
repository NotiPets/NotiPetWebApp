import React from "react";
import classes from "../List/List.module.css";
import ListItem from "../List/ListItem/ListItem";

const List = ({ list }) => (
  <div className={classes["list-wrap"]}>
    {list.map((item) => (
      <ListItem key={item.id} item={item} onEdit={item.onEdit} onViewDetails={item.onViewDetails} />
    ))}
  </div>
);

export default List;
