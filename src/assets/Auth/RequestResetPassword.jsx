import React, { useEffect, useState } from "react";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import ngefly from "../logo/ngefly.png";
import { Icon } from "@iconify/react/dist/iconify.js";

const INIT_COUNTDOWN_ON_SECONDS = 60;

export default function Request() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log(seconds);
    console.log(startCountdown);
    if (seconds > 0 && startCountdown) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds, startCountdown]);

  const handleSubmit = async () => {
    const data = { email };

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        "https://binar-project-426902.et.r.appspot.com/api/v1/auth/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      setLoading(false);

      if (response.status === 404) {
        setErrorMessage(result.message);
        return;
      }

      if (response.status === 200 && result.status) {
        setSuccessMessage(result.message);
        setStartCountdown(true);
        setSeconds(INIT_COUNTDOWN_ON_SECONDS);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="bg-white relative h-screen"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={pesawatbawah}
        className="w-[249px] h-[194px] absolute top-[631px] left-[calc(50%-470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <img
        src={ngefly}
        className="w-[249px] h-[249px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <img
        src={pesawatatas}
        className="w-[249px] h-[194px] absolute top-[194px] left-[calc(50%+470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-fit absolute top-[436px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
        <div>
          <div className="text-2xl font-bold">Lupa Password</div>
          {startCountdown ? (
            <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
              <Icon
                icon="icon-park-solid:success"
                width={110}
                color="#35b950"
              />
              <p>
                Link reset password has been sent to your email. Please check
                your email!
              </p>
              <button
                className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
                onClick={() => setStartCountdown(false)}
                disabled={startCountdown && seconds !== 0}
              >
                {startCountdown && seconds === 0
                  ? "Resend"
                  : `Please wait ${seconds} seconds to resend your reset password request`}
              </button>
            </div>
          ) : (
            <form
              className="flex flex-col mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label className="mt-4">Email</label>
              <input
                type="email"
                className={`rounded-lg border-2 p-2 mt-1 w-full min-h-[48px] max-sm:w-[100%] ${
                  errorMessage
                    ? " border-[#FF0000]"
                    : "border-black border-opacity-10"
                }`}
                placeholder="Contoh: snoopdog@gmail.com"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />

              <button
                className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
                onClick={() => {
                  if (startCountdown) {
                    setStartCountdown(false);
                  } else {
                    handleSubmit();
                  }
                }}
                disabled={loading}
              >
                {loading ? (
                  <Icon icon="eos-icons:loading" width={30} />
                ) : (
                  "Send"
                )}
              </button>
            </form>
          )}
        </div>
        {errorMessage && (
          <div className="mt-[30px] w-full flex items-center justify-center text-center absolute left-1/2 transform -translate-x-1/2">
            <div className="text-white text-xl font-semibold p-3 bg-[#FF0000] rounded-lg max-sm:text-lg">
              {errorMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
