import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./assets/Auth/Login";
import ResetPassword from "./assets/Auth/ResetPassword";
import RequestResetPassword from "./assets/Auth/RequestResetPassword";
import VerifyEmail from "./assets/Auth/VerifyEmail";
import Register from "./assets/Auth/Register";
// import Verify from "./assets/Auth/Verify";
import SendVerif from "./assets/Auth/SendVerif";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<RequestResetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/sendverif" element={<SendVerif />} />
<<<<<<< HEAD
        {/* <Route path="/verify/:token" element={<Verify />} /> */}
        <Route path="/navbar" element={<Navbar />} />
=======
        <Route path="/verify/:token" element={<Verify />} />
>>>>>>> 7ab03ce68ca503e5e178afc1d94772037411d0f4
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
