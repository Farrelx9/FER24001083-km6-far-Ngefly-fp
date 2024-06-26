import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { FaQrcode } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Navbar from "../assets/Properties/Navbar";
import Footer from "../assets/Properties/Footer";
import { dateFormat } from "../lib/function";

import { ToastContainer, toast } from "react-toastify";

const PaymentMethod = ({
  title,
  children,
  onClick,
  isOpen,
  Icon,
  middleContent,
}) => {
  const navigate = useNavigate();

  const handlePayLater = () => {
    navigate("/");
  };

  return (
    <div className="border border-gray-300 rounded-lg">
      <button
        onClick={onClick}
        className={`w-full text-white py-3 rounded-t-lg flex justify-between items-center px-4 text-lg ${
          isOpen ? "bg-[#006769]" : "bg-[#3C3C3C]"
        }`}
      >
        <div className="flex items-center">
          <Icon className="mr-2 text-xl" />
          <span>{title}</span>
        </div>
        <span>
          {isOpen ? (
            <IoIosArrowUp className="text-xl" />
          ) : (
            <IoIosArrowDown className="text-xl" />
          )}
        </span>
      </button>
      <div
        className={`transition-all duration-500 ${
          isOpen ? "max-h-screen p-4" : "max-h-0"
        } overflow-hidden`}
      >
        <div className="text-lg">{children}</div>
        {isOpen && (
          <div className="p-4">
            {/* Middle Content */}
            <div className="my-4">{middleContent}</div>

            {/* Pay Later Button */}
            <button
              onClick={handlePayLater}
              className="w-full bg-[#40A578] text-white py-3 rounded-lg"
            >
              Back To Home{" "}
            </button>
          </div>
          // </div>
        )}
      </div>
    </div>
  );
};

