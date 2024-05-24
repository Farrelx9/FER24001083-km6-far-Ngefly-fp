import React, { useState } from "react";
import logo from "../logo/logo.png";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";

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
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumbers = /[0-9]/.test(password);
    return (
      password.length >= minLength
      // && hasUpperCase && hasLowerCase && hasNumbers
    );
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
      const { token } = response.data.data; // Anggap response API mengembalikan token

      if (token) {
        localStorage.setItem("token", token); // Store token in localStorage
        setData(response.data);
        setError(null);
        setEmailError(false);
        setPasswordError(false);

        // Navigate after 2 seconds
        // setTimeout(() => {
        //   navigate("/", { state: { user: response.data } });
        // }, 2000);
      } else {
        // Handle case where token is missing or undefined
        setError("Token Expired Broo");
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (error) {
      console.error("API Request Error:", error);
      if (error.response && error.response.status === 404) {
        setError("Email atau kata sandi tidak valid");
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };
  return (
    <div
      className="bg-white relative h-screen "
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
      <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-[373px] absolute top-[406px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
        <div>
          <div className="text-2xl font-bold ms-4 ">Masuk</div>
          <form className="flex flex-col ms-3 mt-4">
            <label className="mt-4">Email</label>
            <input
              className={`rounded-lg border-2 border-black border-opacity-10 p-2 mt-1 w-[452px] h-[48px] max-sm:w-[90%] ${
                emailError
                  ? "border-red-500 border-opacity-100"
                  : "border-black "
              }`}
              placeholder="Contoh: snoopdog@gmail.com"
              value={email}
              onChange={handleEmailChange}
              type="text"
            />

            <div className="flex justify-between">
              <label className="mt-4 mb-2">Password</label>
              <button className="text-[#40A578] hover:text-[#006769] mt-4">
                Lupa kata sandi?
              </button>
            </div>
            <input
              className={`rounded-lg border-2 border-black border-opacity-10 p-2 w-[452px] h-[48px] max-sm:w-[90%] ${
                passwordError
                  ? "border-red-500 border-opacity-100"
                  : "border-black "
              }`}
              placeholder="Masukan password"
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute inset-y-20 right-10 bottom-0 px-3 flex items-center"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FaEyeSlash className=" text-black" size={20} />
              ) : (
                <IoEyeSharp className=" text-black" size={20} />
              )}
            </button>
            <button
              className="bg-[#006769] text-white rounded-lg mt-6 w-[452px] h-[48px] max-sm:w-[90%]"
              type="submit"
              onClick={handleSubmit}
            >
              Masuk
            </button>
          </form>
          <div className="flex gap-4 justify-center mt-3">
            <div>Belum punya akun?</div>
            <button className="text-[#40A578] font-bold hover:text-[#006769]">
              Daftar di sini{" "}
            </button>
          </div>
          {emailError && (
            <div className="mt-7 w-[273px] h-[52px] mx-auto text-white text-xl text-center font-semibold p-3 bg-red-500 rounded-xl">
              {emailErrorMessage}
            </div>
          )}
          {passwordError && (
            <div className="mt-7 w-[273px] h-[52px] mx-auto text-white text-xl text-center font-semibold p-3 bg-red-500 rounded-xl">
              {passwordErrorMessage}
            </div>
          )}
          {data && (
            <div className="text-lg text-white font-semibold mt-2">
              Login successful, welcome {data.name}!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
