import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { FaQrcode } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Navbar from "../assets/Properties/Navbar";
import Footer from "../assets/Properties/Footer";
import moment from "moment";
// import Notification from "../pages/Notification.jsx"; // Impor komponen notifikasi
// const flights_id = "ca1efdeb-c588-4add-94b4-eab1a42dcf25";

const PaymentMethod = ({
  title,
  children,
  onClick,
  isOpen,
  Icon,
  onConfirmPayment,
  onPayLater,
  middleContent,
}) => (
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
        <div className="flex flex-col space-y-4 mt-4">
          <button
            onClick={onConfirmPayment}
            className="w-full bg-[#006769] text-white py-3 rounded-lg"
          >
            Cek Status Pembayaran
          </button>

          {/* Separator with "or" */}
          <div className="flex items-center my-4">
            <div className="border-t border-gray-300 flex-grow" />
            <span className="mx-2 text-gray-500">or</span>
            <div className="border-t border-gray-300 flex-grow" />
          </div>

          {/* Pay Later Button */}
          <button
            onClick={onPayLater}
            className="w-full bg-[#40A578] text-white py-3 rounded-lg"
          >
            Bayar Nanti
          </button>
        </div>
      </div>
    )}
  </div>
);

const Payment = () => {
  // const { flights_id } = useParams();
  const flights_id = "d32d9883-004f-4406-824d-16fb1f768a14";
  const booking_id = "1af91650-78b8-4b31-9f59-996038e4259c";
  const [showQRIS, setShowQRIS] = useState(false);
  // const [taxData, setTaxData] = useState(null);
  const [flightData, setFlightData] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  // const [adultCount, setAdultCount] = useState(1);
  // const [childCount, setChildCount] = useState(0);
  // const [babyCount, setBabyCount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");

  // const queryParams = new URLSearchParams(location?.search);
  // const from = queryParams.get("from") || "UPG";
  // const p = queryParams.get("p") || 1;
  // const sc = queryParams.get("sc") || "ECONOMY";
  // const page = queryParams.get("page") || 1;

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(
          `https://binar-project-426902.et.r.appspot.com/api/v1/flight?from=HLP&p=1&sc=FIRST_CLASS&page=1`,
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

  const handleConfirmPayment = async () => {
    try {
      const payment_id = "5320e389-75b5-447f-b302-4c4852b9ce0a"; // Replace with actual payment ID
      const response = await axios.put(
        `https://binar-project-426902.et.r.appspot.com/api/v1/payments/${payment_id}`,
        { status: "PAID" }
      );
      console.log("Payment confirmed:", response.data);
      alert("Payment successful!");
      window.location.reload(); // Refresh the page upon successful payment
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Error confirming payment. Please try again.");
    }
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getPaymentDeadline = () => {
    const now = new Date();
    const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return deadline.toLocaleDateString("id-ID", options);
  };

  // const handleAdultChange = (e) => {
  //   setAdultCount(parseInt(e.target.value));
  // };

  // const handleChildChange = (e) => {
  //   setChildCount(parseInt(e.target.value));
  // };

  // const handleBabyChange = (e) => {
  //   setBabyCount(parseInt(e.target.value));
  // };

  return (
    <Fragment>
      <div className="bg-white min-h-screen flex flex-col items-center">
        {/* Navbar */}
        <Navbar />

        {/* Steps */}
        <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-10 flex-wrap">
          <span className="text-black font-bold">Isi Data Diri</span>
          <span className="text-[#8A8A8A] font-bold">›</span>
          <span className="text-black font-bold">Bayar</span>
          <span className="text-[#8A8A8A] font-bold">›</span>
          <span className="text-[#8A8A8A] font-bold">Selesai</span>
        </div>

        {/* Success Message */}
        <div className="w-full max-w-3xl bg-red-600 text-white p-3 mt-4 rounded-lg text-center">
          <p>Selesaikan Pembayaran sampai {getPaymentDeadline()}</p>
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
                onConfirmPayment={handleConfirmPayment}
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
              {/* <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
              <div>
                <h4 className="font-extrabold mb-2 pl-4">Rincian Harga</h4>
                <div className="flex justify-between pl-4 text-gray-600">
                  <span className="text-sm">Dewasa x{adultCount}</span>
                  <span className="text-sm">
                    Rp{" "}
                    {(
                      (flightData?.flight_classes[0]?.price || 0) * adultCount
                    ).toLocaleString("id-ID")}
                  </span> */}
              {/* <div>IDR {calculateTotal().toLocaleString("id-ID")}</div> */}
              {/* </div>
                <div className="flex justify-between pl-4 text-gray-600">
                  <span className="text-sm">Anak x{childCount}</span>
                  <span className="text-sm">
                    Rp{" "}
                    {(
                      (flightData?.flight_classes?.price || 0) * childCount
                    ).toLocaleString("id-ID")}
                  </span> */}
              {/* <div>{childCount} Anak-anak</div>
                  <div>IDR {calculateTotal().toLocaleString("id-ID")}</div> */}
              {/* </div>
                <div className="flex justify-between pl-4 text-gray-600">
                  <span className="text-sm">Bayi x{babyCount}</span>
                  <span className="text-sm">
                    Rp{" "}
                    {(
                      (flightData?.flight_classes?.price || 0) *
                      babyCount *
                      0.5
                    ).toLocaleString("id-ID")}
                  </span> */}
              {/* <div>{babyCount} Bayi</div>
                  <div>IDR 0</div> */}
              {/* </div>
                <div className="flex justify-between pl-4 text-gray-600">
                  <span className="text-sm">Pajak</span>
                  <span className="text-sm">
                    Rp{" "}
                    {(
                      ((taxData?.percent || 0) *
                        (flightData?.flight_classes?.price || 0)) /
                      100
                    ).toLocaleString("id-ID")}
                  </span> */}
              {/* <div>Pajak</div>
                  Rp{calculateTotal().toLocaleString("id-ID")}{" "} */}
              {/* </div>
                <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
                <div className="flex justify-between pl-4 font-extrabold text-[#151515]">
                  <span>Total Harga</span>
                  <span>Rp {calculateTotal().toLocaleString("id-ID")}</span> */}
              {/* <div>Total</div>
                  Rp{calculateTotal().toLocaleString("id-ID")} */}
              {/* </div>
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
