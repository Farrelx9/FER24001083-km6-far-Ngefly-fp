import React from "react";
import Navbar from "../assets/Navbar/Navbar";
import { RiFlightTakeoffFill } from "react-icons/ri";
import {
  MdDateRange,
  MdOutlineAirlineSeatReclineNormal,
  MdOutlineFlight,
} from "react-icons/md";
export default function Home() {
  return (
    <div className="bg-[#FFFFFF]">
      <Navbar />
      <div className="relative flex justify-between  py-10">
        <div
          className="relative z-10 bg-[#40A578] w-[236px] h-[150px] my-10"
          style={{ left: "55px" }}
        ></div>
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnJkMnF2ZDI1YW5xY2kwdWV4YTRoYTI4N3YwNjh3cXkyenY4dmtqbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gsoOGUHAiiZmUrS/giphy.webp"
          alt="gambar"
          className="relative rounded-2xl z-20 w-[1823px] h-[232px] shadow-xl"
        />
        <div
          className="relative z-10 bg-[#E1F0DA] w-[236px] h-[150px] my-10"
          style={{ right: "55px" }}
        ></div>
      </div>
      <div
        className="flex justify-center relative z-30 "
        style={{ bottom: "120px" }}
      >
        <div className="shadow-2xl rounded-md bg-[#FFFFFF] w-[968px] h-[298px] ">
          <div className="flex text-2xl font-semibold p-2 gap-2 mt-4 mb-6 px-10">
            <div>Choose a Special Flight Schedule on</div>
            <div className="font-bold text-[#006769]">Ngefly!</div>
          </div>
          <ul className="grid grid-cols-2 gap-11 ">
            <li className="flex gap-4 px-10">
              <MdOutlineFlight size={20} />
              <div className="text-sm">From</div>
              <div className="gap-2">
                <div className="text-center text-xl mb-2">Jakarta (JKTA) </div>
                <div className="w-[300px] h-[1px] bg-[#D0D0D0] "></div>
              </div>
            </li>
            <li className="flex gap-4 px-10">
              <RiFlightTakeoffFill size={20} />
              <div className="text-sm">Into</div>
              <div className="gap-2">
                <div className="text-center text-xl mb-2">Jakarta (JKTA) </div>
                <div className="w-[300px] h-[1px] bg-[#D0D0D0] "></div>
              </div>
            </li>
            <li className="flex gap-4 px-10">
              <MdDateRange size={20} />
              <div className="text-sm">Date</div>
              <div className="gap-2">
                <div className="text-center text-xl mb-2">Jakarta (JKTA) </div>
                <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
              </div>
              <div className="gap-2">
                <div className="text-center text-xl mb-2">Jakarta (JKTA) </div>
                <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
              </div>
            </li>
            <li className="flex gap-4 px-10">
              <MdOutlineAirlineSeatReclineNormal size={20} />
              <div className="text-sm">Seat</div>
              <div className="gap-2">
                <div className="text-center text-xl mb-2">Jakarta (JKTA) </div>
                <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
              </div>
              <div className="gap-2">
                <div className="text-center text-xl mb-2">Jakarta (JKTA) </div>
                <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
              </div>
            </li>
            <button className="bg-[#006769] w-[968px] shadow-xl h-[48px] rounded-b-md text-white hover:bg-[#006769]">
              Search for Flight
            </button>
          </ul>
        </div>
      </div>
      <div>Destinasi Favorit</div>
    </div>
  );
}
