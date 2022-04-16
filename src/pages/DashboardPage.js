import { useContext, useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Layout from "../components/Layout/Layout";
import UserContext from "../store/user-context";
import BusinessContext from "../store/business-context";

const DashboardPage = () => {
  const userContext = useContext(UserContext);
  const businessContext = useContext(BusinessContext);
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await fetch(
          // eslint-disable-next-line no-undef
          `${process.env.REACT_APP_NOTIPET_API_URL}/businesses/${userContext.businessId}`
        );
        if (response.ok) {
          const jsonResponse = await response.json();
          const business = jsonResponse.data;
          businessContext.setBusiness(business);
          return;
        }
        throw new Error();
      } catch (error) {
        businessContext.setBusiness({ businessName: "Notipet" });
      }
    };
    fetchBusinessInfo();
  });
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
