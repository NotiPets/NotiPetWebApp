import Badge from "../Badge/Badge";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import OldTable from "../Table/OldTable";
import { useSelector } from "react-redux";
import StatusCard from "../Status-Card/StatusCard";
import { useEffect, useState, useContext } from "react";
import BusinessContext from "../../store/business-context";
import inboxList from "../../assets/JsonData/inbox-list.json";
import recentActivity from "../../assets/JsonData/recent-activity.json";

const chartOptions = {
  series: [
    {
      name: "Citas ayer",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60, 100]
    },
    {
      name: "Citas hoy",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
    }
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    legend: {
      position: "top"
    },
    grid: {
      show: false
    }
  }
};

const activityStatus = {
  urgente: "warning",
  nuevo: "success",
  default: "default"
};

const renderInboxBody = (item, index) => (
  <tr key={index}>
    <td>{item.message}</td>
    <td>{item.time}</td>
  </tr>
);

const renderActivityBody = (item, index) => (
  <tr key={index}>
    <td>{item.text}</td>
    <td style={{ textAlign: "right" }}>
      <Badge type={activityStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const businessContext = useContext(BusinessContext);
  const [pendingAppointments, setPendingAppointments] = useState(0);
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
      setError({ message: error.message });
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
        setPendingAppointments(jsonResponse?.data?.length ?? 0);
      } else {
        throw new Error(`Error ${response.status}: Ha ocurrido un error en el proceso.`);
      }
    } catch (error) {
      setError({ message: error.message });
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
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAppliedVaccines();
    fetchPendingAppointments();
    fetchCompletedAppointments();
  }, []);

  return (
    <>
      <h2 className="page-header"></h2>
      {error && <p>{error.message}</p>}
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
        <div className="col-6">
          <div className="card">
            <div className="card__header">
              <h3>Inbox</h3>
            </div>
            <div className="card__body">
              <OldTable
                bodyData={inboxList}
                renderBody={(item, index) => renderInboxBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">Ver todo</Link>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" }
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" }
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>Actividad reciente</h3>
            </div>
            <div className="card__body">
              <OldTable
                bodyData={recentActivity}
                renderBody={(item, index) => renderActivityBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">Ver todo</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
