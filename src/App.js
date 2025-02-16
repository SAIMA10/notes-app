import Home from "./pages/home";
import Login from "./pages/login";
import SignUpForm from "./pages/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
