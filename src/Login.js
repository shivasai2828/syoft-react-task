// src/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://syoft.dev/Api/userlogin/api/userlogin", formData)
      .then((response) => {
        console.log("Response Data:", response.data); // For debugging
        if (response.data.status) {
          const { token, user_data } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user_data[0])); // Store first user_data object
          setUser(user_data[0]); // Set user data
          navigate("/dashboard");
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <img
          className="company-logo"
          src="https://res.cloudinary.com/dhsz1cq0y/image/upload/v1721033117/syoft_logo_bputdk.png"
          alt="logo"
        />
        <h1>User Login</h1>
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          value={formData.user_email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="user_password"
          placeholder="Password"
          value={formData.user_password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Log In</button>
        <p className="p">
          Don't have an account?
          <Link to="/signup" className="Link">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
