// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaQrcode } from "react-icons/fa";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// const PaymentMethod = ({ title, children, onClick, isOpen, Icon }) => (
//   <div className="border border-gray-300 rounded-lg">
//     <button
//       onClick={onClick}
//       className={`w-full text-white py-3 rounded-t-lg flex justify-between items-center px-4 text-lg ${
//         isOpen ? "bg-[#006769]" : "bg-[#3C3C3C]"
//       }`}
//     >
//       <div className="flex items-center">
//         <Icon className="mr-2 text-xl" />
//         <span>{title}</span>
//       </div>
//       <span>
//         {isOpen ? (
//           <IoIosArrowUp className="text-xl" />
//         ) : (
//           <IoIosArrowDown className="text-xl" />
//         )}
//       </span>
//     </button>
//     <div
//       className={`transition-all duration-500 ${
//         isOpen ? "max-h-screen p-4" : "max-h-0"
//       } overflow-hidden`}
//     >
//       <div className="text-lg">{children}</div>
//     </div>
//   </div>
// );

// const Payment = ({ flightId }) => {
//   const [showQRIS, setShowQRIS] = useState(false);
//   const [taxData, setTaxData] = useState(null);
//   const [flightData, setFlightData] = useState(null);

//   const toggleQRIS = () => setShowQRIS(!showQRIS);

//   useEffect(() => {
//     const fetchTaxData = async () => {
//       try {
//         const response = await axios.get(
//           "https://binar-project-backend-staging.vercel.app/api/tax"
//         );
//         setTaxData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching tax data:", error);
//       }
//     };

//     const fetchFlightData = async () => {
//       try {
//         const response = await axios.get(
//           `https://binar-project-backend-staging.vercel.app/api/flights/${flightId}`
//         );
//         setFlightData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching flight data:", error);
//       }
//     };

//     fetchTaxData();
//     fetchFlightData();
//   }, [flightId]);

//   const calculateTotal = () => {
//     const basePrice = 9550000; // base price for 2 adults and 1 baby
//     const taxAmount = taxData ? (taxData.percent * basePrice) / 100 : 0;
//     return basePrice + taxAmount;
//   };

//   const getPaymentDeadline = () => {
//     const now = new Date();
//     const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
//     const options = {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return deadline.toLocaleDateString("id-ID", options);
//   };

//   return (
//     <div className="bg-white min-h-screen flex flex-col items-center p-4">
//       {/* Header */}
//       <header className="w-full max-w-4xl flex items-center justify-between p-4 flex-wrap">
//         <div className="flex items-center space-x-2">
//           <img src="path-to-logo" alt="Tiketku Logo" className="w-16 h-auto" />{" "}
//           {/* Replace with actual logo path */}
//           <div className="text-2xl font-bold text-purple-600">Tiketku</div>
//         </div>
//         <input
//           type="text"
//           placeholder="Cari di sini ..."
//           className="p-2 w-full md:w-1/3 border rounded mt-2 md:mt-0"
//         />
//       </header>

//       <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>

//       {/* Steps */}
//       <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-4 flex-wrap">
//         <span className="text-black font-bold">Isi Data Diri</span>
//         <span className="text-[#8A8A8A] font-bold">›</span>
//         <span className="text-black font-bold">Bayar</span>
//         <span className="text-[#8A8A8A] font-bold">›</span>
//         <span className="text-[#8A8A8A] font-bold">Selesai</span>
//       </div>

//       {/* Success Message */}
//       <div className="w-full max-w-3xl bg-red-600 text-white p-3 mt-4 rounded-lg text-center">
//         <p>Selesaikan Pembayaran sampai {getPaymentDeadline()}</p>
//       </div>

//       <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>

