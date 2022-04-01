import React from "react";
import Slider from "../Slider/Slider";
import Checkbox from "../CheckBox/CheckBox";
import classes from "../FilterPanel/FilterPanel.module.css";
import ratingList from "../../assets/JsonData/rating-list.json";
import FiltersListToggle from "../FiltersListToggle/FiltersListToggle";

const FilterPanel = ({
  selectedRating,
  selectedPrice,
  selectRating,
  services,
  changeCheckStatus,
  changePrice
}) => (
  <div>
    <div className={classes["input-group"]}>
      <h1>Filtrar por</h1>
      <p className={classes["label"]}>Categoría</p>
      {services.map((service) => (
        <Checkbox key={service.id} service={service} changeCheckStatus={changeCheckStatus} />
      ))}
    </div>
    <div className={classes["input-group"]}>
      <p className={classes["label"]}>Rating</p>
      <FiltersListToggle
        className={classes["rating-toggle"]}
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div>
    <div className={classes["input-group"]}>
      <p className={classes["label-range"]}>Precio</p>
      <Slider value={selectedPrice} changePrice={changePrice} />
    </div>
  </div>
);

export default FilterPanel;
