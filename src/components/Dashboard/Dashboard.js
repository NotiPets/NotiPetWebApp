import OldTable from "../Table/OldTable";
import Badge from "../Badge/Badge";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StatusCard from "../Status-Card/StatusCard";

import inboxList from "../../assets/JsonData/inbox-list.json";
import statusCards from "../../assets/JsonData/status-card-data.json";
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

  return (
    <>
      <h2 className="page-header"></h2>
      <div className="row">
        <div className="col-12" style={{ margin: "0 auto", width: "92%" }}>
          <div className="row" style={{ width: "100%" }}>
            {statusCards.map((item, index) => (
              <div className="col-4" key={index}>
                <StatusCard icon={item.icon} count={item.count} title={item.title} />
              </div>
            ))}
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
