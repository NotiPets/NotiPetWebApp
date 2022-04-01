import React from "react";
import classes from "../List/List.module.css";
import ListItem from "../List/ListItem/ListItem";

const List = ({ list }) => (
  <div className={classes["list-wrap"]}>
    {list.map((item) => (
      <ListItem key={item.id} item={item} />
    ))}
  </div>
);

export default List;
