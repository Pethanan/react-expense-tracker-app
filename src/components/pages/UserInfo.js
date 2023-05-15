import React, { useState } from "react";
import NavHeader from "../UI/NavHeader";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import "./UserInfo.css";
import EditProfile from "../user/EditProfile";
import EmailVerification from "../user/EmailVerification";
import Layout from "../UI/Layout";
import { useEffect } from "react";
import { authSliceActions } from "../../store/authSlice";

const UserInfoPage = () => {
  const darkmode = useSelector((state) => state.auth.premiumMode);

  const [editDetails, setEditDetails] = useState(false);
  const userMail = useSelector((state) => state.auth.userMail);
  const userName = useSelector((state) => state.auth.userName);
  const userURL = useSelector((state) => state.auth.userURL);
  const mailVerified = useSelector((state) => state.auth.mailVerified);

  const editHandler = () => {
    console.log("buttonclicked");
    setEditDetails(true);
  };

  const authToken = useSelector((state) => state.auth.authToken);
  const userDBEndpoint = userMail
    ? userMail.replace("@", "").replace(".", "")
    : "";

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchingUserDetails = async () => {
      try {
        const fetchedDetails = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDycBIyb5eyGiqEBkG_inxrLSalZxB0qLI",
          {
            method: "POST",
            body: JSON.stringify({ idToken: authToken }),
          }
        );
        const fetchedDetailsUsersData = await fetchedDetails.json();
        const usersData = fetchedDetailsUsersData.users[0];

        const editPayload = {
          userName: usersData.displayName,
          userURL: usersData.photoUrl,
        };

        console.log(editPayload);
        console.log(editPayload);

        dispatch(authSliceActions.editUserDetails(editPayload));

        localStorage.setItem("userName", JSON.stringify(usersData.displayName));
        localStorage.setItem("userURL", JSON.stringify(usersData.photoUrl));

        console.log(editPayload);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchingUserDetails();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Layout></Layout>
      {!editDetails && (
        <Container
          className={`${
            darkmode
              ? "user-info--container-out dark-mode"
              : "user-info--container-out"
          }`}
        >
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
        <Container
          style={{ position: "relative" }}
          className=" edit user-info--container-out"
        >
          <div className="user-info--container edit">
            <EditProfile />
            <button onClick={() => setEditDetails(false)}>
              Go Back to User Details
            </button>
          </div>
        </Container>
      )}
    </div>
  );
};

export default UserInfoPage;
