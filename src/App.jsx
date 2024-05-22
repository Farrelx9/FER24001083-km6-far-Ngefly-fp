import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./assets/Auth/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
