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
import Footer from "../assets/Properties/Footer";
import NotFound from "../components/atoms/NotFound";
import { GoRead } from "react-icons/go";
import Pagination from "../assets/Properties/Pagination";

export default function NotificationPage() {
  const [notification, setNotification] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [filter, setFilter] = useState("all");
  const [tempFilter, setTempFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const API_URL = process.env.API_URL;

  const fetchData = async (page = 1, status = "") => {
    try {
      const token = localStorage.getItem("token");
      if (token === null) {
        setTimeout(() => {
          navigate("/login", { state: { fromNotification: true } });
        }, 2000);
        return;
      }
      const response = await axios.get(
        `${API_URL}/notification/?page=${page}&status=${status}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data: notifications, total_pages, total_items } = response.data;
      if (Array.isArray(notifications)) {
        setNotification(notifications);
        setTotalPages(total_pages);
        setTotalItems(total_items);
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
    fetchData(currentPage, tempFilter === "all" ? "" : tempFilter);
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      const unreadNotifications = notification.filter((n) => !n.is_read);

      if (unreadNotifications.length > 0) {
        const response = await axios.put(
          `${API_URL}/notification/read`,
          {},
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          setNotification((notifications) =>
            notifications.map((n) => ({ ...n, is_read: true }))
          );
        } else {
          console.error(
            "Failed to mark all notifications as read: ",
            response.data.message
          );
        }
      }
    } catch (error) {
      console.error("Error marking all notifications as read: ", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, filter === "all" ? "" : filter);
  }, [currentPage, filter]);

  if (isReady === false) {
    return (
      <div className="flex items-center justify-center bg-[#9DDE8B] h-screen">
        <PacmanLoader size={70} color={"#006769"} loading={true} />
      </div>
    );
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, filter === "all" ? "" : filter);
  };

  return (
    <Fragment>
      <div className="">
        <Navbar />
        <div className="w-full h-[260px] shadow-2xl flex flex-col gap-2 items-center justify-center">
          <div className="lg:w-[1120px] md:w-[760px] w-[390px] px-4 mt-20 lg:text-3xl md:text-2xl text-xl font-bold lg:py-6  md:py-6 py-6">
            Notification
          </div>
          <div className="flex items-center gap-4">
            <div className="lg:w-[868px] md:w-[508px] w-[180px] h-[50px] rounded-[10px] bg-[#9DDE8B] flex items-center px-4 gap-2 mb-2">
              <IoMdArrowRoundBack
                onClick={() => navigate("/")}
                size={20}
                className="text-white cursor-pointer hover:scale-110 transition-transform duration-200 "
              />
              <div className="text-white text-sm font-semibold">Home</div>
            </div>
            <div
              className="border rounded-full h-[50px] flex p-2 gap-2 mb-2 items-center lg:text-base md:text-base text-xs  hover:cursor-pointer "
              onClick={() => setShowModal(true)}
            >
              <IoFilterCircleOutline size={20} className="text-black " />
              <span>Filter</span>
            </div>
            <div
              className="border rounded-full h-[50px] flex p-2 gap-2 mb-2 items-center lg:text-base md:text-base text-xs  hover:cursor-pointer"
              onClick={markAllAsRead}
            >
              <GoRead size={20} className="text-black" />
              <div>Read All</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center py-9">
          {notification.length === 0 ? (
            <NotFound>
              <p className="mt-5 font-medium">No Notifications Found</p>
            </NotFound>
          ) : (
            notification
              .filter(
                (n) =>
                  filter === "all" ||
                  (filter === "unread" && !n.is_read) ||
                  (filter === "read" && n.is_read)
              )
              .map((notification) => (
                <div
                  key={notification.id}
                  className={`flex justify-between border-b-2 lg:w-[880px] md:w-[680px] w-full lg:h-[87px] md:h-[87px] h-auto py-3 p-4 ${
                    notification.is_read
                      ? " hover:bg-green-100 "
                      : "bg-red-100 "
                  }`}
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
                      <div className="text-sm lg:w-[590px] md:w-[290px] w-[135px]">
                        {notification.message}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold flex gap-2 lg:w-[500px] md:w-[150px] w-[65px]">
                    {new Date(notification.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
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
                          notification.is_read
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
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
      <Footer />
    </Fragment>
  );
}
