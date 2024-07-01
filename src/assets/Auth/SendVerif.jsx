import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import ngefly from "../logo/ngefly.png";
import Confirmed from "../Background/Confirmed.png";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SendVerif = () => {
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const intervalRef = useRef();
  const { email } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.API_URL;

  useEffect(() => {
    if (email) {
      handleResend();
    }
    return () => clearInterval(intervalRef.current);
  }, [email]);

  const startTimer = () => {
    setSeconds(60);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/verify/send`, {
        email,
      });

      if (response.status === 200) {
        startTimer();
        setStartCountdown(true);
        setNotification({ message: response.data.message, type: "success" });
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if (status === 404) {
          alert("Account not found. Please check your email address.");
          navigate("/register");
        } else if (status === 409) {
          alert("Account already verified.");
          navigate("/register");
        } else {
          setNotification({
            message: "An unexpected error occurred. Please try again later.",
            type: "register",
          });
        }
      } else {
        setNotification({
          message: "Failed to connect to the server. Please try again later.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white relative min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />
      <img
        src={pesawatbawah}
        className="hidden md:block w-32 h-32 md:w-64 md:h-64 absolute bottom-4 left-4"
        alt="Pesawat Bawah"
      />
      <img
        src={ngefly}
        className="w-[249px] h-[249px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        alt="Ngefly"
      />
      <img
        src={pesawatatas}
        className="hidden md:block w-32 h-32 md:w-64 md:h-64 absolute top-4 right-4"
        alt="Pesawat Atas"
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border border-black border-opacity-10 shadow-sm rounded-xl p-4 w-[509px] h-[453px] absolute mt-6 top-[436px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
        <div className="text-2xl font-bold mb-4">Send Email Verification</div>
        <div className="flex flex-col justify-center items-center text-center mb-4">
          <div className="bg-green-300 text-white p-2 rounded-full inline-block mb-4">
            <img
              src={Confirmed}
              alt="Confirmed"
              className="w-48 h-48 md:w-48 md:h-48 object-cover rounded-full"
            />
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-6 sm:text-base">
            Click the button below to send a verification email to your account.
          </p>
        </div>
        <button
          type="submit"
          onClick={handleResend}
          className="bg-[#006769] text-white rounded-lg w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
          disabled={loading || (startCountdown && seconds !== 0)}
        >
          {loading ? (
            <Icon icon="eos-icons:loading" width={30} />
          ) : startCountdown && seconds !== 0 ? (
            `Kirim Ulang dalam ${seconds} detik`
          ) : startCountdown && seconds === 0 ? (
            "Resend"
          ) : (
            "Kirim Email Verifikasi"
          )}
        </button>
      </div>

      {notification.message && (
        <div
          style={{
            backgroundColor:
              notification.type === "success"
                ? "#73CA5C"
                : notification.type === "error"
                ? "#FF0000"
                : "#FFA500",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            position: "absolute",
            top: `calc(453px + 453px / 2 + 20px)`,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default SendVerif;
