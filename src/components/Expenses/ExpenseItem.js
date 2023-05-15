import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../../store/expensesSlice";
import ExpenseItemDate from "./ExpenseItemDate";
import "./ExpenseItem.css";
import { Form, FormControl } from "react-bootstrap";

const ExpenseItem = ({ item }) => {
  const dispatch = useDispatch();
  const userMail = useSelector((state) => state.auth.userMail);
  const userDBEndpoint = userMail.replaceAll(".", "").replaceAll("@", "");
  console.log();
  console.log();

  const [editForm, setEditForm] = useState(false);

  const titleRef = useRef(null);
  const amountRef = useRef(null);
  const categoryRef = useRef(null);
  const dateRef = useRef(null);

  const expensesRemoveHandler = async () => {
    try {
      const URL = `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/expenses/${item.name}.json`;
      await axios.delete(`${URL}`);
    } catch (err) {
      console.log(err.message);
    }

    dispatch(expensesActions.removeExpense(item));
  };

  const editExpenseSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredAmount = amountRef.current.value;
    const enteredCategoryRef = categoryRef.current.value;
    const enteredDate = dateRef.current.value;

    console.log(enteredDate);
    console.log(enteredDate);

    const editedData = {
      title: enteredTitle,
      amount: +enteredAmount,
      category: enteredCategoryRef,
      date: enteredDate,
    };
    const fetchExpensesDataResponse = await axios.put(
      `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/expenses/${item.name}.json`,
      editedData
    );
    console.log(editedData);
    dispatch(expensesActions.editExpense({ ...editedData, name: item.name }));

    setEditForm(false);
  };

  return (
    // <>
    //   <Row>
    //     <Col>{item.title}</Col>
    //     <Col>{item.description}</Col>
    //     <Col>{item.amount}</Col>
    //     <Col>{item.date}</Col>
    //     <Col>
    //       <Button
    //         onClick={() => {
    //           setEditForm(true);
    //         }}
    //       >
    //         Edit
    //       </Button>
    //     </Col>
    //     <Col>
    //       <Button onClick={expensesRemoveHandler}>Delete</Button>
    //     </Col>
    //   </Row>
    //   {editForm && (
    //     <Form style={{ margin: "50px 0" }} onSubmit={editExpenseSubmitHandler}>
    //       <label>Item Name</label>
    //       <input type="text" ref={titleRef} placeholder={item.title} />
    //       <label>Amount</label>
    //       <input type="number" ref={amountRef} placeholder={item.amount} />
    //       <label>Description</label>
    //       <input
    //         type="text"
    //         ref={descriptionRef}
    //         placeholder={item.description}
    //       />
    //       <label>Date</label>
    //       <input type="date" ref={dateRef} placeholder={item.date} />
    //       <Button type="submit">Submit</Button>
    //     </Form>
    //   )}
    // </>
    <>
      {!editForm && (
        <li className="expense-item--listitem">
          <div className="expense-item">
            <ExpenseItemDate date={item.date} />
            <div className="expense-item__description">
              <div className="expense-description--details">
                <h2>{item.title}</h2>
              </div>
              <div className="expense-description--details">
                <div className="expense-item__price">${item.amount}</div>
              </div>
              <div className="expense-description--details">
                <h2>{item.category}</h2>
              </div>
              <button
                className="edit-btn button"
                onClick={(e) => {
                  setEditForm(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={expensesRemoveHandler}
                className="delete-btn button"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      )}
      {editForm && (
        <li className="expense-item--listitem">
          <Form onSubmit={editExpenseSubmitHandler}>
            <div className="expense-item">
              <div style={{ width: "140px" }}>
                <FormControl
                  ref={dateRef}
                  style={{ width: "100%" }}
                  type="date"
                />
              </div>
              <div className="expense-item__description">
                <div className="expense-description--details">
                  <h2>
                    <FormControl
                      type="text"
                      placeholder={item.title}
                      ref={titleRef}
                    />
                  </h2>
                </div>
                <div className="expense-description--details">
                  <input
                    ref={amountRef}
                    className="expense-item__price"
                    type="number"
                    placeholder={item.amount}
                  />
                </div>
                <div className="expense-description--details">
                  <h2>
                    <FormControl
                      ref={categoryRef}
                      type="text"
                      placeholder={item.category}
                    />
                  </h2>
                </div>
                <button
                  type="submit"
                  onClick={editExpenseSubmitHandler}
                  className="edit-btn button"
                >
                  Submit
                </button>
                <button
                  className="delete-btn button"
                  onClick={(e) => {
                    setEditForm(true);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        </li>
      )}
    </>
  );
};

export default ExpenseItem;
