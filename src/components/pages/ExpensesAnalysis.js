import React from "react";
import Chart from "../chart/Chart";
import Layout from "../UI/Layout";

const ExpensesAnalysisPage = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Layout></Layout>
      <Chart />
    </div>
  );
};

export default ExpensesAnalysisPage;
