import React, { useRef, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Modal from "../UI/Modal";
import classes from "./SignupForm.js.module.css";
import { authSliceActions } from "../../store/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const dispatch = useDispatch();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isConfirmPwdValid, setIsConfirmPwdValid] = useState(false);

  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  const confirmPwdRef = useRef(null);

  const authFormSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const userDBEndpoint = enteredEmail.replace("@", "").replace(".", "");

    const enteredPwd = pwdRef.current.value;
    console.log(enteredPwd);

    const enteredConfirmPwd = confirmPwdRef.current.value;

    if (
      enteredEmail.length > 0 &&
      enteredEmail.includes("@") &&
      enteredConfirmPwd === enteredPwd &&
      enteredPwd.length > 6
    ) {
      setIsEmailValid(true);
      setIsPwdValid(true);
      setIsConfirmPwdValid(true);

      try {
        const authResponse = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQwHgTNV3DUHtjPgoYEx5Z_n0DfzO2NXo",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPwd,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const signupAuthResponse = await authResponse.json();
        const idToken = !!signupAuthResponse.idToken;
        console.log(idToken);
        if (idToken) {
          const postPemiumUserInfo = await axios.post(
            `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/premiumUserInfo.json`,
            { premiumUser: false }
          );
          const postPemiumUserInfoResponseData = postPemiumUserInfo.data;
          dispatch(authSliceActions.activatePremiumMode(false));

          setOpenSignUpModal(true);
          setTimeout(() => {
            setOpenSignUpModal(false);
            setSignupSuccess(true);
          }, 5000);
        }
      } catch (err) {
        alert("Sign up was not success, pls try again");
      }
    } else {
      if (isEmailValid) {
        alert("Enter valid email");
      }
      if (isPwdValid) {
        alert("Enter valid password");
      }
    }
    emailRef.current.value = "";
    pwdRef.current.value = "";
    confirmPwdRef.current.value = "";
  };

  const signUpModalCloseHandler = () => {
    console.log("modal closer clicked");
    setOpenSignUpModal(false);
  };

  return (
    <>
      {!signupSuccess && (
        <Container>
          <div className={classes.cover}>
            <div
              className={classes["signup-form-container"]}
              style={{ color: "black" }}
            >
              <h5
                style={{
                  marginTop: "0 auto",
                  textAlign: "center",
                  marginBottom: "65px",
                  fontWeight: "bolder",
                }}
              >
                Create New Account/ Signup
              </h5>
              <Form onSubmit={authFormSubmitHandler}>
                <Row className={classes["form-elements"]}>
                  <Col>
                    <Form.Label style={{ color: "black" }}>Email id</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="mail"
                      placeholder="email"
                      ref={emailRef}
                      required
                    />
                  </Col>
                </Row>
                <Row className={classes["form-elements"]}>
                  <Col>
                    <Form.Label style={{ color: "black" }}>
                      Create Password
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      ref={pwdRef}
                      required
                    />
                  </Col>
                </Row>
                <Row className={classes["form-elements"]}>
                  <Col>
                    <Form.Label style={{ color: "black" }}>
                      Confirm Password
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="password"
                      placeholder="re-enter password"
                      required
                      ref={confirmPwdRef}
                    />
                  </Col>
                </Row>
                <div className={classes.btnrow}>
                  <button
                    type="submit"
                    className={classes["signup-submit-btn"]}
                  >
                    Submit
                  </button>
                </div>
              </Form>
              <Link
                to="/login"
                style={{
                  color: "black",
                  width: "600px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px 15px",
                }}
                className={classes["login-redirect"]}
              >
                Login here, if you already have an account
              </Link>
            </div>
          </div>
          <div>
            {openSignUpModal && (
              <Modal signUpModalCloseHandler={signUpModalCloseHandler}></Modal>
            )}
          </div>
        </Container>
      )}
      {signupSuccess && (
        <div className={classes["login-link-container"]}>
          <b className={classes["login-link"]}>
            Signup was success ! Click here to <Link to="/login">Login</Link>
          </b>
        </div>
      )}
    </>
  );
};

export default SignupForm;
