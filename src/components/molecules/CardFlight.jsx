import moment from "moment";
import { Icon } from "@iconify/react/dist/iconify.js";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import Divider from "../atoms/Divider";
import { FLIGHT_CLASS } from "../../constant/type";
import { formatCurrency, getDuration } from "../../lib/function";

export default function CardFlight({ index, item }) {
  const [accordion, setAccordion] = useState(false);
  const price = item.flight_classes?.[0]?.price;
  const flightClass = item.flight_classes?.[0]?.name || "";

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
          {item.plane?.airline} -{" "}
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
                {moment(item.departureAt).format("HH:mm")}
              </p>
              <p className="text-xs">{item.from_code}</p>
            </div>
            <div className="flex-1 flex items-center flex-col gap-1">
              <span className="text-sm text-[#8A8A8A] font-medium">
                {getDuration(item.departureAt, item.arriveAt)}
              </span>
              <div className="w-full h-[2px] bg-gray-300" />
              <span className="text-sm text-[#8A8A8A] font-medium">Direct</span>
            </div>
            <div>
              <p className="font-bold text-sm">
                {moment(item.arriveAt).format("HH:mm")}
              </p>
              <p className="text-xs">{item.to_code}</p>
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
          <button className="bg-[#40A578] font-medium flex w-fit justify-center items-center text-white rounded-[10px] px-8 py-2 cursor-pointer">
            Pilih
          </button>
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
              {moment(item.departureAt).format("HH:mm")}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              {moment(item.departureAt).format("DD MMMM YYYY")}
            </p>
            <p>{item.from?.name || ""}</p>
          </div>
          <p className="font-bold text-[#9DDE8B]">Keberangkatan</p>
        </div>
        <Divider className="my-3 mx-auto max-w-[700px]" />
        <div className="pl-10">
          <p className="font-bold">
            {item.plane?.airline} -{" "}
            {FLIGHT_CLASS[flightClass.toString().toLowerCase()] || ""}
          </p>
          <p className="font-bold">{item.plane_code}</p>
          <div className="text-sm mt-4">
            <p className="font-bold">Informasi:</p>
            <p>Baggage {item.plane?.baggage} kg</p>
            <p>Cabin Baggage {item.plane?.cabin_baggage} kg</p>
            <p>In Flight Entertainment</p>
          </div>
        </div>
        <Divider className="my-3 mx-auto max-w-[700px]" />
        <div className="flex justify-between gap-5">
          <div>
            <p className="font-bold">{moment(item.arriveAt).format("HH:mm")}</p>
            <p className="text-sm text-gray-500 mb-1">
              {moment(item.arriveAt).format("DD MMMM YYYY")}
            </p>
            <p>{item.to?.name || ""}</p>
          </div>
          <p className="font-bold text-[#9DDE8B]">Kedatangan</p>
        </div>
      </div>
    </div>
  );
}
