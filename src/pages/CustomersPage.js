import React, { useEffect, useMemo, useState } from "react";
import Table from "../components/Table/Table";
import Layout from "../components/Layout/Layout";
import RowOptions from "../components/Table/RowOptions";
import spinner from "../assets/Images/spinner.gif";
import CustomerModal from "../components/Customers/CustomerModal";

const Customers = () => {
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

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditClient, setShowEditClient] = useState(false);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [currentClientUsername, setCurrentClientUsername] = useState(null);

  const editClientHandler = (username) => {
    setCurrentClientUsername(username);
    setShowEditClient(true);
  };

  const viewClientDetailsHandler = (username) => {
    setCurrentClientUsername(username);
    setShowClientDetails(true);
  };

  const closeModalHandler = () => {
    setShowClientDetails(false);
    setShowEditClient(false);
  };

  const mapClientsData = (clientsData) => {
    return clientsData.map((client, index) => ({
      number: index + 1,
      id: client.id,
      username: client.username,
      name: `${client.names} ${client.lastnames}`,
      date: new Date(client.created).toLocaleDateString("es-DO"),
      address: `${client.address1.substring(0, 16)}...`,
      email: client.email,
      phone: client.phone,
      options: (
        <>
          <RowOptions
            onEdit={() => editClientHandler(client.username)}
            onViewDetails={() => viewClientDetailsHandler(client.username)}
          />
        </>
      )
    }));
  };

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(`${process.env.REACT_APP_NOTIPET_API_URL}/users`);
      if (response.ok) {
        const jsonResponse = await response.json();
        const filteredClients = jsonResponse.filter((user) => user.role === 0); // client role is 0
        const clients = mapClientsData(filteredClients);
        setTableData(clients);
      } else {
        throw new Error(
          `Error ${response.status}: Algo salió mal al intentar recuperar los clientes`
        );
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchClients();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="page-header">Clientes</h2>
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {}
        {!error && (
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
      {showEditClient && (
        <CustomerModal
          canEdit
          username={currentClientUsername}
          onClose={closeModalHandler}
          refreshTable={fetchClients}
        />
      )}
      {showClientDetails && (
        <CustomerModal
          canEdit={false}
          username={currentClientUsername}
          onClose={closeModalHandler}
        />
      )}
    </Layout>
  );
};

export default Customers;
