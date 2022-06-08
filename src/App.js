import { useContext } from "react";
import PetsPage from "./pages/PetsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthContext from "./store/auth-context";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";
import CustomersPage from "./pages/CustomersPage";
import EmployeesPage from "./pages/EmployeesPage";
import DashboardPage from "./pages/DashboardPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import CustomerStorePage from "./pages/CustomerStorePage";
import { Routes, Route, Navigate } from "react-router-dom";
import AppliedVaccinesPage from "./pages/AppliedVaccinesPage";
import CustomerServicesPage from "./pages/CustomerServicesPage";

const App = () => {
  const authContext = useContext(AuthContext);

  let dashboard;
  if (authContext.isLoggedIn) {
    dashboard = <DashboardPage />;
  } else {
    dashboard = <Navigate replace={true} to="/login" />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={dashboard} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="pets" element={<PetsPage />} />
        <Route path="*" element={<Navigate replace={true} to="/404" />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="customerStore" element={<CustomerStorePage />} />
        <Route path="customerServices" element={<CustomerServicesPage />} />
        <Route path="appliedVaccines" element={<AppliedVaccinesPage />} />
      </Routes>
    </div>
  );
};

export default App;
