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
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import TicketConfirmation from "./pages/TicketConfirmation";
import AboutUs from "./pages/AboutUs";
import PaymentSuccess from "./pages/PaymentSuccess";
import History from "./pages/History";
import PrintCheckout from "./pages/PrintCheckout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<RequestResetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/sendverif/:email" element={<SendVerif />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout/:flights_id" element={<Checkout />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notif" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/payment/:booking_id" element={<Payment />} />
        <Route
          path="/ticketconfirm/:payment_id"
          element={<TicketConfirmation />}
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/print/:id" element={<PrintCheckout />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/payments/:payment_id" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}
