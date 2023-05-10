import NavHeader from "../UI/NavHeader";
import SignupForm from "../authorization/SignupForm";

const SignUpPage = () => {
  return (
    <>
      <NavHeader></NavHeader>
      <SignupForm className="signup-form"></SignupForm>
    </>
  );
};

export default SignUpPage;
