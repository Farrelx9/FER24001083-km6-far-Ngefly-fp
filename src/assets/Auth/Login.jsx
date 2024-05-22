import React from "react";
import logo from "../logo/logo.png";
import cover from "../logo/cover.png";
export default function Login() {
  return (
    <div
      className="bg-white relative h-screen "
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={logo}
        className="w-[246px] h-[146px] absolute top-[186px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 shadow-sm rounded-md p-4 w-[509px] h-[373px] fixed top-[473px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div>
          <div className="text-2xl font-bold text">Masuk</div>
        </div>
      </div>
    </div>
  );
}
