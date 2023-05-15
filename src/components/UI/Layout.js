import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";
import NavHeader from "./NavHeader";
import { useSelector } from "react-redux";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const darkmode = useSelector((state) => state.auth.premiumMode);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  return (
    <div>
      <NavHeader />
      <ul className={`${!darkmode ? "sub-navbar" : "sub-navbar darkmode"}`}>
        <li className="sidebar-item">
          <NavLink to="/userIndexPage">Home</NavLink>
        </li>

        <li className="sidebar-item">
          <NavLink to="/profile/expenses-analysis">Expenses Analysis</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/profile/expenseExport">Download</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/profile/accountInfo">Account Info</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Layout;
