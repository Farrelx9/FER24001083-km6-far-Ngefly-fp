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
      setIsValidatePassword(true);
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
      setIsValidatePassword(true);
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
        `https://binar-project-backend-staging.vercel.app/api/v1/auth/register`,
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
    <div>
      <img src={cover} className="absolute w-full h-full -z-10" />
      <img
        src={pesawatbawah}
        className="w-[249px] h-[249px] absolute top-[631px] left-[calc(50%-470px)] transform -translate-x-24 -translate-y-72 max-sm:hidden"
      />
      <img
        src={pesawatatas}
        className="w-[230px] h-[180px] absolute top-[194px] right-[calc(50%-700px)] transform -translate-x-40 -translate-y-32 max-sm:hidden "
      />
      <ToastContainer />
      <div className="flex flex-col relative min-h-screen items-center justify-center">
        <div>
          <div className="absolute transform -translate-y-16 translate-x-20">
            <img src={ngefly} className="w-[249px]" />
          </div>
          <div className="bg-white mt-32 py-1 px-4 rounded-2xl border border-gray-200 bg-opacity-60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitRegister(e);
              }}
            >
              <strong className="text-xl">Daftar</strong>
              <div className="mt-3">
                <div className="mb-1 text-sm">Nama</div>
                <div className="text-xs flex items-center justify-end">
                  <input
                    name="name"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xs w-[380px] p-2 rounded-xl px-4 border border-gray-300"
                  ></input>
                </div>
              </div>
              <div className="mt-2">
                <div className="mb-1 text-sm">Email</div>
                <div className="flex items-center justify-end">
                  <input
                    name="email"
                    placeholder="Contoh: johndee@gmail.com"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    className={`text-xs w-[380px] p-2 rounded-xl px-4 border border-gray-300 ${
                      emailError ? "border-[#FF0000] border-2" : ""
                    }`}
                  ></input>
                  {isTickEmail && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
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
              <div>
                <div className="mt-2 text-sm flex justify-between mb-1">
                  Buat Password
                </div>
                <div className="relative">
                  <div className="text-xs flex items-center justify-end">
                    <input
                      name="password"
                      type={showPassword ? "password" : "text"}
                      value={password}
                      onChange={handlePasswordChange}
                      onBlur={handlePasswordBlur}
                      placeholder="Buat Password"
                      className={`w-[380px] px-4 p-2 rounded-xl border border-gray-300 ${
                        passwordError ? "border-[#FF0000] border-2" : ""
                      }`}
                    ></input>
                    {isTickPassword && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
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
                  <div
                    className={`absolute top-2 ${
                      isTickPassword ? "right-9" : "right-4"
                    } cursor-pointer`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2rem"
                        height="1.2rem"
                        viewBox="0 0 24 24"
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
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2rem"
                        height="1.2rem"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          fill="gray"
                          d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5M512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258s279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766m-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176m0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="mt-3 hover:bg-[#40A578] text-white flex justify-center p-2 rounded-xl w-[380px] border bg-[#006769]"
                  type="submit"
                >
                  Daftar
                </button>
              </div>
              <div className="mt-5 flex justify-center">
                <span className="mr-1 text-sm">Sudah punya akun?</span>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="text-sm font-bold hover:text-[#006769] text-[#40A578]"
                >
                  Masuk di sini{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-1 text-xs flex flex-col justify-center items-center text-white">
          {emailError && (
            <p
              className={
                isValidateEmail
                  ? "bg-[#73CA5C] mt-1 p-3 rounded-xl flex text-center w-[250px]"
                  : "bg-[#FF0000] mt-1 p-3 rounded-xl flex justify-center w-[200px]"
              }
            >
              {emailError}
            </p>
          )}
          {passwordError && (
            <p
              className={
                isValidatePassword
                  ? "bg-[#73CA5C] mt-1 p-3 rounded-xl flex justify-center w-[250px]"
                  : "bg-[#FF0000] mt-1 p-3 rounded-xl flex justify-center w-[200px]"
              }
            >
              {passwordError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
