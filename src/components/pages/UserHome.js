import React from "react";
import AddedExpenses from "../Expenses/Expenses";
import NavHeader from "../UI/NavHeader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewExpenseForm from "../Expenses/NewExpenseForm";
import Expenses from "../Expenses/Expenses";
import { authSliceActions } from "../../store/authSlice";
import { useEffect } from "react";
import Layout from "../UI/Layout";
import axios from "axios";

const UserHomePage = () => {
  const authToken = useSelector((state) => state.auth.authToken);
  const userMail = useSelector((state) => state.auth.userMail);
  const userDBEndpoint = userMail.replace("@", "").replace(".", "");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchingUserDetails = async () => {
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
        mailVerified: usersData.emailVerified,
        userName: usersData.displayName,
        userURL: usersData.photoUrl,
      };
      console.log(editPayload);
      console.log(editPayload);
      console.log(editPayload);

      dispatch(authSliceActions.editUserDetails(editPayload));
    };
    fetchingUserDetails();
  }, []);

  useEffect(() => {
    const reponseForMailVerificationData = axios.get(
      `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/mailVerfication.json`
    );
    console.log(reponseForMailVerificationData.data);

    dispatch(
      authSliceActions.emailVerifiedUpdate(reponseForMailVerificationData.data)
    );
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const expenseItems = useSelector((state) => state.expenses.items);

  return (
    <>
      <Layout />
      <NewExpenseForm />
      <Expenses />
    </>
  );
};

export default UserHomePage;
