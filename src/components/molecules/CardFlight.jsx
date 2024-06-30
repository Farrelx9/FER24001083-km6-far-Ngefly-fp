import { Icon } from "@iconify/react/dist/iconify.js";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import Divider from "../atoms/Divider";
import { FLIGHT_CLASS } from "../../constant/type";
import { dateFormat, formatCurrency, getDuration } from "../../lib/function";
import { Link, useSearchParams } from "react-router-dom";

export default function CardFlight({ index, item }) {
  const [searchParams] = useSearchParams();
  const [accordion, setAccordion] = useState(false);
  const price = item.price || 0;
  const flightClass = item.name || "";

  const urlParams = new URLSearchParams({
    ...(searchParams.get("adult") && {
      adult: Number(searchParams.get("adult")),
    }),
    ...(searchParams.get("child") && {
      child: Number(searchParams.get("child")),
    }),
    ...(searchParams.get("baby") && {
      baby: Number(searchParams.get("baby")),
    }),
  });

  return (
    <div
      key={`list-${index}`}
      className={twMerge(
        "border border-gray-300 rounded-[10px] p-4 mb-5 duration-150",
        accordion ? "shadow-[0px_2px_9px_1px_#9dde8ba8]" : ""
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <p>
          {item.flight?.plane?.airline} -{" "}
          {FLIGHT_CLASS[flightClass.toString().toLowerCase()] || ""}
        </p>
        <button
          className="cursor-pointer flex justify-center items-center h-[25px] aspect-square border border-gray-300 rounded-full"
          onClick={() => setAccordion(!accordion)}
        >
          <Icon
            icon="octicon:chevron-down-24"
            width={22}
            className={twMerge("duration-150", accordion ? "rotate-180" : "")}
          />
        </button>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex-1 max-w-[650px] flex gap-5">
          <div className="flex-1 flex items-center justify-between gap-[12px]">
            <div>
              <p className="font-bold text-sm">
                {dateFormat(item.flight?.departureAt).format("HH:mm")}
              </p>
              <p className="text-xs">{item.flight?.from_code}</p>
            </div>
            <div className="flex-1 flex items-center flex-col gap-1">
              <span className="text-sm text-[#8A8A8A] font-medium">
                {getDuration(item.flight?.departureAt, item.flight?.arriveAt)}
              </span>
              <div className="w-full h-[2px] bg-gray-300" />
              <span className="text-sm text-[#8A8A8A] font-medium">Direct</span>
            </div>
            <div>
              <p className="font-bold text-sm">
                {dateFormat(item.flight?.arriveAt).format("HH:mm")}
              </p>
              <p className="text-xs">{item.flight?.to_code}</p>
            </div>
          </div>
          <Icon
            className="self-end"
            icon="icon-park-outline:baggage-delay"
            width={25}
            color="#4B1979"
          />
        </div>
        <div className="flex items-end flex-col">
          <div className="font-bold mb-2 text-[#006769]">
            {formatCurrency(price)}
          </div>
          <Link
            to={`/checkout/${item.id}?${urlParams.toString()}`}
            className="bg-[#40A578] font-medium flex w-fit justify-center items-center text-white rounded-[10px] px-8 py-2 cursor-pointer"
          >
            Pilih
          </Link>
        </div>
      </div>

      {/* accordion */}
      <div
        className={twMerge(
          "duration-150 overflow-hidden",
          accordion ? "h-full" : "h-0"
        )}
      >
        <Divider className="my-5" />
        <p className="font-bold text-[#4B1979] mb-3">Detail Penerbangan</p>
        <div className="flex justify-between gap-5">
          <div>
            <p className="font-bold">
              {dateFormat(item.flight?.departureAt).format("HH:mm")}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              {dateFormat(item.flight?.departureAt).format("DD MMMM YYYY")}
            </p>
            <p>{item.flight?.from?.name || ""}</p>
          </div>
          <p className="font-bold text-[#9DDE8B]">Keberangkatan</p>
        </div>
        <Divider className="my-3 mx-auto max-w-[700px]" />
        <div className="pl-10">
          <p className="font-bold">
            {item.flight?.plane?.airline} -{" "}
            {FLIGHT_CLASS[flightClass.toString().toLowerCase()] || ""}
          </p>
          <p className="font-bold">{item.flight?.plane_code}</p>
          <div className="text-sm mt-4">
            <p className="font-bold">Informasi:</p>
            <p>Baggage {item.flight?.plane?.baggage} kg</p>
            <p>Cabin Baggage {item.flight?.plane?.cabin_baggage} kg</p>
          </div>
        </div>
        <Divider className="my-3 mx-auto max-w-[700px]" />
        <div className="flex justify-between gap-5">
          <div>
            <p className="font-bold">
              {dateFormat(item.flight?.arriveAt).format("HH:mm")}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              {dateFormat(item.flight?.arriveAt).format("DD MMMM YYYY")}
            </p>
            <p>{item.flight?.to?.name || ""}</p>
          </div>
          <p className="font-bold text-[#9DDE8B]">Kedatangan</p>
        </div>
      </div>
    </div>
  );
}
