import React from "react";
import ngefly from "../logo/ngefly.png";
import { IoSearchSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
export default function Navbar() {
  return (
    <div className=" flex justify-between gap-3 bg-none shadow-2xl px-3 md:px-10 lg:px-32 ">
      <div className="flex gap-5">
        <img
          src={ngefly}
          className="w-[98px] h-[93px] hidden md:flex lg:flex"
        />
        <form>
          <div className="flex items-center md:w-[350px] lg:w-[444px] w-[240px] h-[48px] rounded-full p-4 my-6 bg-[#EEEEEE] border-2 border-black border-opacity-20 focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#C7C8CC] active:bg-[#dddd] ">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow bg-transparent outline-none"
            />
            <IoSearchSharp size={24} className="ml-2" color="black" />
          </div>
        </form>
      </div>
      <div className="flex items-center">
        <button className="bg-[#40A578] md:w-[105px] lg:w-[105px] w-[90px] h-[48px]  p-2 my-6 text-white font-semibold rounded-2xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769] flex items-center justify-center">
          <CiLogin size={20} className="mr-2 text-white " />
          Login
        </button>
      </div>
    </div>
  );
}