//       <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-10 w-full max-w-4xl">
//         <div className="w-full md:w-2/3">
//           <h3 className="text-xl font-semibold mb-4">Isi Data Pembayaran</h3>
//           <div className="space-y-4">
//             <PaymentMethod
//               title="QRIS"
//               onClick={toggleQRIS}
//               isOpen={showQRIS}
//               Icon={FaQrcode}
//             >
//               <div className="space-y-2">
//                 <p>Scan QR code berikut untuk membayar:</p>
//                 <div className="flex justify-center">
//                   <img
//                     src="path-to-qr-code"
//                     alt="QR Code"
//                     className="w-40 h-40"
//                   />{" "}
//                   {/* Replace with actual QR code path */}
//                 </div>
//                 <button className="w-full bg-[#006769] text-white py-3 mt-4 rounded-lg">
//                   Konfirmasi Pembayaran
//                 </button>
//               </div>
//             </PaymentMethod>
//           </div>
//         </div>

//         <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg">
//           <div className="flex items-center mb-4">
//             <h3 className="text-xl font-extrabold text-[#151515] mr-2">
//               Booking Code:
//             </h3>
//             <h3 className="text-xl font-bold text-[#7126B5]">{flightId}</h3>
//           </div>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="font-extrabold text-[#151515] mr-2">
//                   {flightData ? flightData.departureAt : "Loading..."}
//                 </div>
//                 <div className="font-extrabold text-[#9DDE8B]">
//                   Keberangkatan
//                 </div>
//               </div>
//               <div className="text-gray-600">
//                 {flightData ? flightData.departureAt : "Loading..."}
//               </div>
//               <div className="text-[#151515]">
//                 {flightData
//                   ? `${flightData.from.name} - ${flightData.from.airport_code}`
//                   : "Loading..."}
//               </div>
//             </div>
//             <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="font-extrabold text-[#151515] mr-2">
//                   {flightData ? flightData.arriveAt : "Loading..."}
//                 </div>
//                 <div className="font-extrabold text-[#9DDE8B]">Kedatangan</div>
//               </div>
//               <div className="text-gray-600">
//                 {flightData ? flightData.arriveAt : "Loading..."}
//               </div>
//               <div className="text-[#151515]">
//                 {flightData ? flightData.to.name : "Loading..."}
//               </div>
//             </div>
//             <div className="max-w-3xl border-t border-gray-600 mt-4 pl-8 py-4">
//               <div className="text-[#151515] font-extrabold">
//                 {flightData ? flightData.plane.airline : "Loading..."} -{" "}
//                 {flightData ? flightData.class : "Loading..."}
//               </div>
//               <div className="text-[#151515] font-extrabold mb-4">
//                 {flightData ? flightData.plane.plane_code : "Loading..."}
//               </div>
//               <div className="text-gray-600">Informasi:</div>
//               <ul className="list-disc pl-5 text-gray-600">
//                 <li>
//                   Baggage {flightData ? flightData.plane.baggage : "Loading..."}{" "}
//                   kg
//                 </li>
//                 <li>
//                   Cabin baggage{" "}
//                   {flightData ? flightData.plane.cabin_baggage : "Loading..."}{" "}
//                   kg
//                 </li>
//                 <li>
//                   In Flight Entertainment (
//                   {flightData
//                     ? flightData.plane.in_flight_entertainment
//                       ? "Available"
//                       : "Not Available"
//                     : "Loading..."}
//                   )
//                 </li>
//               </ul>
//             </div>{" "}
//             <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
//             <div>
//               <h4 className="font-extrabold mb-2 pl-4">Rincian Harga</h4>
//               <div className="flex justify-between pl-4 text-gray-600">
//                 <div>2 Adults</div>
//                 <div>IDR 9.550.000</div>
//               </div>
//               <div className="flex justify-between pl-4 text-gray-600">
//                 <div>1 Baby</div>
//                 <div>IDR 0</div>
//               </div>
//               <div className="flex justify-between pl-4 text-gray-600">
//                 <div>Tax</div>
//                 <div>IDR {taxData ? taxData.tax_amount : "Loading..."}</div>
//               </div>
//               <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
//               <div className="flex justify-between pl-4 font-extrabold text-[#151515]">
//                 <div>Total</div>
//                 <div>IDR 9.550.000</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaQrcode } from "react-icons/fa";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// const PaymentMethod = ({ title, children, onClick, isOpen, Icon }) => (
//   <div className="border border-gray-300 rounded-lg">
//     <button
//       onClick={onClick}
//       className={`w-full text-white py-3 rounded-t-lg flex justify-between items-center px-4 text-lg ${
//         isOpen ? "bg-[#006769]" : "bg-[#3C3C3C]"
//       }`}
//     >
//       <div className="flex items-center">
//         <Icon className="mr-2 text-xl" />
//         <span>{title}</span>
//       </div>
//       <span>
//         {isOpen ? (
//           <IoIosArrowUp className="text-xl" />
//         ) : (
//           <IoIosArrowDown className="text-xl" />
//         )}
//       </span>
//     </button>
//     <div
//       className={`transition-all duration-500 ${
//         isOpen ? "max-h-screen p-4" : "max-h-0"
//       } overflow-hidden`}
//     >
//       <div className="text-lg">{children}</div>
//     </div>
//   </div>
// );

