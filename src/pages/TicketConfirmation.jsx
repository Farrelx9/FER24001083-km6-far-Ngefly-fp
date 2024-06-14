import React, { useEffect, useState } from "react";
import axios from "axios";
import vector from "../assets/logo/vector.png";

function TicketConfirmation() {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Define a function to call the API using axios
    const updatePaymentStatus = async () => {
      const paymentId = "your_payment_id"; // Replace with actual payment ID
      const url = `https://binar-project-backend-staging.vercel.app/payments/${paymentId}`;

      setLoading(true);

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

        if (response.status === 200) {
          setPaymentStatus("success");
          alert("Payment status updated successfully.");
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 404) {
            setErrorMessage("Payment not found. Please check your payment ID.");
            alert("Payment not found. Please check your payment ID.");
          } else if (status === 409) {
            if (data.message === "Payment already expired") {
              setErrorMessage(
                "Payment already expired. Please make a new payment."
              );
              alert("Payment already expired. Please make a new payment.");
            } else if (data.message === "Payment data not found") {
              setErrorMessage(
                "Payment data not found. Please check your payment details."
              );
              alert(
                "Payment data not found. Please check your payment details."
              );
            } else {
              setErrorMessage("Payment already updated.");
              alert("Payment already updated.");
            }
          } else {
            setErrorMessage(
              "An unexpected error occurred. Please try again later."
            );
            alert("An unexpected error occurred. Please try again later.");
          }
        } else {
          setErrorMessage(
            "Failed to connect to the server. Please try again later."
          );
          alert("Failed to connect to the server. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the function to update payment status
    updatePaymentStatus();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img src="path-to-logo" alt="Tiketku Logo" className="w-16 h-auto" />{" "}
          {/* Replace with actual logo path */}
          <div className="text-2xl font-bold text-purple-600">Tiketku</div>
        </div>
        <input
          type="text"
          placeholder="Cari di sini ..."
          className="p-2 w-1/3 border rounded"
        />
      </header>

      <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>

      {/* Steps */}
      <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-4">
        <span className="text-black font-semibold">Isi Data Diri</span>
        <span className="text-black font-semibold">›</span>
        <span className="text-black font-semibold">Bayar</span>
        <span className="text-black font-semibold">›</span>
        <span className="text-black font-semibold">Selesai</span>
      </div>

      {/* Success Message */}
      {paymentStatus === "success" && (
        <div className="w-full max-w-3xl bg-[#73CA5C] text-white p-3 mt-4 rounded-lg text-center">
          <p>Terima kasih atas pembayaran transaksi</p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="w-full max-w-3xl bg-red-600 text-white p-3 mt-4 rounded-lg text-center">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>

      {/* Illustration and Confirmation */}
      {paymentStatus === "success" && (
        <div className="text-center mt-20">
          <img
            src={vector} // Ganti dengan path gambar yang sebenarnya
            alt="vector"
            className="mx-auto mb-4"
            style={{ width: "200px", height: "auto" }}
          />
          <h2 className="text-xl font-bold text-purple-600">Selamat!</h2>
          <p>Transaksi Pembayaran Tiket sukses!</p>
        </div>
      )}

      {/* Buttons */}
      {paymentStatus === "success" && (
        <div className="flex flex-col items-center space-y-4 mt-10">
          <button className="bg-[#006769] text-white py-3 px-4 rounded-lg w-80 h-15">
            Terbitkan Tiket
          </button>
          <button className="bg-[#9DDE8B] text-white py-3 px-4 rounded-lg w-80 h-15">
            Cari Penerbangan Lain
          </button>
        </div>
      )}
    </div>
  );
}

export default TicketConfirmation;
