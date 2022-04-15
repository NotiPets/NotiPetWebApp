import React, { useEffect, useMemo, useState, useContext } from "react";
import UserContext from "../store/user-context";
import Table from "../components/Table/Table";
import Layout from "../components/Layout/Layout";
import RowOptions from "../components/Table/RowOptions";
import spinner from "../assets/Images/spinner.gif";
import EmployeeModal from "../components/Employees/EmployeeModal";

const Employees = () => {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "number"
      },
      {
        Header: "Código",
        accessor: "id"
      },
      {
        Header: "Nombre",
        accessor: "name"
      },
      {
        Header: "Fecha registro",
        accessor: "date"
      },
      {
        Header: "Rol",
        accessor: "role"
      },
      {
        Header: "Dirección",
        accessor: "address"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Teléfono",
        accessor: "phone"
      },
      {
        Header: "Opciones",
        accessor: "options"
      }
    ],
    []
  );

  const userContext = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [currentEmployeeUsername, setCurrentEmployeeUsername] = useState(null);

  const editEmployeeHandler = (username) => {
    setCurrentEmployeeUsername(username);
    setShowEditEmployee(true);
  };

  const viewEmployeeDetailsHandler = (username) => {
    setCurrentEmployeeUsername(username);
    setShowEmployeeDetails(true);
  };

  const closeModalHandler = () => {
    setShowEmployeeDetails(false);
    setShowEditEmployee(false);
  };

  const mapEmployeesData = (employeesData) => {
    return employeesData.map((employee, index) => {
      let role;
      switch (employee.role) {
        case 1:
          role = "Representante de ventas";
          break;
        case 2:
          role = "Administrador";
          break;
        case 3:
          role = "Especialista";
          break;
        default:
          role = "Otro";
          break;
      }
      return {
        number: index + 1,
        id: employee.id,
        username: employee.username,
        role,
        name: `${employee.names} ${employee.lastnames}`,
        date: new Date(employee.created).toLocaleDateString("es-DO"),
        address: `${employee.address1.substring(0, 16)}...`,
        email: employee.email,
        phone: employee.phone,
        options: (
          <>
            <RowOptions
              onEdit={() => editEmployeeHandler(employee.username)}
              onViewDetails={() => viewEmployeeDetailsHandler(employee.username)}
            />
          </>
        )
      };
    });
  };

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_NOTIPET_API_URL}/users/bybusiness/${userContext.businessId}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const currentBusinessEmployees = jsonResponse.data.filter((user) => +user.role !== 0);
        const employees = mapEmployeesData(currentBusinessEmployees);
        setTableData(employees);
      } else {
        throw new Error(
          `Error ${response.status}: Algo salió mal al intentar recuperar los empleados`
        );
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchEmployees();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="page-header">Empleados</h2>
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {tableData.length === 0 && !isLoading && <p>No se encontraron empleados</p>}
        {!error && tableData.length > 0 && (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table columns={columns} data={tableData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showEditEmployee && (
        <EmployeeModal
          canEdit
          username={currentEmployeeUsername}
          onClose={closeModalHandler}
          refreshTable={fetchEmployees}
        />
      )}
      {showEmployeeDetails && (
        <EmployeeModal
          canEdit={false}
          username={currentEmployeeUsername}
          onClose={closeModalHandler}
        />
      )}
    </Layout>
  );
};

export default Employees;
