import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../assets/Properties/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  IoFilterCircleOutline,
  IoNotificationsCircleSharp,
} from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiCircleFill } from "react-icons/ri";
import Modal from "../assets/Properties/Modal";
import { PacmanLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationPage() {
  const [notification, setNotification] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [filter, setFilter] = useState("all");
  const [tempFilter, setTempFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token === null) {
        setTimeout(() => {
          navigate("/login", { state: { fromNotification: true } });
        }, 3000);
        return;
      }
      const response = await axios.get(
        `https://binar-project-426902.et.r.appspot.com/api/v1/notification/`,
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

  const applyFilter = () => {
    setFilter(tempFilter);
    setShowModal(false);
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      const notificationToMark = notification.find(
        (n) => n.id === notificationId && !n.is_read
      );

      if (notificationToMark) {
        const response = await axios.put(
          `https://binar-project-426902.et.r.appspot.com/api/v1/notification/read`,
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
    return (
      <div className="flex items-center justify-center bg-[#9DDE8B] h-screen">
        <PacmanLoader size={70} color={"#006769"} loading={true} />
      </div>
    );
  }
  return (
    <Fragment>
      <div className="">
        <Navbar />
        <div className="w-full h-[230px] shadow-2xl flex flex-col gap-2 items-center justify-center">
          <div className="lg:w-[1200px] md:w-[790px] w-[390px] px-4 mt-20 font-semibold">
            Notification
          </div>
          <div className="flex items-center gap-4">
            <div className="lg:w-[968px] md:w-[568px] w-[220px] h-[33px] bg-[#9DDE8B] flex items-center px-4 gap-2">
              <IoMdArrowRoundBack
                onClick={() => navigate("/")}
                size={20}
                className="text-white cursor-pointer hover:scale-110 transition-transform duration-200"
              />
              <div className="text-white text-sm font-semibold">Home</div>
            </div>
            <div
              className="border rounded-full flex p-2 gap-2 items-center hover:cursor-pointer "
              onClick={() => setShowModal(true)}
            >
              <IoFilterCircleOutline size={20} className="text-black" />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center  py-9">
          {notification
            .filter(
              (n) =>
                filter === "all" ||
                (filter === "unread" && !n.is_read) ||
                (filter === "read" && n.is_read)
            )
            .map((notification) => (
              <div
                key={notification.id}
                className="flex justify-between border-b-2 lg:w-[780px] md:w-[680px] w-full lg:h-[87px] md:h-[87px] h-auto py-3 p-4"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-2 px-2">
                  <IoNotificationsCircleSharp
                    size={30}
                    className="text-yellow-300"
                  />
                  <div>
                    <div className="lg:text-sm md:text-sm text-xs font-semibold">
                      {notification.title}
                    </div>
                    <div className="text-sm lg:w-[500px] md:w-[290px] w-[140px]">
                      {notification.message}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-semibold flex gap-2 lg:w-[500px] md:w-[170px] w-[75px]">
                  {new Date(notification.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
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
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-lg">
          <div className="text-lg font-semibold mb-4">Filter Notifications</div>
          <div className="w-full">
            <div
              className={`px-4 py-2 border-b border-gray-300 cursor-pointer  font-semibold hover:bg-gray-100 ${
                tempFilter === "all" ? "bg-[#40A578]" : ""
              }`}
              onClick={() => setTempFilter("all")}
            >
              All Notifications
            </div>
            <div
              className={`px-4 py-2 border-b border-gray-300 font-semibold cursor-pointer hover:bg-gray-100 ${
                tempFilter === "unread" ? "bg-[#40A578]" : ""
              }`}
              onClick={() => setTempFilter("unread")}
            >
              Unread Notifications
            </div>
            <div
              className={`px-4 py-2 border-b border-gray-300 font-semibold cursor-pointer hover:bg-gray-100 ${
                tempFilter === "read" ? "bg-[#40A578]" : ""
              }`}
              onClick={() => setTempFilter("read")}
            >
              Read Notifications
            </div>
          </div>
          <button
            className="mt-4 px-6 py-2 bg-[#40A578] text-white font-semibold rounded-lg text-sm focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769]"
            onClick={applyFilter}
          >
            Choose
          </button>
        </div>
      </Modal>
    </Fragment>
  );
}
