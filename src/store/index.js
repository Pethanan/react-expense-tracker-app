import expensesReducer from "./expensesSlice";
import authReducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
import selectedYearReducer from "./selectedYearSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    selectedYear: selectedYearReducer,
    auth: authReducer,
  },
});

export default store;
