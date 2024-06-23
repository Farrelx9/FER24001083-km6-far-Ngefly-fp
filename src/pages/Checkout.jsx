import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../assets/Properties/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import info from "../assets/images/informasi.png";
import moment from "moment";

const PassengerForm = ({ passenger, index }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  // const handleDateChange = (e) => {
  //   setBirthdate(e.target.value);
  //   closeDatePicker(); // Tutup date picker setelah tanggal dipilih
  // };

  return (
    <div key={index} className="border-2 border-black p-5 mb-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Isi Data Penumpang</h3>
      <div>
        <div className="bg-black mb-4 flex justify-between text-white px-4 p-2 rounded-xl rounded-b-none">
          <div>
            Data Diri Penumpang {index + 1} -{" "}
            {passenger ? passenger.type : "Loading..."}
          </div>
          <div>Centang</div>
        </div>
        <div className="font-bold mb-1 text-[#006769]">Title</div>
        <div className="flex relative">
          <select
            className="border p-2 px-4 mb-3 rounded-md border-[#D0D0D0] w-full"
            name={`title-${index}`}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Choose Your Title
            </option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
          </select>
          {/* <div className="absolute mt-2 right-3">Dropdown</div> */}
        </div>
        <div className="font-bold mb-1 text-[#006769]">Nama Lengkap</div>
        <input
          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
          name={`fullname-${index}`}
          placeholder="Fill with Full Name"
        />
        <div className="mb-3 flex justify-between">
          <div>Punya nama keluarga?</div>
          <button
            className={`slider ${
              isDarkMode ? "bg-[#006769]" : " bg-gray-400"
            } w-12 h-6 rounded-full p-1 transition-transform] duration-300 ease-in-out`}
            onClick={toggleDarkMode}
          >
            <div
              className={`rounded-full w-4 h-4 bg-white shadow-md transform ${
                isDarkMode ? "translate-x-6" : ""
              }`}
            ></div>
          </button>
        </div>
        {isDarkMode && ( // Menampilkan nama keluarga hanya jika dalam mode gelap
          <>
            <div className="font-bold mb-1 text-[#006769]">Nama Keluarga</div>
            <input
              className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
              name={`famname-${index}`}
              placeholder="Potter"
            />
          </>
        )}
        <div className="font-bold mb-1 text-[#006769]">Tanggal Lahir</div>
        <div className="flex relative">
          <DatePicker
            className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] cursor-pointer date-picker-custom"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            onClickOutside={() => {}}
          />
          {/* <div
            className="absolute mt-2 right-3 cursor-pointer"
            onClick={openDatePicker}
          >
            Tanggal
          </div> */}
          {isDatePickerOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  onClickOutside={closeDatePicker}
                />
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={closeDatePicker}
                >
                  Simpan
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="font-bold mb-1 text-[#006769]">Kewarganegaraan</div>
        <input
          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
          name={`nation-${index}`}
          placeholder="Fill Your Nation"
        />
        <div className="font-bold mb-1 text-[#006769]">KTP/Paspor</div>
        <select
          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
          name={`tandapengenal-${index}`}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Choose Identity Card
          </option>
          <option value="Mr.">KTP</option>
          <option value="Mrs.">Paspor</option>
        </select>
        {/* <div className="font-bold mb-1 text-[#006769]">Negara Penerbit</div>
        <div className="flex relative">
          <input
            className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
            name={`country-${index}`}
          />
          <div className="absolute mt-2 right-3">Dropdown</div>
        </div>
        <div className="font-bold mb-1 text-[#006769]">Berlaku Sampai</div>
        <div className="flex relative">
          <input
            className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
            name={`expirydate-${index}`}
            placeholder="dd/mm/yyyy"
          />
          <div className="absolute mt-2 right-3">Tanggal</div>
        </div> */}
      </div>
    </div>
  );
};

