import React, { useContext, useEffect } from "react";
import { Button, CloseButton, Col, Container, Row } from "react-bootstrap";
import ExpensesCtx from "../../store/expenses-ctx";
import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { expensesActions } from "../../store/expensesSlice";
import "./Expenses.css";
import { useState } from "react";
import ExpensesFilter from "./ExpensesFilter";
import Chart from "../chart/Chart";
import { authSliceActions } from "../../store/authSlice";

const Expenses = () => {
  const userMail = useSelector((state) => state.auth.userMail);
  const selectedYear = useSelector((state) => state.selectedYear.selectedYear);
  const userDBEndpoint = userMail.replace("@", "").replace(".", "");
  const premiumMode = useSelector((state) => state.auth.premiumMode);

  const items = useSelector((state) => state.expenses.items);
  const expenseItems = items.map((item) => {
    return { ...item, date: new Date(item.date) };
  });

  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const dispatch = useDispatch();

  const filteredExpenses = expenseItems.filter((expense) => {
    return expense.date.getFullYear().toString() === selectedYear;
  });
  console.log(expenseItems);

  console.log(filteredExpenses);
  // const expenseItemsList = expenseItems.map((item) => (
  //   <ExpenseItem key={item.name} item={item}></ExpenseItem>
  // ));
  const filteredExpenseItemsList = filteredExpenses.map((item) => (
    <ExpenseItem key={item.name} item={item}></ExpenseItem>
  ));

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDataResponse = await axios.get(
        `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/expenses.json`
      );
      const fetchedData = fetchedDataResponse.data;

      console.log(fetchedData);
      console.log(fetchedData);
      console.log(fetchedData);

      let fetchedDataArray = [];
      Object.keys(fetchedData).forEach((name) => {
        const elementObject = {
          ...fetchedData[name],
          amount: +fetchedData[name].amount,
          name: name,
        };
        fetchedDataArray.push(elementObject);
      });
      console.log(fetchedDataArray);
      if (fetchedDataArray.length > 0)
        dispatch(expensesActions.retrieveExpenses(fetchedDataArray));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPremiumUserInfo = async () => {
      const premiumUserInfo = await axios.get(
        `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/premiumUser.json`
      );
      const premiumUserInfoData = premiumUserInfo.data;

      console.log(premiumUserInfoData);
      dispatch(
        authSliceActions.activatePremiumMode(premiumUserInfoData.premiumUser)
      );
    };

    fetchPremiumUserInfo();
  });

  const premiumModeActivateHandler = async () => {
    const postPemiumUserInfo = await axios.put(
      `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/premiumUserInfo.json`,
      { premiumUser: true }
    );
    const postPemiumUserInfoResponseData = postPemiumUserInfo.data;
    dispatch(authSliceActions.activatePremiumMode(true));
  };

  return (
    <div>
      <div className="expenses">
        <ExpensesFilter />
        <div>{filteredExpenseItemsList}</div>
      </div>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          margin: "0 0",
          padding: "2rem 0",
          width: "40%",
          left: "50%",
          marginLeft: "3rem",
        }}
      >
        <h4>
          Total Spent Amount: INR.{" "}
          <span
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            {totalAmount}
          </span>
        </h4>
        {totalAmount >= 10000 && (
          <Button onClick={premiumModeActivateHandler}>Activate Premium</Button>
        )}
      </section>
    </div>
  );
};

export default Expenses;
