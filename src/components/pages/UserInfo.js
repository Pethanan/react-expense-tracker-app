import React, { useState } from "react";
import NavHeader from "../UI/NavHeader";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import "./UserInfo.css";
import EditProfile from "../user/EditProfile";
import EmailVerification from "../user/EmailVerification";

const UserInfoPage = () => {
  const [editDetails, setEditDetails] = useState(false);
  const userMail = useSelector((state) => state.auth.userMail);
  const userName = useSelector((state) => state.auth.userName);
  const userURL = useSelector((state) => state.auth.userURL);
  const mailVerified = useSelector((state) => state.auth.mailVerified);

  const editHandler = () => {
    console.log("buttonclicked");
    setEditDetails(true);
  };

  return (
    <>
      <NavHeader></NavHeader>
      {!editDetails && (
        <Container className="user-info--container-out">
          <div className="user-info--container">
            <p className="user-info-item">User Name:</p>
            <p className="user-info-item">{userName}</p>
            <p className="user-info-item">E-mail ID:</p>
            <p className="user-info-item">{userMail}</p>
            <p className="user-info-item">E-mail Verification:</p>
            <p className="user-info-item">
              {mailVerified ? "Completed" : "Not Verified, pending"}
            </p>
            <p className="user-info-item">URL:</p>
            <p className="user-info-item">{userURL}</p>
            <button onClick={editHandler}>Edit</button>
            {!mailVerified && <EmailVerification />}
          </div>
        </Container>
      )}
      {editDetails && (
        <Container className="user-info--container-out edit">
          <div className="user-info--container edit">
            <EditProfile />
            <button onClick={() => setEditDetails(false)}>
              Go Back to User Details
            </button>
          </div>
        </Container>
      )}
    </>
  );
};

export default UserInfoPage;
