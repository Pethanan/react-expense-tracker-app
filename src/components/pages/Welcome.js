import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Welcome.module.css";

const WelcomePage = () => {
  return (
    <Container className={classes["container-out"]}>
      <Container className={classes["home-container"]}>
        <h1>Welcome to the App!</h1>
        <Link to="/login" className={classes["home-link"]}>
          Click to Login
        </Link>
        <Link to="/signup" className={classes["home-link"]}>
          Click to Signup
        </Link>
      </Container>
    </Container>
  );
};

export default WelcomePage;
