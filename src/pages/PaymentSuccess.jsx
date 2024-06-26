import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ngefly from "../assets/logo/ngefly.png";
import cover from "../assets/logo/cover.png";
import pesawatatas from "../assets/logo/pesawatatas.png";
import pesawatbawah from "../assets/logo/pesawatbawah.png";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function PaymentStatus() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true); // Change this based on actual payment status
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setLoading(true);
    // Simulate an API call or any other logic
    setTimeout(() => {
      setLoading(false);
      navigate("/tickectconfirm"); // Navigate to ticket confirmation page
    }, 2000); // Simulate loading
  };

  return (
    <div
      className="bg-white relative h-screen"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={pesawatbawah}
        className="w-[249px] h-[194px] absolute top-[631px] left-[calc(50%-470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <img
        src={ngefly}
        className="w-[270px] h-[270px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src={pesawatatas}
        className="w-w-[249px] h-[194px] absolute top-[194px] left-[calc(50%+470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-fit absolute top-[436px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
        {success ? (
          <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
            <Icon icon="icon-park-solid:success" width={110} color="#35b950" />
            <div>
              <p className="font-bold text-3xl mb-2">Payment Successful!</p>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                Thank you for your payment. Your transaction was completed
                successfully.
              </p>
            </div>
            <button
              onClick={handleButtonClick}
              className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading ? (
                <Icon icon="eos-icons:loading" width={24} color="#fff" />
              ) : (
                "Ke cetak tiket"
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
            <Icon icon="fluent:warning-48-filled" width={110} color="#c75d16" />
            <div>
              <p className="font-bold text-3xl mb-2">Payment Failed!</p>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                There was an issue with your payment. Please try again or
                contact support for assistance.
              </p>
            </div>
            <button
              onClick={handleButtonClick}
              className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading ? (
                <Icon icon="eos-icons:loading" width={24} color="#fff" />
              ) : (
                "Try Again"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