const PriceForm = ({ passenger, index }) => (
  <div key={index} className="border-2 border-black p-5 mb-6 rounded-lg">
    <h3 className="text-2xl font-bold mb-4">Isi Data Penumpang</h3>
    <div>
      <div className="bg-black mb-4 flex justify-between text-white px-4 p-2 rounded-xl rounded-b-none">
        <div>
          Data Diri Penumpang {index + 1} -{" "}
          {passenger ? passenger.type : "Loading..."}
        </div>
        <div>Centang</div>
      </div>
      <div className="font-bold mb-1 text-[#006769]">Title</div>
      <div className="flex relative">
        <input
          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
          name={`title-${index}`}
          placeholder="Mr."
        />
        <div className="absolute mt-2 right-3">Dropdown</div>
      </div>
      <div className="font-bold mb-1 text-[#006769]">Nama Lengkap</div>
      <input
        className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
        name={`fullname-${index}`}
        placeholder="Harry"
      />
      <div className="mb-3 flex justify-between">
        <div>Punya nama keluarga?</div>
        <button>Tombol</button>
      </div>
      <div className="font-bold mb-1 text-[#006769]">Nama Keluarga</div>
      <input
        className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
        name={`famname-${index}`}
        placeholder="Potter"
      />
      <div className="font-bold mb-1 text-[#006769]">Tanggal Lahir</div>
      <div className="flex relative">
        <input
          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
          name={`birthdate-${index}`}
          placeholder="dd/mm/yyyy"
        />
        <div className="absolute mt-2 right-3">Tanggal</div>
      </div>
      <div className="font-bold mb-1 text-[#006769]">Kewarganegaraan</div>
      <input
        className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
        name={`nation-${index}`}
        placeholder="Indonesia"
      />
      <div className="font-bold mb-1 text-[#006769]">KTP/Paspor</div>
      <input
        className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
        name={`tandapengenal-${index}`}
      />
      <div className="font-bold mb-1 text-[#006769]">Negara Penerbit</div>
      <div className="flex relative">
        <input
          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
          name={`country-${index}`}
        />
        <div className="absolute mt-2 right-3">Dropdown</div>
      </div>
      <div className="font-bold mb-1 text-[#006769]">Berlaku Sampai</div>
      <div className="flex relative">
        <input
          className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
          name={`expirydate-${index}`}
          placeholder="dd/mm/yyyy"
        />
        <div className="absolute mt-2 right-3">Tanggal</div>
      </div>
    </div>
  </div>
);

