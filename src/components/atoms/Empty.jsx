import React from "react";
import emptyImg from "../../assets/images/empty.png";

export default function Empty({ children }) {
  return (
    <div className="h-[500px] flex items-center justify-center flex-col text-center">
      <img className="max-w-[300px]" src={emptyImg} alt="loading" />
      {children}
    </div>
  );
}
