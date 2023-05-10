import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { Container, Button } from "react-bootstrap";

export const BackDrop = (props) => {
  return (
    <div onClick={props.signUpCloseHandler} className={classes.backdrop}></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <Container className={classes.modal}>
      <h4>Succss</h4>
      <p>{props.displayContent}</p>
      <Button
        onClick={props.signUpModalCloseHandler}
        className={classes["modal-close-btn"]}
      >
        Close
      </Button>
    </Container>
  );
};

const modalElement = document.getElementById("signup-overlay");
const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay
          signUpModalCloseHandler={props.signUpModalCloseHandler}
          displayContent={props.displayContent}
        >
          {props.children}
        </ModalOverlay>,
        modalElement
      )}
      {ReactDOM.createPortal(
        <BackDrop
          signUpModalCloseHandler={props.signUpModalCloseHandler}
        ></BackDrop>,
        modalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
