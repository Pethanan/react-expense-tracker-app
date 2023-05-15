import React, { useContext, useRef, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./EditProfile.css";
import NavHeader from "../UI/NavHeader";
import { authSliceActions } from "../../store/authSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const [editedInfo, setEditedInfo] = useState(false);
  const [userDetailsComplete, setUserDetailsComplete] = useState(null);
  const isPremiumActivated = useSelector((state) => state.auth.premiumMode);
  const authToken = useSelector((state) => state.auth.authToken);
  console.log(authToken);

  const fullNameRef = useRef(null);
  const profilePhotoURLRef = useRef(null);

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredFullName = fullNameRef.current.value;
    const enteredProfilePhotoURLRef = profilePhotoURLRef.current.value;
    const payloadObject = {
      idToken: authToken,
      displayName: enteredFullName,
      photoUrl: enteredProfilePhotoURLRef,
      returnSecureToken: true,
    };
    const editedResponse = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDycBIyb5eyGiqEBkG_inxrLSalZxB0qLI",
      {
        method: "POST",
        body: JSON.stringify(payloadObject),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const editedResponseData = await editedResponse.json();
    console.log(editedResponseData);

    const editPayload = {
      userName: enteredFullName,
      userURL: enteredProfilePhotoURLRef,
    };

    console.log(editPayload);
    dispatch(authSliceActions.editUserDetails(editPayload));

    profilePhotoURLRef.current.value = "";
    fullNameRef.current.value = "";
    setEditedInfo((prev) => !prev);
  };

  return (
    <div
      className={`${
        isPremiumActivated
          ? "edit-form--container darkmode"
          : "edit-form--container"
      }`}
    >
      <Form className="edit-form" onSubmit={editSubmitHandler}>
        <label>Full Name</label>
        <input type="text" ref={fullNameRef}></input>
        <label>Profile photo URL</label>
        <input type="text" ref={profilePhotoURLRef}></input>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default EditProfile;
