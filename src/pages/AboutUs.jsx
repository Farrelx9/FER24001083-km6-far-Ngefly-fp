import React from "react";
import Wonwoo from "../assets/logo/Wonwoo.jpg";
import ngefly from "../assets/logo/ngefly.png";

import { FaHeadset, FaMoneyBill, FaShieldAlt } from "react-icons/fa";

const AdvantageSection = () => {
  return (
    <section
      className="py-16 relative mt-40"
      style={{
        backgroundColor: "#D6FFDE",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-4 font-serif">
            ADVANTAGES
          </h2>
          <p
            className="text-lg text-gray-700"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Rasakan perbedaan dengan layanan unggulan kami yang didukung oleh
            komitmen terhadap kualitas dan kepuasan pelanggan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Responsive Customer Service */}
          <div className="advantage-card bg-gradient-to-br from-[#FFD571] to-[#F99D5C] rounded-lg shadow-lg p-8 text-white relative overflow-hidden">
            <h3 className="text-[#006769] font-extrabold mb-4 font-serif leading-relaxed">
              <span className="text-2xl block mb-2">
                <FaHeadset className="inline-block mr-2" />
                Responsif Pelanggan
              </span>
            </h3>
            <p
              className="text-base mb-4 font-medium text-gray-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Kami siap membantu Anda dengan cepat dan efisien, baik melalui
              telepon, email, atau chat online.
            </p>
          </div>
          {/* Competitive Prices */}
          <div className="advantage-card bg-gradient-to-br from-[#90E0EF] to-[#57A0D3] rounded-lg shadow-lg p-8 text-white relative overflow-hidden">
            <h3 className="text-[#006769] font-extrabold mb-4 font-serif leading-relaxed">
              <span className="text-2xl block mb-2">
                <FaMoneyBill className="inline-block mr-2" />
                Harga yang Kompetitif{" "}
              </span>
            </h3>
            <p
              className="text-base mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Dapatkan tiket pesawat dengan harga terbaik tanpa mengorbankan
              kualitas atau kenyamanan perjalanan.
            </p>
          </div>
          {/* Transaction Security */}
          <div className="advantage-card bg-gradient-to-br from-[#A6FFCB] to-[#12BC9B] rounded-lg shadow-lg p-8 text-white relative overflow-hidden">
            <h3 className="text-[#006769] font-extrabold mb-4 font-serif leading-relaxed">
              <span className="text-2xl block mb-2">
                <FaShieldAlt className="inline-block mr-2" />
                Keamanan Transaksi
              </span>
            </h3>
            <p
              className="text-base mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Lindungi data pribadi dan informasi pembayaran Anda dengan
              teknologi keamanan terkini.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
const AboutUsAndTeam = () => {
  const teamMembers = [
    {
      name: "BIMA MUKTI WIBOWO",
      role: "Front End JS Development",
      image: Wonwoo,
    },
    {
      name: "FARREL FARHAN GABRIELA",
      role: "Front End JS Development",
      image: Wonwoo,
    },
    {
      name: "NESVIA NISSA ARTANTI",
      role: "Front End JS Development",
      image: Wonwoo,
    },
    {
      name: "RIZVINA HADI IMANI",
      role: "Front End JS Development",
      image: Wonwoo,
    },
    {
      name: "I KETUT KRISNA KERTAJAYA",
      role: "Back End JS Development",
      image: Wonwoo,
    },
    { name: "ADI IRAWAN", role: "Back End JS Development", image: Wonwoo },
    {
      name: "DEWANGGA NANDA ARJUNA",
      role: "Back End JS Development",
      image: Wonwoo,
    },
  ];

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 mt-20 md:flex md:items-center">
          <div className="md:w-1/2 relative flex justify-center items-center">
            <div className="relative w-[450px] h-[450px] rounded-full overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[#48C9B0] to-[#0E6655] transform -rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={ngefly}
                  alt="Gym Storia"
                  className="w-[350px] h-[350px] object-cover rounded-full shadow-2xl"
                  onError={(e) => console.log("Error loading image:", e)}
                />
              </div>
            </div>
          </div>

          <div className="md:w-1/2 md:pl-10 mt-20">
            <h2 className="text-4xl font-black text-black mb-4 font-serif">
              ABOUT US
            </h2>
            <h3 className="text-2xl text-[#006769] mb-6 font-extrabold font-serif">
              Welcome To NgeFly.com
            </h3>
            <p className="text-lg text-gray-700 font-serif leading-relaxed">
              Di <span className="font-bold">NgeFly.com</span>, kami berkomitmen
              untuk membantu Anda memesan tiket pesawat dengan mudah dan nyaman.
              Kami memahami bahwa setiap perjalanan memiliki kebutuhan yang
              berbeda-beda, dan itulah sebabnya kami hadir untuk menyediakan
              solusi pemesanan tiket pesawat yang fleksibel dan sesuai dengan
              preferensi Anda.
            </p>
          </div>
        </div>
        <AdvantageSection />
        <h2 className="text-4xl font-extrabold text-center mb-20 mt-20 text-black font-serif">
          OUR TEAM
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-member rounded-lg shadow-lg overflow-hidden relative transform transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: "transparent",
                width: "250px",
                height: "380px",
              }}
            >
              <div
                className="p-4 rounded-t-lg hover:bg-[#D6FFDE] text-white flex flex-col items-center"
                style={{
                  transition: "background-color 0.3s",
                  height: "100%",
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full object-cover"
                  style={{
                    transition: "transform 0.3s",
                    height: "250px",
                  }}
                />
                <div className="text-gray-700 mt-2 text-center flex-grow flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-[#006769] mb-2">
                    <span
                      className="hover:text-black"
                      style={{ transition: "color 0.3s" }}
                    >
                      {member.name}
                    </span>
                  </h3>
                  <p className="text-gray-700 bg-[#D6FFDE] rounded-full px-3 py-1 text-sm font-semibold">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <AboutUsAndTeam />
    </div>
  );
}

export default App;
