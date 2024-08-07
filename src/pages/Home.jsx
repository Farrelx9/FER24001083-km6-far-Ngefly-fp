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
import { FaBaby, FaChild } from "react-icons/fa";
import { BsPersonRaisedHand } from "react-icons/bs";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AboutUs from "./AboutUs";
import bg1 from "../assets/images/bg1.jpg";
import bg2 from "../assets/images/bg2.jpg";
import bg3 from "../assets/images/bg3.jpg";
import Footer from "../assets/Properties/Footer";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [airportSuggestions, setAirportSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isReturnActive, setIsReturnActive] = useState(false);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [baby, setBaby] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(adult + child);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [isRotated, setIsRotated] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchText2, setSearchText2] = useState("");
  const [isDestinationReady, setIsDestinationReady] = useState(false);
  const [activeImage, setActiveImage] = useState(1);
  const navigate = useNavigate();
  const images = [bg1, bg2, bg3];
  const API_URL = process.env.API_URL;
  const [tempAdult, setTempAdult] = useState(adult);
  const [tempChild, setTempChild] = useState(child);
  const [tempBaby, setTempBaby] = useState(baby);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/airport`, {
        headers: {
          accept: "application/json",
        },
      });
      setAirportSuggestions(response.data.data);
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSelectSuggestion = (suggestion) => {
    setInputValue(
      `${suggestion.airport_code} - ${suggestion.city}(${suggestion.name})`
    );
    setShowModal(false);
  };

  const handleSelectSuggestion2 = (suggestion) => {
    setInputValue2(
      `${suggestion.airport_code} - ${suggestion.city}(${suggestion.name})`
    );
    setShowModal2(false);
  };

  const increment = (setter, value) => {
    setter(value + 1);
  };

  const decrement = (setter, value, min = 0) => {
    if (value > min) {
      setter(value - 1);
    }
  };

  const toggleRotation = () => {
    setIsRotated(!isRotated);
    let temp = inputValue;
    setInputValue(inputValue2);
    setInputValue2(temp);
  };

  const toggleReturnDate = () => {
    if (isReturnActive) {
      setEndDate(null);
    }
    setIsReturnActive(!isReturnActive);
  };

  const clearInputValue = () => {
    setInputValue("");
    setSearchText("");
  };

  const clearInputValue2 = () => {
    setInputValue2("");
    setSearchText2("");
  };
  const handleEndDateChange = (date) => {
    const adjustedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    setEndDate(adjustedDate);
    if (!startDate || adjustedDate < startDate) {
      setStartDate(adjustedDate);
    }
  };

  const handleStartDateChange = (date) => {
    const adjustedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    setStartDate(adjustedDate);
  };

  useEffect(() => {
    if (inputValue) {
      setIsDestinationReady(true);
    } else {
      setIsDestinationReady(false);
    }
  }, [inputValue]);

  const handleSearch = () => {
    if (
      !inputValue ||
      !inputValue2 ||
      !totalPassengers === 0 ||
      !selectedClass ||
      !startDate
    ) {
      toast.error("Please fill in all required fields ");
      return;
    }
    const setParams = {
      from: inputValue.split(" - ")[0],
      to: inputValue2.split(" - ")[0],
      p: totalPassengers,
      sc: selectedClass.toUpperCase().replace(" ", "_"),
      page: 1,
      ...(adult && { adult }),
      ...(child && { child }),
      ...(baby && { baby }),
    };

    const params = {
      ...setParams,
      ...(isReturnActive && { rt: "true" }),
      ...(isReturnActive && endDate && { rd: endDate.toISOString() }),
      ...(startDate && { d: startDate.toISOString() }),
    };

    const queryString = new URLSearchParams(params).toString();
    toast.success("Let me get your flight!");
    setTimeout(() => {
      navigate(`/search?${queryString}`);
    }, 2000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveImage((prevActiveImage) => (prevActiveImage % 3) + 1);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSavePassengers = () => {
    setAdult(tempAdult);
    setChild(tempChild);
    setBaby(tempBaby);
    setTotalPassengers(tempAdult + tempChild);
    setShowModal4(false);
  };

  return (
    <Fragment>
      <div className="bg-[#FFFFFF]">
        <ToastContainer />
        <Navbar />
        <div className="relative">
          <img
            src={images[activeImage - 1]}
            alt="Background"
            className=" w-full lg:h-[600px] md:h-[500px] h-[400px] object-cover rounded-b-xl"
          />
        </div>
        <div className="flex justify-center relative z-30 lg:bottom-[120px] md:bottom-[100px] bottom-[70px] ">
          <div className="shadow-2xl lg:rounded-lg md:rounded-xl rounded-2xl bg-[#FFFFFF] lg:w-[968px] md:w-[538px] w-[370px] lg:h-[298px] md:h-[448px] h-[438px] ">
            <div className="flex items-center font-semibold p-2 gap-1 mt-4 mb-6 lg:px-10 md:px-10 px-10">
              <div className="lg:text-2xl md:text-xl text-sm lg:w-[400px] md:w-[330px] w-[230px] ">
                Choose a Special Flight Schedule on
              </div>
              <div className="font-bold text-[#006769] lg:text-2xl md:text-xl text-sm lg:w-[15px] md:w-[10px] w-[5px]">
                Ngefly!
              </div>
            </div>
            <ul className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8 py-2 ">
              <li className="flex lg:gap-4 md:gap-8 gap-4 px-10 items-center relative">
                <MdOutlineFlight size={20} />
                <div className="text-sm">From</div>
                <div className="gap-2">
                  <input
                    type="text"
                    className="lg:w-[300px] md:w-[300px] w-[200px] h-[34px] text-sm font-semibold px-1 text-ellipsis"
                    placeholder="HND - Tokyo(Haneda Airport)"
                    value={inputValue}
                    onClick={() => setShowModal(true)}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setSearchText(e.target.value);
                    }}
                  />
                  <div className="lg:w-[300px] md:w-[300px] w-[200px] h-[1px] bg-gray-300"></div>
                </div>
                <TbSwitch3
                  size={20}
                  className={`absolute left-[100%] transform -translate-x-1/2 ${
                    isRotated ? "rotate-180 " : ""
                  } lg:top-[0%] lg:left-[100%] md:left-[89%] md:top-[20%] left-[92%] `}
                  onClick={toggleRotation}
                />
              </li>
              <li className="flex lg:gap-4 md:gap-8 gap-4 px-10 items-center">
                <RiFlightTakeoffFill size={20} />
                <div className="text-sm">Into</div>
                <div className="gap-2">
                  <input
                    type="text"
                    placeholder="HND - Tokyo(Haneda Airport)"
                    className="lg:w-[300px] md:w-[300px] w-[200px] lg:ms-0 md:ms-0 ms-1 h-[34px] text-sm font-semibold px-3 text-ellipsis"
                    value={inputValue2}
                    onClick={() => setShowModal2(true)}
                    onChange={(e) => {
                      setInputValue2(e.target.value);
                      setSearchText2(e.target.value);
                    }}
                  />
                  <div className="lg:w-[300px] md:w-[300px] w-[200px] lg:ms-0 md:ms-0 ms-2 h-[1px] bg-[#D0D0D0] "></div>
                </div>
              </li>
              <li className="flex lg:gap-4 md:gap-8 gap-4 px-10 items-center relative">
                <MdDateRange size={20} />
                <div className="text-sm">Date</div>
                <div className="gap-2">
                  <div className="text-sm mb-2">Departure</div>
                  <div
                    className="text-sm font-semibold mb-2"
                    onClick={() => setShowModal3(true)}
                  >
                    {startDate
                      ? startDate.toLocaleDateString("en-GB")
                      : "Select Date"}
                  </div>
                  <div className="lg:w-[140px] md:w-[140px] w-[90px] h-[1px] bg-[#D0D0D0]"></div>
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
                  <div className="lg:w-[140px] md:w-[140px] w-[90px] h-[1px] bg-[#D0D0D0]"></div>
                </div>
                <HiSwitchHorizontal
                  size={20}
                  className={`absolute lg:left-[90%] md:left-[83%] left-[84%]  bottom-[70%] transform -translate-x-1/2 cursor-pointer ${
                    isReturnActive ? "text-[#006769]" : "text-gray-400"
                  } `}
                  onClick={toggleReturnDate}
                />
              </li>
              <li className="flex lg:gap-4 md:gap-8 gap-4 px-10 items-center">
                <MdOutlineAirlineSeatReclineNormal size={20} />
                <div className="text-sm">Seat</div>
                <div className="gap-2">
                  <div className=" text-sm mb-2">Total</div>
                  <div
                    className=" text-sm font-semibold mb-2"
                    onClick={() => setShowModal4(true)}
                  >
                    {totalPassengers > 0
                      ? `${totalPassengers} Passengers`
                      : "Passengers"}
                  </div>
                  <div className="lg:w-[140px] md:w-[140px] w-[90px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
                <div className="gap-2">
                  <div className=" text-sm mb-2">Seat Class</div>
                  <div
                    className="text-sm font-semibold mb-2"
                    onClick={() => setShowModal5(true)}
                  >
                    {selectedClass}
                  </div>
                  <div className="lg:w-[140px] md:w-[140px] w-[90px] h-[1px] bg-[#D0D0D0] "></div>
                </div>
              </li>
              <button
                className="bg-[#40A578] lg:w-[968px] md:w-[538px] w-[370px] shadow-xl font-semibold text-lg h-[48px] lg:rounded-b-lg md:rounded-b-xl rounded-b-2xl text-white focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769] "
                onClick={handleSearch}
              >
                Search for Flight
              </button>
            </ul>
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="relative flex flex-col items-center p-2">
          <form className="flex w-full px-1 items-center gap-2">
            <IoSearchOutline
              size={17}
              className="absolute ml-2 mt-0 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search City or Airport Code"
              className="lg:w-[630px] md:w-[630px] w-[350px] h-[40px] border-2 border-gray-300 pl-8 p-2"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSearchText(e.target.value);
              }}
            />
            <FaDeleteLeft size={20} onClick={clearInputValue} />
          </form>
          <div
            className="w-full mt-4"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <div className="flex justify-between items-center px-2">
              <span className="font-semibold">Airport Suggestions</span>
            </div>
            <ul className="mt-2">
              {airportSuggestions
                .filter(
                  (airport) =>
                    airport.city
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    airport.airport_code
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    airport.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                )
                .map((airport, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center px-2 py-2 border-b border-gray-300 cursor-pointer lg:text-sm md:text-sm text-xs font-semibold"
                    onClick={() => handleSelectSuggestion(airport)}
                  >
                    <div className="flex gap-1 ">
                      <span>{airport.airport_code}</span>
                      <span>-</span>
                      <span>{airport.city}</span>
                      <span>({airport.name})</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Modal>
      <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <div className="relative flex flex-col items-center p-2">
          <form className="flex w-full px-1 items-center gap-2">
            <IoSearchOutline
              size={17}
              className="absolute ml-2 mt-0 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search City or Airport Code"
              className="lg:w-[630px] md:w-[630px] w-[350px] h-[40px] border-2 border-gray-300 pl-8 p-2"
              value={inputValue2}
              onChange={(e) => {
                setInputValue2(e.target.value);
                setSearchText2(e.target.value);
              }}
            />
            <FaDeleteLeft size={20} onClick={clearInputValue2} />
          </form>
          <div
            className="w-full mt-4"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <div className="flex justify-between items-center px-2">
              <span className="font-semibold">Airport Suggestions</span>
            </div>
            <ul className="mt-2">
              {airportSuggestions
                .filter(
                  (airport) =>
                    airport.city
                      .toLowerCase()
                      .includes(searchText2.toLowerCase()) ||
                    airport.airport_code
                      .toLowerCase()
                      .includes(searchText2.toLowerCase()) ||
                    airport.name
                      .toLowerCase()
                      .includes(searchText2.toLowerCase())
                )
                .map((airport, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center px-2 py-2 border-b border-gray-300 cursor-pointer lg:text-sm md:text-sm text-xs font-semibold "
                    onClick={() => handleSelectSuggestion2(airport)}
                  >
                    <div className="flex gap-1">
                      <span>{airport.airport_code}</span>
                      <span>-</span>
                      <span>{airport.city}</span>
                      <span>({airport.name})</span>
                    </div>
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
            onChange={(date) => {
              const adjustedDate = new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
              );
              setStartDate(adjustedDate);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            inline
            monthsShown={2}
            calendarClassName="tailwind-datepicker w-full"
            minDate={new Date()}
          />
        </div>
      </Modal>
      <Modal isVisible={showModal4} onClose={() => setShowModal4(false)}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-">
              <BsPersonRaisedHand size={20} />
              <span className="font-semibold lg:text-base md:text-base text-sm">
                Adult (12 years old above)
              </span>
            </div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border"
                onClick={() => decrement(setTempAdult, tempAdult, 1)}
              >
                -
              </button>
              <span className="px-4">{tempAdult}</span>
              <button
                className="px-2 py-1 border"
                onClick={() => increment(setTempAdult, tempAdult)}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaChild size={20} />
              <span className="font-semibold lg:text-base md:text-base text-sm">
                Child (2 - 11 years old)
              </span>
            </div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border"
                onClick={() => decrement(setTempChild, tempChild)}
              >
                -
              </button>
              <span className="px-4">{tempChild}</span>
              <button
                className="px-2 py-1 border"
                onClick={() => increment(setTempChild, tempChild)}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaBaby size={20} />
              <span className="font-semibold lg:text-base md:text-base text-sm">
                Baby (Under 2 years old)
              </span>
            </div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border"
                onClick={() => decrement(setTempBaby, tempBaby)}
              >
                -
              </button>
              <span className="px-4">{tempBaby}</span>
              <button
                className="px-2 py-1 border"
                onClick={() => increment(setTempBaby, tempBaby)}
              >
                +
              </button>
            </div>
          </div>
          <button
            className="bg-[#40A578] w-full py-2 text-white font-semibold rounded"
            onClick={handleSavePassengers}
          >
            Save
          </button>
        </div>
      </Modal>
      <Modal isVisible={showModal5} onClose={() => setShowModal5(false)}>
        <div className="p-4">
          {[
            { class: "Economy" },
            { class: "Premium Economy" },
            { class: "Business" },
            { class: "First Class" },
          ].map((seatClass) => (
            <div
              key={seatClass.class}
              className={`flex justify-between items-center text-black  mb-4 p-4 border ${
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
            Save
          </button>
        </div>
      </Modal>
      <Modal isVisible={showModal6} onClose={() => setShowModal6(false)}>
        <div className="relative flex items-center p-2 w-full">
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              const adjustedDate = new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
              );
              setEndDate(adjustedDate);
              if (!startDate || adjustedDate < startDate) {
                setStartDate(adjustedDate);
              }
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            inline
            monthsShown={2}
            calendarClassName="tailwind-datepicker w-full"
          />
        </div>
      </Modal>
      <div>
        <div className="lg:text-xl md:text-xl text-lg font-semibold lg:ms-20 md:ms-14 ms-6 lg:mb-2 md:mb-2 mb-0">
          Favorite Destination
        </div>
        <Carousel fromAirportCode={inputValue.split(" - ")[0]} />
      </div>
      <AboutUs />
      <Footer />
    </Fragment>
  );
}
1;
