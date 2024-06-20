import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../assets/Properties/Navbar";
import { useNavigate } from "react-router-dom";

const PassengerForm = ({ categoryData, index }) => (
  <div key={index} className="border-2 border-black p-5 mb-6 rounded-lg">
    <h3 className="text-2xl font-bold mb-4">Isi Data Penumpang</h3>
    <div>
      <div className="bg-black mb-4 flex justify-between text-white px-4 p-2 rounded-xl rounded-b-none">
        <div>
          Data Diri Penumpang {index + 1} -{" "}
          {categoryData ? categoryData.type : "Loading..."}
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

const Checkout = ({ flight_id, category_id }) => {
  const [pemesan, setPemesan] = useState("");
  const [taxData, setTaxData] = useState(null);
  const [flightData, setFlightData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [passengers] = useState([{}, {}, {}]);
  // const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataPemesan = async () => {
      try {
        const response = await axios.get(
          `https://binar-project-backend-staging.vercel.app/api/profile`
        );
        setPemesan(response.data);
        console.log("response pemesan", response.data);
      } catch (error) {
        console.error("Error fetching data pemesan:", error);
      }
    };

    const fetchTaxData = async () => {
      try {
        const response = await axios.get(
          `https://binar-project-backend-staging.vercel.app/api/tax`
        );
        setTaxData(response.data);
        console.log("response tax", response.data);
      } catch (error) {
        console.error("Error fetching tax data:", error);
      }
    };

    const fetchFlightData = async () => {
      try {
        const response = await axios.get(
          `https://binar-project-backend-staging.vercel.app/api/flights/${flight_id}`
        );
        setFlightData(response.data);
        console.log("response flight", response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `https://binar-project-backend-staging.vercel.app/api/category/${category_id}`
        );
        setCategoryData(response.data);
        // setPassengers(response.data.passengers);
        console.log("response category", response.data);
        console.log("response passengers", response.data.passengers);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchDataPemesan();
    fetchTaxData();
    fetchFlightData();
    fetchCategoryData();
  }, [flight_id, category_id]);

  const handleSubmitIsiDataPenumpang = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError(true);
      setEmailErrorMessage("Email Invalid!");
      return;
    }

    if (!isPasswordValid) {
      setPasswordError(true);
      setPasswordErrorMessage("Password Invalid!");
      return;
    }

    try {
      const response = await axios.post(
        `https://binar-project-backend-staging.vercel.app/api/bookings/`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("ApiResponse", response.data);
      const { status, data } = response.data;

      if (!status && data.user && data.user.is_verified === false) {
        setIsEmailVerified(false);
        setError("Email not verified!");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setData(data);
        setError(null);
        setEmailError(false);
        setPasswordError(false);
        setIsEmailVerified(true);

        setTimeout(() => {
          navigate("/", { state: { user: data } });
        }, 2000);
      } else {
        setError("Token Expired Broo!");
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (error) {
      console.error("API Request Error:", error);
      if (error.response && error.response.status === 401) {
        setError("Email not verified!");
      } else if (error.response && error.response.status === 404) {
        setError("Account not found!");
      } else if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setError("Pasword Invalid!");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const calculateTax = () => {
    const basePrice = flightData
      ? flightData.flights.flight_classes * categoryData.discount
      : 0;
    const taxAmount = taxData ? (taxData.percent * basePrice) / 100 : 0;
    return taxAmount;
  };

  const calculateTotal = () => {
    // const basePrice = flightData
    //   ? flightData.flights.flight_classes * categoryData.discount
    //   : 0; sek bingung
    const taxAmount = taxData ? (taxData.percent * basePrice) / 100 : 0;
    return basePrice + taxAmount;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && navigate) {
      navigate("/login");
      // Jika tidak ada token, arahkan pengguna kembali ke halaman login
      alert("You've to Login First!");
    }
  }, [navigate]);

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

            <div className="w-full md:w-1/2 h-full bg-gray-100 p-4 rounded-lg">
              <h3 className="mb-3 text-xl font-bold text-[#151515] mr-2">
                Detail Penerbangan
              </h3>
              <div className="space-y-2">
                <div className="space-y-0">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg text-[#151515] mr-2">
                      {flightData ? flightData.departureAt : "Loading..."}
                    </div>
                    <div className="font-extrabold text-[#73CA5C]">
                      Keberangkatan
                    </div>
                  </div>
                  <div className="text-gray-600">
                    {flightData ? flightData.departureAt : "Loading..."}
                  </div>
                  <div className="text-[#151515]">
                    {flightData
                      ? `${flightData.from.name}` -
                        `${flightData.from.airport_code}`
                      : "Loading..."}
                  </div>
                </div>
                <div className="w-full max-w-3xl border-t border-gray-600 mt-4"></div>
                <div className="space-y-0">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg text-[#151515] mr-2">
                      {flightData ? flightData.arriveAt : "Loading..."}
                    </div>
                    <div className="font-extrabold text-[#73CA5C]">
                      Kedatangan
                    </div>
                  </div>
                  <div className="text-gray-600">
                    {flightData ? flightData.arriveAt : "Loading..."}
                  </div>
                  <div className="text-[#151515]">
                    {flightData ? flightData.to.name : "Loading..."}
                  </div>
                </div>
                <div className="max-w-3xl border-t border-gray-600 py-1">
                  <div className="text-[#006769] pl-12 text-lg font-extrabold">
                    {flightData ? flightData.plane.airline : "Loading..."} -{" "}
                    {flightData ? flightData.class : "Loading..."}
                  </div>
                  <div className="text-[#006769] pl-12 text-lg font-extrabold mb-3">
                    {flightData ? flightData.plane.plane_code : "Loading..."}
                  </div>
                  <div className="flex">
                    <div className="mr-4">logo</div>
                    <div>
                      <div className="text-gray-600">Informasi:</div>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>
                          Baggage{" "}
                          {flightData ? flightData.plane.baggage : "Loading..."}{" "}
                          kg
                        </li>
                        <li>
                          Cabin baggage{" "}
                          {flightData
                            ? flightData.plane.cabin_baggage
                            : "Loading..."}{" "}
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
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-3xl border-t border-gray-600"></div>
                <div>
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
                </div>
                <button className="bg-[#FF0000] text-white rounded-lg text-xl p-3 w-full">
                  Lanjut Bayar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Checkout;