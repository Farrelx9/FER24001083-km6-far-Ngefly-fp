import React, { useState } from "react";
import ngefly from "../logo/ngefly.png";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";

const MIN_CHARACTER = 8;

export default function ResetPassword() {
  const { token } = useParams();
  const [form, setForm] = useState({
    newPassword1: "",
    newPassword2: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const API_URL = process.env.API_URL;

  const handleSubmit = async () => {
    if (form.newPassword1.length < MIN_CHARACTER || form.newPassword2.length < MIN_CHARACTER) {
      setPasswordError("Please input a minimum of 8 characters!");
      setErrorMessage(""); 
    } else if (form.newPassword1 !== form.newPassword2) {
      setErrorMessage("Passwords are not the same!");
      setPasswordError(""); 
    } else {
      setLoading(true);
      setPasswordError(""); 
      setErrorMessage("");

      try {
        const response = await fetch(
          `${API_URL}/auth/resetpassword/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: form.newPassword1,
              confirm: form.newPassword2,
            }),
          }
        );
        const result = await response.json();

        setLoading(false);
        if (response.status === 200 && result.status) {
          setSuccessMessage(result.message);
          setSuccess(true);
        } else if (response.status === 400) { 
          setErrorMessage(result.message);
        } else {
          alert(result.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    }
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
        <div>
          <div className="text-2xl font-bold">Reset Password</div>
          {success ? (
            <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
              <Icon icon="icon-park-solid:success"
                width={110}
                color="#35b950" />
              <p>{successMessage}</p>
            </div>
          ) : (
            <>
              <form
                className="flex flex-col mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <label className="mt-4">New Password</label>
                <div className="relative">
                  <input
                    className="rounded-lg border-2 border-black border-opacity-10 p-2 mt-1 w-full h-[70]"
                    placeholder="Password"
                    type={showPassword1 ? "text" : "password"}
                    value={form.newPassword1}
                    onInput={(e) =>
                      setForm({ ...form, newPassword1: e.target.value })
                    }
                    required
                  />
                  <Icon
                    icon={showPassword1 ? "mdi:eye" : "mdi:eye-off"}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword1(!showPassword1)}
                  />
                </div>
                <label className="mt-4">New Password Confirmation</label>
                <div className="relative">
                  <input
                    className="rounded-lg border-2 border-black border-opacity-10 p-2 mt-1 w-full h-[70]"
                    placeholder="Ulangi Password"
                    type={showPassword2 ? "text" : "password"}
                    value={form.newPassword2}
                    onInput={(e) =>
                      setForm({ ...form, newPassword2: e.target.value })
                    }
                    required
                  />
                  <Icon
                    icon={showPassword2 ? "mdi:eye" : "mdi:eye-off"}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword2(!showPassword2)}
                  />
                </div>
              </form>
              
              <button
                className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <Icon icon="eos-icons:loading" width={30} />
                ) : (
                  "Reset Password"
                )}
              </button>
            </>
          )}
        </div>
        {passwordError && (
                <div className="mt-[30px] w-full flex items-center justify-center text-center absolute left-1/2 transform -translate-x-1/2">
                  <div className="text-white text-xl font-semibold p-3 bg-[#FF0000] rounded-lg max-sm:text-lg">
                    {passwordError}
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className="mt-[30px] w-full flex items-center justify-center text-center absolute left-1/2 transform -translate-x-1/2">
                  <div className="text-white text-xl font-semibold p-3 bg-[#FF0000] rounded-lg max-sm:text-lg">
                    {errorMessage}
                  </div>
                </div>
              )}
      </div>
    </div>
  );
}


