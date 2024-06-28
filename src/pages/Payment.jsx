import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { FaQrcode } from "react-icons/fa";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Navbar from "../assets/Properties/Navbar";
import Footer from "../assets/Properties/Footer";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { countDetailAmount, dateFormat, formatCurrency } from "../lib/function";
// import Notification from "../pages/Notification.jsx"; // Impor komponen notifikasi
// const flights_id = "ca1efdeb-c588-4add-94b4-eab1a42dcf25";

const PaymentMethod = ({
  title,
  children,
  onClick,
  isOpen,
  Icon,
  onConfirmPayment,
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
      </div>
      {isOpen && (
        <div className="p-4">
          {/* Middle Content */}
          <div className="my-4">{middleContent}</div>

          {/* Confirm Payment Button */}
          {/* <div className="flex flex-col space-y-4 mt-4">
            <button
              onClick={onConfirmPayment}
              className="w-full bg-[#006769] text-white py-3 rounded-lg"
            >
              Bayar
            </button> */}

          {/* Separator with "or" */}
          {/* <div className="flex items-center my-4">
              <div className="border-t border-gray-300 flex-grow" />
              <span className="mx-2 text-gray-500">or</span>
              <div className="border-t border-gray-300 flex-grow" />
            </div> */}

          {/* Pay Later Button */}
          <button
            onClick={handlePayLater}
            className="w-full bg-[#40A578] text-white py-3 rounded-lg"
          >
            Bayar Nanti
          </button>
        </div>
        // </div>
      )}
    </div>
  );
};

