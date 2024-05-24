import React from "react";
import ngefly from "../logo/ngefly.png";
import { IoSearchSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
export default function Navbar() {
  return (
    <div className=" flex justify-between bg-none shadow-2xl px-32 ">
      <div className="flex gap-5 ">
        <img src={ngefly} className="w-[98px] h-[93px] max-sm:hidden" />
        <form className=""> 
          <input
            type="text"
            placeholder="Search"
            className="w-[444px] h-[48px] rounded-lg p-4 my-6 bg-[#EEEEEE] border-2 border-black border-opacity-20"
          />
          <IoSearchSharp
            size={24}
            className="absolute top-[50px] left-[calc(50%-300px)]  transform -translate-x-1/2 -translate-y-1/2 "
            color="black"
          />
        </form>
      </div>
      <div className="flex items-center">
        <button className="bg-[#40A578] w-[105px] h-[48px] my-6 text-white font-semibold rounded-2xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769] flex items-center justify-center">
          <CiLogin size={20} className="mr-2 text-white " />
          Login
        </button>
      </div>
    </div>
  );
}
