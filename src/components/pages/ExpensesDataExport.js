import { Container } from "react-bootstrap";
import Layout from "../UI/Layout";

const { CSVLink } = require("react-csv");
const { useSelector } = require("react-redux");

const ExpensesDataExport = () => {
  const items = useSelector((state) => state.expenses.items);
  const headers = [
    { label: "Expense Date", key: "expensesDetails.date" },
    { label: "Expense Item", key: "expensesDetails.title" },
    { label: "Expense Amount", key: "expensesDetails.amount" },
    { label: "Expense Category", key: "expensesDetails.category" },
  ];

  const expenseItemsCopy = [...items];

  const data = expenseItemsCopy.reverse().map((item) => {
    return { expensesDetails: { ...item } };
  });

  return (
    <>
      <Layout></Layout>
      <div
        style={{
          position: "relative",
          top: "100px",
          left: "50%",
          transform: "translate(-50%)",
          padding: "1rem 2rem",
          color: "white",
          backgroundColor: "black",
          display: "inline-block",
          textDecoration: "none",
        }}
      >
        <CSVLink
          data={data}
          headers={headers}
          filename={"expenses"}
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Dowload Expenses Sheet
        </CSVLink>
      </div>
    </>
  );
};

export default ExpensesDataExport;
