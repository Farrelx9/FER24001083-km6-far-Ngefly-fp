import React from "react";
import notFoundImg from "../../assets/images/notfound.png";

export default function NotFound({ children }) {
  return (
    <div className="h-[500px] flex items-center justify-center flex-col text-center">
      <img className="max-w-[300px]" src={notFoundImg} alt="loading" />
      {children}
    </div>
  );
}
