import React, { useState, useEffect } from "react";
import axios from "axios";
import ngefly from "../assets/logo/ngefly.png";
import cover from "../assets/logo/cover.png";
import pesawatatas from "../assets/logo/pesawatatas.png";
import pesawatbawah from "../assets/logo/pesawatbawah.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentStatus() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { payment_id } = useParams();
  const navigate = useNavigate();

  const url = `https://binar-project-426902.et.r.appspot.com/api/v1/payments/${payment_id}`;

  const handleScan = async () => {
    try {
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        setSuccess(true);
        setError(null);
      } else {
        setSuccess(false);
        setError("Unexpected response status: " + response.status);
      }
    } catch (error) {
      setSuccess(false);
      setError(error.message);
      if (error.response) {
        const { status, data } = error.response;
        console.log("Error response:", status, data);
        if (status === 404) {
          setError("Payment not found. Please check your payment ID.");
        } else if (status === 400) {
          if (data.message === "Payment already expired") {
            setError("Payment already expired. Please make a new payment.");
          } else if (data.message === "Payment data not found") {
            setError(
              "Payment data not found. Please check your payment details."
            );
          } else if (data.message === "Payment already updated") {
            setError("Payment already updated.");
          } else if (data.message === "Payment already cancelled") {
            setError("Payment already cancelled. No further action is needed.");
          } else {
            setError(
              "An unexpected conflict occurred. Please try again later."
            );
          }
        }
      } else {
        setError("Failed to connect to the server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Memanggil handleScan() untuk memperbarui status pembayaran saat komponen dimuat
    handleScan();
  }, []); // Dependency array kosong, artinya hanya dipanggil sekali saat komponen dimuat

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && navigate) {
      navigate("/login");
      alert("You've to Login First!");
    }
  }, [navigate]);

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
        className="w-[249px] h-[194px] md:hidden lg:flex hidden absolute top-[631px] left-[calc(50%-470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <img
        src={ngefly}
        className="w-[249px] h-[249px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src={pesawatatas}
        className="w-[249px] h-[194px] md:hidden lg:flex hidden absolute top-[194px] left-[calc(50%+470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-fit absolute top-[436px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
        {loading ? (
          <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
            <Icon icon="eos-icons:loading" width={110} color="#006769" />
            <p className="font-bold text-3xl mb-2">Loading...</p>
          </div>
        ) : success ? (
          <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
            <Icon icon="icon-park-solid:success" width={110} color="#35b950" />
            <div>
              <p className="font-bold text-3xl mb-2">Payment Successful!</p>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                Thank you for your payment. Your transaction was completed
                successfully.
              </p>
            </div>
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
          </div>
        )}
        {error && (
          <div className="text-red-600 text-center mt-4">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
