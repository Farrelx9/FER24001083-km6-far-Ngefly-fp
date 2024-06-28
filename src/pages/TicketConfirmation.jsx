import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import jsBarcode from "jsbarcode";
import vector from "../assets/logo/vector.png";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../assets/Properties/Navbar";
// import logo from "../assets/logo/logo.png"; // Make sure you have the correct path to your logo

function TicketConfirmation() {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const { payment_id } = useParams();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      // const payment_id = "ba792a12-5145-4982-b43a-b635de92c6cf"; // Replace with the actual payment ID
      const url = `https://binar-project-426902.et.r.appspot.com/api/v1/payments/${payment_id}`;

      setLoading(true);

      try {
        const response = await axios.put(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
        if (response.status === 200) {
          setPaymentStatus("success");
          setTicketData({
            id: payment_id,
            name: "Nama Pemesan",
            flight: "Flight Information",
            seat: "Seat Number",
            date: "Date and Time",
          });
          toast.success("Payment status updated successfully.");
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 404) {
            setErrorMessage("Payment not found. Please check your payment ID.");
            toast.error("Payment not found. Please check your payment ID.");
          } else if (status === 400) {
            if (data.message === "Payment already expired") {
              setErrorMessage(
                "Payment already expired. Please make a new payment."
              );
              toast.error(
                "Payment already expired. Please make a new payment."
              );
            } else if (data.message === "Payment data not found") {
              setErrorMessage(
                "Payment data not found. Please check your payment details."
              );
              toast.error(
                "Payment data not found. Please check your payment details."
              );
            } else {
              setErrorMessage("Payment already updated.");
              toast.error("Payment already updated.");
            }
          } else {
            setErrorMessage(
              "An unexpected error occurred. Please try again later."
            );
            toast.error(
              "An unexpected error occurred. Please try again later."
            );
          }
        } else {
          setErrorMessage(
            "Failed to connect to the server. Please try again later."
          );
          toast.error(
            "Failed to connect to the server. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    updatePaymentStatus();
  }, []);

  // const handlePrintTicket = async () => {
  //   if (!ticketData) {
  //     alert("No ticket data available.");
  //     return;
  //   }

  //   try {
  //     // Create canvas for barcode
  //     const barcodeCanvas = document.createElement("canvas");
  //     jsBarcode(barcodeCanvas, ticketData.id, {
  //       format: "CODE128",
  //       displayValue: true,
  //       width: 2,
  //       height: 40,
  //     });
  //     const barcodeImg = barcodeCanvas.toDataURL("image/png");

  //     const doc = new jsPDF();

  //     // Set title
  //     doc.setFontSize(22);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Tiket Penerbangan", 105, 20, null, null, "center");

  //     // Draw a line under the title
  //     doc.setLineWidth(0.5);
  //     doc.line(20, 25, 190, 25);

  //     // Add barcode
  //     doc.addImage(barcodeImg, "PNG", 20, 30, 100, 20);

  //     // Add ticket details
  //     doc.setFontSize(16);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Detail Tiket", 20, 60);

  //     doc.setFontSize(12);
  //     doc.setFont("helvetica", "normal");
  //     doc.text(`ID Tiket: ${ticketData.id}`, 20, 70);
  //     doc.text(`Nama: ${ticketData.name}`, 20, 80);
  //     doc.text(`Penerbangan: ${ticketData.flight}`, 20, 90);
  //     doc.text(`Tempat Duduk: ${ticketData.seat}`, 20, 100);
  //     doc.text(`Tanggal: ${ticketData.date}`, 20, 110);

  //     // Add instructions
  //     doc.setFontSize(12);
  //     doc.setFont("helvetica", "italic");
  //     doc.text("Harap membawa tiket ini saat check-in.", 20, 120);
  //     doc.text(
  //       "Pastikan informasi penerbangan sesuai dengan jadwal Anda.",
  //       20,
  //       130
  //     );

  //     // Draw a border around the details
  //     doc.setLineWidth(0.1);
  //     doc.rect(18, 62, 174, 80);

  //     // Footer
  //     doc.setFontSize(10);
  //     doc.setFont("helvetica", "italic");
  //     doc.text(
  //       "Terima kasih telah menggunakan layanan kami.",
  //       105,
  //       280,
  //       null,
  //       null,
  //       "center"
  //     );

  //     doc.save("tiket.pdf");
  //   } catch (error) {
  //     console.error("Failed to generate ticket:", error);
  //     alert("Failed to generate ticket. Please try again later.");
  //   }
  // };

  // const handlePrintTicket = async () => {
  //   if (!ticketData) {
  //     alert("No ticket data available.");
  //     return;
  //   }

  //   try {
  //     // Create canvas for barcode
  //     const barcodeCanvas = document.createElement("canvas");
  //     jsBarcode(barcodeCanvas, ticketData.id, {
  //       format: "CODE128",
  //       displayValue: true,
  //       width: 2,
  //       height: 40,
  //     });
  //     const barcodeImg = barcodeCanvas.toDataURL("image/png");

  //     const doc = new jsPDF();

  //     // Set title
  //     doc.setFontSize(22);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Tiket Penerbangan", 105, 20, null, null, "center");

  //     // Draw a line under the title
  //     doc.setLineWidth(0.5);
  //     doc.line(20, 25, 190, 25);

  //     // Add barcode
  //     doc.addImage(barcodeImg, "PNG", 20, 30, 100, 20);

  //     // Add ticket details
  //     doc.setFontSize(16);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Detail Tiket", 20, 60);

  //     doc.setFontSize(12);
  //     doc.setFont("helvetica", "normal");
  //     doc.text(`ID Tiket: ${ticketData.id}`, 20, 70);
  //     doc.text(`Nama: ${ticketData.name}`, 20, 80);
  //     doc.text(`Penerbangan: ${ticketData.flight}`, 20, 90);
  //     doc.text(`Tempat Duduk: ${ticketData.seat}`, 20, 100);
  //     doc.text(`Tanggal: ${ticketData.date}`, 20, 110);

  //     // Add a decorative border
  //     doc.setDrawColor(0, 0, 0);
  //     doc.setLineWidth(0.5);
  //     doc.rect(10, 10, 190, 270);

  //     // Add some more decoration
  //     doc.setLineWidth(0.2);
  //     doc.line(10, 140, 200, 140);

  //     // Add instructions
  //     doc.setFontSize(12);
  //     doc.setFont("helvetica", "italic");
  //     doc.text("Harap membawa tiket ini saat check-in.", 20, 150);
  //     doc.text(
  //       "Pastikan informasi penerbangan sesuai dengan jadwal Anda.",
  //       20,
  //       160
  //     );

  //     // Add a logo or any other image at the bottom
  //     doc.addImage(vector, "PNG", 160, 250, 30, 30);

  //     // Footer
  //     doc.setFontSize(10);
  //     doc.setFont("helvetica", "italic");
  //     doc.text(
  //       "Terima kasih telah menggunakan layanan kami.",
  //       105,
  //       280,
  //       null,
  //       null,
  //       "center"
  //     );

  //     doc.save("tiket.pdf");
  //   } catch (error) {
  //     console.error("Failed to generate ticket:", error);
  //     alert("Failed to generate ticket. Please try again later.");
  //   }
  // };

  const handlePrintTicket = async () => {
    if (!ticketData) {
      alert("No ticket data available.");
      return;
    }

    try {
      // Create canvas for barcode
      const barcodeCanvas = document.createElement("canvas");
      jsBarcode(barcodeCanvas, ticketData.id, {
        format: "CODE128",
        displayValue: true,
        width: 2,
        height: 40,
      });
      const barcodeImg = barcodeCanvas.toDataURL("image/png");

      const doc = new jsPDF();

      // Add a background color
      doc.setFillColor(240, 240, 240); // Light grey
      doc.rect(0, 0, 210, 297, "F");

      // Set title
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40); // Dark grey
      doc.text("Tiket Penerbangan", 105, 30, null, null, "center");

      // Draw a line under the title
      doc.setLineWidth(0.5);
      doc.setDrawColor(40, 40, 40);
      doc.line(20, 35, 190, 35);

      // Add barcode
      doc.addImage(barcodeImg, "PNG", 20, 40, 100, 20);

      // Add ticket details section background
      doc.setFillColor(255, 255, 255); // White
      doc.rect(15, 70, 180, 90, "F");

      // Add ticket details
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("Detail Tiket", 20, 80);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      doc.text(`ID Tiket: ${ticketData.id}`, 20, 90);
      doc.text(`Nama: ${ticketData.name}`, 20, 100);
      doc.text(`Penerbangan: ${ticketData.flight}`, 20, 110);
      doc.text(`Tempat Duduk: ${ticketData.seat}`, 20, 120);
      doc.text(`Tanggal: ${ticketData.date}`, 20, 130);

      // Draw a border around the details
      doc.setLineWidth(0.5);
      doc.setDrawColor(40, 40, 40);
      doc.rect(15, 70, 180, 90);

      // Add instructions section background
      doc.setFillColor(255, 255, 255); // White
      doc.rect(15, 170, 180, 40, "F");

      // Add instructions
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(40, 40, 40);
      doc.text("Harap membawa tiket ini saat check-in.", 20, 180);
      doc.text(
        "Pastikan informasi penerbangan sesuai dengan jadwal Anda.",
        20,
        190
      );

      // Draw a border around the instructions
      doc.setLineWidth(0.5);
      doc.setDrawColor(40, 40, 40);
      doc.rect(15, 170, 180, 40);

      // Add a logo or any other image at the bottom
      doc.addImage(vector, "PNG", 160, 250, 30, 30);

      // Footer
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(40, 40, 40);
      doc.text(
        "Terima kasih telah menggunakan layanan kami.",
        105,
        280,
        null,
        null,
        "center"
      );

      doc.save("tiket.pdf");
    } catch (error) {
      console.error("Failed to generate ticket:", error);
      alert("Failed to generate ticket. Please try again later.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-4">
      <Navbar />
      <ToastContainer />

      <div className="w-full max-w-8xl border-t border-gray-300 mt-20"></div>

      <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-4">
        <span className="text-black font-semibold">Isi Data Diri</span>
        <span className="text-black font-semibold">›</span>
        <span className="text-black font-semibold">Bayar</span>
        <span className="text-black font-semibold">›</span>
        <span className="text-black font-semibold">Selesai</span>
      </div>

      {loading && (
        <div className="w-full max-w-3xl bg-blue-600 text-white p-3 mt-4 rounded-lg text-center">
          <p>Memproses pembayaran, harap tunggu...</p>
        </div>
      )}

      {/* <p>Payment ID: {payment_id}</p> */}

      {paymentStatus === "success" && (
        <div className="w-full max-w-3xl bg-[#73CA5C] text-white p-3 mt-4 rounded-lg text-center">
          <p>Terima kasih atas pembayaran transaksi</p>
        </div>
      )}

      {errorMessage && (
        <div className="w-full max-w-3xl bg-red-600 text-white p-3 mt-4 rounded-lg text-center">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>

      {paymentStatus === "success" && (
        <div className="text-center mt-20">
          <img
            src={vector}
            alt="vector"
            className="mx-auto mb-4"
            style={{ width: "200px", height: "auto" }}
          />
          <h2 className="text-xl font-bold text-purple-600">Selamat!</h2>
          <p>Transaksi Pembayaran Tiket sukses!</p>
        </div>
      )}

      {paymentStatus === "success" && (
        <div className="flex flex-col items-center space-y-4 mt-10">
          <button
            className="bg-[#006769] text-white py-3 px-4 rounded-lg w-80 h-15"
            onClick={handlePrintTicket}
          >
            Terbitkan Tiket
          </button>
          <button className="bg-[#9DDE8B] text-white py-3 px-4 rounded-lg w-80 h-15">
            Cari Penerbangan Lain
          </button>
        </div>
      )}
    </div>
  );
}

export default TicketConfirmation;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import jsBarcode from "jsbarcode";
// import ngefly from "../assets/logo/ngefly.png";
// import cover from "../assets/logo/cover.png";
// import pesawatatas from "../assets/logo/pesawatatas.png";
// import pesawatbawah from "../assets/logo/pesawatbawah.png";
// import vector from "../assets/logo/vector.png";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { useNavigate } from "react-router-dom";

// function PaymentStatus() {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null); // Change this based on actual payment status
//   const navigate = useNavigate();

//   const handleButtonClick = async () => {
//     setLoading(true);
//     const payment_id = "9cdf6d28-4989-4e1c-be34-61e4001e32d6"; // Replace with actual payment ID
//     const url = `https://binar-project-426902.et.r.appspot.com/api/v1/payments/${payment_id}`;

//     try {
//       const response = await axios.put(
//         url,
//         {},
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         setSuccess(true);
//         alert("Payment status updated successfully.");
//         navigate("/ticketconfirm");
//       } else {
//         setSuccess(false);
//       }
//     } catch (error) {
//       setSuccess(false);
//       // Handle different error scenarios
//       alert("Failed to connect to the server. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="bg-white relative min-h-screen"
//       style={{
//         backgroundImage: `url(${cover})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <img
//         src={pesawatbawah}
//         className="w-[249px] h-[194px] absolute top-[631px] left-[calc(50%-470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
//       />
//       <img
//         src={ngefly}
//         className="w-[270px] h-[270px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//       />
//       <img
//         src={pesawatatas}
//         className="w-w-[249px] h-[194px] absolute top-[194px] left-[calc(50%+470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
//       />
//       <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-fit absolute top-[436px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
//         {success === null ? (
//           <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
//             <Icon icon="icon-park-solid:success" width={110} color="#35b950" />
//             <div>
//               <p className="font-bold text-3xl mb-2">Processing Payment...</p>
//             </div>
//           </div>
//         ) : success ? (
//           <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
//             <Icon icon="icon-park-solid:success" width={110} color="#35b950" />
//             <div>
//               <p className="font-bold text-3xl mb-2">Payment Successful!</p>
//               <p className="text-base md:text-lg text-gray-600 mb-6">
//                 Thank you for your payment. Your transaction was completed
//                 successfully.
//               </p>
//             </div>
//             <button
//               onClick={handleButtonClick}
//               className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
//               disabled={loading}
//             >
//               {loading ? (
//                 <Icon icon="eos-icons:loading" width={24} color="#fff" />
//               ) : (
//                 "Ke cetak tiket"
//               )}
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
//             <Icon icon="fluent:warning-48-filled" width={110} color="#c75d16" />
//             <div>
//               <p className="font-bold text-3xl mb-2">Payment Failed!</p>
//               <p className="text-base md:text-lg text-gray-600 mb-6">
//                 There was an issue with your payment. Please try again or
//                 contact support for assistance.
//               </p>
//             </div>
//             <button
//               onClick={handleButtonClick}
//               className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
//               disabled={loading}
//             >
//               {loading ? (
//                 <Icon icon="eos-icons:loading" width={24} color="#fff" />
//               ) : (
//                 "Try Again"
//               )}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function TicketConfirmation() {
//   const [loading, setLoading] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [ticketData, setTicketData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const updatePaymentStatus = async () => {
//       const payment_id = "9cdf6d28-4989-4e1c-be34-61e4001e32d6"; // Replace with actual payment ID
//       const url = `https://binar-project-426902.et.r.appspot.com/api/v1/payments/${payment_id}`;

//       setLoading(true);

//       try {
//         const response = await axios.put(
//           url,
//           {},
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.status === 200) {
//           setPaymentStatus("success");
//           setTicketData({
//             id: payment_id,
//             name: "Nama Pemesan",
//             flight: "Flight Information",
//             seat: "Seat Number",
//             date: "Date and Time",
//           });
//           alert("Payment status updated successfully.");
//         }
//       } catch (error) {
//         if (error.response) {
//           const { status, data } = error.response;

//           if (status === 404) {
//             setErrorMessage("Payment not found. Please check your payment ID.");
//             alert("Payment not found. Please check your payment ID.");
//           } else if (status === 409) {
//             if (data.message === "Payment already expired") {
//               setErrorMessage(
//                 "Payment already expired. Please make a new payment."
//               );
//               alert("Payment already expired. Please make a new payment.");
//             } else if (data.message === "Payment data not found") {
//               setErrorMessage(
//                 "Payment data not found. Please check your payment details."
//               );
//               alert(
//                 "Payment data not found. Please check your payment details."
//               );
//             } else {
//               setErrorMessage("Payment already updated.");
//               alert("Payment already updated.");
//             }
//           } else {
//             setErrorMessage(
//               "An unexpected error occurred. Please try again later."
//             );
//             alert("An unexpected error occurred. Please try again later.");
//           }
//         } else {
//           setErrorMessage(
//             "Failed to connect to the server. Please try again later."
//           );
//           alert("Failed to connect to the server. Please try again later.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     updatePaymentStatus();
//   }, []);

//   const handlePrintTicket = async () => {
//     if (!ticketData) {
//       alert("No ticket data available.");
//       return;
//     }

//     try {
//       // Create canvas for barcode
//       const barcodeCanvas = document.createElement("canvas");
//       jsBarcode(barcodeCanvas, ticketData.id, {
//         format: "CODE128",
//         displayValue: true,
//         width: 2,
//         height: 40,
//       });
//       const barcodeImg = barcodeCanvas.toDataURL("image/png");

//       // Create PDF document
//       const doc = new jsPDF("p", "pt");
//       doc.addImage(
//         cover,
//         "PNG",
//         0,
//         0,
//         doc.internal.pageSize.getWidth(),
//         doc.internal.pageSize.getHeight()
//       );
//       doc.addImage(ngefly, "PNG", 190, 200, 230, 70);
//       doc.addImage(vector, "PNG", 100, 70, 0, 0);
//       doc.setFontSize(12);
//       doc.text("Nama Pemesan", 100, 100);
//       doc.text(ticketData.name, 100, 120);
//       doc.text("Flight Information", 100, 140);
//       doc.text(ticketData.flight, 100, 160);
//       doc.text("Seat Number", 100, 180);
//       doc.text(ticketData.seat, 100, 200);
//       doc.text("Date and Time", 100, 220);
//       doc.text(ticketData.date, 100, 240);
//       doc.addImage(barcodeImg, "PNG", 450, 100, 120, 40);
//       doc.save("ticket.pdf");
//       alert("Ticket downloaded successfully.");
//     } catch (error) {
//       console.error("Error generating ticket:", error);
//       alert("Failed to generate ticket. Please try again later.");
//     }
//   };

//   return (
//     <div
//       className="bg-white relative min-h-screen"
//       style={{
//         backgroundImage: `url(${cover})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <img
//         src={pesawatbawah}
//         className="w-[249px] h-[194px] absolute top-[631px] left-[calc(50%-470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
//       />
//       <img
//         src={ngefly}
//         className="w-[270px] h-[270px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//       />
//       <img
//         src={pesawatatas}
//         className="w-w-[249px] h-[194px] absolute top-[194px] left-[calc(50%+470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
//       />
//       <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-fit absolute top-[436px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
//         {paymentStatus === "success" ? (
//           <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
//             <Icon icon="icon-park-solid:success" width={110} color="#35b950" />
//             <div>
//               <p className="font-bold text-3xl mb-2">Payment Successful!</p>
//               <p className="text-base md:text-lg text-gray-600 mb-6">
//                 Thank you for your payment. Your transaction was completed
//                 successfully.
//               </p>
//               <button
//                 onClick={handlePrintTicket}
//                 className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Icon icon="eos-icons:loading" width={24} color="#fff" />
//                 ) : (
//                   "Download Ticket"
//                 )}
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
//             <Icon icon="fluent:warning-48-filled" width={110} color="#c75d16" />
//             <div>
//               <p className="font-bold text-3xl mb-2">Payment Status Pending!</p>
//               <p className="text-base md:text-lg text-gray-600 mb-6">
//                 Please wait while we process your payment. You will be
//                 redirected once completed.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TicketConfirmation;
