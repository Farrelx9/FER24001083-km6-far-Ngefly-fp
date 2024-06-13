import React, { useEffect, useState } from "react";

export default function Modal({
  id = "modal-wrapper",
  children,
  width = 400,
  open = false,
  onClose,
}) {
  const [status, setStatus] = useState(open);

  const closeModal = () => {
    setStatus(false);
    onClose();
  };

  useEffect(() => {
    setStatus(open);
  }, [open]);

  if (status)
    return (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          onClick={(e) => {
            if (e.target.id === id) closeModal();
          }}
          id={id}
        >
          <div
            className="relative w-full my-6 mx-auto max-w-3xl border-0 rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none"
            style={{ maxWidth: width }}
          >
            {children}
          </div>
        </div>
        <div
          className="opacity-25 fixed inset-0 z-40 bg-black"
          onClick={() => closeModal()}
        ></div>
      </>
    );

  return <></>;
}
