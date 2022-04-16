import { createContext, useState } from "react";

const BusinessContext = createContext({
  address1: "",
  address2: "",
  businessName: "",
  city: "",
  email: "",
  id: 0,
  latitude: 0.0,
  longitude: 0.0,
  phone: "",
  pictureUrl: "",
  province: "",
  rnc: "",
  setBusiness: () => {}
});

export const BusinessContextProvider = (props) => {
  const [business, setBusiness] = useState({});

  const setBusinessHandler = (businessObj) => {
    setBusiness({ ...businessObj });
  };

  const contextValue = {
    ...business,
    setBusiness: setBusinessHandler
  };

  return <BusinessContext.Provider value={contextValue}>{props.children}</BusinessContext.Provider>;
};

export default BusinessContext;
