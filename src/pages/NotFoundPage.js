import classes from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={classes["animation-container"]}>
      <iframe
        className={classes.animation}
        src="https://embed.lottiefiles.com/animation/97881"
      ></iframe>
    </div>
  );
};

export default NotFoundPage;