// const Payment = ({ flightId, bookingId }) => {
//   const [showQRIS, setShowQRIS] = useState(false);
//   const [taxData, setTaxData] = useState(null);
//   const [flightData, setFlightData] = useState(null);
//   const [categoryData, setCategoryData] = useState(null);
//   const [bookingData, setBookingData] = useState(null);

//   const toggleQRIS = () => setShowQRIS(!showQRIS);

//   useEffect(() => {
//     const fetchTaxData = async () => {
//       try {
//         const response = await axios.get(
//           "https://binar-project-backend-staging.vercel.app/api/tax"
//         );
//         setTaxData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching tax data:", error);
//       }
//     };

//     const fetchFlightData = async () => {
//       try {
//         const response = await axios.get(
//           `https://binar-project-backend-staging.vercel.app/api/flights/${flightId}`
//         );
//         setFlightData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching flight data:", error);
//       }
//     };

//     const fetchCategoryData = async () => {
//       try {
//         const response = await axios.get(
//           "https://binar-project-backend-staging.vercel.app/api/category"
//         );
//         setCategoryData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching category data:", error);
//       }
//     };

//     const fetchBookingData = async () => {
//       try {
//         if (bookingId) {
//           const response = await axios.get(
//             `https://binar-project-backend-staging.vercel.app/api/bookings/${bookingId}`
//           );
//           console.log("Booking data:", response.data.data);
//           setBookingData(response.data.data);
//         } else {
//           console.error("bookingId is not defined");
//         }
//       } catch (error) {
//         console.error("Error fetching booking data:", error);
//       }
//     };

//     fetchTaxData();
//     fetchFlightData();
//     fetchCategoryData();
//     fetchBookingData();
//   }, [flightId, bookingId]);

//   const calculateTax = () => {
//     const basePrice = flightData
//       ? flightData.flights.flight_classes * categoryData.discount
//       : 0;
//     const taxAmount = taxData ? (taxData.percent * basePrice) / 100 : 0;
//     return taxAmount;
//   };

//   const calculateTotal = () => {
//     const basePrice = flightData
//       ? flightData.flights.flight_classes * categoryData.discount
//       : 0;
//     const taxAmount = calculateTax();
//     return basePrice + taxAmount;
//   };

//   const getPaymentDeadline = () => {
//     const now = new Date();
//     const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
//     const options = {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return deadline.toLocaleDateString("id-ID", options);
//   };

