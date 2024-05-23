import React from "react";
import logo from "../logo/logo.png";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
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
        src={pesawatbawah}
        className="w-[249px] h-[194px] absolute top-[631px] left-[calc(50%-581px)] transform -translate-x-1/2 -translate-y-1/2 "
      />
      <img
        src={logo}
        className="w-[246px] h-[146px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      />
      <img
        src={pesawatatas}
        className="w-[249px] h-[194px] absolute top-[194px] left-[calc(50%+581px)] transform -translate-x-1/2 -translate-y-1/2 "
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-[373px] fixed top-[406px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div>
          <div className="text-2xl font-bold ms-4  ">Masuk</div>
          <form className="flex flex-col ms-3 mt-4">
            <label className="mt-4">Email</label>
            <input
              className="rounded-lg border-2 border-black border-opacity-10 p-2 mt-1 w-[452px] h-[70]"
              placeholder="Contoh: snoopdog@gmail.com"
            />
            <div className="flex justify-between">
              <label className="mt-4 mb-2">Password</label>
              <button className="text-[#40A578] hover:text-[#006769] mt-4">
                Lupa kata sandi?
              </button>
            </div>
            <input
              className="rounded-lg border-2 border-black border-opacity-10 p-2 w-[452px] h-[70]"
              placeholder="Masukan password"
            />
          </form>
          <button className="bg-[#006769] text-white rounded-lg ms-3 mt-6 w-[452px] h-[48px]">
            Masuk
          </button>
          <div className="flex gap-4 justify-center mt-4">
            <div>Belum punya akun?</div>
            <button className="text-[#40A578] font-bold hover:text-[#006769]">
              Daftar di sini{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
