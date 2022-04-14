import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import StorePage from "./pages/StorePage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import CustomersPage from "./pages/CustomersPage";
import EmployeesPage from "./pages/EmployeesPage";
import PetsPage from "./pages/PetsPage";

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
        <Route path="store" element={<StorePage />} />
        <Route path="pets" element={<PetsPage />} />
        <Route path="*" element={<Navigate replace={true} to="/404" />} />
      </Routes>
    </div>
  );
};

export default App;
