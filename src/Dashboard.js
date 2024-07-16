/* eslint-disable jsx-a11y/anchor-is-valid */
// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Ensure you have appropriate styles in this file

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

      <div className="details-box">
        <h1>Welcome, {user.user_firstname}</h1>
        <p>
          <strong>First Name:</strong> {user.user_firstname}
        </p>
        <p>
          <strong>Last Name:</strong> {user.user_lastname}
        </p>
        <p>
          <strong>Email:</strong> {user.user_email}
        </p>
        <p>
          <strong>Phone:</strong> {user.user_phone}
        </p>
        <p>
          <strong>Password:</strong> {user.user_password}
        </p>
        <p>
          <strong>Pincode:</strong> {user.user_zipcode}
        </p>
        <p>
          <strong>Address:</strong> {user.user_city}
        </p>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Dashboard;
