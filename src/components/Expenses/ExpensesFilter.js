import React from "react";

import "./ExpensesFilter.css";
import { useDispatch } from "react-redux";
import { selectedYearSliceActions } from "../../store/selectedYearSlice";
import { useState } from "react";

const ExpensesFilter = (props) => {
  const dispatch = useDispatch();

  const dropdownChangeHandler = (event) => {
    dispatch(selectedYearSliceActions.changeSelectedYear(event.target.value));
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select onChange={dropdownChangeHandler}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2019">2018</option>
          <option value="2019">2017</option>
          <option value="2019">2016</option>
          <option value="2019">2015</option>
          <option value="2019">2014</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
