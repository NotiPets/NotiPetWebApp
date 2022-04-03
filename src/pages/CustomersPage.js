import React, { useMemo } from "react";
import Table from "../components/Table/Table";
import Layout from "../components/Layout/Layout";

const Customers = () => {
  const data = useMemo(
    () => [
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      },
      {
        number: "1",
        id: "3FGS2",
        date: "Marzo 31, 2022",
        address: "Juan Isidro Ortega",
        email: "kev@gmail.com",
        phone: "8092321180",
        options: ""
      }
    ],
    []
  );

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
  return (
    <Layout>
      <div>
        <h2 className="page-header">Clientes</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <Table columns={columns} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
