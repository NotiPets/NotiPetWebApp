import List from "../List/List";
import Layout from "../Layout/Layout";
import SearchBar from "../SearchBar/SearchBar";
import EmptyView from "../EmptyView/EmptyView";
import React, { useEffect, useState } from "react";
import classes from "../Products/Products.module.css";
import mockDataList from "../../assets/JsonData/services-list.json";

const Services = () => {
  const [list, setList] = useState(mockDataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const applyFilters = () => {
    let updatedList = mockDataList;

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) => item.name.toLowerCase().search(searchInput.toLowerCase().trim()) !== -1
      );
    }

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [searchInput]);

  return (
    <Layout>
      {/* Search Bar */}
      <SearchBar value={searchInput} changeInput={(e) => setSearchInput(e.target.value)} />

      <div className={classes["panelList-wrap"]}>
        {/* List and Empty view */}
        <div className={classes["list-wrap"]}>
          {resultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