const Payment = () => {
  // const { flights_id } = useParams();
  // const flights_id = "deb189c5-686c-406d-8ef6-a0b4438aa06d";
  const flights_id = "0f189bbd-74b9-4e89-9bef-f7daaf58afe7";
  const booking_id = "2575459f-be3f-462e-b673-33c94e2c0af0";
  const navigate = useNavigate(); // Correct usage inside the functional component
  const [showQRIS, setShowQRIS] = useState(false);
  // const [passengerData, setPassengerData] = useState([]);
  const [taxData, setTaxData] = useState({});
  // const [taxData, setTaxData] = useState(null);
  const [flightData, setFlightData] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  // const [adultCount, setAdultCount] = useState(1);
  // const [childCount, setChildCount] = useState(0);
  // const [babyCount, setBabyCount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");
  // const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds
  const [countdown, setCountdown] = useState(0);
  // // const payment_id = "fe39d2ac-ba57-4f6d-bb41-50bcbef2eff9"; // Replace with the actual payment ID
  // const [data, setData] = useState({ percent: 0 }); // Inisialisasi dengan nilai default

  // const queryParams = new URLSearchParams(location?.search);
  // const from = queryParams.get("from") || "UPG";
  // const p = queryParams.get("p") || 1;
  // const sc = queryParams.get("sc") || "ECONOMY";
  // const page = queryParams.get("page") || 1;

  // useEffect(() => {
  //   const savedCountdown = localStorage.getItem("countdown");
  //   const savedTimestamp = localStorage.getItem("timestamp");

  //   if (savedCountdown && savedTimestamp) {
  //     const timePassed = Math.floor((Date.now() - savedTimestamp) / 1000);
  //     const remainingTime = savedCountdown - timePassed;
  //     setCountdown(remainingTime > 0 ? remainingTime : 0);
  //   }

  //   const timer = setInterval(() => {
  //     setCountdown((prevCountdown) => {
  //       if (prevCountdown <= 0) {
  //         clearInterval(timer);
  //         return 0;
  //       }
  //       const newCountdown = prevCountdown - 1;
  //       localStorage.setItem("countdown", newCountdown);
  //       localStorage.setItem("timestamp", Date.now());
  //       return newCountdown;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  // const formatCountdown = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  // };

  // useEffect(() => {
  //   // Assuming bookingData.payment.expiredAt contains the expiration date in ISO format
  //   if (bookingData && bookingData.payment && bookingData.payment.expiredAt) {
  //     const expiredAt = new Date(bookingData.payment.expiredAt).getTime();
  //     const now = new Date().getTime();
  //     const initialCountdown = Math.max(
  //       0,
  //       Math.floor((expiredAt - now) / 1000)
  //     );
  //     setCountdown(initialCountdown);

  //     const timer = setInterval(() => {
  //       setCountdown((prevCountdown) => {
  //         if (prevCountdown <= 0) {
  //           clearInterval(timer);
  //           return 0;
  //         }
  //         return prevCountdown - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }
  // }, [bookingData]);

  // const formatCountdown = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  // };

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

  const amount = countDetailAmount();
  // useEffect(() => {
  //   if (
  //     bookingData &&
  //     bookingData.payment &&
  //     bookingData.payment.status === "ISSUE" &&
  //     bookingData.payment.expiredAt
  //   ) {
  //     const expiredAt = new Date(bookingData.payment.expiredAt).getTime();
  //     const now = new Date().getTime();
  //     const initialCountdown = Math.max(
  //       0,
  //       Math.floor((expiredAt - now) / 1000)
  //     );
  //     setCountdown(initialCountdown);

  //     const timer = setInterval(() => {
  //       setCountdown((prevCountdown) => {
  //         if (prevCountdown <= 0) {
  //           clearInterval(timer);
  //           return 0;
  //         }
  //         return prevCountdown - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }
  // }, [bookingData]);

  // const formatCountdown = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  // };

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(
          `https://binar-project-426902.et.r.appspot.com/api/v1/flight?from=CGK&p=1&sc=ECONOMY&page=1`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response.data);
        const flight = response.data.data.flights; // Adjust this based on actual structure
        console.log("response.data.data", response.data.data.flights);
        if (Array?.isArray(flight)) {
          // Memfilter data penerbangan berdasarkan flights_id
          const filteredData = flight.filter(
            (flight) => flight?.id === flights_id
          );
          setFlightData(filteredData);
          console.log("Filtered flight data:", filteredData);
        } else {
          console.error("Error: Expected an array but got:", typeof flight);
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    const fetchBookingData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://binar-project-426902.et.r.appspot.com/api/v1/bookings/${booking_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookingData(response.data.data);
        console.log("response booking data", response.data.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    // const fetchTaxData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://binar-project-426902.et.r.appspot.com/api/v1/tax`,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     setTaxData(response.data.data);
    //   } catch (error) {
    //     console.error("Error fetching tax data:", error);
    //   }
    // };

    // fetchTaxData();
    fetchFlightData();
    fetchBookingData();
  }, [booking_id, flights_id]);
  // , from, p, sc, page

  // const calculateTotal = () => {
  //   if (!flightData || !taxData || !bookingData) return 0;

  //   const basePrice = flightData?.flight_classes?.price || 0;
  //   const totalBasePrice =
  //     basePrice * (adultCount + childCount + babyCount * 0.5); // Assuming baby counts as half price

  //   const taxPercent = taxData?.percent || 0;
  //   const taxAmount = (taxPercent * totalBasePrice) / 100;

  //   return totalBasePrice + taxAmount;
  // };

  // const handleConfirmPayment = async () => {
  //   try {
  //     const payment_id = "5320e389-75b5-447f-b302-4c4852b9ce0a"; // Replace with actual payment ID
  //     const response = await axios.put(
  //       `https://binar-project-426902.et.r.appspot.com/api/v1/payments/${payment_id}`,
  //       { status: "PAID" }
  //     );
  //     console.log("Payment confirmed:", response.data);
  //     alert("Payment successful!");
  //     window.location.reload(); // Refresh the page upon successful payment
  //   } catch (error) {
  //     console.error("Error confirming payment:", error);
  //     alert("Error confirming payment. Please try again.");
  //   }
  // };

  // const handleConfirmPayment = async () => {
  //   try {
  //     const payment_id = "5320e389-75b5-447f-b302-4c4852b9ce0a"; // Ganti dengan ID pembayaran yang sebenarnya
  //     const response = await axios.put(
  //       `https://binar-project-426902.et.r.appspot.com/api/v1/payments/${payment_id}`,
  //       { status: "PAID" }
  //     );
  //     console.log("Payment confirmed:", response.data);
  //     alert("Pembayaran berhasil!");
  //     navigate("/tickectconfirm"); // Mengarahkan pengguna ke halaman konfirmasi tiket
  //   } catch (error) {
  //     console.error("Error confirming payment:", error);
  //     alert("Gagal mengonfirmasi pembayaran. Silakan coba lagi.");
  //   }
  // };

  // const handleConfirmPayment = async () => {
  //   try {
  //     const payment_id = "06a19b23-5276-475f-b516-213a21018e99"; // Replace with the actual payment ID
  //     const response = await axios.put(
  //       `https://binar-project-426902.et.r.appspot.com/api/v1/payments/${payment_id}`,
  //       { status: "PAID" }
  //     );
  //     console.log("Payment confirmed:", response.data);
  //     toast.success("Pembayaran berhasil!");

  //     const ticketId = response.data.ticketId; // Assuming the response contains a ticketId
  //     navigate(`/ticketconfirm/${payment_id}`); // Redirect with the correct path
  //   } catch (error) {
  //     console.error("Error confirming payment:", error);
  //     if (error.response && error.response.status === 404) {
  //       toast.error(
  //         "Pembayaran tidak ditemukan. Silakan melakukan pemesanan kembali."
  //       );
  //     } else {
  //       toast.error(
  //         "Gagal mengonfirmasi pembayaran. Silakan melakukan pemesanan kembali."
  //       );
  //     }
  //   }
  // };

  // const calculateTotal = () => {
  //   const adultCount = bookingData.passengers.filter(
  //     (p) => p.type === "adult"
  //   ).length;
  //   const childCount = bookingData.passengers.filter(
  //     (p) => p.type === "child"
  //   ).length;
  //   const babyCount = bookingData.passengers.filter(
  //     (p) => p.type === "infant"
  //   ).length;
  //   const flightClassPrice = bookingData.flight_class.price || 0;

  //   const adultPrice = flightClassPrice * adultCount;
  //   const childPrice = flightClassPrice * childCount;
  //   const infantPrice = flightClassPrice * babyCount * 0.5;
  //   const tax = ((taxData.data.percent || 0) * flightClassPrice) / 100;

  //   return adultPrice + childPrice + infantPrice + tax;
  // };

  // if (!bookingData) {
  //   return <div>Loading...</div>;
  // }

  // const adultCount = bookingData.passengers.filter(
  //   (p) => p.type === "adult"
  // ).length;
  // const childCount = bookingData.passengers.filter(
  //   (p) => p.type === "child"
  // ).length;
  // const babyCount = bookingData.passengers.filter(
  //   (p) => p.type === "infant"
  // ).length;

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // const getPaymentDeadline = () => {
  //   const now = new Date();
  //   const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
  //   const options = {
  //     day: "2-digit",
  //     month: "long",
  //     year: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   };
  //   return deadline.toLocaleDateString("id-ID", options);
  // };

  // const handleAdultChange = (e) => {
  //   setAdultCount(parseInt(e.target.value));
  // };

  // const handleChildChange = (e) => {
  //   setChildCount(parseInt(e.target.value));
  // };

  // const handleBabyChange = (e) => {
  //   setBabyCount(parseInt(e.target.value));
  // };
  // useEffect(() => {
  //   // Fetch or set booking data here
  //   // Example:
  //   setBookingData({
  //     flight_class: { price: 3400000 },
  //     tax: { percent: 10 },
  //     qr_url: "https://example.com/qr-code-url", // contoh qr_url
  //     passengers: [
  //       { type: "adult", count: 2 },
  //       { type: "child", count: 1 },
  //       { type: "baby", count: 1 },
  //     ],
  //   });
  // }, []);

  // const formatCurrency = (value) => {
  //   return value.toLocaleString("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //   });
  // };

  // const calculatePrice = (count, price) => {
  //   return count * price;
  // };

  // if (!bookingData || !bookingData.passengers) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Fragment>
      <div className="bg-white min-h-screen flex flex-col items-center">
        {/* Navbar */}
        <ToastContainer />
        <Navbar />
        <div className="w-full max-w-8xl border-t border-gray-300 mt-20"></div>

        {/* Steps */}
        <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-40 flex-wrap">
          <span className="text-black font-bold">Isi Data Diri</span>
          <span className="text-[#8A8A8A] font-bold">›</span>
          <span className="text-black font-bold">Bayar</span>
          <span className="text-[#8A8A8A] font-bold">›</span>
          <span className="text-[#8A8A8A] font-bold">Selesai</span>
        </div>

        {/* Success Message */}
        {/* <div className="w-full max-w-3xl bg-red-600 text-white p-3 mt-4 rounded-lg text-center">
          <div>
            {countdown !== null ? (
              <div>
                <h4>
                  Selesaikan pembayaran dalam {formatCountdown(countdown)}
                </h4>
              </div>
            ) : (
              "Loading countdown..."
            )}{" "}
          </div>
        </div> */}
        <div className="w-full max-w-3xl bg-red-600 text-white p-3 mt-4 rounded-lg text-center">
          {bookingData && bookingData.payment && (
            <>
              {bookingData.payment.status === "CANCELLED" ? (
                <h4>Pembayaran telah dibatalkan.</h4>
              ) : (
                <>
                  {countdown !== null ? (
                    <h4>
                      Selesaikan pembayaran dalam {formatCountdown(countdown)}
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
                            Maaf, waktu untuk pembayaran telah habis.
                          </div>
                        ) : (
                          <div className="mt-2 text-sm font-bold text-gray-900">
                            Harap selesaikan pembayaran sebelum batas waktu yang
                            ditentukan.
                          </div>
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
            <h3 className="text-xl font-semibold mb-4">Isi Data Pembayaran</h3>
            <div className="space-y-4"></div>
            {/* Payment method section */}
            <div className="space-y-4">
              <PaymentMethod
                title="QRIS"
                onClick={() => setShowQRIS(!showQRIS)}
                isOpen={showQRIS}
                Icon={FaQrcode}
                // onConfirmPayment={handleConfirmPayment}
              >
                <div className="space-y-2">
                  <p>Scan QR code berikut untuk membayar:</p>
                  <div className="flex justify-center">
                    {bookingData ? (
                      <img
                        src={bookingData.payment.qr_url}
                        alt="QR Code"
                        className="w-60 h-60"
                      />
                    ) : (
                      "Loading QR code..."
                    )}
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
              <h3 className="text-xl font-bold text-[#7126B5]">{booking_id}</h3>
            </div>

            {/* Flight details */}
            <div className="space-y-4">
              {/* Departure details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-[#151515] mr-2">
                    {flightData
                      ? moment(flightData[0]?.flight?.departureAt).format(
                          "HH:mm"
                        )
                      : "Loading..."}
                  </div>
                  <div className="font-extrabold text-[#9DDE8B]">
                    Keberangkatan
                  </div>
                </div>
                <div className="text-gray-600">
                  {flightData
                    ? moment(flightData[0]?.flight?.departureAt).format(
                        "DD MMMM YYYY"
                      )
                    : "Loading..."}
                </div>
                <div className="text-[#151515]">
                  {flightData
                    ? flightData[0]?.flight?.from?.name
                    : "Loading..."}
                </div>
              </div>
              <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>

              {/* Arrival details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-[#151515] mr-2">
                    {flightData
                      ? moment(flightData[0]?.flight?.arriveAt).format("HH:mm")
                      : "Loading..."}
                  </div>
                  <div className="font-extrabold text-[#9DDE8B]">
                    Kedatangan
                  </div>
                </div>
                <div className="text-gray-600">
                  {flightData
                    ? moment(flightData[0]?.flight?.arriveAt).format(
                        "DD MMMM YYYY"
                      )
                    : "Loading..."}
                </div>
                <div className="text-[#151515]">
                  {flightData ? flightData[0]?.flight?.to?.name : "Loading..."}
                </div>
              </div>

              {/* Additional flight details */}
              <div className="max-w-3xl border-t border-gray-600 mt-4 pl-8 py-4">
                <div className="text-[#151515] font-extrabold">
                  {flightData
                    ? flightData[0]?.flight?.plane?.airline
                    : "Loading..."}{" "}
                  -{" "}
                  {flightData[0]?.name
                    ? capitalizeWords(flightData[0]?.name.toLowerCase())
                    : "Loading..."}
                </div>
                <div className="text-[#151515] font-extrabold mb-4">
                  {flightData
                    ? flightData[0]?.flight?.plane?.plane_code
                    : "Loading..."}
                </div>
                <div className="text-gray-600">Informasi:</div>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>
                    Bagasi{" "}
                    {flightData
                      ? flightData[0]?.flight?.plane?.baggage
                      : "Loading..."}{" "}
                    kg
                  </li>
                  <li>
                    Bagasi kabin{" "}
                    {flightData
                      ? flightData[0]?.flight?.plane?.cabin_baggage
                      : "Loading..."}{" "}
                    kg
                  </li>
                  {/* <li>
                    Hiburan di Pesawat (
                    {flightData
                      ? flightData.plane.in_flight_entertainment
                        ? "Tersedia"
                        : "Tidak Tersedia"
                      : "Loading..."}
                    )
                  </li> */}
                </ul>
              </div>

              {/* Price details */}
              <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
              {/* <div>
                <h4 className="font-extrabold mb-2 pl-4">Rincian Harga</h4>
                <div className="flex justify-between pl-4 text-gray-600">
                  <span className="text-sm">Dewasa x{adultCount}</span>
                  <span className="text-sm">
                    Rp{" "}
                    {(
                      (flightData?.flight_classes[0]?.price || 0) * adultCount
                    ).toLocaleString("id-ID")}
                  </span>
                  <div>IDR {calculateTotal().toLocaleString("id-ID")}</div>
                </div>
                <div className="flex justify-between pl-4 text-gray-600">
                  <span className="text-sm">Anak x{childCount}</span>
                  <span className="text-sm">
                    Rp{" "}
                    {(
                      (flightData?.flight_classes?.price || 0) * childCount
                    ).toLocaleString("id-ID")}
                  </span>
                  <div>{childCount} Anak-anak</div>
                  <div>IDR {calculateTotal().toLocaleString("id-ID")}</div>
                </div>
                <div className="flex justify-between pl-4 text-gray-600">
                  <span className="text-sm">Bayi x{babyCount}</span>
                  <span className="text-sm">
                    Rp{" "}
                    {(
                      (flightData?.flight_classes?.price || 0) *
                      babyCount *
                      0.5
                    ).toLocaleString("id-ID")}
                  </span>
                  <div>{babyCount} Bayi</div>
                  <div>IDR 0</div>
                </div>
                <div className="flex justify-between pl-4 text-gray-600">
                  <span className="text-sm">Pajak</span>
                  <span className="text-sm">
                    Rp{" "}
                    {(
                      ((taxData?.percent || 0) *
                        (flightData?.flight_classes?.price || 0)) /
                      100
                    ).toLocaleString("id-ID")}
                  </span>
                  <div>Pajak</div>
                  Rp{calculateTotal().toLocaleString("id-ID")}{" "}
                </div>
                <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
                <div className="flex justify-between pl-4 font-extrabold text-[#151515]">
                  <span>Total Harga</span>
                  <span>Rp {calculateTotal().toLocaleString("id-ID")}</span>
                  <div>Total</div>
                  Rp{calculateTotal().toLocaleString("id-ID")}
                </div>
              </div> */}
              {/* <div>
                {bookingData.passengers.map((passenger) => {
                  let price = calculatePrice(
                    passenger.count,
                    bookingData.flight_class.price
                  );
                  if (passenger.type === "baby") {
                    price *= 0.5; // Assume baby tickets are half price
                  }
                  return (
                    <div
                      key={passenger.type}
                      className="flex justify-between items-center"
                    >
                      <p>
                        {passenger.count}{" "}
                        {passenger.type.charAt(0).toUpperCase() +
                          passenger.type.slice(1)}
                      </p>
                      <p>{formatCurrency(price)}</p>
                    </div>
                  );
                })}
              </div> */}
              {/* <div className="mt-4">
                <h4 className="text-lg font-semibold">Detail Harga</h4>
                <div className="mb-2">
                  <h4 className="font-extrabold mb-2">Rincian Harga</h4>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Dewasa x{adultCount}</span>
                    <span className="text-sm">
                      Rp{" "}
                      {(
                        (flightData[0].flight_classes[0].price || 0) *
                        adultCount
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Anak x{childCount}</span>
                    <span className="text-sm">
                      Rp{" "}
                      {(
                        (flightData[0].flight_classes[0].price || 0) *
                        childCount
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Bayi x{babyCount}</span>
                    <span className="text-sm">
                      Rp{" "}
                      {(
                        (flightData[0].flight_classes[0].price || 0) *
                        babyCount *
                        0.5
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Pajak</span>
                    <span className="text-sm">
                      Rp{" "}
                      {(
                        ((taxData?.percent || 0) *
                          (flightData[0].flight_classes[0].price || 0)) /
                        100
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
                <div className="flex justify-between font-extrabold text-[#151515] mt-4">
                  <span>Total Harga</span>
                  <span>Rp {calculateTotal().toLocaleString("id-ID")}</span>
                </div>
              </div> */}
              {/* <div className="mt-4">
                <h4 className="text-lg font-semibold">Detail Harga</h4>
                <div className="mb-2">
                  <h4 className="font-extrabold mb-2">Rincian Harga</h4>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Dewasa x{adultCount}</span>
                    <span className="text-sm">
                      Rp{" "}
                      {(
                        (bookingData.flight_class.price || 0) * adultCount
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Anak x{childCount}</span>
                    <span className="text-sm">
                      Rp{" "}
                      {(
                        (bookingData.flight_class.price || 0) * childCount
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Bayi x{babyCount}</span>
                    <span className="text-sm">
                      Rp{" "}
                      {(
                        (bookingData.flight_class.price || 0) *
                        babyCount *
                        0.5
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-sm">Pajak</span>
                    <span className="text-sm">
                      Rp{" "}
                      {(
                        ((bookingData.tax.percent || 0) *
                          (bookingData.flight_class.price || 0)) /
                        100
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
                <div className="flex justify-between font-extrabold text-[#151515] mt-4">
                  <span>Total Harga</span>
                  <span>Rp {calculateTotal().toLocaleString("id-ID")}</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Payment;
