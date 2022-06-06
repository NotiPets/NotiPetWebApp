import List from "../List/List";
import Layout from "../Layout/Layout";
import SearchBar from "../SearchBar/SearchBar";
import EmptyView from "../EmptyView/EmptyView";
import spinner from "../../assets/Images/spinner.gif";
import classes from "../Products/Products.module.css";
import BusinessContext from "../../store/business-context";
import React, { useEffect, useState, useContext } from "react";
import mockDataList from "../../assets/JsonData/services-list.json";

const Services = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const businessContext = useContext(BusinessContext);
  const [resultsFound, setResultsFound] = useState(true);

  const mapServicesData = (servicesData) => {
    return servicesData.map((service) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price
    }));
  };

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

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(
        `${process.env.REACT_APP_NOTIPET_API_URL}/assetsservices/ByBusiness/${businessContext.id}`
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        const availableServices = jsonResponse.filter((service) => service.assetsServiceType === 1); // asset service type for services is = 1
        const services = mapServicesData(availableServices);
        setList(services);
      } else {
        throw new Error(
          `Error ${response.status}: Algo salió mal al intentar recuperar los servicios.`
        );
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchServices();
    applyFilters();
  }, [searchInput]);

  return (
    <Layout>
      {/* Search Bar */}
      <SearchBar value={searchInput} changeInput={(e) => setSearchInput(e.target.value)} />

      <div className={classes["panelList-wrap"]}>
        {/* List and Empty view */}
        <div className={classes["list-wrap"]}>
          {error && <p>{error.message}</p>}
          {isLoading && <img src={spinner} alt="" width="40" height="40" />}
          {resultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
