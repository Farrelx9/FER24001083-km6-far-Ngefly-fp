import React, { useEffect, useState } from "react";
import ngefly from "../logo/ngefly.png";
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const API_URL = process.env.API_URL;

  useEffect(() => {
    async function verifyAccount() {
      try {
        const response = await fetch(
          `${API_URL}/auth/verify/${token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        setLoading(false);
        if (result.status) {
          console.log(result);
          alert(result.message);
          setResult(result.data || null);
          setSuccess(true);
        } else {
          alert(result.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    }

    verifyAccount();
  }, [token]);

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
        className="w-[249px] h-[194px] md:hidden lg:flex hidden absolute top-[631px] left-[calc(50%-470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <img
        src={ngefly}
        className="w-[270px] h-[270px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      />
      <img
        src={pesawatatas}
        className="w-[249px] h-[194px] md:hidden lg:flex hidden absolute top-[194px] left-[calc(50%+470px)] transform -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] h-fit absolute top-[436px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-sm:w-[90%]">
        <div>
          {loading ? (
            <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
              <Icon icon="eos-icons:loading" width={150} color="#35b950" />
            </div>
          ) : success ? (
            <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
              <Icon
                icon="icon-park-solid:success"
                width={110}
                color="#35b950"
              />
              <div>
                <p className="font-bold text-3xl mb-2">
                  Hi{" "}
                  <span className="text-[#35b950]">
                    {result?.user?.name || ""}
                  </span>
                </p>
                <p>Your account is verified. Enjoy the journey.</p>
              </div>
              <a
                href="/"
                className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
              >
                Start Journey
              </a>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
              <Icon
                icon="fluent:warning-48-filled"
                width={110}
                color="#c75d16"
              />
              <div>
                <p className="font-bold text-3xl mb-2">Verify Failed!</p>
                <p className="text-sm md:text-base text-gray-600 mb-6">
                  Verify token expired or invalid. Please try resend
                  verification email again
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
