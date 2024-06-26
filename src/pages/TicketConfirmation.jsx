import React, { useEffect, useState } from "react";
import axios from "axios";
import Sukses from "../assets/images/Sukses.gif";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../assets/Properties/Navbar";

function TicketConfirmation() {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { payment_id } = useParams();
  const API_URL = process.env.API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        alert("You've to Login First!");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.put(
          `${API_URL}/payments/${payment_id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
        if (response.status === 200) {
          setPaymentStatus("success");
          toast.success("Payment status updated successfully.");
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 404) {
            setErrorMessage("Payment not found. Please check your payment ID.");
            toast.error("Payment not found. Please check your payment ID.");
          } else if (status === 400) {
            if (data.message === "Payment already expired") {
              setErrorMessage(
                "Payment already expired. Please make a new payment."
              );
              toast.error(
                "Payment already expired. Please make a new payment."
              );
            } else if (data.message === "Payment data not found") {
              setErrorMessage(
                "Payment data not found. Please check your payment details."
              );
              toast.error(
                "Payment data not found. Please check your payment details."
              );
            } else {
              setErrorMessage("Payment already updated.");
              toast.error("Payment already updated.");
            }
          } else {
            setErrorMessage(
              "An unexpected error occurred. Please try again later."
            );
            toast.error(
              "An unexpected error occurred. Please try again later."
            );
          }
        } else {
          setErrorMessage(
            "Failed to connect to the server. Please try again later."
          );
          toast.error(
            "Failed to connect to the server. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    updatePaymentStatus();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-4">
      <Navbar />
      <ToastContainer />

      <div className="w-full max-w-8xl border-t border-gray-300 mt-20"></div>

      <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-4">
        <span className="text-black font-extrabold">Data</span>
        <span className="text-black font-extrabold">›</span>
        <span className="text-black font-extrabold">Pay</span>
        <span className="text-black font-extrabold">›</span>
        <span className="text-black font-extrabold">Finished</span>
      </div>

      {loading && (
        <div className="w-full max-w-3xl bg-blue-600 text-white p-3 mt-4 rounded-lg text-center">
          <p>Processing payment, please wait...</p>
        </div>
      )}

      {paymentStatus === "success" && (
        <div className="w-full max-w-3xl bg-[#73CA5C] text-white p-3 mt-4 rounded-lg text-center">
          <p>Thank you for the transaction payment</p>
        </div>
      )}

      {errorMessage && (
        <div className="w-full max-w-3xl bg-red-600 text-white p-3 mt-4 rounded-lg text-center">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>

      {paymentStatus === "success" && (
        <div className="text-center mt-20">
          <img
            src={Sukses}
            alt="sukses"
            className="mx-auto mb-4"
            style={{ width: "300px", height: "auto" }}
          />
          <h2 className="text-xl font-bold text-green-600">Congratulations!</h2>
          <p>Ticket Payment Transaction successful!</p>
        </div>
      )}

      {paymentStatus === "success" && (
        <div className="flex flex-col items-center space-y-4 mt-10">
          {/* <button
            className="bg-[#006769] text-white py-3 px-6 rounded-lg w-80 h-15 shadow-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
            onClick={() => navigate("/history")}
          >
            Issue Tickets
          </button> */}
          <button
            className="bg-[#006769] text-white py-3 px-6 rounded-lg w-80 h-15 shadow-md hover:bg-[#82BB99] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50"
            onClick={() => navigate("/")}
          >
            Search for Other Flights
          </button>
        </div>
      )}
    </div>
  );
}

export default TicketConfirmation;
