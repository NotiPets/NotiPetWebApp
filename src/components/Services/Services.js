import List from "../List/List";
import Layout from "../Layout/Layout";
import ServiceModal from "./ServiceModal";
import SearchBar from "../SearchBar/SearchBar";
import EmptyView from "../EmptyView/EmptyView";
import spinner from "../../assets/Images/spinner.gif";
import classes from "../Products/Products.module.css";
import BusinessContext from "../../store/business-context";
import React, { useEffect, useState, useContext } from "react";

const Services = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const businessContext = useContext(BusinessContext);
  const [currentService, setCurrentService] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [showEditService, setShowEditService] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  const editServiceHandler = (service) => {
    setCurrentService(service);
    setShowEditService(true);
  };

  const viewServiceDetailsHandler = (service) => {
    setCurrentService(service);
    setShowServiceDetails(true);
  };

  const closeModalHandler = () => {
    setShowServiceDetails(false);
    setShowEditService(false);
  };

  const mapServicesData = (servicesData) => {
    return servicesData.map((service) => ({
      id: service.id,
      name: service.name,
      pictureUrl: service.pictureUrl,
      description: service.description,
      onEdit: () => editServiceHandler(service),
      onViewDetails: () => viewServiceDetailsHandler(service),
      price: service.price.toLocaleString("es-DO", { style: "currency", currency: "DOP" })
    }));
  };

  const searchItems = (searchInput) => {
    setSearchInput(searchInput);

    if (searchInput !== "") {
      const filteredData = list.filter((item) => {
        return Object.values(item).join("").toLowerCase().includes(searchInput.toLowerCase());
      });
      console.log(filteredData.length);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
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
        const availableServices = jsonResponse.data.filter(
          (service) => service.assetsServiceType === 1
        ); // asset service type for services is = 1
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
  }, [searchInput]);

  return (
    <Layout>
      {/* Search Bar */}
      <SearchBar value={searchInput} changeInput={(e) => searchItems(e.target.value)} />

      <div className={classes["panelList-wrap"]}>
        {/* List and Empty view */}
        <div className={classes["list-wrap"]}>
          {error && <p>{error.message}</p>}
          {isLoading && <img src={spinner} alt="" width="40" height="40" />}
          {filteredResults.length === 0 && searchInput.length > 1 && <EmptyView />}
          {searchInput.length > 1 ? <List list={filteredResults} /> : <List list={list} />}
        </div>
      </div>
      {showEditService && (
        <ServiceModal
          canEdit
          serviceData={currentService}
          onClose={closeModalHandler}
          refreshServices={fetchServices}
        />
      )}
      {showServiceDetails && (
        <ServiceModal canEdit={false} serviceData={currentService} onClose={closeModalHandler} />
      )}
    </Layout>
  );
};

export default Services;
