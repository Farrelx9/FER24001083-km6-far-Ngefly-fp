import React from "react";
import loadingImg from "../../assets/images/loading.png";

export default function Loading({ label }) {
  return (
    <div className="h-[500px] flex items-center justify-center flex-col text-center">
      <p className="mb-4 text-gray-500">{label}</p>
      <img className="max-w-[300px]" src={loadingImg} alt="loading" />
    </div>
  );
}
