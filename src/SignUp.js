// src/SignUp.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    user_firstname: "",
    user_lastname: "",
    user_email: "",
    user_phone: "",
    user_password: "",
    user_city: "",
    user_zipcode: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://syoft.dev/Api/user_registeration/api/user_registeration",
        formData
      )
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
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
        <h1>Sign Up Page</h1>
        <p className="p">
          Already have an account?{" "}
          <Link to="/login" className="Link">
            Sign In
          </Link>
        </p>
        <input
          type="text"
          name="user_firstname"
          placeholder="First Name"
          value={formData.user_firstname}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="user_lastname"
          placeholder="Last Name"
          value={formData.user_lastname}
          onChange={handleChange}
          required
        />
        <br />
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
          type="text"
          name="user_phone"
          placeholder="Phone"
          value={formData.user_phone}
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
        <input
          type="text"
          name="user_city"
          placeholder="City"
          value={formData.user_city}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="user_zipcode"
          placeholder="Zip Code"
          value={formData.user_zipcode}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Create Your Free Account</button>
      </form>
    </div>
  );
};

export default SignUp;
