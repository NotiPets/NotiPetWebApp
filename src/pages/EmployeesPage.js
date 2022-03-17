import React from "react";
import Table from "../components/Table/Table";
import Layout from "../components/Layout/Layout";
import customerList from "../assets/JsonData/customers-list.json";

const customerTableHead = [
  "#",
  "Código",
  "Cliente",
  "Fecha registro",
  "Dirección",
  "Email",
  "Teléfono",
  "Monto",
  "Opciones"
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.customerCode}</td>
    <td>{item.name}</td>
    <td>{item.registrationDate}</td>
    <td>{item.location}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.amount}</td>
  </tr>
);

const Employees = () => {
  return (
    <Layout>
      <div>
        <h2 className="page-header">Empleados</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={customerList}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Employees;
