import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import ngefly from "../logo/ngefly.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [responseError, setResponseError] = useState("");
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isValidatePassword, setIsValidatePassword] = useState(false);
  const [isTickEmail, setIsTickEmail] = useState(false);
  const [isTickPassword, setIsTickPassword] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = process.env.API_URL;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{8,}$/;

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    if (!newEmail.trim()) {
      setEmailError("Email must be filled!");
      setIsValidateEmail(false);
      setIsTickEmail(false);
    } else if (!emailRegex.test(newEmail)) {
      setEmailError("Fill with your real email for verification!");
      setIsValidateEmail(true);
      setIsTickEmail(false);
    } else {
      setEmailError(null);
      setIsTickEmail(true);
    }
    setEmail(newEmail);
  };

  const handleEmailBlur = (event) => {
    const newEmail = event.target.value;
    if (!newEmail.trim()) {
      setEmailError("Email must be filled!");
      setIsValidateEmail(false);
      setIsTickEmail(false);
    } else if (!emailRegex.test(newEmail)) {
      setEmailError("Fill with your real email for verification!");
      setIsValidateEmail(true);
      setIsTickEmail(false);
    } else {
      setEmailError(null);
      setIsTickEmail(true);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    if (!newPassword.trim()) {
      setPasswordError("Please enter password!");
      setIsValidatePassword(false);
      setIsTickPassword(false);
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError("Password must be at least 8 characters.");
      setIsValidatePassword(false);
      setIsTickPassword(false);
    } else {
      setPasswordError(null);
      setIsTickPassword(true);
    }
    setPassword(newPassword);
  };

  const handlePasswordBlur = (event) => {
    const newPassword = event.target.value;
    if (!newPassword.trim()) {
      setPasswordError("Please enter password!");
      setIsValidatePassword(false);
      setIsTickPassword(false);
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError("Password must be at least 8 characters.");
      setIsValidatePassword(false);
      setIsTickPassword(false);
    } else {
      setPasswordError(null);
      setIsTickPassword(true);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setResponseError("");
    const registerData = {
      email: email,
      name: name,
      password: password,
    };
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        registerData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
 
      if (response?.status === 201) {
        navigate(`/sendverif/${email}`);
        alert(
          `Register Success, ${name}. Please verify your email first to be able to login!`
        );
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          setResponseError("Please fill in all inputs.");
        } else if (status === 409) {
          setResponseError("Email already used.");
        } else {
          setResponseError(
            "Failed to connect to server. Please try again later."
          );
        }
      } else {
        setResponseError(`${error.message}`);
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
        className="w-[249px] h-[249px] absolute top-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src={pesawatatas}
        className="w-[249px] h-[194px] md:hidden lg:flex hidden absolute top-[194px] left-[calc(50%+470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <ToastContainer />
      <div className="bg-[#FFFFFF] bg-opacity-45 border border-black border-opacity-10 shadow-sm rounded-2xl p-4 w-[509px] h-[425px] absolute top-[388px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
        <div>
          <div className="text-2xl font-bold ms-3">Register</div>
          <form
            className="flex flex-col ms-3 mt-3"
            onSubmit={handleSubmitRegister}
          >
            <label className="mb-1">Name</label>
            <input
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border px-4 py-5 w-[452px] h-[48px] max-sm:w-[90%]"
            />
            <label className="mt-3 mb-1">Email</label>
            <div className="flex relative">
              <input
                name="email"
                placeholder="Ex: johndee@gmail.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`rounded-xl border px-4 py-5 w-[452px] h-[48px] max-sm:w-[90%] ${
                  emailError ? "border-red-500" : ""
                }`}
              />
              <div className="flex justify-end items-center">
                {isTickEmail && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    className="absolute mr-4"
                  >
                    <path
                      fill="#188E55"
                      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
            <label className="mt-4 mb-1">Password</label>
            <div className="flex relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="Create Password"
                className={`rounded-xl border px-4 py-5 w-[452px] h-[48px] max-sm:w-[90%] ${
                  passwordError ? "border-red-500" : ""
                }`}
              />
              <div className="flex">
                <div
                  className={`flex items-center cursor-pointer ${
                    isTickPassword
                      ? "relative right-[80px]"
                      : "relative right-[40px]"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEyeSharp
                      className="text-black absolute flex justify-end"
                      size={20}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-black absolute flex justify-end"
                      size={20}
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-end items-center">
                {isTickPassword && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    className="absolute mr-4 flex justify-end"
                  >
                    <path
                      fill="#188E55"
                      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
            <button
              className="bg-[#006769] hover:bg-[#40A578] text-white rounded-lg mt-5 w-[452px] h-[48px] max-sm:w-[90%]"
              type="submit"
            >
              Submit
            </button>
          </form>
          <div className="flex gap-2 justify-center mt-3 px-auto">
            <div>Already have an account?</div>
            <button
              className="text-[#40A578] font-bold hover:text-[#006769]"
              onClick={() => navigate("/login")}
            >
              Login here.
            </button>
          </div>
          {emailError && (
            <div
              className={`mt-4 mx-auto w-[400px] h-[45px] text-white text-lg text-center p-2 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg ${
                isValidateEmail
                  ? "bg-[#73CA5C] mt-2 rounded-xl flex justify-center"
                  : "bg-[#FF0000] mt-4 rounded-xl flex justify-center"
              }`}
            >
              {emailError}
            </div>
          )}
          {passwordError && (
            <div
              className={`w-[400px] h-[45px] mx-auto text-white text-lg text-center p-2 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg ${
                isValidatePassword
                  ? "mt-2"
                  : "bg-[#FF0000] rounded-xl flex justify-center"
              } ${isValidateEmail ? "mt-4" : "mt-4"}`}
            >
              {passwordError}
            </div>
          )}
          {!emailError && !passwordError && responseError && (
            <div className="mt-4 mx-auto w-[400px] h-[45px] text-white text-lg text-center p-2 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg bg-[#FF0000]">
              {responseError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
