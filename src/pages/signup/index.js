import React, { useState } from "react";
import "../signup/index.css";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Signup</h2>
        <form>
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
          <p className="login-text">
            Already have an account? <span className="login-link">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
