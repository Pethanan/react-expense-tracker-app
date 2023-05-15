import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import AuthCtx from "../../store/auth-ctx";
import { useDispatch, useSelector } from "react-redux";
import NavHeader from "../UI/NavHeader";
import { authSliceActions } from "../../store/authSlice";
import axios from "axios";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const userMail = useSelector((state) => state.auth.userMail);
  const userDBEndpoint = userMail.replace("@", "").replace(".", "");
  const authToken = useSelector((state) => state.auth.authToken);

  const mailVerificationHandler = async () => {
    const fetchMailVerification = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDycBIyb5eyGiqEBkG_inxrLSalZxB0qLI",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authToken,
        }),
      }
    );

    const VerificationResponse = await fetchMailVerification.json();
    console.log(VerificationResponse);

    const postMailVerificationStatus = await axios.post(
      `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/mailVerfication.json`,
      { mailVerfication: true }
    );
    const fetchedData = postMailVerificationStatus.data;

    if (fetchedData) {
      dispatch(authSliceActions.emailVerifiedUpdate(true));
    }
  };

  return (
    <div>
      <Button onClick={mailVerificationHandler}>Verify yoyr email id</Button>
    </div>
  );
};

export default EmailVerification;
