import React from "react";

import ChartBar from "./ChartBar";
import "./Chart.css";
import { useSelector } from "react-redux";
import ExpensesFilter from "../Expenses/ExpensesFilter";
import { Container } from "react-bootstrap";

const Chart = (props) => {
  const selectedYear = useSelector((state) => state.selectedYear.selectedYear);
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  const expenseItems = useSelector((state) => state.expenses.items);
  console.log(expenseItems);
  console.log(expenseItems);
  console.log(expenseItems);
  console.log(expenseItems);

  const expenseItemsWithDates = expenseItems.map((expense) => {
    return { ...expense, date: new Date(expense.date) };
  });

  const filteredexpenseItems = expenseItemsWithDates.filter((expense) => {
    return expense.date.getFullYear().toString() === selectedYear;
  });
  console.log(filteredexpenseItems);
  console.log(filteredexpenseItems);
  console.log(filteredexpenseItems);
  console.log(filteredexpenseItems);
  console.log(filteredexpenseItems);

  let sum;

  if (filteredexpenseItems) {
    for (const expense of filteredexpenseItems) {
      const expenseMonth = expense.date.getMonth(); // starting at 0 => January => 0
      chartDataPoints[expenseMonth].value += expense.amount;
    }

    const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);

    sum = dataPointValues.reduce((total, num) => total + Math.round(num), 0);
  } else {
    return <p>No expense Added for the selected year !</p>;
  }

  return (
    <Container className="chart-container">
      <Container className="header-container">
        <header>Expense Analaysis</header>
      </Container>
      <ExpensesFilter />
      <div className="chart">
        {chartDataPoints.map((dataPoint) => (
          <ChartBar
            key={dataPoint.label}
            value={dataPoint.value}
            totalValue={sum}
            label={dataPoint.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Chart;
