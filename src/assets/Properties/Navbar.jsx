import React, { useEffect, useState } from "react";
import ngefly from "../logo/ngefly.png";
import { CiLogin } from "react-icons/ci";
import { MdNotificationsNone, MdOutlineList } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "animate.css";

export default function Navbar({ unreadCount }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [localUnreadCount, setLocalUnreadCount] = useState(0);
  const navigate = useNavigate();
  const API_URL = process.env.API_URL;

  useEffect(() => {
    const checkTokenStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkTokenStatus();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setIsScrolled(window.scrollY > 0);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${API_URL}/notification`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const { data: notifications } = response.data;
          setLocalUnreadCount(notifications.filter((n) => !n.is_read).length);
        }
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div
      className={`fixed w-full z-40 px-3 md:px-10 lg:px-32 flex justify-between gap-3 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-2xl" : "bg-white shadow-2xl"
      } ${
        isHidden
          ? "animate__animated animate__fadeOutUp"
          : "animate__animated animate__fadeInDown"
      }`}
    >
      <div className="flex gap-5">
        <img
          src={ngefly}
          className="w-[98px] h-[93px] hover:cursor-pointer"
          alt="Ngefly Logo"
          onClick={() => navigate("/")}
        />
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
          <MdOutlineList
            size={25}
            className="hover:cursor-pointer"
            onClick={() => navigate("/history")}
          />
          <div className="relative">
            <MdNotificationsNone
              size={25}
              className="hover:cursor-pointer"
              onClick={() => navigate("/notif")}
            />
            {localUnreadCount > 0 && (
              <span className="absolute left-3 bottom-2 bg-red-500 text-white rounded-full text-xs border border-white shadow-md w-4 h-4 flex items-center justify-center">
                {localUnreadCount}
              </span>
            )}
          </div>
          <FiUser
            size={25}
            className="hover:cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        </div>
      )}
    </div>
  );
}
