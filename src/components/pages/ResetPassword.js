import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import Layout from "../UI/Layout";

const ResetPasswordPage = () => {
  const mailRef = useRef(null);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    console.log("entered to right page");
    const enteredUserMail = mailRef.current.value;
    const resetPasswordResponse = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAQwHgTNV3DUHtjPgoYEx5Z_n0DfzO2NXo",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredUserMail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resetPasswordResponseData = resetPasswordResponse.json();
    console.log(resetPasswordResponseData);
  };
  return (
    <>
      <Layout />
      <Form
        onSubmit={forgotPasswordHandler}
        style={{ margin: "0 auto", marginTop: "200px", width: "600px" }}
      >
        <Form.Label>Enter Email ID</Form.Label>
        <Form.Control
          placeholder="email id"
          type="mail"
          ref={mailRef}
        ></Form.Control>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default ResetPasswordPage;
