import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={classes["animation-container"]}>
      <iframe
        className={classes.animation}
        src="https://embed.lottiefiles.com/animation/44190"
      ></iframe>
    </div>
  );
};

export default Dashboard;
