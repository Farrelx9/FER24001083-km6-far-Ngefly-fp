import React, { useEffect, useState } from "react";
import Navbar from "../assets/Properties/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  IoFilterCircleOutline,
  IoNotificationsCircleSharp,
} from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiCircleFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

export default function NotificationPage() {
  const [notification, setNotification] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token === null) {
        navigate("/login");
        toast.error("Please login to continue");
        return;
      }
      const response = await axios.get(
        `https://binar-project-backend-staging.vercel.app/api/v1/notification/`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data);
      const notifications = response.data.data;
      if (Array.isArray(notifications)) {
        setNotification(notifications);
        setIsReady(true);
      } else {
        console.error(
          "Expected notifications to be an array but got",
          typeof notifications
        );
      }
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      const notificationToMark = notification.find(
        (n) => n.id === notificationId && !n.is_read
      );

      if (notificationToMark) {
        const response = await axios.put(
          `https://binar-project-backend-staging.vercel.app/api/v1/notification/read`,
          { id: notificationId },
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          setNotification((notifications) =>
            notifications.map((n) => {
              if (n.id === notificationId) {
                return { ...n, is_read: true };
              }
              return n;
            })
          );
        } else {
          console.error(
            "Failed to mark notification as read: ",
            response.data.message
          );
        }
      }
    } catch (error) {
      console.error("Error marking notification as read: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isReady === false) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      <ToastContainer />
      <Navbar />
      <div className="w-full h-[230px] shadow-2xl flex flex-col gap-2 items-center justify-center">
        <div className="lg:w-[1200px] md:w-[1200px] w-[400px] px-4 mt-20 font-semibold">
          Notification
        </div>
        <div className="flex items-center gap-4">
          <div className="w-[968px] h-[33px] bg-[#9DDE8B] flex items-center px-4 gap-2">
            <IoMdArrowRoundBack
              onClick={() => navigate("/")}
              size={20}
              className="text-white cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            <div className="text-white text-sm font-semibold">Home</div>
          </div>
          <div className="border rounded-full flex p-2 gap-2 items-center">
            <IoFilterCircleOutline size={20} className="text-black" />
            <span>Filter</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 justify-center  py-9">
        {notification.map((notification) => (
          <div
            key={notification.id}
            className="flex justify-between border-b-2  w-[780px] h-[87px] py-3 p-4"
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex gap-2 px-2">
              <IoNotificationsCircleSharp
                size={30}
                className="text-yellow-300"
              />
              <div>
                <div className="text-sm font-semibold">
                  {notification.title}
                </div>
                <div className="text-sm">{notification.message}</div>
              </div>
            </div>
            <div className="text-xs font-semibold flex gap-2 ">
              {new Date(notification.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <div className="py-1">
                <RiCircleFill
                  size={10}
                  className={`${
                    notification.is_read ? "text-green-500" : "text-red-500"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
