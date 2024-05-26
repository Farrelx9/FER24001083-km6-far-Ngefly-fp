import React, { useState } from "react";
import ngefly from "../logo/ngefly.png"
import cover from "../logo/cover.png";
import pesawatatas from "../logo/pesawatatas.png";
import pesawatbawah from "../logo/pesawatbawah.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";

const MIN_CHARACTER = 8;

export default function ResetPassword() {
  const { token } = useParams();
  const [form, setForm] = useState({
    newPassword1: "",
    newPassword2: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (form.newPassword1 !== form.newPassword2) {
      alert("Password are not same!");
    } else if (
      form.newPassword1.length < MIN_CHARACTER ||
      form.newPassword2.length < MIN_CHARACTER
    ) {
      alert("Please input minimum 8 characters!");
    } else {
      setLoading(true);

      try {
        const response = await fetch(
          `https://binar-project-backend-staging.vercel.app/api/v1/auth/resetpassword/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: form.newPassword1,
              confirm: form.newPassword2,
            }),
          }
        );
        const result = await response.json();

        setLoading(false);
        if (result.status) {
          alert(result.message);
          setSuccess(true);
        } else {
          alert(result.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    }
  };

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
        src={ngefly}
        className="w-[270px] h-[270px] absolute top-[114px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      />
      <img
        src={pesawatatas}
        className="w-[249px] h-[194px] absolute top-[194px] left-[calc(50%+581px)] transform -translate-x-1/2 -translate-y-1/2 "
      />
      <div className="bg-[#FFFFFF] bg-opacity-45 border-2 border-black border-opacity-10 shadow-sm rounded-lg p-4 w-[509px] fixed top-[406px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div>
          <div className="text-2xl font-bold">Reset Password</div>
          {success ? (
            <div className="flex flex-col justify-center items-center text-center p-5 min-h-[270px] gap-5">
              <Icon
                icon="icon-park-solid:success"
                width={110}
                color="#35b950"
              />
              <p>
                Reset Password Success
              </p>
            </div>
          ) : (
            <>
              <form
                className="flex flex-col mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  console.log("first");
                }}
              >
                <label className="mt-4">Masukkan Password Baru</label>
                <input
                  className="rounded-lg border-2 border-black border-opacity-10 p-2 mt-1 w-full h-[70]"
                  placeholder="Password"
                  type="password"
                  value={form.newPassword1}
                  onInput={(e) =>
                    setForm({ ...form, newPassword1: e.target.value })
                  }
                  required
                />
                <label className="mt-4">Ulangi Password Baru</label>
                <input
                  className="rounded-lg border-2 border-black border-opacity-10 p-2 mt-1 w-full h-[70]"
                  placeholder="Ulangi Password"
                  type="password"
                  value={form.newPassword2}
                  onInput={(e) =>
                    setForm({ ...form, newPassword2: e.target.value })
                  }
                  required
                />
              </form>
              <button
                className="bg-[#006769] text-white rounded-lg mt-6 w-full min-h-[48px] px-2 py-3 flex items-center justify-center gap-3"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <Icon icon="eos-icons:loading" width={30} />
                ) : (
                  "Reset Password"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}