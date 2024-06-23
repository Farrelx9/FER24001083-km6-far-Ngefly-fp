import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import ngefly from "../logo/ngefly.png";
import Confirmed from "../Background/Confirmed.png";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendVerif = () => {
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

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
      const response = await axios.post(
        "https://binar-project-426902.et.r.appspot.com/api/v1/auth/verify/send",
        { email }
      );

      if (response.status === 200) {
        startTimer();
        setStartCountdown(true);
        toast.success(response.data.message);
        localStorage.removeItem("userEmail");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if (status === 404) {
          toast.error("Account not found. Please check your email address.");
        } else if (status === 409) {
          toast.warning("Account already verified.");
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } else {
        toast.error("Failed to connect to the server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualResend = () => {
    handleResend();
  };

  return (
    <div
      className="bg-white relative min-h-screen flex flex-col items-center justify-center"
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
        className="w-60 h-60 md:w-60 md:h-60 absolute top-2 md:top-4"
        alt="Ngefly"
      />

      <img
        src={pesawatatas}
        className="hidden md:block w-32 h-32 md:w-64 md:h-64 absolute top-4 right-4"
        alt="Pesawat Atas"
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-[453px] absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:h-auto max-sm:max-w-[90%]">
        <div className="text-2xl font-bold mb-4">Kirim Verifikasi Email</div>
        <div className="flex flex-col justify-center items-center text-center mb-4">
          <div className="bg-green-300 text-white p-2 rounded-full inline-block mb-4">
            <img
              src={Confirmed}
              alt="Confirmed"
              className="w-24 h-24 md:w-48 md:h-48 object-cover rounded-full"
            />
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Klik tombol di bawah untuk mengirim email verifikasi ke akun Anda.
          </p>
        </div>
        <button
          type="submit"
          onClick={handleManualResend}
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
    </div>
  );
};

export default SendVerif;
