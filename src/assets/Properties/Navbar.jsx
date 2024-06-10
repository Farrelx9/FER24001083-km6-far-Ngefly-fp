import React, { useEffect, useState } from "react";
import ngefly from "../logo/ngefly.png";
import { IoSearchSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { MdNotificationsNone, MdOutlineList } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkTokenStatus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed w-full z-40 px-3 md:px-10 lg:px-32 flex justify-between gap-3 ${
        isScrolled ? "bg-white shadow-2xl" : "bg-none"
      } transition-colors duration-300`}
    >
      <div className="flex gap-5">
        <img src={ngefly} className="w-[98px] h-[93px] " alt="Ngefly Logo" />
      </div>
      {!isLoggedIn ? (
        <div className="flex items-center">
          <button
            className="bg-[#40A578] md:w-[105px] lg:w-[105px] w-[90px] h-[48px] p-2 my-6 text-white font-semibold rounded-2xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769] flex items-center justify-center"
            onClick={() => navigate("/login")}
          >
            <CiLogin size={20} className="mr-2 text-white" />
            Login
          </button>
        </div>
      ) : (
        <div className="flex gap-4 mr-2 items-center">
          <MdOutlineList size={20} />
          <MdNotificationsNone
            size={20}
            onClick={() => navigate("/notification")}
          />
          <FiUser size={20}  />
          <button onClick={() => navigate("/login")}>Logout</button>
        </div>
      )}
    </div>
  );
}
