import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AuthRegister() {
  const displayMsg = (message) => toast.success(message);
  const displayErrorMsg = (message) => toast.error(message);

  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    if (!formData.userName) {
      displayErrorMsg("Username is required");
      isValid = false;
    }
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

    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          displayMsg(data.payload.message || "Account created successfully");
          navigate("/auth/login");
        } else {
          displayErrorMsg(
            data?.payload?.message || "Registration failed. Please try again."
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
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
