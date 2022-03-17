import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import CustomersPage from "./pages/CustomersPage";
import EmployeesPage from "./pages/EmployeesPage";

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
        <Route path="*" element={<Navigate replace={true} to="/404" />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="employees" element={<EmployeesPage />} />
      </Routes>
    </div>
  );
};

export default App;