//   return (
//     <div className="bg-white min-h-screen flex flex-col items-center p-4">
//       {/* Header */}
//       <header className="w-full max-w-4xl flex items-center justify-between p-4 flex-wrap">
//         <div className="flex items-center space-x-2">
//           <img src="path-to-logo" alt="Tiketku Logo" className="w-16 h-auto" />{" "}
//           {/* Replace with actual logo path */}
//           <div className="text-2xl font-bold text-purple-600">Tiketku</div>
//         </div>
//         <input
//           type="text"
//           placeholder="Cari di sini ..."
//           className="p-2 w-full md:w-1/3 border rounded mt-2 md:mt-0"
//         />
//       </header>

//       <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>

//       {/* Steps */}
//       <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-4 flex-wrap">
//         <span className="text-black font-bold">Isi Data Diri</span>
//         <span className="text-[#8A8A8A] font-bold">›</span>
//         <span className="text-black font-bold">Bayar</span>
//         <span className="text-[#8A8A8A] font-bold">›</span>
//         <span className="text-[#8A8A8A] font-bold">Selesai</span>
//       </div>

//       {/* Success Message */}
//       <div className="w-full max-w-3xl bg-red-600 text-white p-3 mt-4 rounded-lg text-center">
//         <p>Selesaikan Pembayaran sampai {getPaymentDeadline()}</p>
//       </div>

//       <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>

//       <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-10 w-full max-w-4xl">
//         <div className="w-full md:w-2/3">
//           <h3 className="text-xl font-semibold mb-4">Isi Data Pembayaran</h3>
//           <div className="space-y-4">
//             <PaymentMethod
//               title="QRIS"
//               onClick={toggleQRIS}
//               isOpen={showQRIS}
//               Icon={FaQrcode}
//             >
//               <div className="space-y-2">
//                 <p>Scan QR code berikut untuk membayar:</p>
//                 <div className="flex justify-center">
//                   {bookingData ? (
//                     <img
//                       src={bookingData.payment.qr_url}
//                       alt="QR Code"
//                       className="w-40 h-40"
//                     />
//                   ) : (
//                     "Loading QR code..."
//                   )}
//                 </div>
//                 <button className="w-full bg-[#006769] text-white py-3 mt-4 rounded-lg">
//                   Konfirmasi Pembayaran
//                 </button>
//               </div>
//             </PaymentMethod>
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg">
//           <div className="flex items-center mb-4">
//             <h3 className="text-xl font-extrabold text-[#151515] mr-2">
//               Booking Code:
//             </h3>
//             <h3 className="text-xl font-bold text-[#7126B5]">{flightId}</h3>
//           </div>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="font-extrabold text-[#151515] mr-2">
//                   {flightData ? flightData.departureAt : "Loading..."}
//                 </div>
//                 <div className="font-extrabold text-[#9DDE8B]">
//                   Keberangkatan
//                 </div>
//               </div>
//               <div className="text-gray-600">
//                 {flightData ? flightData.departureAt : "Loading..."}
//               </div>
//               <div className="text-[#151515]">
//                 {flightData
//                   ? `${flightData.from.name} - ${flightData.from.airport_code}`
//                   : "Loading..."}
//               </div>
//             </div>
//             <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="font-extrabold text-[#151515] mr-2">
//                   {flightData ? flightData.arriveAt : "Loading..."}
//                 </div>
//                 <div className="font-extrabold text-[#9DDE8B]">Kedatangan</div>
//               </div>
//               <div className="text-gray-600">
//                 {flightData ? flightData.arriveAt : "Loading..."}
//               </div>
//               <div className="text-[#151515]">
//                 {flightData ? flightData.to.name : "Loading..."}
//               </div>
//             </div>
//             <div className="max-w-3xl border-t border-gray-600 mt-4 pl-8 py-4">
//               <div className="text-[#151515] font-extrabold">
//                 {flightData ? flightData.plane.airline : "Loading..."} -{" "}
//                 {flightData ? flightData.class : "Loading..."}
//               </div>
//               <div className="text-[#151515] font-extrabold mb-4">
//                 {flightData ? flightData.plane.plane_code : "Loading..."}
//               </div>
//               <div className="text-gray-600">Informasi:</div>
//               <ul className="list-disc pl-5 text-gray-600">
//                 <li>
//                   Baggage {flightData ? flightData.plane.baggage : "Loading..."}{" "}
//                   kg
//                 </li>
//                 <li>
//                   Cabin baggage{" "}
//                   {flightData ? flightData.plane.cabin_baggage : "Loading..."}{" "}
//                   kg
//                 </li>
//                 <li>
//                   In Flight Entertainment (
//                   {flightData
//                     ? flightData.plane.in_flight_entertainment
//                       ? "Available"
//                       : "Not Available"
//                     : "Loading..."}
//                   )
//                 </li>
//               </ul>
//             </div>{" "}
//             <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
//             <div>
//               <h4 className="font-extrabold mb-2 pl-4">Rincian Harga</h4>
//               <div className="flex justify-between pl-4 text-gray-600">
//                 <div>2 Adults</div>
//                 <div>IDR 9.550.000</div>
//               </div>
//               <div className="flex justify-between pl-4 text-gray-600">
//                 <div>1 Baby</div>
//                 <div>IDR 0</div>
//               </div>
//               <div className="flex justify-between pl-4 text-gray-600">
//                 <div>Tax</div>
//                 Rp{calculateTotal().toLocaleString("id-ID")}{" "}
//               </div>
//               <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
//               <div className="flex justify-between pl-4 font-extrabold text-[#151515]">
//                 <div>Total</div>
//                 Rp{calculateTax().toLocaleString("id-ID")}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaQrcode } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const PaymentMethod = ({ title, children, onClick, isOpen, Icon }) => (
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
  </div>
);

