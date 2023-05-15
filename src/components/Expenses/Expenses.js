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
  const darkmode = useSelector((state) => state.auth.premiumMode);

  const selectedYear = useSelector((state) => state.selectedYear.selectedYear);
  const userDBEndpoint = userMail.replaceAll("@", "").replaceAll(".", "");
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

  const expensesSelectedYear = filteredExpenses.reduce(
    (total, expenseItem) => total + expenseItem.amount,
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDataResponse = await axios.get(
          `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/expenses.json`
        );
        const fetchedData = fetchedDataResponse.data;
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
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPremiumUserInfo = async () => {
      try {
        const premiumUserInfo = await axios.get(
          `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/premiumUserInfo.json`
        );
        const premiumUserInfoData = premiumUserInfo.data;

        console.log(premiumUserInfoData);
        console.log(premiumUserInfoData);
        console.log(premiumUserInfoData);
        if (premiumUserInfoData.premiumUser) {
          dispatch(
            authSliceActions.activatePremiumMode(
              premiumUserInfoData.premiumUser
            )
          );
          localStorage.setItem("premiumMode", "true");
        }

        localStorage.setItem("premiumMode", premiumUserInfoData.premiumUser);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPremiumUserInfo();
  });

  const premiumModeActivateHandler = async () => {
    try {
      const postPemiumUserInfo = await axios.put(
        `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/premiumUserInfo.json`,
        { premiumUser: true }
      );
      const postPemiumUserInfoResponseData = postPemiumUserInfo.data;
      console.log(postPemiumUserInfoResponseData);
      dispatch(authSliceActions.activatePremiumMode(true));
      localStorage.setItem(
        "premiumMode",
        postPemiumUserInfoResponseData.premiumUser
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={`${darkmode ? "darkmode" : ""}`}>
      <div className={`${darkmode ? "expenses darkmode" : "expenses"}`}>
        <ExpensesFilter />
        <div>{filteredExpenseItemsList}</div>
      </div>
      <section
        className={`${
          darkmode ? "footer-container darkmode" : "footer-container"
        }`}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 0",
          padding: "2rem 0",
          width: "80%",
          left: "50%",
          marginLeft: "3rem",
        }}
      >
        <div style={{ margin: "30px 0" }}>
          <h4>
            Total Spent Amount at {selectedYear}:
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "4px",
                backgroundColor: "yellow",
                color: "darkblue",
                marginLeft: "20px",
              }}
            >
              $.{expensesSelectedYear}
            </span>
          </h4>
        </div>
        <div>
          <h4>
            Total Spent Amount:{" "}
            <span
              style={{
                padding: "5px 10px",
                borderRadius: "4px",
                backgroundColor: "yellow",
                color: "darkblue",
                marginLeft: "20px",
              }}
            >
              $.{totalAmount}
            </span>
          </h4>
        </div>
        {totalAmount >= 10000 && !darkmode && (
          <div style={{ marginTop: "20px" }}>
            <Button variant="warning" onClick={premiumModeActivateHandler}>
              Activate Premium
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Expenses;
