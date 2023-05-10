import React, { useContext } from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../store/authSlice";
import "./NavHeader.css";

const NavHeader = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authSliceActions.logout());
  };
  return (
    <div>
      <Nav className="nodarkmode">
        <div>PETH expense tracker</div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {!isLoggedIn && (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
          {isLoggedIn && (
            <Button onClick={logoutHandler} className="nav-link logout">
              Logout
            </Button>
          )}
        </div>
      </Nav>
    </div>
  );
};

export default NavHeader;