const Payment = ({ flight_id }) => {
  const [showQRIS, setShowQRIS] = useState(false);
  const [taxData, setTaxData] = useState(null);
  const [flightData, setFlightData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [bookings, setBookings] = useState(null);

  const toggleQRIS = () => setShowQRIS(!showQRIS);

  useEffect(() => {
    const fetchTaxData = async () => {
      try {
        const response = await axios.get(
          "https://binar-project-backend-staging.vercel.app/api/tax"
        );
        setTaxData(response.data.data);
      } catch (error) {
        console.error("Error fetching tax data:", error);
      }
    };

    const fetchFlightData = async () => {
      try {
        const response = await axios.get(
          `https://binar-project-backend-staging.vercel.app/api/flights/${flight_id}`
        );
        setFlightData(response.data.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          "https://binar-project-backend-staging.vercel.app/api/category"
        );
        setCategoryData(response.data.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    const fetchBookingData = async () => {
      try {
        if (bookings) {
          const response = await axios.get(
            `https://binar-project-backend-staging.vercel.app/api/bookings`
          );
          console.log("Booking data:", response.data.data);
          setBookings(response.data.data); // Update state with bookings data
        } else {
          console.error("bookingId is not defined");
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchTaxData();
    fetchFlightData();
    fetchCategoryData();
    fetchBookingData();
  }, [flight_id]);

  const calculateTax = () => {
    if (!flightData || !categoryData || !taxData) return 0;
    const basePrice = flightData.flight_classes * categoryData.discount;
    const taxAmount = (taxData.percent * basePrice) / 100;
    return taxAmount;
  };

  const calculateTotal = () => {
    if (!flightData || !categoryData) return 0;
    const basePrice = flightData.flight_classes * categoryData.discount;
    const taxAmount = calculateTax();
    return basePrice + taxAmount;
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

  console.log("flightId:", flight_id);
  console.log("bookings:", bookings);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-between p-4 flex-wrap">
        <div className="flex items-center space-x-2">
          <img src="path-to-logo" alt="Tiketku Logo" className="w-16 h-auto" />{" "}
          {/* Replace with actual logo path */}
          <div className="text-2xl font-bold text-purple-600">Tiketku</div>
        </div>
        <input
          type="text"
          placeholder="Cari di sini ..."
          className="p-2 w-full md:w-1/3 border rounded mt-2 md:mt-0"
        />
      </header>

      <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>

      {/* Steps */}
      <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-4 flex-wrap">
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

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-10 w-full max-w-4xl">
        <div className="w-full md:w-2/3">
          <h3 className="text-xl font-semibold mb-4">Isi Data Pembayaran</h3>
          <div className="space-y-4">
            <PaymentMethod
              title="QRIS"
              onClick={toggleQRIS}
              isOpen={showQRIS}
              Icon={FaQrcode}
            >
              <div className="space-y-2">
                <p>Scan QR code berikut untuk membayar:</p>
                <div className="flex justify-center">
                  {bookingData ? (
                    <img
                      src={bookingData.payment.qr_url}
                      alt="QR Code"
                      className="w-40 h-40"
                    />
                  ) : (
                    "Loading QR code..."
                  )}
                </div>
                <button className="w-full bg-[#006769] text-white py-3 mt-4 rounded-lg">
                  Konfirmasi Pembayaran
                </button>
              </div>
            </PaymentMethod>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <h3 className="text-xl font-extrabold text-[#151515] mr-2">
              Booking Code:
            </h3>
            <h3 className="text-xl font-bold text-[#7126B5]">{flight_id}</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-[#151515] mr-2">
                  {flightData ? flightData.departureAt : "Loading..."}
                </div>
                <div className="font-extrabold text-[#9DDE8B]">
                  Keberangkatan
                </div>
              </div>
              <div className="text-gray-600">
                {flightData ? flightData.departureAt : "Loading..."}
              </div>
              <div className="text-[#151515]">
                {flightData
                  ? `${flightData.from.name} - ${flightData.from.airport_code}`
                  : "Loading..."}
              </div>
            </div>
            <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-[#151515] mr-2">
                  {flightData ? flightData.arriveAt : "Loading..."}
                </div>
                <div className="font-extrabold text-[#9DDE8B]">Kedatangan</div>
              </div>
              <div className="text-gray-600">
                {flightData ? flightData.arriveAt : "Loading..."}
              </div>
              <div className="text-[#151515]">
                {flightData ? flightData.to.name : "Loading..."}
              </div>
            </div>
            <div className="max-w-3xl border-t border-gray-600 mt-4 pl-8 py-4">
              <div className="text-[#151515] font-extrabold">
                {flightData ? flightData.plane.airline : "Loading..."} -{" "}
                {flightData ? flightData.class : "Loading..."}
              </div>
              <div className="text-[#151515] font-extrabold mb-4">
                {flightData ? flightData.plane.plane_code : "Loading..."}
              </div>
              <div className="text-gray-600">Informasi:</div>
              <ul className="list-disc pl-5 text-gray-600">
                <li>
                  Baggage {flightData ? flightData.plane.baggage : "Loading..."}{" "}
                  kg
                </li>
                <li>
                  Cabin baggage{" "}
                  {flightData ? flightData.plane.cabin_baggage : "Loading..."}{" "}
                  kg
                </li>
                <li>
                  In Flight Entertainment (
                  {flightData
                    ? flightData.plane.in_flight_entertainment
                      ? "Available"
                      : "Not Available"
                    : "Loading..."}
                  )
                </li>
              </ul>
            </div>{" "}
            <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
            <div>
              <h4 className="font-extrabold mb-2 pl-4">Rincian Harga</h4>
              <div className="flex justify-between pl-4 text-gray-600">
                <div>2 Adults</div>
                <div>IDR 9.550.000</div>
              </div>
              <div className="flex justify-between pl-4 text-gray-600">
                <div>1 Baby</div>
                <div>IDR 0</div>
              </div>
              <div className="flex justify-between pl-4 text-gray-600">
                <div>Tax</div>
                Rp{calculateTotal().toLocaleString("id-ID")}{" "}
              </div>
              <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
              <div className="flex justify-between pl-4 font-extrabold text-[#151515]">
                <div>Total</div>
                Rp{calculateTax().toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
