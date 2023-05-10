import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";
import NavHeader from "./NavHeader";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  return (
    <div>
      <NavHeader />
      <div className="menu-icon--container">
        <span>Menu</span>
        <div div className="menu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="white"
            className="w-6 h-6 sidebar-toggler iconItem"
            onClick={toggleSidebar}
            style={{ backgroundColor: "blue" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>

      <ul className={sidebar ? "sidebar sidebar--open" : "sidebar"}>
        <li className="sidebar-item">
          <NavLink to="/profile/accountInfo">Account Info</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/profile/edit">Edit Profile Info</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/profile/expenses">Expenses</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/profile/expenses-analysis">Expenses Analysis</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Layout;
