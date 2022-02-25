import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlay-root");

const Modal = ({ onClick, children }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={onClick} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
