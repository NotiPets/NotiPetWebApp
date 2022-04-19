import React, { useEffect, useMemo, useState, useContext } from "react";
import Table from "../components/Table/Table";
import Layout from "../components/Layout/Layout";
import RowOptions from "../components/Table/RowOptions";
import spinner from "../assets/Images/spinner.gif";
import AppointmentModal from "../components/Appointments/AppointmentModal";
import BusinessContext from "../store/business-context";

const AppointmentsPage = () => {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "number"
      },
      {
        Header: "Estado",
        accessor: "status"
      },
      {
        Header: "Código",
        accessor: "id"
      },
      {
        Header: "Especialista",
        accessor: "specialist"
      },
      {
        Header: "Especialidad",
        accessor: "specialty"
      },
      {
        Header: "Urgencia",
        accessor: "urgency"
      },
      {
        Header: "Fecha",
        accessor: "date"
      },
      {
        Header: "Opciones",
        accessor: "options"
      }
    ],
    []
  );

  const businessContext = useContext(BusinessContext);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditAppointment, setShowEditAppointment] = useState(false);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState("");
  const [currentAppointmentData, setCurrentAppointmentData] = useState({});

  const editAppointmentHandler = (id, data) => {
    setCurrentAppointmentId(id);
    setCurrentAppointmentData(data);
    setShowEditAppointment(true);
  };

  const viewAppointmentDetailsHandler = (id, data) => {
    setCurrentAppointmentId(id);
    setCurrentAppointmentData(data);
    setShowAppointmentDetails(true);
  };

  const closeModalHandler = () => {
    setShowAppointmentDetails(false);
    setShowEditAppointment(false);
  };

  const mapAppointmentsData = (appointmentsData) => {
    return appointmentsData.map((appointment, index) => {
      let status;
      switch (appointment?.appointment?.appointmentStatus) {
        case 0:
          status = "Solicitada";
          break;
        case 1:
          status = "Aceptada";
          break;
        case 2:
          status = "Cancelada";
          break;
        case 3:
          status = "Completada";
          break;
        case 4:
          status = "Negada";
          break;
        default:
          status = "Solicitada";
          break;
      }
      return {
        // TODO: Datos del cliente y la mascota
        number: index + 1,
        id: appointment?.appointment?.id,
        status,
        specialist: appointment?.appointment?.specialistId ?? "Sin asignar",
        specialty: appointment?.appointment?.specialist?.speciality?.name ?? "Sin asignar",
        urgency: appointment?.appointment?.isEmergency ? "Alta" : "Normal",
        date: new Date(appointment?.appointment?.date).toLocaleDateString("es-DO"),
        options: (
          <RowOptions
            onEdit={() => editAppointmentHandler(appointment.appointment.id, appointment)}
            onViewDetails={() =>
              viewAppointmentDetailsHandler(appointment.appointment.id, appointment)
            }
          />
        )
      };
    });
  };

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_NOTIPET_API_URL}/appointments/bybusiness/${businessContext.id}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const appointments = mapAppointmentsData(jsonResponse.data);
        setTableData(appointments);
      } else {
        throw new Error(`Error ${response.status}: Algo salió mal al intentar recuperar las citas`);
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchAppointments();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="page-header">Citas</h2>
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {tableData.length === 0 && !isLoading && <p>No se encontraron citas</p>}
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
      {showEditAppointment && (
        <AppointmentModal
          canEdit
          id={currentAppointmentId}
          appointmentData={currentAppointmentData}
          username={currentAppointmentId}
          onClose={closeModalHandler}
          refreshTable={fetchAppointments}
        />
      )}
      {showAppointmentDetails && (
        <AppointmentModal
          canEdit={false}
          id={currentAppointmentId}
          appointmentData={currentAppointmentData}
          onClose={closeModalHandler}
        />
      )}
    </Layout>
  );
};

export default AppointmentsPage;
