import React, { Children } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";

export default function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-40 "
      id="wrapper"
      onClick={handleClose}
    >
      <div className="lg:w-[702px] md:w-[702px] w-[350px] flex flex-col">
        <button
          className="text-black place-self-end mb-1"
          onClick={() => onClose()}
        >
          <AiOutlineFullscreenExit size={20} />
        </button>
        <div className="bg-white p-2 rounded-lg">{children}</div>
      </div>
    </div>
  );
}
