import React, { useEffect, useState } from "react";
import axios from "axios";
import Confirmed from "../Background/Confirmed.png";
import linear from "../Background/linear.png";
// import { Navigate, useNavigate } from "react-router-dom";

const SendVerif = () => {
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("userEmail")); // Ambil email dari localStorage
  // const Navigate = useNavigate();

  //   useEffect(() => {
  //     if (!localStorage.getItem("token")) Navigate("/register");
  //   }, []);

  const handleResend = async () => {
    setMessage("");

    try {
      const response = await axios.post(
        "https://binar-project-backend-staging.vercel.app/api/v1/auth/verify/send",
        { email }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        setVariant("success");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 404) {
          setMessage("Account not found. Please check your email address.");
          setVariant("danger");
        } else if (status === 409) {
          setMessage("Account already verified.");
          setVariant("warning");
        } else {
          setMessage("An unexpected error occurred. Please try again later.");
          setVariant("danger");
        }
      } else {
        setMessage("Failed to connect to the server. Please try again later.");
        setVariant("danger");
      }
    }
  };

  const handleManualResend = () => {
    // Panggil fungsi handleResend untuk mengirim ulang email verifikasi
    handleResend();
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${linear})` }}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 text-center relative overflow-hidden md:w-1/3 w-full">
        <div className="mb-6">
          <div className="bg-green-500 text-white p-2 rounded-full inline-block">
            <img
              src={Confirmed}
              alt="Confirmed"
              className="w-24 md:w-48 h-24 md:h-48 object-cover rounded-full"
            />
          </div>
        </div>
        <h2 className="text-lg md:text-2xl font-extrabold text-gray-800 mb-4">
          Kirim Verifikasi Email
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Klik tombol di bawah untuk mengirim email verifikasi ke akun Anda.
        </p>
        <button
          onClick={handleManualResend}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Kirim Email Verifikasi
        </button>
        {message && (
          <div
            className={`mt-4 text-${
              variant === "success"
                ? "green"
                : variant === "danger"
                ? "red"
                : "yellow"
            }-600`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendVerif;
