import React, { useEffect, useState } from "react";
import ngefly from "../logo/ngefly.png";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.API_URL;
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const cleanupLocalStorage = () => {
      localStorage.removeItem("token");
    };

    window.addEventListener("beforeunload", cleanupLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
    setError(null);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setError(null);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    return password.length >= minLength;
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/reset");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError(true);
      setEmailErrorMessage("Email Invalid!");
      return;
    }

    if (!isPasswordValid) {
      setPasswordError(true);
      setPasswordErrorMessage("Password Invalid!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { status, data } = response.data;

      if (!status && data.user && data.user.is_verified === false) {
        setIsEmailVerified(false);
        setError("Email not verified!");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setData(data);
        setError(null);
        setEmailError(false);
        setPasswordError(false);
        setIsEmailVerified(true);

        setTimeout(() => {
          navigate("/", { state: { user: data } });
        }, 2000);
      } else {
        setError("Token Expired Broo!");
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (error) {
      console.error("API Request Error:", error);
      if (error.response && error.response.status === 401) {
        setError("Email not verified!");
      } else if (error.response && error.response.status === 404) {
        setError("Account not found!");
      } else if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setError("Pasword Invalid!");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    if (
      location.state?.fromNotification ||
      location.state?.fromProfile ||
      location.state?.fromHistory
    ) {
      toast.error("You need to log in first!");
    }
  }, [location.state]);

  return (
    <div
      className="bg-white relative h-screen"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />
      <img
        src={pesawatbawah}
        className="w-[249px] h-[194px] md:hidden lg:flex hidden absolute top-[631px] left-[calc(50%-470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <img
        src={ngefly}
        className="w-[249px] h-[249px] absolute top-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
        onClick={() => navigate("/")}
      />
      <img
        src={pesawatatas}
        className="w-[249px] h-[194px] md:hidden lg:flex hidden absolute top-[194px] left-[calc(50%+470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border border-black border-opacity-10 shadow-sm rounded-2xl p-4 w-[509px] h-[453px] absolute top-[403px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
        <div>
          <div className="text-2xl font-bold ms-3">Login</div>
          <form className="flex flex-col ms-3" onSubmit={handleSubmit}>
            <label className="mt-3 mb-2">Email</label>
            <input
              className={`rounded-xl border border-black border-opacity-10 px-2 py-5 w-[452px] h-[48px] max-sm:w-[90%] ${
                emailError
                  ? "border-red-500 border-opacity-100"
                  : "border-black"
              }`}
              placeholder="Ex: snoopdog@gmail.com"
              value={email}
              onChange={handleEmailChange}
              type="text"
            />

            <div className="flex justify-between">
              <label className="mt-4 mb-2">Password</label>
              <div
                className="text-[#40A578] hover:text-[#006769] hover:cursor-pointer mt-5 mb-1"
                onClick={handleForgotPasswordClick}
                type="button"
              >
                Forgot Password?
              </div>
            </div>
            <div className="relative">
              <input
                className={`rounded-xl border border-black border-opacity-10 px-2 py-5 w-[452px] h-[48px] max-sm:w-[90%] ${
                  passwordError
                    ? "border-red-500 border-opacity-100"
                    : "border-black"
                }`}
                placeholder="Insert password"
                value={password}
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-10"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <IoEyeSharp className="text-black" size={20} />
                ) : (
                  <FaEyeSlash className="text-black" size={20} />
                )}
              </button>
            </div>
            <button
              className="bg-[#006769] hover:bg-[#40A578] text-white rounded-lg mt-6 w-[452px] h-[48px] max-sm:w-[90%]"
              type="submit"
            >
              Submit
            </button>
          </form>
          <GoogleLogin buttonText="Login with Google" />
          <div className="flex gap-4 justify-center mt-6 px-auto">
            <div>Don't have an account?</div>
            <button
              className="text-[#40A578] font-bold hover:text-[#006769]"
              onClick={() => navigate("/register")}
            >
              Register here.
            </button>
          </div>
          {error && (
            <div className="mt-7 w-[273px] h-[52px] mx-auto text-white text-xl text-center font-semibold p-3 bg-red-500 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg">
              {error}
            </div>
          )}
          {emailError && (
            <div className="mt-7 w-[273px] h-[52px] mx-auto text-white text-xl text-center font-semibold p-3 bg-red-500 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg">
              {emailErrorMessage}
            </div>
          )}
          {passwordError && (
            <div className="mt-7 w-[273px] h-[52px] mx-auto text-white text-xl text-center font-semibold p-3 bg-red-500 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg">
              {passwordErrorMessage}
            </div>
          )}
          {!isEmailVerified && (
            <div className="mt-7 w-[273px] h-[52px] mx-auto text-white text-xl text-center font-semibold p-3 bg-red-500 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg">
              Email not verified!
            </div>
          )}
          {data && (
            <div className="mt-7 w-[273px] h-[52px] mx-auto text-white  text-xl text-center font-semibold p-3 bg-[#40A578] rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg ">
              Welcome {data && data.name}!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
