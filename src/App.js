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
import ExpensesDataExport from "./components/pages/ExpensesDataExport";
import ReouterSetup from "./RouterSetup";

function App() {
  const darkmode = useSelector((state) => state.auth.premiumMode);

  return (
    <div className={`${darkmode ? "main-darkmode" : ""}`}>
      <ReouterSetup />
    </div>
  );
}

export default App;
