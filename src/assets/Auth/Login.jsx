import React, { useEffect, useState } from "react";
import logo from "../logo/logo.png";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

export default function Login() {
  const [email, setEmail] = useState("farrelfarhan902@gmail.com");
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
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 5;
    return password.length >= minLength;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError(true);
      setEmailErrorMessage("Email tidak valid");
      return;
    }

    if (!isPasswordValid) {
      setPasswordError(true);
      setPasswordErrorMessage("Password tidak valid");
      return;
    }

    try {
      const response = await axios.post(
        `https://binar-project-backend-staging.vercel.app/api/v1/auth/login`,
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

      console.log("ApiResponse", response.data);
      const { status, data } = response.data;

      if (!status && data.user && data.user.is_verified === false) {
        setIsEmailVerified(false);
        setError;
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
        // Handle token expired
        setError("Token Expired Broo");
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (error) {
      console.error("API Request Error:", error);
      if (error.response && error.response.status === 404) {
        setError("Wrong email or password");
        setEmailError(true);
        setPasswordError(true);
      } else {
        setError("Email not verified!");
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
        className="w-[249px] h-[194px] absolute top-[631px] left-[calc(50%-470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <img
        src={logo}
        className="w-[246px] h-[146px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      />
      <img
        src={pesawatatas}
        className="w-[249px] h-[194px] absolute top-[194px] left-[calc(50%+470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden "
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border-2  border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-[453px] absolute top-[436px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
        <div>
          <div className="text-2xl font-bold ms-4 ">Login</div>
          <form className="flex flex-col ms-3 mt-4" onSubmit={handleSubmit}>
            <label className="mt-4">Email</label>
            <input
              className={`rounded-lg border-2 border-black border-opacity-10 p-2 mt-1 w-[452px] h-[48px] max-sm:w-[90%] ${
                emailError
                  ? "border-red-500 border-opacity-100"
                  : "border-black "
              }`}
              placeholder="Ex: snoopdog@gmail.com"
              value={email}
              onChange={handleEmailChange}
              type="text"
            />

            <div className="flex justify-between">
              <label className="mt-4 mb-2">Password</label>
              <button className="text-[#40A578] hover:text-[#006769] mt-4">
                Forgot Password?
              </button>
            </div>
            <input
              className={`rounded-lg border-2 border-black border-opacity-10 p-2 w-[452px] h-[48px] max-sm:w-[90%] ${
                passwordError
                  ? "border-red-500 border-opacity-100"
                  : "border-black "
              }`}
              placeholder="Insert password"
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-10 bottom-4 px-3 flex items-center"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FaEyeSlash className=" text-black" size={20} />
              ) : (
                <IoEyeSharp className=" text-black" size={20} />
              )}
            </button>
            <button
              className="bg-[#006769] hover:bg-[#40A578] text-white rounded-lg mt-6 w-[452px] h-[48px] max-sm:w-[90%]"
              type="submit"
            >
              Submit
            </button>
          </form>
          <GoogleLogin buttonText="Login with Google" />
          <div className="flex gap-4 justify-center mt-3">
            <div>Dont have account?</div>
            <button className="text-[#40A578] font-bold hover:text-[#006769]">
              Register here.{" "}
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
            <div className="mt-7 w-[273px] h-[52px] mx-auto text-white text-xl text-center font-semibold p-3 bg-red-500 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg"></div>
          )}
          {data && (
            <div className="mt-7 w-[273px] h-[52px] mx-auto text-white text-xl text-center font-semibold p-3 bg-[#40A578] rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg">
              Welcome {data && data.data && data.data.name}!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
