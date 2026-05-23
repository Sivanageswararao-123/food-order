import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const registerLogics = (userdata) => {
    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email
    const userExists = users.find(
      (user) => user.email === userdata.email
    );

    if (userExists) {
      alert("Email already registered!");
      return;
    }

    // Add new user
    users.push(userdata);

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    reset();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Form</h2>

      <form onSubmit={handleSubmit(registerLogics)}>
        <input
          type="text"
          placeholder="Enter Full Name"
          {...register("name", {
            required: "Name is required",
          })}
        />
        <br />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
          })}
        />
        <br />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          type="email"
          placeholder="Enter Email Address"
          {...register("email", {
            required: "Email is required",
          })}
        />
        <br />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phone", {
            required: "Phone number is required",
          })}
        />
        <br />
        {errors.phone && <p>{errors.phone.message}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;