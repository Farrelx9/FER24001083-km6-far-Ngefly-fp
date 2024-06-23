import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import ngefly from "../logo/ngefly.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isValidatePassword, setIsValidatePassword] = useState(false);
  const [isTickEmail, setIsTickEmail] = useState(false);
  const [isTickPassword, setIsTickPassword] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^.{8,}$/;

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    if (!newEmail.trim()) {
      setEmailError("Email harus diisi!");
      setIsValidateEmail(false);
      setIsTickEmail(false);
    } else if (!emailRegex.test(newEmail)) {
      setEmailError(
        "Mohon isi dengan email sesungguhnya untuk kebutuhan verifikasi."
      );
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
      setEmailError("Email harus diisi!");
      setIsValidateEmail(false);
      setIsTickEmail(false);
    } else if (!emailRegex.test(newEmail)) {
      setEmailError(
        "Mohon isi dengan email sesungguhnya untuk kebutuhan verifikasi."
      );
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
      setPasswordError("Silakan isi password!");
      setIsValidatePassword(false);
      setIsTickPassword(false);
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError("Password min 8 karakter.");
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
      setPasswordError("Silakan isi password!");
      setIsValidatePassword(false);
      setIsTickPassword(false);
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError("Password min 8 karakter.");
      setIsValidatePassword(false);
      setIsTickPassword(false);
    } else {
      setPasswordError(null);
      setIsTickPassword(true);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const registerData = {
      email: email,
      name: name,
      password: password,
    };
    try {
      const response = await axios.post(
        `https://binar-project-426902.et.r.appspot.com/api/v1/auth/register`,
        registerData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("response", response);
      if (response?.status === 201) {
        localStorage.setItem("userEmail", response.data.data.user.email); // Simpan email ke localStorage
        navigate("/sendverif");
        alert(
          `Register Sukses, ${name}. Silakan Verifikasi Email terlebih dahulu agar bisa melakukan login`
        );
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          toast.error("Silakan isi semua inputan.");
        } else if (status === 409) {
          toast.error("Email sudah pernah digunakan registrasi.");
        } else {
          toast.error("Gagal terhubung ke server. Silakan coba lagi nanti.");
        }
      } else {
        toast.error(`${error.message}`);
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
          <div className="text-2xl font-bold ms-3">Daftar</div>
          <form
            className="flex flex-col ms-3 mt-3"
            onSubmit={handleSubmitRegister}
          >
            <label className="mb-1">Nama</label>
            <input
              name="name"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border px-4 py-5 w-[452px] h-[48px] max-sm:w-[90%]"
            />
            <label className="mt-3 mb-1">Email</label>
            <div className="flex relative">
              <input
                name="email"
                placeholder="Contoh: johndee@gmail.com"
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
                placeholder="Buat Password"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 1024 1024"
                      className="absolute flex justify-end"
                    >
                      <path
                        fill="gray"
                        d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5M512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258s279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766m-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176m0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      className="absolute flex justify-end"
                    >
                      <g
                        fill="none"
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      >
                        <path d="M5.45 16.92a10.78 10.78 0 0 1-2.55-3.71a1.85 1.85 0 0 1 0-1.46A10.59 10.59 0 0 1 6.62 7.1A9 9 0 0 1 12 5.48a8.81 8.81 0 0 1 4 .85m2.56 1.72a10.85 10.85 0 0 1 2.54 3.7a1.85 1.85 0 0 1 0 1.46a10.59 10.59 0 0 1-3.72 4.65A9 9 0 0 1 12 19.48a8.81 8.81 0 0 1-4-.85"></path>
                        <path d="M8.71 13.65a3.28 3.28 0 0 1-.21-1.17a3.5 3.5 0 0 1 3.5-3.5c.4-.002.796.07 1.17.21m2.12 2.12c.14.374.212.77.21 1.17a3.5 3.5 0 0 1-3.5 3.5a3.28 3.28 0 0 1-1.17-.21M3 20L19 4"></path>
                      </g>
                    </svg>
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
              Daftar
            </button>
          </form>
          <div className="flex gap-2 justify-center mt-3 px-auto">
            <div>Sudah punya akun?</div>
            <button
              className="text-[#40A578] font-bold hover:text-[#006769]"
              onClick={() => navigate("/login")}
            >
              Masuk di sini
            </button>
          </div>
          {emailError && (
            <div
              className={`mt-4 mx-auto text-white text-lg text-center p-2 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg ${
                isValidateEmail
                  ? "bg-[#73CA5C] mt-1 w-[400px] h-[70px] rounded-xl flex text-center"
                  : "bg-[#FF0000] mt-1 w-[273px] h-[45px] rounded-xl flex justify-center"
              }`}
            >
              {emailError}
            </div>
          )}
          {passwordError && (
            <div
              className={`w-[273px] h-[45px] mx-auto text-white text-lg text-center p-2 rounded-xl max-sm:w-[65%] max-sm:h-[65%] max-sm:text-lg ${
                isValidatePassword
                  ? ""
                  : "bg-[#FF0000] rounded-xl flex justify-center"
              } ${isValidateEmail ? "mt-2" : "mt-4"}`}
            >
              {passwordError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
