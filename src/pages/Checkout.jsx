import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../assets/Properties/Navbar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dateFormat } from "../lib/function";
import { Icon } from "@iconify/react";
import Footer from "../assets/Properties/Footer";

const Checkout = () => {
  const [pemesan, setPemesan] = useState("");
  const [flightData, setFlightData] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { flights_id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const token = localStorage.getItem("token");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const API_URL = process.env.API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [isIncludeReturn, setIsIncludeReturn] = useState(false);

  const params = {
    page: searchParams.get("page") || 1,
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    p:
      !isNaN(Number(searchParams.get("adult"))) ||
      !isNaN(Number(searchParams.get("child")))
        ? Number(searchParams.get("adult") || 0) +
          Number(searchParams.get("child") || 0)
        : searchParams.get("p") || 1,
    sc: searchParams.get("sc") || "",
    rt: searchParams.get("rt") || "",
    rd: searchParams.get("rd") || "",
    d: searchParams.get("d") || "",
    type: searchParams.get("type") || "",
    order: searchParams.get("order") || "",
  };

  const createParamsString = (newValue) => {
    const urlParams = new URLSearchParams({
      page: newValue?.page || params.page,
      from: newValue?.from || params.from,
      p: newValue?.p || params.p,
      sc: newValue?.sc || params.sc,
    });

    if (newValue?.to || params.to)
      urlParams.append("to", newValue?.to || params.to);
    if (newValue?.rt || params.rt)
      urlParams.append("rt", newValue?.rt || params.rt);
    if (newValue?.rd || params.rd)
      urlParams.append("rd", newValue?.rd || params.rd);
    if (newValue?.d || params.d) urlParams.append("d", newValue?.d || params.d);
    if (newValue?.type || params.type)
      urlParams.append("type", newValue?.type || params.type);
    if (newValue?.order || params.order)
      urlParams.append("order", newValue?.order || params.order);

    return urlParams.toString();
  };

  const paramsUrl = new URLSearchParams({
    ...(searchParams.get("baby") && {
      baby: Number(searchParams.get("baby")),
    }),
  });

  const toggleDarkMode = (index) => {
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        isDarkMode: !updatedPassengers[index].isDarkMode,
      };
      return updatedPassengers;
    });
  };

  const countAdultInUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("adult") || 0;
  };

  const countChildInUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("child") || 0;
  };

  const countBabyInUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("baby") || 0;
  };

  useEffect(() => {
    const fetchDataPemesan = async () => {
      try {
        const response = await axios.get(`${API_URL}/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPemesan(response.data.data);
      } catch (error) {
        toast.error("Error fetching data pemesan:", error);
      }
    };

    const fetchFlightData = async () => {
      if (!params.from || !params.p || !params.page || !params.sc) {
        toast.error("There is missing required search");
        return;
      }
      const urlParams = createParamsString(params);
      try {
        const response = await axios.get(`${API_URL}/flight?${urlParams}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const flight = response.data.data.flights;
        if (Array.isArray(flight)) {
          const filteredData = flight?.filter(
            (flight) => flight?.id === flights_id
          );
          setFlightData(filteredData);
        } else {
          toast.error("Error: Expected an array but got:", typeof flight);
        }
      } catch (error) {
        toast.error("Error fetching flight data:", error);
      }
    };

    fetchDataPemesan();
    fetchFlightData();
  }, [flights_id]);

  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTimeOut();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isSubmitted, timeLeft]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleTimeOut = () => {
    alert("Sorry, ordering time is up. Please do it again!");
    resetForm();
  };

  const resetForm = () => {
    setPassengers((prevPassengers) =>
      prevPassengers.map((passenger) => ({
        ...passenger,
        selectedTitle: "",
        fullName: "",
        familyName: "",
        birthdate: "",
        identity: "",
        citizenship: "",
        isDarkMode: false,
        type: passenger.type,
      }))
    );
    setIsSubmitted(false);
    setTimeLeft(15 * 60);
  };

  const handleSelectedTitle = (e, index, field) => {
    const value = e.target.value;
    setPassengers((prevState) => {
      const updatedPassengers = [...prevState];
      updatedPassengers[index][field] = value;
      return updatedPassengers;
    });
  };

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    setPassengers((prevState) => {
      const updatedPassengers = [...prevState];
      updatedPassengers[index][field] =
        field === "birthdate" ? moment(value).format("YYYY-MM-DD") : value;
      return updatedPassengers;
    });
  };

  const handleSubmitIsiDataPenumpang = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const includeReturn = params.rt === "true";
      const payload = {
        flight_class_id: flights_id,
        include_return: includeReturn,
        passengers: passengers.map((passenger) => ({
          name: passenger.familyName
            ? `${passenger.selectedTitle} ${passenger.fullName} (${passenger.familyName})`
            : `${passenger.selectedTitle} ${passenger.fullName}`,
          birthdate: passenger.birthdate,
          identity_id: passenger.identity,
          citizenship: passenger.citizenship,
          category: passenger.type,
        })),
      };
      const response = await axios.post(`${API_URL}/bookings/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.status === 201) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setPassengers((prevState) =>
          prevState.map((passenger) => ({
            ...passenger,
            isSubmitted: true,
          }))
        );
        const booking_id = response?.data?.data?.booking?.id;
        setBookingId(booking_id);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 500) {
          toast.error("Please fill in all input marked with a star.");
        } else {
          toast.error("Failed to connect to server. Please try again later.");
        }
      } else {
        toast.error(`${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToPayment = () => {
    if (bookingId) {
      navigate(`/payment/${bookingId}?${paramsUrl}`);
    } else {
      toast.error("Booking ID is not available.");
    }
  };

  useEffect(() => {
    setIsIncludeReturn(params.rt === "true");
  }, [params.rt]);

  const adultPrice = () => {
    const adult = countAdultInUrl();
    const price = flightData ? flightData[0]?.price : 0;
    return adult * price;
  };

  const childPrice = () => {
    const child = countChildInUrl();
    const price = (flightData ? flightData[0]?.price : 0) * ((100 - 5) / 100);
    return child * price;
  };

  const babyPrice = () => {
    const baby = countBabyInUrl();
    const price = 0;
    return baby * price;
  };

  const calculateTax = () => {
    const tax = (adultPrice() + childPrice()) * (5 / 100);
    return tax;
  };

  const calculateTotal = () => {
    let total = adultPrice() + childPrice() + calculateTax();
    if (params.rt === "true") {
      total = total * 2;
    }
    return total;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && navigate) {
      navigate("/login");
      alert("You've to Login First!");
    }
  }, [navigate]);

  const capitalizeWords = (str) => {
    const stringWithSpaces = str.replace(/_/g, " ");
    return stringWithSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const childCount = searchParams.get("child");
  const adultCount = searchParams.get("adult");

  useEffect(() => {
    const passengersArray = Array(params.p)
      .fill({})
      .map((_, index) => {
        const type = index < childCount ? "child" : "adult";
        return {
          selectedTitle: "",
          fullName: "",
          familyName: "",
          birthdate: "",
          identity: "",
          citizenship: "",
          isDarkMode: false,
          type: type,
        };
      });

    setPassengers(passengersArray);
  }, [childCount, adultCount, params.p]);

  const dataClick = () => {
    if (!isSubmitted) {
      toast.error("Please fill in passenger data.");
    } else {
      toast.error("Cannot fill in passenger data again after submission.");
    }
  };

  const payClick = () => {
    if (!isSubmitted) {
      toast.error("Fill in passenger data and pay first!");
    } else {
      toast.error("It's time to pay, please press the pay button!");
    }
  };

  const finishedClick = () => {
    if (!isSubmitted) {
      toast.error("Fill in passenger data and pay first!");
    } else if (isSubmitted) {
      toast.error("Press the pay button first!");
    }
  };

  return (
    <Fragment>
      <div className="bg-[#FFFFFF]">
        <Navbar />
        <div className="relative min-h-screen flex justify-between py-8 flex-col items-center p-4">
          <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-20 flex-wrap">
            <span
              className="text-black font-bold cursor-pointer"
              onClick={dataClick}
            >
              Data
            </span>
            <span className="text-[#8A8A8A] font-bold">›</span>
            <span
              className={`${
                isSubmitted ? "text-black" : "text-[#8A8A8A]"
              } font-bold cursor-pointer`}
              onClick={payClick}
            >
              Pay
            </span>
            <span className="text-[#8A8A8A] font-bold">›</span>
            <span
              className="text-[#8A8A8A] font-bold cursor-pointer"
              onClick={finishedClick}
            >
              Finished
            </span>
          </div>
          <div
            className={`w-full max-w-4xl ${
              isSubmitted ? "bg-[#73CA5C]" : "bg-[#FF0000]"
            } text-white p-3 mt-4 rounded-lg text-center`}
          >
            {isSubmitted
              ? "Your data has been successfully saved!"
              : `Finish in ${formatTime(timeLeft)}`}
          </div>
          <ToastContainer />
          <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-5 w-full max-w-4xl">
            <div className="w-full md:w-2/3 h-full">
              <div className="border-2 border-black p-5 mb-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Fill Order Data</h3>
                <div>
                  <div className="bg-black mb-4 flex justify-between text-white px-4 p-2 rounded-xl rounded-b-none">
                    <div>Orderer Data</div>
                    {isSubmitted && (
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 48 48"
                        >
                          <g fill="none" strokeLinejoin="round" strokeWidth={4}>
                            <path
                              fill="#73CA5C"
                              stroke="#73CA5C"
                              d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              d="M16 24L22 30L34 18"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="font-bold mb-1 text-[#006769]">Name</div>
                  <div
                    className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                    name="fullname"
                  >
                    {pemesan ? pemesan.name : "Loading..."}
                  </div>
                  <div className="font-bold mb-1 text-[#006769]">
                    Number Telephone
                  </div>
                  <div
                    className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                    name="notelp"
                  >
                    {pemesan ? `${pemesan.profile.phone}` : "Loading..."}
                  </div>
                  <div className="font-bold mb-1 text-[#006769]">Email</div>
                  <div
                    className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                    name="email"
                  >
                    {pemesan ? pemesan.email : "Loading..."}
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmitIsiDataPenumpang}>
                {passengers.map((passenger, index) => (
                  <>
                    <div
                      key={index + 1}
                      className="border-2 border-black p-5 mb-6 rounded-lg"
                    >
                      <h3 className="text-2xl font-bold mb-4">
                        Fill Passenger Data
                      </h3>
                      <div>
                        <div className="bg-black mb-4 flex justify-between text-white px-4 p-2 rounded-xl rounded-b-none">
                          <div>
                            Passenger Data {index + 1} - {passenger.type}
                          </div>
                          {isSubmitted && (
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 48 48"
                              >
                                <g
                                  fill="none"
                                  strokeLinejoin="round"
                                  strokeWidth={4}
                                >
                                  <path
                                    fill="#73CA5C"
                                    stroke="#73CA5C"
                                    d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
                                  ></path>
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    d="M16 24L22 30L34 18"
                                  ></path>
                                </g>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="font-bold mb-1 flex">
                          <p className="text-[#006769]">Title</p>
                          <p className="ml-1 text-[#FF0000]">*</p>
                        </div>
                        <div className="flex relative">
                          <select
                            className="border p-2 px-4 mb-3 rounded-md border-[#D0D0D0] w-full"
                            name={`selectedTitle-${index}`}
                            defaultValue=""
                            value={passenger.selectedTitle}
                            onChange={(e) =>
                              handleSelectedTitle(e, index, "selectedTitle")
                            }
                            disabled={isSubmitted}
                          >
                            <option value="" disabled hidden>
                              Choose Your Title
                            </option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                          </select>
                        </div>
                        <div className="font-bold mb-1 flex">
                          <p className="text-[#006769]">Name</p>
                          <p className="ml-1 text-[#FF0000]">*</p>
                        </div>
                        <input
                          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                          name={`fullname-${index}`}
                          placeholder="Fill Your Full Name"
                          value={passenger.fullName}
                          onChange={(e) =>
                            handleInputChange(e, index, "fullName")
                          }
                          readOnly={isSubmitted}
                        />
                        <div className="flex justify-between">
                          <div>Have a Family Name?</div>
                          <div
                            className={`slider ${
                              passenger.isDarkMode
                                ? "bg-[#006769]"
                                : " bg-[#8A8A8A]"
                            } w-12 h-6 rounded-full p-1 duration-200 mb-3`}
                            onClick={() => toggleDarkMode(index)}
                            disabled={isSubmitted}
                            style={{
                              transition: "transform 0.3s ease",
                            }}
                          >
                            <div
                              className={`rounded-full w-4 h-4 bg-white shadow-md transform 0.3s ease-in-out transition-transform duration-200 ${
                                passenger.isDarkMode ? "translate-x-6" : ""
                              }`}
                              style={{
                                transition: "transform 0.3s ease-in-out",
                              }}
                            ></div>
                          </div>
                        </div>
                        {passenger.isDarkMode && (
                          <>
                            <div className="font-bold mb-1 text-[#006769]">
                              Family Name
                            </div>
                            <input
                              className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                              name={`familyName-${index}`}
                              placeholder="Fill Your Family Name"
                              value={passenger.familyName}
                              onChange={(e) =>
                                handleInputChange(e, index, "familyName")
                              }
                              readOnly={isSubmitted}
                            />
                          </>
                        )}
                        <div className="font-bold mb-1 flex">
                          <p className="text-[#006769]">Date Birth</p>
                          <p className="ml-1 text-[#FF0000]">*</p>
                        </div>
                        <input
                          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                          name={`birthdate-${index}`}
                          placeholder="yyyy/mm/dd"
                          type="date"
                          value={passenger.birthdate}
                          onChange={(e) =>
                            handleInputChange(e, index, "birthdate")
                          }
                          readOnly={isSubmitted}
                        />
                        <div className="font-bold mb-1 flex">
                          <p className="text-[#006769]">Citizenship</p>
                          <p className="ml-1 text-[#FF0000]">*</p>
                        </div>
                        <input
                          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                          name={`citizenship-${index}`}
                          placeholder="Fill Your Nation"
                          value={passenger.citizenship}
                          onChange={(e) =>
                            handleInputChange(e, index, "citizenship")
                          }
                          readOnly={isSubmitted}
                        />
                        <div className="font-bold mb-1 flex">
                          <p className="text-[#006769]">Identity ID</p>
                          <p className="ml-1 text-[#FF0000]">*</p>
                        </div>
                        <input
                          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                          name={`identity-${index}`}
                          placeholder="Ex: NIK (Indonesia)"
                          value={passenger.identity}
                          onChange={(e) =>
                            handleInputChange(e, index, "identity")
                          }
                          readOnly={isSubmitted}
                        />
                      </div>
                    </div>
                  </>
                ))}
                <button
                  type="submit"
                  className={`${
                    isSubmitted ? "bg-[#D0D0D0]" : "bg-[#006769]"
                  }  text-white rounded-lg text-xl p-3 w-full`}
                  disabled={isSubmitted || isLoading}
                >
                  {isLoading ? (
                    <Icon
                      icon="eos-icons:loading"
                      width={30}
                      className="flex items-center justify-center mx-auto"
                    />
                  ) : isSubmitted ? (
                    "Submitted"
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
            <div className="w-full md:w-1/2 h-full p-4 rounded-lg">
              <h3 className="mb-3 text-xl font-bold text-[#151515] mr-2">
                Flight Details
              </h3>
              <div className="space-y-2">
                {flightData.length > 0 ? (
                  <>
                    {isIncludeReturn && (
                      <h4 className="mb-2 text-lg font-bold">Flight Away</h4>
                    )}
                    <div className="space-y-0">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-lg text-[#151515] mr-2">
                          {flightData
                            ? dateFormat(
                                flightData[0]?.flight?.departureAt
                              ).format("HH:mm")
                            : "Loading..."}
                        </div>
                        <div className="font-extrabold text-[#73CA5C]">
                          Departure
                        </div>
                      </div>
                      <div className="text-gray-600">
                        {flightData
                          ? dateFormat(
                              flightData[0]?.flight?.departureAt
                            ).format("DD MMMM YYYY")
                          : "Loading..."}
                      </div>
                      <div className="text-[#151515]">
                        {flightData
                          ? flightData[0]?.flight?.from?.name
                          : "Loading..."}
                      </div>
                    </div>
                    <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
                    <div className="space-y-0">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-lg text-[#151515] mr-2">
                          {flightData
                            ? dateFormat(
                                flightData[0]?.flight?.arriveAt
                              ).format("HH:mm")
                            : "Loading..."}
                        </div>
                        <div className="font-extrabold text-[#73CA5C]">
                          Arrive
                        </div>
                      </div>
                      <div className="text-gray-600">
                        {flightData
                          ? dateFormat(flightData[0]?.flight?.arriveAt).format(
                              "DD MMMM YYYY"
                            )
                          : "Loading..."}
                      </div>
                      <div className="text-[#151515]">
                        {flightData
                          ? flightData[0]?.flight?.to?.name
                          : "Loading..."}
                      </div>
                    </div>
                    {isIncludeReturn && (
                      <>
                        <div className="flex justify-center w-full !my-5">
                          <Icon
                            icon="humbleicons:exchange-horizontal"
                            width={25}
                            color="#8c8c8c"
                          />
                        </div>
                        <h4 className="mb-2 text-lg font-bold">
                          Flight Return
                        </h4>
                        <div className="space-y-0">
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-lg text-[#151515] mr-2">
                              {flightData
                                ? dateFormat(
                                    flightData[0]?.flight?.return_departureAt
                                  ).format("HH:mm")
                                : "Loading..."}
                            </div>
                            <div className="font-extrabold text-[#73CA5C]">
                              Departure
                            </div>
                          </div>
                          <div className="text-gray-600">
                            {flightData
                              ? dateFormat(
                                  flightData[0]?.flight?.return_departureAt
                                ).format("DD MMMM YYYY")
                              : "Loading..."}
                          </div>
                          <div className="text-[#151515]">
                            {flightData
                              ? flightData[0]?.flight?.to?.name
                              : "Loading..."}
                          </div>
                        </div>
                        <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
                        <div className="space-y-0">
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-lg text-[#151515] mr-2">
                              {flightData
                                ? dateFormat(
                                    flightData[0]?.flight?.return_arriveAt
                                  ).format("HH:mm")
                                : "Loading..."}
                            </div>
                            <div className="font-extrabold text-[#73CA5C]">
                              Arrive
                            </div>
                          </div>
                          <div className="text-gray-600">
                            {flightData
                              ? dateFormat(
                                  flightData[0]?.flight?.return_arriveAt
                                ).format("DD MMMM YYYY")
                              : "Loading..."}
                          </div>
                          <div className="text-[#151515]">
                            {flightData
                              ? flightData[0]?.flight?.from?.name
                              : "Loading..."}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="max-w-3xl border-t border-gray-600 py-1">
                      <div className="text-[#006769] pl-12 text-lg font-extrabold">
                        {flightData
                          ? flightData[0]?.flight?.plane?.airline
                          : "Loading..."}{" "}
                        -{" "}
                        {flightData[0]?.name
                          ? capitalizeWords(flightData[0]?.name.toLowerCase())
                          : "Loading..."}
                      </div>
                      <div className="text-[#006769] pl-12 text-lg font-extrabold mb-1">
                        {flightData
                          ? flightData[0]?.flight?.plane?.plane_code
                          : "Loading..."}
                      </div>
                      <div className="flex">
                        <div className="ml-12">
                          <div className="text-gray-600">Information:</div>
                          <ul className="list-disc pl-5 text-gray-600">
                            <li>
                              Baggage{" "}
                              {flightData
                                ? flightData[0]?.flight?.plane?.baggage
                                : "Loading..."}{" "}
                              kg
                            </li>
                            <li>
                              Cabin baggage{" "}
                              {flightData
                                ? flightData[0]?.flight?.plane?.cabin_baggage
                                : "Loading..."}{" "}
                              kg
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="w-full max-w-3xl border-t border-gray-600"></div>
                  </>
                ) : (
                  <p>No flight data found.</p>
                )}
                <div>
                  <h4 className="font-bold text-lg mb-1">Price Details</h4>
                  <div className="flex justify-between text-gray-600">
                    {countAdultInUrl() !== 0 && (
                      <>
                        <div>{countAdultInUrl()} Adult</div>
                        <div>IDR {numberWithCommas(adultPrice())}</div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between text-gray-600">
                    {countChildInUrl() !== 0 && (
                      <>
                        <div>{countChildInUrl()} Child</div>
                        <div>IDR {numberWithCommas(childPrice())}</div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between text-gray-600">
                    {countBabyInUrl() !== 0 && (
                      <>
                        <div>{countBabyInUrl()} Baby</div>
                        <div>IDR {numberWithCommas(babyPrice())}</div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <div>Tax</div>
                    <div>Rp {numberWithCommas(calculateTax())}</div>
                  </div>
                  <div className="w-full max-w-3xl border-t border-gray-600 mt-2"></div>
                  <div className="flex justify-between font-semibold text-lg mt-2">
                    <div className="font-extrabold text-[#151515]">Total</div>
                    <div className="font-extrabold text-[#006769]">
                      Rp {numberWithCommas(calculateTotal())}
                    </div>
                  </div>
                  {isIncludeReturn && (
                    <div className="mb-2 text-justify text-red-500">
                      Note: Include return selected. The price will be
                      automatically doubled.
                    </div>
                  )}
                </div>
                {isSubmitted && (
                  <button
                    type="button"
                    onClick={handleNavigateToPayment}
                    className="bg-[#FF0000] text-white rounded-lg text-xl p-3 w-full"
                  >
                    Pay
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};
export default Checkout;
