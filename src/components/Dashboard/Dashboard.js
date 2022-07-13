import Badge from "../Badge/Badge";
import OldTable from "../Table/OldTable";
import StatusCard from "../Status-Card/StatusCard";
import { useEffect, useState, useContext } from "react";
import BusinessContext from "../../store/business-context";

const activityStatus = {
  urgente: "warning",
  nuevo: "success",
  default: "default"
};

const renderActivityBody = (item, index) => (
  <tr key={index}>
    <td>{item.text}</td>
    <td style={{ textAlign: "right" }}>
      <Badge type="warning" content={item.date.toLocaleString("es-DO")} />
    </td>
  </tr>
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const businessContext = useContext(BusinessContext);
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [pendingAppointmentsDetails, setPendingAppointmentsDetails] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState(0);
  const [appliedVaccines, setAppliedVaccines] = useState(0);

  const fetchCompletedAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_NOTIPET_API_URL}/dashboard/appointmentcompleted/${businessContext.id}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        setCompletedAppointments(jsonResponse?.data?.length ?? 0);
      } else {
        throw new Error(`Error ${response.status}: Ha ocurrido un error en el proceso.`);
      }
    } catch (error) {
      // setError({ message: error.message });
    }
    setIsLoading(false);
  };

  const fetchPendingAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_NOTIPET_API_URL}/dashboard/appointmentpending/${businessContext.id}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        setPendingAppointmentsDetails(jsonResponse?.data ?? []);
        setPendingAppointments(jsonResponse?.data?.length ?? 0);
      } else {
        throw new Error(`Error ${response.status}: Ha ocurrido un error en el proceso.`);
      }
    } catch (error) {
      // setError({ message: error.message });
    }
    setIsLoading(false);
  };

  const fetchAppliedVaccines = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_NOTIPET_API_URL}/dashboard/appliedvaccines/${businessContext.id}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        setAppliedVaccines(jsonResponse?.data?.length ?? 0);
      } else {
        throw new Error(`Error ${response.status}: Ha ocurrido un error en el proceso.`);
      }
    } catch (error) {
      console.log("oops");
    }
    setIsLoading(false);
  };

  const fetchDashboardInfo = async () => {
    fetchAppliedVaccines();
    fetchPendingAppointments();
    fetchCompletedAppointments();
  };

  useEffect(() => {
    fetchDashboardInfo();
  }, []);

  let bodyData = pendingAppointmentsDetails.map((appointment) => {
    return {
      text: appointment.id,
      status: activityStatus.default,
      date: new Date(appointment.date)
    };
  });
  bodyData.sort((a, b) => {
    return new Number(a.date) - new Number(b.date);
  });
  console.log(bodyData);
  return (
    <>
      <h2 className="page-header"></h2>
      {isLoading}
      <div className="row">
        <div className="col-12" style={{ margin: "0 auto", width: "92%" }}>
          <div className="row">
            <div className="col-4">
              <StatusCard
                icon="bx bx-calendar-check"
                count={completedAppointments}
                title="Citas completadas"
              />
            </div>
            <div className="col-4-1">
              <StatusCard
                icon="bx bx-calendar-x"
                count={pendingAppointments}
                title="Citas pendientes"
              />
            </div>
            <div className="col-4-2">
              <StatusCard
                icon="bx bxs-eyedropper"
                count={appliedVaccines}
                title="Vacunas aplicadas"
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>Citas pendientes</h3>
            </div>
            <div className="card__body">
              <OldTable
                limit={5}
                bodyData={bodyData}
                renderBody={(item, index) => renderActivityBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
