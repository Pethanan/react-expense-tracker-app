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

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const expenseItems = useSelector((state) => state.expenses.items);

  return (
    <div className="dark-mode">
      <Layout />
      <NewExpenseForm />
      <Expenses />
    </div>
  );
};

export default UserHomePage;
