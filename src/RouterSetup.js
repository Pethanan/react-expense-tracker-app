import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import WelcomePage from "./components/pages/Welcome";
import SignUpPage from "./components/pages/SignUp";
import ResetPasswordPage from "./components/pages/ResetPassword";
import UserHomePage from "./components/pages/UserHome";
import UserInfoPage from "./components/pages/UserInfo";
import ExpensesAnalysisPage from "./components/pages/ExpensesAnalysis";
import LoginPage from "./components/pages/Login";
import { useSelector } from "react-redux";
import ExpensesDataExport from "./components/pages/ExpensesDataExport";
import Layout from "./components/UI/Layout";

const ReouterSetup = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const premiumMode = useSelector((state) => state.auth.premiumMode);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <WelcomePage />
        </Route>
        <Route path="/signup" exact>
          <SignUpPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <Route path="/login" exact>
          {!isLoggedIn && <LoginPage />}
          {isLoggedIn && <Redirect to="/userIndexPage"></Redirect>}
        </Route>
        <Route path="/userIndexPage" exact>
          {isLoggedIn && <UserHomePage />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/profile/accountInfo" exact>
          {isLoggedIn && <UserInfoPage />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/profile/expenses-analysis" exact>
          {isLoggedIn && <ExpensesAnalysisPage />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/profile/expenseExport" exact>
          {isLoggedIn && premiumMode && <ExpensesDataExport />}
          {isLoggedIn && !premiumMode && (
            <>
              <Layout></Layout>
              <p>Please Activate Premium </p>
            </>
          )}

          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default ReouterSetup;
