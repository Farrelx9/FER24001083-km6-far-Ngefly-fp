import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();
  const API_URL = process.env.API_URL;
  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/googlelogin`,
        { access_token: accessToken },
        { headers: { "Content-Type": "application/json" } }
      );
      const { token } = response.data.data;
      localStorage.setItem("token", token);

      navigate("/", { state: { token: token } });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function");
      registerLoginWithGoogleAction(responseGoogle.access_token);
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  return (
    <button
      variant="primary"
      onClick={loginWithGoogle}
      className=" mx-auto mt-4 md:mx-auto lg:mx-auto bg-[#9DDE8B] text-white font-semibold py-4 rounded-2xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#40A578] active:bg-[#40A578] flex items-center justify-center gap-2 w-[200px] ease-in-out transform hover:scale-105 max-sm:me-15"
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      {buttonText}
    </button>
  );
}

export default GoogleLogin;
