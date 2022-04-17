import React from "react";
import classes from "./SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = ({ value, changeInput }) => (
  <div className={classes["searchBar-wrapper"]}>
    <SearchIcon className={classes["searchBar-icon"]} />
    <input
      type="text"
      placeholder="Ingrese el nombre del artículo/servicio a buscar"
      value={value}
      onChange={changeInput}
    />
  </div>
);

export default SearchBar;
