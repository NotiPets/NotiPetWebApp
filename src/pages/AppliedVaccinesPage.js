import React, { useEffect, useMemo, useState, useContext } from "react";
import UserContext from "../store/user-context";
import Table from "../components/Table/Table";
import Layout from "../components/Layout/Layout";
import RowOptions from "../components/Table/RowOptions";
import spinner from "../assets/Images/spinner.gif";
import AppliedVaccineModal from "../components/AppliedVaccines/AppliedVaccinesModal";

const AppliedVaccinesPage = () => {
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
        accessor: "vaccineName"
      },
      {
        Header: "Fecha de aplicación",
        accessor: "date"
      },
      {
        Header: "Mascota",
        accessor: "petName"
      },
      {
        Header: "Aplicada por",
        accessor: "userName"
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
  const [showAppliedVaccineDetails, setShowAppliedVaccineDetails] = useState(false);
  const [currentAppliedVaccineId, setCurrentAppliedVaccineId] = useState(null);
  const [currentAppliedVaccine, setCurrentAppliedVaccine] = useState({});

  const viewAppliedVaccineDetailsHandler = (id, appliedVaccine) => {
    setCurrentAppliedVaccineId(id);
    setCurrentAppliedVaccine(appliedVaccine);
    setShowAppliedVaccineDetails(true);
  };

  const closeModalHandler = () => {
    setShowAppliedVaccineDetails(false);
  };

  const mapAppliedVaccinesData = (appliedVaccinesData) => {
    return appliedVaccinesData.map((appliedVaccine, index) => {
      console.log(appliedVaccine);
      return {
        number: index + 1,
        id: appliedVaccine.id,
        vaccineName: appliedVaccine.vaccine.vaccineName,
        date: new Date(appliedVaccine.date).toLocaleDateString("es-DO"),
        petName: appliedVaccine.pet.name,
        phone: appliedVaccine.phone,
        userName: appliedVaccine.user.names + " " + appliedVaccine.user.lastnames,
        options: (
          <>
            <RowOptions
              onViewDetails={() =>
                viewAppliedVaccineDetailsHandler(appliedVaccine.id, appliedVaccine)
              }
            />
          </>
        )
      };
    });
  };

  const fetchAppliedVaccines = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_NOTIPET_API_URL}/digitalvaccine/bybusinessid/${userContext.businessId}?itemCount=1000&page=1` // lol
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const appliedVaccines = mapAppliedVaccinesData(jsonResponse.data.vaccines);
        setTableData(appliedVaccines);
      } else {
        throw new Error(
          `Error ${response.status}: Algo salió mal al intentar recuperar las vacunas aplicadas`
        );
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchAppliedVaccines();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="page-header">Vacunas aplicadas</h2>
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {tableData.length === 0 && !isLoading && <p>No se encontraron vacunas aplicadas</p>}
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
      {showAppliedVaccineDetails && (
        <AppliedVaccineModal
          canEdit={false}
          appliedVaccineId={currentAppliedVaccineId}
          appliedVaccine={currentAppliedVaccine}
          onClose={closeModalHandler}
        />
      )}
    </Layout>
  );
};

export default AppliedVaccinesPage;