const Checkout = () => {
  const { flights_id } = useParams();
  const [pemesan, setPemesan] = useState("");
  const [taxData, setTaxData] = useState(null);
  const [flightData, setFlightData] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location?.search);
  const from = queryParams.get("from") || "UPG";
  const p = queryParams.get("p") || 1;
  const sc = queryParams.get("sc") || "ECONOMY";
  const page = queryParams.get("page") || 1;
  const child = Number(queryParams.get("child") || 1);
  const adult = Number(queryParams.get("adult") || 0);
  const baby = Number(queryParams.get("baby") || 0);

  useEffect(() => {
    const fetchDataPemesan = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://binar-project-426902.et.r.appspot.com/api/v1/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPemesan(response.data.data);
        console.log("response pemesan", response.data.data);
      } catch (error) {
        console.error("Error fetching data pemesan:", error);
      }
    };

    // const fetchTaxData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://binar-project-backend-staging.vercel.app/api/tax`
    //     );
    //     setTaxData(response.data);
    //     console.log("response tax", response.data);
    //   } catch (error) {
    //     console.error("Error fetching tax data:", error);
    //   }
    // };

    const fetchFlightData = async () => {
      try {
        const response = await axios.get(
          `https://binar-project-426902.et.r.appspot.com/api/v1/flight?from=${from}&p=${p}&sc=${sc}&page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const flight = response.data.data.flights;
        console.log("response.data.data", response.data.data.flights);
        if (Array.isArray(flight)) {
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

    fetchDataPemesan();
    // fetchTaxData();
    fetchFlightData();
  }, [flights_id, from, p, sc, page]);

  useEffect(() => {
    const totalPassengers = adult + child + baby;
    // Membuat array penumpang
    const passengersArray = Array(totalPassengers)
      .fill({})
      .map((_, index) => {
        let type = "";
        if (index < adult) {
          type = "Adult";
        } else if (index < adult + child) {
          type = "Child";
        } else {
          type = "Baby";
        }
        return { id: index, type };
      });
    setPassengers(passengersArray);
  }, [adult, child, baby]);

  // const handleSubmitIsiDataPenumpang = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `https://binar-project-backend-staging.vercel.app/api/bookings/`,
  //       {
  //         name: name,
  //         birthdate: birthdate,
  //         identity_id: identity_id,
  //         citizenship: citizenship,
  //         category: category,
  //       }
  //     );
  //     const { bookings_id } = response.data;
  //     navigate("/payment", { bookings_id });
  //   } catch (error) {
  //     console.error("Error fetching bookings_id:", error);
  //   }
  // };

  // const calculateTax = () => {
  //   const basePrice = flightData
  //     ? flightData.flights.flight_classes * categoryData.discount
  //     : 0;
  //   const taxAmount = taxData ? (taxData.percent * basePrice) / 100 : 0;
  //   return taxAmount;
  // };

  // const calculateTotal = () => {
  //   // const basePrice = flightData
  //   //   ? flightData.flights.flight_classes * categoryData.discount
  //   //   : 0; sek bingung
  //   const taxAmount = taxData ? (taxData.percent * basePrice) / 100 : 0;
  //   return basePrice + taxAmount;
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && navigate) {
      navigate("/login");
      alert("You've to Login First!");
    }
  }, [navigate]);

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Fragment>
      <div className="bg-[#FFFFFF]">
        <Navbar />
        <div className="relative min-h-screen flex justify-between py-8 flex-col items-center p-4">
          <div className="w-full max-w-4xl flex justify-start items-center space-x-2 mt-4 flex-wrap">
            <span className="text-black font-bold">Isi Data Diri</span>
            <span className="text-[#8A8A8A] font-bold">›</span>
            <span className="text-[#8A8A8A] font-bold">Bayar</span>
            {/* <span className="text-black font-bold">Bayar</span> */}
            <span className="text-[#8A8A8A] font-bold">›</span>
            <span className="text-[#8A8A8A] font-bold">Selesai</span>
          </div>
          <div className="w-full flex justify-center items-center max-w-4xl bg-[#FF0000] text-white p-3 mt-4 rounded-lg text-center">
            <p className="absolute">Anda harus login terlebih dahulu!</p>
            <button className="relative ml-auto flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 256 256"
              >
                <path
                  fill="white"
                  d="M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"
                ></path>
              </svg>
            </button>
          </div>
          {/* <div className="w-full flex justify-center items-center max-w-4xl bg-[#FF0000] text-white p-3 mt-4 rounded-lg text-center">
            <p className="absolute">
              Maaf, waktu pemesanan habis. Silakan ulangi lagi!
            </p>
            <button className="relative ml-auto flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 256 256"
              >
                <path
                  fill="white"
                  d="M165.66 101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32M232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"
                ></path>
              </svg>
            </button>
          </div> */}
          {/* <div className="w-full max-w-4xl bg-[#FF0000] text-white p-3 mt-4 rounded-lg text-center">
            <p>Selesaikan dalam 00:15:00</p>
          </div> */}
          {/* <div className="w-full max-w-4xl bg-[#73CA5C] text-white p-3 mt-4 rounded-lg text-center">
          <p>Data Anda berhasil tersimpan!</p>
        </div> */}
          <div className="w-full max-w-8xl border-t border-gray-300 mt-4"></div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-5 w-full max-w-4xl">
            <div className="w-full md:w-2/3 h-full">
              <div className="border-2 border-black p-5 mb-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Isi Data Pemesan</h3>
                <div>
                  <div className="bg-black mb-4 flex justify-between text-white px-4 p-2 rounded-xl rounded-b-none">
                    <div>Data Diri Pemesan</div>
                    {/* <div>Centang</div> */}
                  </div>
                  <div className="font-bold mb-1 text-[#006769]">
                    Nama Lengkap
                  </div>
                  <input
                    className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                    name="fullname"
                    placeholder="Harry"
                    value={pemesan ? pemesan.name : "Loading..."}
                  />
                  {/* <div className="mb-3 flex justify-between">
                    <div>Punya nama keluarga?</div>
                    <button>Tombol</button>
                  </div>
                  <div className="font-bold mb-1 text-[#006769]">
                    Nama Keluarga
                  </div>
                  <input
                    className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                    name="famname"
                    placeholder="Potter"
                  /> */}
                  <div className="font-bold mb-1 text-[#006769]">
                    Nomor Telepon
                  </div>
                  <input
                    className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                    name="notelp"
                    placeholder="Potter"
                    value={pemesan ? `${pemesan.profile.phone}` : "Loading..."}
                  />
                  <div className="font-bold mb-1 text-[#006769]">Email</div>
                  <input
                    className="border p-2 px-4 mb-3 text-black rounded-md border-[#D0D0D0] w-full"
                    name="email"
                    placeholder="Contoh: johndee@gmail.com"
                    value={pemesan ? pemesan.email : "Loading..."}
                  />
                </div>
              </div>

              <div>
                {passengers.map((passenger, index) => (
                  <PassengerForm
                    key={index}
                    passenger={passenger}
                    index={index}
                  />
                ))}
              </div>

              <button className="bg-[#006769] text-white rounded-lg text-xl p-3 w-full">
                Simpan
              </button>
              {/* <button className="bg-[#D0D0D0] text-white rounded-lg text-xl p-3 w-full">
                Simpan
              </button> */}
            </div>

            <div className="w-full md:w-1/2 h-full p-4 rounded-lg">
              <h3 className="mb-3 text-xl font-bold text-[#151515] mr-2">
                Detail Penerbangan
              </h3>
              <div className="space-y-2">
                {flightData.length > 0 ? (
                  <>
                    <div className="space-y-0">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-lg text-[#151515] mr-2">
                          {flightData
                            ? moment(flightData[0]?.flight?.departureAt).format(
                                "HH:mm"
                              )
                            : "Loading..."}
                        </div>
                        <div className="font-extrabold text-[#73CA5C]">
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
                    <div className="space-y-0">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-lg text-[#151515] mr-2">
                          {flightData
                            ? moment(flightData[0]?.flight?.arriveAt).format(
                                "HH:mm"
                              )
                            : "Loading..."}
                        </div>
                        <div className="font-extrabold text-[#73CA5C]">
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
                        {flightData
                          ? flightData[0]?.flight?.to?.name
                          : "Loading..."}
                      </div>
                    </div>
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
                        <img src={info} className="mr-1 mb-11"></img>
                        <div>
                          <div className="text-gray-600">Informasi:</div>
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
                            {/* <li>
                          In Flight Entertainment (
                          {flightData
                            ? flightData.plane.in_flight_entertainment
                              ? "Available"
                              : "Not Available"
                            : "Loading..."}
                          )
                        </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="w-full max-w-3xl border-t border-gray-600"></div>
                  </>
                ) : (
                  <p>No flight data found.</p>
                )}
                {/* <div>
                  <h4 className="font-bold text-lg mb-1">Rincian Harga</h4>
                  <div className="flex justify-between text-gray-600">
                    <div>2 Adults</div>
                    <div>IDR 9.550.000</div>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <div>1 Baby</div>
                    <div>IDR 0</div>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <div>Tax</div>
                    <div>
                      IDR {calculateTax() ? calculateTax() : "Loading..."}
                    </div>
                  </div>
                  <div className="w-full max-w-3xl border-t border-gray-600 mt-2"></div>
                  <div className="flex justify-between font-semibold text-lg mt-2">
                    <div className="font-extrabold text-[#151515]">Total</div>
                    <div className="font-extrabold text-[#006769]">
                      IDR 9.850.000
                    </div>
                  </div>
                </div> */}
                {/* <button
                  onClick={handleSubmitIsiDataPenumpang}
                  className="bg-[#FF0000] text-white rounded-lg text-xl p-3 w-full"
                >
                  Lanjut Bayar
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Checkout;