const Payment = () => {
  const { booking_id } = useParams();
  const navigate = useNavigate(); // Correct usage inside the functional component
  const [showQRIS, setShowQRIS] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState(null);
  const API_URL = process.env.API_URL;

  useEffect(() => {
    if (
      bookingData &&
      bookingData.payment &&
      bookingData.payment.status !== "ISSUED" && // Hanya mulai countdown jika status bukan "ISSUED"
      bookingData.payment.expiredAt
    ) {
      const expiredAt = new Date(bookingData.payment.expiredAt).getTime();
      const now = new Date().getTime();
      const initialCountdown = Math.max(
        0,
        Math.floor((expiredAt - now) / 1000)
      );
      setCountdown(initialCountdown);

      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // Hentikan countdown jika status pembayaran berubah menjadi "ISSUED"
      setCountdown(0);
      // Redirect ke halaman konfirmasi tiket jika status pembayaran berubah menjadi "ISSUED"
      if (
        bookingData &&
        bookingData.payment &&
        bookingData.payment.status === "ISSUED"
      ) {
        navigate(`/ticketconfirm/${bookingData.payment_id}`);
      }
    }
  }, [bookingData, navigate]);

  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/bookings/${booking_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log("Successfully retrieved booking data:", response.data);
          setBookingData(response.data.data);
          toast.success("Booking data retrieved successfully!");
        } else {
          console.log("Booking data not found.");
          setError("Booking data not found.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Booking data not found.");
          setError("Booking data not found.");
          toast.error("Booking data not found.");
        } else {
          console.error("Error fetching booking data:", error);
          toast.error("You've to Login First!");
        }
      }
    };
    fetchBookingData();
  }, [booking_id]);

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const adultCount =
    (bookingData?.passengers.filter(
      (passenger) => passenger?.category?.type === "adult"
    ).length || 0) * bookingData?.flight_class.price;

  const childCount =
    (bookingData?.passengers.filter(
      (passenger) => passenger?.category?.type === "child"
    ).length || 0) *
    (bookingData?.flight_class.price * ((100 - 5) / 100));

  const babyCount =
    (bookingData?.passengers.filter(
      (passenger) => passenger?.category?.type === "baby"
    ).length || 0) * bookingData?.flight_class.price;

  const tax = (adultCount + childCount + babyCount || 0) * (5 / 100);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && navigate) {
      navigate("/login");
      toast.error("You've to Login First!");
    }
  }, [navigate]);

  return (
    <Fragment>
      <div className="bg-white min-h-screen flex flex-col items-center p-4">
        {/* Navbar */}
        <ToastContainer />
        <Navbar />
        <div className="w-full max-w-8xl border-t border-gray-300 mt-20"></div>
        {/* Steps */}
        <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-5 cursor-pointer">
          <span className="text-black font-extrabold">Data</span>
          <span className="text-black font-extrabold">›</span>
          <span className="text-black font-extrabold">Pay</span>
          <span className="text-black font-extrabold">›</span>
          <span className="text-[#8A8A8A] font-extrabold">Finished</span>
        </div>

        <div className="w-full max-w-3xl bg-red-600 text-white p-3 mt-4 rounded-lg text-center">
          {error ? (
            <h4>{error}</h4>
          ) : (
            <>
              {bookingData && bookingData.payment && (
                <>
                  {bookingData.payment.status === "CANCELLED" ? (
                    <h4>Payment already expired.</h4>
                  ) : (
                    <>
                      {countdown !== null ? (
                        <h4>
                          Complete payment in {formatCountdown(countdown)}
                        </h4>
                      ) : (
                        <h4>Loading countdown...</h4>
                      )}

                      {bookingData.payment.status !== "ISSUED" &&
                        bookingData.payment.expiredAt && (
                          <>
                            {new Date(bookingData.payment.expiredAt).getTime() <
                            new Date().getTime() ? (
                              <div className="mt-2 text-sm text-red-900">
                                Sorry, time for payment has expired.
                              </div>
                            ) : (
                              <div className="mt-2 text-sm font-bold text-gray-900">
                                Please complete payment before the deadline
                                which is determined.
                              </div>
                            )}
                          </>
                        )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-10 w-full max-w-4xl mb-20">
          <div className="w-full md:w-2/3">
            <div className="bg-gray-100 rounded-lg p-6 shadow-md">
              <h3 className="text-3xl font-serif font-extrabold text-gray-700 text-center">
                PAYMENT
              </h3>
            </div>

            <div className="space-y-4"></div>

            <div className="space-y-4">
              <PaymentMethod
                title="QRIS"
                onClick={() => setShowQRIS(!showQRIS)}
                isOpen={showQRIS}
                Icon={FaQrcode}
              >
                <div className="space-y-2">
                  <p>Scan the following QR code to pay:</p>
                  <div className="flex justify-center">
                    {bookingData &&
                    bookingData.payment &&
                    bookingData.payment.status !== "CANCELLED" ? (
                      <img
                        src={bookingData.payment.qr_url}
                        alt="QR Code"
                        className="w-60 h-60"
                      />
                    ) : null}
                  </div>
                </div>
              </PaymentMethod>
            </div>
          </div>

          {/* Summary section */}
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
            {/* Booking code */}
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-extrabold text-[#151515] mr-2">
                Booking ID:
              </h3>
              <h3 className="text-xl font-bold text-[#006769]">{booking_id}</h3>
            </div>

            {/* Flight details */}
            <div className="space-y-4">
              {/* Departure details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-[#151515] mr-2">
                    {bookingData
                      ? dateFormat(
                          bookingData?.flight_class?.flight?.departureAt
                        ).format("HH:mm")
                      : "Loading..."}
                  </div>
                  <div className="font-extrabold text-[#9DDE8B]">Departure</div>
                </div>
                <div className="text-gray-600">
                  {bookingData
                    ? dateFormat(
                        bookingData?.flight_class?.flight?.departureAt
                      ).format("DD MMMM YYYY")
                    : "Loading..."}
                </div>
                <div className="text-[#151515]">
                  {bookingData
                    ? bookingData?.flight_class?.flight?.from?.name
                    : "Loading..."}
                </div>
              </div>
              <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>

              {/* Arrival details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-[#151515] mr-2">
                    {bookingData
                      ? dateFormat(
                          bookingData?.flight_class?.flight?.arriveAt
                        ).format("HH:mm")
                      : "Loading..."}
                  </div>
                  <div className="font-extrabold text-[#9DDE8B]">Arrive</div>
                </div>
                <div className="text-gray-600">
                  {bookingData
                    ? dateFormat(
                        bookingData?.flight_class?.flight?.arriveAt
                      ).format("DD MMMM YYYY")
                    : "Loading..."}
                </div>
                <div className="text-[#151515]">
                  {bookingData
                    ? bookingData?.flight_class?.flight?.to?.name
                    : "Loading..."}
                </div>
              </div>

              {/* Additional flight details */}
              <div className="max-w-3xl border-t border-gray-600 mt-4 pl-8 py-4">
                <div className="text-[#151515] font-extrabold">
                  {bookingData
                    ? bookingData?.flight_class?.flight?.plane?.airline
                    : "Loading..."}
                  -{" "}
                  {bookingData?.flight_class?.name
                    ? capitalizeWords(
                        bookingData?.flight_class.name.toLowerCase()
                      )
                    : "Loading..."}
                </div>
                <div className="text-[#151515] font-extrabold mb-4">
                  {bookingData
                    ? bookingData?.flight_class?.flight?.plane?.plane_code
                    : "Loading..."}
                </div>
                <div className="text-gray-600">Informasi:</div>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>
                    Baggage{" "}
                    {bookingData
                      ? bookingData?.flight_class?.flight?.plane?.baggage
                      : "Loading..."}{" "}
                    kg
                  </li>
                  <li>
                    Cabin baggage{" "}
                    {bookingData
                      ? bookingData?.flight_class?.flight?.plane?.cabin_baggage
                      : "Loading..."}{" "}
                    kg
                  </li>
                </ul>
              </div>

              {/* Price details */}
              <div className="w-full max-w-3xl border-t border-gray-600 mt-4 pl-4"></div>
              <div>
                <h4 className="font-extrabold mb-2 pl-4">Price details</h4>

                {adultCount > 0 && (
                  <div className="flex justify-between pl-4 text-gray-600">
                    <span className="text-md text-[#151515]">
                      {bookingData?.passengers.filter(
                        (passenger) => passenger?.category?.type === "adult"
                      ).length || 0}{" "}
                      Adults
                    </span>
                    <span className="text-md text-[#151515]">
                      Rp {adultCount.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}

                {childCount > 0 && (
                  <div className="flex justify-between pl-4 text-gray-600">
                    <span className="text-md text-[#151515]">
                      {bookingData?.passengers.filter(
                        (passenger) => passenger?.category?.type === "child"
                      ).length || 0}{" "}
                      Child
                    </span>
                    <span className="text-md text-[#151515]">
                      Rp {childCount.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}

                {babyCount > 0 && (
                  <div className="flex justify-between pl-4 text-gray-600">
                    <span className="text-md text-[#151515]">
                      Rp{" "}
                      {bookingData?.passengers.filter(
                        (passenger) => passenger?.category?.type === "baby"
                      ).length || 0}{" "}
                      Baby
                    </span>
                    <span className="text-md text-[#151515]">
                      Rp {babyCount.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}

                <div className="flex justify-between pl-4 text-gray-600">
                  <span className="text-md text-[#151515]">Tax</span>
                  <span className="text-md text-[#151515]">
                    Rp {tax.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>

                <div className="flex justify-between pl-4 mt-4 text-[#151515]">
                  <span className="text-md font-extrabold">Total</span>
                  <span className="text-md font-extrabold text-[#006769]">
                    Rp {bookingData?.total_price.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Payment;
