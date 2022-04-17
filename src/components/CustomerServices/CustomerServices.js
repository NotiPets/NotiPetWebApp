import List from "../List/List";
import NavBar from "../NavBar/NavBar";
import EmptyView from "../EmptyView/EmptyView";
import classes from "../CustomerServices/CustomerServices.module.css";
import React, { useEffect, useState } from "react";
import FilterPanel from "../FilterPanel/FilterPanel";
import mockDataList from "../../assets/JsonData/services-list.json";

const Store = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);

  const [services, setServices] = useState([
    { id: 1, checked: false, label: "Hospedaje" },
    { id: 2, checked: false, label: "Baño" }
  ]);

  const [list, setList] = useState(mockDataList);
  const [resultsFound, setResultsFound] = useState(true);

  const handleSelectedService = (event, value) => (!value ? null : setSelectedService(value));

  const handleSelectedRating = (event, value) => (!value ? null : setSelectedRating(value));

  const handleChangeChecked = (id) => {
    const servicesStateList = services;
    const changeCheckedServices = servicesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setServices(changeCheckedServices);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = mockDataList;

    // Rating filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    // Service filter
    const servicesChecked = services
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (servicesChecked.length) {
      updatedList = updatedList.filter((item) => servicesChecked.includes(item.category));
    }

    // Price filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter((item) => item.price >= minPrice && item.price <= maxPrice);

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedService, services, selectedPrice]);

  return (
    <div className={classes.container}>
      <NavBar />

      <div className={classes["extended-content-container"]}>
        <div className={classes["top-bar"]}>
          <div className={classes.text}>
            <h1>SERVICIOS</h1>
          </div>
        </div>
      </div>

      <div className={classes["home_panelList-wrap"]}>
        {/* Filter panel */}
        <div className={classes["home_panel-wrap"]}>
          <FilterPanel
            services={services}
            selectedPrice={selectedPrice}
            selectedRating={selectedRating}
            changePrice={handleChangePrice}
            selectedService={selectedService}
            selectRating={handleSelectedRating}
            selectService={handleSelectedService}
            changeCheckStatus={handleChangeChecked}
          />
        </div>

        {/* List and Empty view */}
        <div className={classes["home_list-wrap"]}>
          {resultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default Store;
