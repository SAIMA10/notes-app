import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/ContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error, "error >>> 1");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button className="signup-btn">Login</button>
          <p className="login-text">
            Don't have an account? Create one{" "}
            <a className="login-link" href="/signup">
              SignUp
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
