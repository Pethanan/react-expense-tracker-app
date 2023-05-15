import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

// export const AuthCtx = React.createContext({
//   authToken: null,
//   isLoggedIn: false,
//   logout: () => {},
//   login: (token) => {},
// });

// export const AuthCtxProvider = (props) => {
//   const initialToken = localStorage.getItem("idToken");
//   const [token, setToken] = useState(initialToken);

//   const loggedIn = !!token;
//   const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

//   const loginHandler = (token) => {
//     setIsLoggedIn(true);
//     console.log("context");
//     setToken(token);
//     localStorage.setItem("idToken", token);
//   };

//   const logoutHandler = () => {
//     setIsLoggedIn(false);
//     setToken(null);
//     localStorage.removeItem("idToken");
//   };

//   const authCtxValue = {
//     isLoggedIn: isLoggedIn,
//     authToken: token,
//     login: loginHandler,
//     logout: logoutHandler,
//   };
//   return (
//     <AuthCtx.Provider value={authCtxValue}>{props.children}</AuthCtx.Provider>
//   );
// };

// export default AuthCtx;
const initialToken = localStorage.getItem("token");
const userMail = localStorage.getItem("mailId");
const userName = localStorage.getItem("userName");
const premiumMode = localStorage.getItem("premiumMode");
const userURL = localStorage.getItem("userURL");
const mailVerified = localStorage.getItem("mailVerified");

const initialAuthState = {
  authToken: initialToken,
  isLoggedIn: !!initialToken,
  userMail: userMail,
  mailVerified: false,
  userName: "",
  userURL: "",
  premiumMode: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.authToken = action.payload.token;
      state.userMail = action.payload.userMail;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.authToken = null;
      state.userName = null;
      state.userURL = null;
      state.mailVerified = null;
      state.premiumMode = false;
    },
    editUserDetails(state, action) {
      state.userName = action.payload.userName;
      state.userURL = action.payload.userURL;
    },
    emailVerifiedUpdate(state, action) {
      state.mailVerified = action.payload;
    },
    activatePremiumMode(state) {
      state.premiumMode = true;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
