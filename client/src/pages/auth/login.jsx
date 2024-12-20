import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function AuthLogin() {
  const location = useLocation();
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayMsg = (message) => toast.success(message);
  const displayErrorMsg = (message) => toast.error(message);

  const validateForm = () => {
    let isValid = true;
    if (!formData.email) {
      displayErrorMsg("Email is required");
      isValid = false;
    }
    if (!formData.password) {
      displayErrorMsg("Password is required");
      isValid = false;
    }
    return isValid;
  };

  function onSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    dispatch(loginUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          displayMsg(data.payload.message || "Login successful");
          const redirectPath = location.state?.from || "/shop/home";
          navigate(redirectPath);
        } else {
          displayErrorMsg(
            data?.payload?.message || "Login failed. Please try again."
          );
        }
      })
      .catch((error) => {
        displayErrorMsg(error.message || "An unexpected error occurred.");
      });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Sign up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
