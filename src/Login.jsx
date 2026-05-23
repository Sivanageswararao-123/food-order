import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const loginLogics = (loginData) => {

    const registeredUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const validUser = registeredUsers.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (validUser) {

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(validUser)
      );

      alert("Login Successful ✅");

      reset();

      navigate("/home");

    } else {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Login</h2>
        <p>Welcome back to Food App 🍽️</p>

        <form
          className="login-form"
          onSubmit={handleSubmit(loginLogics)}
        >

          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", { required: true })}
          />

          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", { required: true })}
          />

          <button className="login-btn" type="submit">
            Login
          </button>

        </form>

        <div className="signup-text">
          Don’t have an account?{" "}
          <a href="/signup">Signup</a>
        </div>

      </div>

    </div>
  );
}

export default Login;