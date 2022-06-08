import List from "../List/List";
import Layout from "../Layout/Layout";
import ProductModal from "./ProductModal";
import SearchBar from "../SearchBar/SearchBar";
import EmptyView from "../EmptyView/EmptyView";
import spinner from "../../assets/Images/spinner.gif";
import classes from "../Products/Products.module.css";
import BusinessContext from "../../store/business-context";
import React, { useEffect, useState, useContext } from "react";

const Products = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const businessContext = useContext(BusinessContext);
  const [currentProduct, setCurrentProduct] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);

  const editProductHandler = (product) => {
    setCurrentProduct(product);
    setShowEditProduct(true);
  };

  const viewProductDetailsHandler = (product) => {
    setCurrentProduct(product);
    setShowProductDetails(true);
  };

  const closeModalHandler = () => {
    setShowProductDetails(false);
    setShowEditProduct(false);
  };

  const mapProductsData = (productsData) => {
    return productsData.map((product) => ({
      id: product.id,
      name: product.name,
      pictureUrl: product.pictureUrl,
      description: product.description,
      onEdit: () => editProductHandler(product),
      onViewDetails: () => viewProductDetailsHandler(product),
      price: product.price.toLocaleString("es-DO", { style: "currency", currency: "DOP" })
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

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(
        `${process.env.REACT_APP_NOTIPET_API_URL}/assetsservices/ByBusiness/${businessContext.id}`
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        const availableProducts = jsonResponse.data.filter(
          (product) => product.assetsServiceType === 0
        ); // asset service type for products is = 0
        const products = mapProductsData(availableProducts);
        setList(products);
      } else {
        throw new Error(
          `Error ${response.status}: Algo salió mal al intentar recuperar los productos.`
        );
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchProducts();
  }, [searchInput]);

  return (
    <Layout>
      {/* Search Bar */}
      <SearchBar value={searchInput} changeInput={(e) => searchItems(e.target.value)} />

      <div className={classes["panelList-wrap"]}>
        {/* List and Empty view */}
        <div className={classes["list-wrap"]}>
          {error && <p>{error.message}</p>}
          {isLoading && <img className={"spinner"} src={spinner} alt="" width="40" height="40" />}
          {filteredResults.length === 0 && searchInput.length > 1 && <EmptyView />}
          {searchInput.length > 1 ? <List list={filteredResults} /> : <List list={list} />}
        </div>
      </div>
      {showEditProduct && (
        <ProductModal
          canEdit
          productData={currentProduct}
          onClose={closeModalHandler}
          refreshProducts={fetchProducts}
        />
      )}
      {showProductDetails && (
        <ProductModal canEdit={false} productData={currentProduct} onClose={closeModalHandler} />
      )}
    </Layout>
  );
};

export default Products;
