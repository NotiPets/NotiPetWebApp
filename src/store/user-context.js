import { createContext, useState } from "react";

const UserContext = createContext({
  active: true,
  address1: "",
  address2: "",
  businessId: 0,
  city: "",
  created: "",
  document: "",
  documentType: 0,
  email: "",
  id: "",
  lastnames: "",
  phone: "",
  pictureUrl: "",
  province: "",
  role: 0,
  updated: "",
  username: "",
  setUser: () => {}
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});

  const setUserHandler = (userObj) => {
    setUser({ ...userObj });
  };

  const contextValue = {
    ...user,
    setUser: setUserHandler
  };

  return <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>;
};

export default UserContext;
