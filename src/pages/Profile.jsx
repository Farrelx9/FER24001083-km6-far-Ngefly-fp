import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Navbar from "../assets/Properties/Navbar";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("Change Profile");
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="w-[1440px] h-[260px] shadow-2xl flex flex-col gap-2 items-center justify-center">
        <div className="flex self-start px-44 mt-16">Profile</div>
        <div className="flex items-center gap-4">
          <div className="w-[968px] h-[33px] bg-[#9DDE8B] flex items-center px-4 gap-2">
            <IoMdArrowRoundBack
              size={20}
              className="text-white"
              onClick={() => navigate("/")}
            />
            <div className="text-white text-sm font-semibold">Home</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-10">
        <div>
          <div
            className={`flex items-center gap-2 border-b w-[328px] p-2 cursor-pointer ${
              activeSection === "Change Profile"
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => setActiveSection("Change Profile")}
          >
            <FiEdit3 size={15} />
            <div>Profile</div>
          </div>
          <div
            className={` flex items-center border-b gap-2 w-[328px] p-2 cursor-pointer ${
              activeSection === "Account Settings"
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => setActiveSection("Account Settings")}
          >
            <MdSettings />
            <div>Account Settings</div>
          </div>
          <div
            className={` flex items-center gap-2 border-b w-[328px] p-2 cursor-pointer ${
              activeSection === "Logout" ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setActiveSection("Logout")}
          >
            <CiLogout />
            <div>Logout</div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {activeSection === "Change Profile" && (
            <div className="border-2 w-[518px] h-[518px] p-4">
              <div>Change Profile</div>
              <div className="w-[454px] rounded-t-lg bg-black text-white p-2">
                Personal Data
              </div>
              <div className="flex flex-col gap-4">
                <div>Name</div>
                <div>Adrress</div>
                <div>Phone</div>
                <div>Occupation</div>
              </div>
            </div>
          )}
          {activeSection === "Account Settings" && (
            <div className="border-2 w-[518px] h-[518px] p-4">
              <div>Account Settings</div>
              <div className="w-[454px] rounded-t-lg bg-black text-white p-2">
                Personal Data
              </div>
              <div>Name</div>
              <form className="flex flex-col gap-1">
                <input
                  className="border-black border rounded-md w-[454px] h-[40px] px-2"
                  placeholder="Snoop Dog"
                ></input>
                <div>Adrress</div>
                <input
                  className="border-black border rounded-md w-[454px] h-[40px] px-2"
                  placeholder="Snoop Dog"
                ></input>
                <div>Phone</div>
                <input
                  className="border-black border rounded-md w-[454px] h-[40px] px-2"
                  placeholder="Snoop Dog"
                ></input>
                <div>Occupation</div>
                <input
                  className="border-black border rounded-md w-[454px] h-[40px] px-2"
                  placeholder="Snoop Dog"
                ></input>
                <div>Birth Date</div>
                <input
                  className="border-black border rounded-md w-[454px]  px-2"
                  placeholder="Snoop Dog"
                ></input>
                <button className="bg-red-500 rounded-md w-[150px] h-[48px] mx-auto mt-2">
                  Submit
                </button>
              </form>
            </div>
          )}
          {activeSection === "Logout" && (
            <div className="border-2 w-[518px] h-[418px] p-4">
              <div className="border-b pb-2 mb-2">
                Are you sure you want to logout?
              </div>
              <button className="bg-red-500 text-white px-4 py-2 mt-2">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
