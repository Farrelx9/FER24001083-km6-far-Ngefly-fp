import React, { Fragment } from "react";
import Navbar from "../assets/Properties/Navbar";
import { RiFlightTakeoffFill } from "react-icons/ri";
import {
  MdDateRange,
  MdOutlineAirlineSeatReclineNormal,
  MdOutlineFlight,
} from "react-icons/md";
import Carousel from "../assets/Properties/Carousel";
import Modal from "../assets/Properties/Modal";

export default function Home() {
  return (
    <Fragment>
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
          <div className="shadow-2xl rounded-lg bg-[#FFFFFF] w-[968px] h-[298px] ">
            <div className="flex text-2xl font-semibold p-2 gap-2 mt-4 mb-6 px-10">
              <div>Choose a Special Flight Schedule on</div>
              <div className="font-bold text-[#006769]">Ngefly!</div>
            </div>
            <ul className="grid grid-cols-2 gap-10 py-2 ">
              <li className="flex gap-4 px-10 items-center">
                <MdOutlineFlight size={20} />
                <div className="text-sm">From</div>
                <div className="gap-2">
                  <div className="text-xl mb-2">Jakarta (JKTA) </div>
                  <div className="w-[300px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
              </li>
              <li className="flex gap-4 px-10 items-center">
                <RiFlightTakeoffFill size={20} />
                <div className="text-sm">Into</div>
                <div className="gap-2">
                  <div className=" text-xl mb-2">Jakarta (JKTA) </div>
                  <div className="w-[300px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
              </li>
              <li className="flex gap-4 px-10 items-center">
                <MdDateRange size={20} />
                <div className="text-sm">Date</div>
                <div className="gap-2">
                  <div className=" text-sm mb-2">Departure</div>
                  <div className=" text-xl mb-2">5 Juni 2024 </div>
                  <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
                <div className="gap-2">
                  <div className=" text-sm mb-2">Return</div>
                  <div className=" text-[#006769] text-xl mb-2">
                    Pilih Tanggal
                  </div>
                  <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
              </li>
              <li className="flex gap-4 px-10 items-center">
                <MdOutlineAirlineSeatReclineNormal size={20} />
                <div className="text-sm">Seat</div>
                <div className="gap-2 ">
                  <div className=" text-sm mb-2">Passengers</div>
                  <div className=" text-xl mb-2">2 Penumpang </div>
                  <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
                <div className="gap-2">
                  <div className=" text-sm mb-2">Seat Class</div>
                  <div className="text-xl mb-2">Business</div>
                  <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
              </li>
              <button className="bg-[#006769] w-[968px] shadow-xl font-semibold text-lg h-[48px] rounded-b-lg text-white hover:bg-[#006769] ease-in-out duration-300 ">
                Search for Flight
              </button>
            </ul>
            <div className="text-xl mt-4 mb-10">Destinasi Favorit</div>
            <Carousel />
          </div>
        </div>
      </div>
      <Modal />
    </Fragment>
  );
}
