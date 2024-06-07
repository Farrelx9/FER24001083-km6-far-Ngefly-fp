import React, { useEffect, useState } from "react";
import Navbar from "../assets/Properties/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  IoFilterCircleOutline,
  IoNotificationsCircleSharp,
} from "react-icons/io5";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function () {
  const [notification, setNotification] = useState("");
  const location = useLocation();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://binar-project-backend-staging.vercel.app/api/v1/notification/${location.state.id}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data", response.data);
      const notification = response.data.notification;
      setNotification(notification);
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-[#FFFFFF]">
      <Navbar />
      <div className="w-[1440px] h-[180px] shadow-2xl flex flex-col gap-2 items-center justify-center">
        <div className="flex self-start px-44 mt-10">Notification</div>
        <div className="flex items-center gap-4">
          <div className="w-[968px] h-[33px] bg-[#9DDE8B] flex items-center px-4 gap-2">
            <IoMdArrowRoundBack size={20} className="text-white" />
            <div className=" text-white text-sm font-semibold "> Home </div>
          </div>
          <div className="border rounded-full flex p-2 gap-2 items-center">
            <IoFilterCircleOutline size={20} className="text-black" />
            <span>Filter</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 justify-center py-9">
        <div className=" flex justify-between border w-[780px] h-[87px] py-3 p-4 ">
          <div className="flex gap-2 px-2 ">
            <IoNotificationsCircleSharp
              size={30}
              className="text-yellow-300 "
            />
            <div className="">
              <div className="text-sm">Promosi</div>
              <div>Dapatkan Potongan 50% Tiket!</div>
              <div className="text-sm">Syarat dan ketentuan berlaku!</div>
            </div>
          </div>
          <div>20 Maret, 14:14</div>
        </div>
        <div className=" flex justify-between border w-[780px] h-[87px] py-3 p-4 ">
          <div className="flex gap-2 px-2 ">
            <IoNotificationsCircleSharp
              size={30}
              className="text-yellow-300 "
            />
            <div className="">
              <div className="text-sm">Promosi</div>
              <div>Dapatkan Potongan 50% Tiket!</div>
              <div className="text-sm">Syarat dan ketentuan berlaku!</div>
            </div>
          </div>
          <div>20 Maret, 14:14</div>
        </div>
      </div>
    </div>
  );
}
