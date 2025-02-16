import React, { useState } from "react";
import "../signup/index.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/ContextProvider";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        login({ name, email });
        navigate("/");
      }
    } catch (error) {
      console.log(error, "error >>> 1");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="div-container">
            <label className="label-field">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Enter Username"
            />
          </div>
          <div className="div-container">
            <label className="label-field">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter Email"
            />
          </div>
          <div className="div-container">
            <label className="label-field">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter Password"
            />
          </div>
          <button className="signup-btn">Signup</button>
          {/* <p className="login-text">
            Already have an account?{" "}
            <a className="login-link" href="/login">
              Login
            </a>
          </p> */}
          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
