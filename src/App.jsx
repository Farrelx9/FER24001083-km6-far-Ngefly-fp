import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./assets/Auth/Login";
import ResetPassword from "./assets/Auth/ResetPassword";
import RequestResetPassword from "./assets/Auth/RequestResetPassword";
import VerifyEmail from "./assets/Auth/VerifyEmail";
import Register from "./assets/Auth/Register";
import SendVerif from "./assets/Auth/SendVerif";
import Search from "./pages/Search";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<RequestResetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/sendverif" element={<SendVerif />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notif" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>

  );
}
