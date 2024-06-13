import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../assets/Properties/Navbar";
import { RiFlightTakeoffFill } from "react-icons/ri";
import {
  MdDateRange,
  MdOutlineAirlineSeatReclineNormal,
  MdOutlineFlight,
} from "react-icons/md";
import { TbSwitch3 } from "react-icons/tb";
import { HiSwitchHorizontal } from "react-icons/hi";
import Carousel from "../assets/Properties/Carousel";
import Modal from "../assets/Properties/Modal";
import { IoSearchOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/styles/datepicker.css";
import axios from "axios";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Jakarta",
    "Bandung",
    "Surabaya",
  ]);
  const [recentSearches2, setRecentSearches2] = useState([
    "Jakarta",
    "Bandung",
    "Surabaya",
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [isReturnActive, setIsReturnActive] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(1);
  const [totalPassengers, setTotalPassengers] = useState(
    adults + children + infants
  );
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [isRotated, setIsRotated] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://binar-project-backend-staging.vercel.app/api/v1/flight?`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data);
      const flight = response.data.data;
      if (Array.isArray(flight)) {
      } else {
        console.error("Expected flight to be an array but got");
      }
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  };

  const handleDeleteSearch = (index) => {
    const newSearches = [...recentSearches];
    newSearches.splice(index, 1);
    setRecentSearches(newSearches);
  };

  const handleDeleteSearch2 = (index) => {
    const newSearches = [...recentSearches];
    newSearches.splice(index, 1);
    setRecentSearches2(newSearches);
  };

  const handleClearSearches = () => {
    setRecentSearches([]);
  };

  const handleClearSearches2 = () => {
    setRecentSearches2([]);
  };

  const increment = (setter, value) => {
    setter(value + 1);
  };

  const decrement = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const toggleReturnDate = () => {
    if (isReturnActive) {
      setEndDate(null);
    }
    setIsReturnActive(!isReturnActive);
  };

  useEffect(() => {
    setTotalPassengers(adults + children + infants);
  }, [adults, children, infants]);

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
            <ul className="grid grid-cols-2 gap-8 py-2 ">
              <li className="flex gap-4 px-10 items-center relative">
                <MdOutlineFlight size={20} />
                <div className="text-sm">From</div>
                <div className="gap-2">
                  <input
                    type="text"
                    className="w-[300px] h-[34px] text-sm font-semibold px-1"
                    placeholder=" Jakarta (JKTA)"
                    onClick={() => setShowModal(true)}
                  />
                  <div className="w-[300px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
                <TbSwitch3
                  size={20}
                  className={`absolute left-[100%] transform -translate-x-1/2 ${
                    isRotated ? "rotate-180 " : ""
                  }`}
                  onClick={toggleRotation}
                />
              </li>
              <li className="flex gap-4 px-10 items-center">
                <RiFlightTakeoffFill size={20} />
                <div className="text-sm">Into</div>
                <div className="gap-2">
                  <input
                    type="text"
                    placeholder="Jakarta (JKTA)"
                    className="w-[300px] h-[34px] text-sm font-semibold px-2 "
                    onClick={() => setShowModal2(true)}
                  />
                  <div className="w-[300px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
              </li>
              <li className="flex gap-4 px-10 items-center relative">
                <MdDateRange size={20} />
                <div className="text-sm">Date</div>
                <div className="gap-2">
                  <div className="text-sm mb-2">Departure</div>
                  <div
                    className="text-sm font-semibold mb-2"
                    onClick={() => setShowModal3(true)}
                  >
                    {startDate.toLocaleDateString("en-GB")}
                  </div>
                  <div className="w-[140px] h-[1px] bg-[#D0D0D0]"></div>
                </div>
                <div className={`gap-2 ${isReturnActive ? "" : "opacity-50"}`}>
                  <div className="text-sm mb-2">Return</div>
                  <div
                    className="text-[#006769] text-sm font-semibold mb-2 cursor-pointer"
                    onClick={isReturnActive ? () => setShowModal6(true) : null}
                  >
                    {endDate
                      ? endDate.toLocaleDateString("en-GB")
                      : "Select Date"}
                  </div>
                  <div className="w-[140px] h-[1px] bg-[#D0D0D0]"></div>
                </div>
                <HiSwitchHorizontal
                  size={20}
                  className={`absolute left-[90%] bottom-[70%] transform -translate-x-1/2 cursor-pointer ${
                    isReturnActive ? "text-[#006769]" : "text-gray-400"
                  }`}
                  onClick={toggleReturnDate}
                />
              </li>
              <li className="flex gap-4 px-10 items-center">
                <MdOutlineAirlineSeatReclineNormal size={20} />
                <div className="text-sm">Seat</div>
                <div className="gap-2">
                  <div className=" text-sm mb-2">Total</div>
                  <div
                    className=" text-sm font-semibold mb-2"
                    onClick={() => setShowModal4(true)}
                  >
                    {totalPassengers} Passengers
                  </div>
                  <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
                <div className="gap-2">
                  <div className=" text-sm mb-2">Seat Class</div>
                  <div
                    className="text-sm font-semibold mb-2"
                    onClick={() => setShowModal5(true)}
                  >
                    {selectedClass}
                  </div>
                  <div className="w-[140px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
              </li>
              <button className="bg-[#40A578] w-[968px] shadow-xl font-semibold text-lg h-[48px] rounded-b-lg text-white focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769] ">
                Search for Flight
              </button>
            </ul>
            <div className="text-xl mt-4 mb-10">Favorite Destination</div>
            <Carousel />
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="relative flex flex-col items-center p-2">
          <form className="flex w-full px-1">
            <IoSearchOutline
              size={17}
              className="absolute ml-2 mt-3 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Masukkan Kota atau Negara"
              className="w-[630px] h-[40px] border-2 border-gray-300 pl-8 p-2"
            />
          </form>
          <div className="w-full mt-4">
            <div className="flex justify-between items-center px-2">
              <span className="font-semibold">Recent Searches</span>
              <button className="text-red-500" onClick={handleClearSearches}>
                Delete
              </button>
            </div>
            <ul className="mt-2">
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-2 py-1 border-b border-gray-200"
                >
                  <span>{search}</span>
                  <button
                    className="text-gray-500"
                    onClick={() => handleDeleteSearch(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
      <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <div className="relative flex flex-col items-center p-2">
          <form className="flex w-full px-1">
            <IoSearchOutline
              size={17}
              className="absolute ml-2 mt-3 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Masukkan Kota atau Negara"
              className="w-[630px] h-[40px] border-2 border-gray-300 pl-8 p-2"
            />
          </form>
          <div className="w-full mt-4">
            <div className="flex justify-between items-center px-2">
              <span className="font-semibold">Recent Searches</span>
              <button className="text-red-500" onClick={handleClearSearches2}>
                Delete
              </button>
            </div>
            <ul className="mt-2">
              {recentSearches2.map((search, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-2 py-1 border-b border-gray-200"
                >
                  <span>{search}</span>
                  <button
                    className="text-gray-500"
                    onClick={() => handleDeleteSearch2(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
      <Modal isVisible={showModal3} onClose={() => setShowModal3(false)}>
        <div className="relative flex items-center p-2 w-full">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
            monthsShown={2}
            calendarClassName="tailwind-datepicker w-full"
          />
        </div>
      </Modal>
      <Modal isVisible={showModal4} onClose={() => setShowModal4(false)}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Dewasa (12 tahun keatas)</span>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border"
                onClick={() => decrement(setAdults, adults)}
              >
                -
              </button>
              <span className="px-4">{adults}</span>
              <button
                className="px-2 py-1 border"
                onClick={() => increment(setAdults, adults)}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Anak (2 - 11 tahun)</span>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border"
                onClick={() => decrement(setChildren, children)}
              >
                -
              </button>
              <span className="px-4">{children}</span>
              <button
                className="px-2 py-1 border"
                onClick={() => increment(setChildren, children)}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Bayi (Dibawah 2 tahun)</span>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border"
                onClick={() => decrement(setInfants, infants)}
              >
                -
              </button>
              <span className="px-4">{infants}</span>
              <button
                className="px-2 py-1 border"
                onClick={() => increment(setInfants, infants)}
              >
                +
              </button>
            </div>
          </div>
          <button
            className="bg-[#40A578] w-full py-2 text-white font-semibold rounded"
            onClick={() => setShowModal4(false)}
          >
            Simpan
          </button>
        </div>
      </Modal>
      <Modal isVisible={showModal5} onClose={() => setShowModal5(false)}>
        <div className="p-4">
          {[
            { class: "Economy", price: "IDR 4,950,000" },
            { class: "Premium Economy", price: "IDR 7,550,000" },
            { class: "Business", price: "IDR 29,220,000" },
            { class: "First Class", price: "IDR 87,620,000" },
          ].map((seatClass) => (
            <div
              key={seatClass.class}
              className={`flex justify-between items-center text-black   mb-4 p-2 border ${
                selectedClass === seatClass.class
                  ? "bg-[#40A578] text-white"
                  : "bg-white"
              } cursor-pointer`}
              onClick={() => setSelectedClass(seatClass.class)}
            >
              <div>
                <span className="font-semibold">{seatClass.class}</span>
                <div>{seatClass.price}</div>
              </div>
              {selectedClass === seatClass.class && (
                <span className="text-white">✔</span>
              )}
            </div>
          ))}
          <button
            className="bg-[#40A578] w-full py-2 text-white font-semibold rounded"
            onClick={() => setShowModal5(false)}
          >
            Simpan
          </button>
        </div>
      </Modal>
      <Modal isVisible={showModal6} onClose={() => setShowModal6(false)}>
        <div className="relative flex items-center p-2 w-full">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            inline
            monthsShown={2}
            calendarClassName="tailwind-datepicker w-full"
          />
        </div>
      </Modal>
    </Fragment>
  );
}
