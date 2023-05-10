// import axios from "axios";
// import React, { useReducer, useEffect } from "react";

// const ExpensesCtx = React.createContext({
//   expenseItems: [],
//   totalAmount: 0,
//   addExpense: (expense) => {},
//   editExpense: (expense) => {},
//   removeExpense: (expense) => {},
// });

// const defaultExpensesState = { expenseItems: [], totalAmount: 0 };

// const expenseReducer = (state, action) => {
//   if (action.type === "ADD_EXPENSE") {
//     const updatedItems = [...state.expenseItems, action.item];

//     return { expenseItems: updatedItems };
//   }

//   if (action.type === "EDIT_EXPENSE") {
//     const toBeUpdatedItemIndex = state.expenseItems.findIndex(
//       (item) => action.item.name === item.name
//     );

//     const editedItems = [...state.expenseItems];
//     editedItems[toBeUpdatedItemIndex] = action.item;

//     return { expenseItems: editedItems };
//   }

//   if (action.type === "REMOVE_EXPENSE") {
//     const updatedExpenseItems = state.expenseItems.filter(
//       (expItem) => expItem.name !== action.item.name
//     );
//     return { expenseItems: updatedExpenseItems };
//   }
// };

// export const ExpensesCtxProvider = (props) => {
//   const URL =
//     "https://expensetracker-authentication-default-rtdb.firebaseio.com/";

//   // useEffect(() => {
//   //   const fetchExpenses = async () => {
//   //     const fetchExpensesDataResponse = await axios.get(`${URL}/expenses.json`);
//   //     const fetchedExpensesData = fetchExpensesDataResponse.data;
//   //     dispatchExpenseAction({
//   //       type: "FETCHING_EXPENSES",
//   //       items: fetchedExpensesData,
//   //     });
//   //   };
//   //   fetchExpenses();
//   // }, []);

//   const [expensesState, dispatchExpenseAction] = useReducer(
//     expenseReducer,
//     defaultExpensesState
//   );

//   const addExpenseHandler = (expense) => {
//     dispatchExpenseAction({ type: "ADD_EXPENSE", item: expense });
//   };

//   const removeExpenseHandler = async (expense) => {
//     await axios.delete(
//       `https://expensetracker-authentication-default-rtdb.firebaseio.com/expenses/${expense.namr}.json`
//     );

//     dispatchExpenseAction({ type: "REMOVE_EXPENSE", item: expense });
//   };
//   const editExpenseHandler = async (expense) => {
//     const fetchExpensesDataResponse = await axios.put(
//       `https://expensetracker-authentication-default-rtdb.firebaseio.com/expenses/${expense.name}.json`,
//       {
//         title: expense.title,
//         amount: expense.amount,
//         description: expense.description,
//         date: expense.date,
//       }
//     );

//     dispatchExpenseAction({ type: "EDIT_EXPENSE", item: expense });
//   };

//   const expensesCtxExpensesCtxValue = {
//     expenseItems: expensesState.expenseItems,
//     addExpense: addExpenseHandler,
//     editExpense: editExpenseHandler,
//     removeExpense: removeExpenseHandler,
//   };
//   return (
//     <ExpensesCtx.Provider value={expensesCtxExpensesCtxValue}>
//       {props.children}
//     </ExpensesCtx.Provider>
//   );
// };

// export default ExpensesCtx;
