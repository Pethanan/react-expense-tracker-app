import { createSlice } from "@reduxjs/toolkit";

const initialSelectedYearState = { selectedYear: "2023" };

const selectedYearSlice = createSlice({
  name: "selectedYear",
  initialState: initialSelectedYearState,
  reducers: {
    changeSelectedYear(state, action) {
      state.selectedYear = action.payload;
    },
  },
});

export default selectedYearSlice.reducer;

export const selectedYearSliceActions = selectedYearSlice.actions;
