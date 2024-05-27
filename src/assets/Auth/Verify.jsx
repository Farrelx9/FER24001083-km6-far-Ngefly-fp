import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Confirmedbro from "../Background/Confirmed-bro.png";
import linear from "../Background/linear.png";

const Verify = () => {
  const { token } = useParams(); // Ambil token dari URL
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState("");

  useEffect(() => {
    const Verify = async () => {
      try {
        const response = await axios.put(
          `https://binar-project-backend-staging.vercel.app/api/v1/auth/verify/${token}`
        );

        if (response.status === 200 && response.data.status) {
          // Simpan token ke localStorage jika verifikasi berhasil
          localStorage.setItem("verificationToken", token);
          setMessage(response.data.message);
          setVariant("success");
        } else {
          setMessage("Verification failed. Please try again later.");
          setVariant("danger");
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            setMessage(data.message || "Invalid verify email token.");
            setVariant("danger");
          } else {
            setMessage("An unexpected error occurred. Please try again later.");
            setVariant("danger");
          }
        } else {
          setMessage(
            "Failed to connect to the server. Please try again later."
          );
          setVariant("danger");
        }
      } finally {
        setLoading(false);
      }
    };

    Verify();
  }, [token]); // Gunakan token sebagai dependency karena useEffect bergantung padanya

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${linear})` }}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 text-center relative overflow-hidden md:w-1/3 w-full">
        <div className="mb-6">
          <div
            className={`p-2 rounded-full inline-block ${
              variant === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            <img
              src={Confirmedbro}
              alt="Confirmed"
              className="w-24 md:w-48 h-24 md:h-48 object-cover rounded-full"
            />
          </div>
        </div>
        <h2 className="text-lg md:text-2xl font-extrabold text-gray-800 mb-4">
          {variant === "success" ? "Verifikasi Berhasil" : "Verifikasi Gagal"}
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6">{message}</p>
        {variant === "success" && (
          <div className="mt-4 md:mt-8">
            <Link
              to="/login"
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
            >
              Masuk ke Akun Anda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
