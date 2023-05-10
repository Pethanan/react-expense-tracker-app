import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// import { useContext } from "react";
// import AuthCtx from "./components/Store/auth-ctx";
import { useSelector } from "react-redux";
import WelcomePage from "./components/pages/Welcome";
import SignUpPage from "./components/pages/SignUp";
import UserHomePage from "./components/pages/UserHome";
import UserInfoPage from "./components/pages/UserInfo";
import ResetPasswordPage from "./components/pages/ResetPassword";
import ExpensesAnalysisPage from "./components/pages/ExpensesAnalysis";
import LoginPage from "./components/pages/Login";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const authCtx = useContext(AuthCtx);
  return (
    <>
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
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
