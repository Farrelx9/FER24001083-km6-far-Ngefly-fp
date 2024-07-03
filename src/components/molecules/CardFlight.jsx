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
    ...(searchParams.get("page") && {
      page: Number(searchParams.get("page")),
    }),
    ...(searchParams.get("rt") && {
      rt: searchParams.get("rt") === "true" ? true : "",
    }),
    ...(searchParams.get("p") && {
      p: Number(searchParams.get("p")),
    }),
    ...(searchParams.get("from") && {
      from: searchParams.get("from"),
    }),
    ...(searchParams.get("sc") && {
      sc: searchParams.get("sc"),
    }),
    ...(searchParams.get("to") && {
      to: searchParams.get("to"),
    }),
    ...(searchParams.get("rd") && {
      rd: searchParams.get("rd"),
    }),
    ...(searchParams.get("d") && {
      d: searchParams.get("d"),
    }),
    ...(searchParams.get("type") && {
      type: searchParams.get("type"),
    }),
    ...(searchParams.get("order") && {
      order: searchParams.get("order"),
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
        <div className="flex-1 max-w-[650px] flex flex-col gap-10">
          <div className="flex-1 flex items-center justify-between gap-[12px]">
            <div className="flex-1 flex items-center justify-between gap-[12px]">
              <div>
                {searchParams.get("rt") && (
                  <p className="text-sm">
                    {dateFormat(item.flight?.departureAt).format(
                      "DD MMMM YYYY"
                    )}
                  </p>
                )}
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
                <span className="text-sm text-[#8A8A8A] font-medium">
                  Direct
                </span>
              </div>
              <div>
                {searchParams.get("rt") && (
                  <p className="text-sm">
                    {dateFormat(item.flight?.arriveAt).format("DD MMMM YYYY")}
                  </p>
                )}
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
              color="#006769"
            />
          </div>
          {searchParams.get("rt") && (
            <>
              <Icon
                className="self-center"
                icon="humbleicons:exchange-horizontal"
                width={25}
                color="#8c8c8c"
              />
              <div className="flex-1 flex items-center justify-between gap-[12px]">
                <div className="flex-1 flex items-center justify-between gap-[12px]">
                  <div>
                    <p className="text-sm">
                      {dateFormat(item.flight?.return_departureAt).format(
                        "DD MMMM YYYY"
                      )}
                    </p>
                    <p className="font-bold text-sm">
                      {dateFormat(item.flight?.return_departureAt).format(
                        "HH:mm"
                      )}
                    </p>
                    <p className="text-xs">{item.flight?.to_code}</p>
                  </div>
                  <div className="flex-1 flex items-center flex-col gap-1">
                    <span className="text-sm text-[#8A8A8A] font-medium">
                      {getDuration(
                        item.flight?.return_departureAt,
                        item.flight?.return_arriveAt
                      )}
                    </span>
                    <div className="w-full h-[2px] bg-gray-300" />
                    <span className="text-sm text-[#8A8A8A] font-medium">
                      Direct
                    </span>
                  </div>
                  <div>
                    <p className="text-sm">
                      {dateFormat(item.flight?.return_arriveAt).format(
                        "DD MMMM YYYY"
                      )}
                    </p>
                    <p className="font-bold text-sm">
                      {dateFormat(item.flight?.return_arriveAt).format("HH:mm")}
                    </p>
                    <p className="text-xs">{item.flight?.from_code}</p>
                  </div>
                </div>
                <Icon
                  className="self-end"
                  icon="icon-park-outline:baggage-delay"
                  width={25}
                  color="#006769"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-end flex-col">
          <div className="font-bold mb-2 text-[#006769]">
            {formatCurrency(item.price)}
          </div>
          <Link
            to={`/checkout/${item.id}?${urlParams.toString()}`}
            className="bg-[#40A578] font-medium flex w-fit justify-center items-center text-white rounded-[10px] px-8 py-2 cursor-pointer"
          >
            Choose
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
        <p className="font-bold text-[#006769] mb-3">
          Flight {searchParams.get("rt") && "Away"} Detail
        </p>
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
          <p className="font-bold text-[#9DDE8B]">Departure</p>
        </div>
        <Divider className="my-3 mx-auto max-w-[700px]" />
        <div className="pl-10">
          <p className="font-bold">
            {item.flight?.plane?.airline} -{" "}
            {FLIGHT_CLASS[flightClass.toString().toLowerCase()] || ""}
          </p>
          <p className="font-bold">{item.flight?.plane_code}</p>
          <div className="text-sm mt-4">
            <p className="font-bold">Information:</p>
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
          <p className="font-bold text-[#9DDE8B]">Arrive</p>
        </div>
        {searchParams.get("rt") && (
          <>
            <Divider className="my-5" />
            <p className="font-bold text-[#006769] mb-3">Flight Return Detail</p>
            <div className="flex justify-between gap-5">
              <div>
                <p className="font-bold">
                  {dateFormat(item.flight?.return_departureAt).format("HH:mm")}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {dateFormat(item.flight?.return_departureAt).format(
                    "DD MMMM YYYY"
                  )}
                </p>
                <p>{item.flight?.to?.name || ""}</p>
              </div>
              <p className="font-bold text-[#9DDE8B]">Departure</p>
            </div>
            <Divider className="my-3 mx-auto max-w-[700px]" />
            <div className="pl-10">
              <p className="font-bold">
                {item.flight?.plane?.airline} -{" "}
                {FLIGHT_CLASS[flightClass.toString().toLowerCase()] || ""}
              </p>
              <p className="font-bold">{item.flight?.plane_code}</p>
              <div className="text-sm mt-4">
                <p className="font-bold">Information:</p>
                <p>Baggage {item.flight?.plane?.baggage} kg</p>
                <p>Cabin Baggage {item.flight?.plane?.cabin_baggage} kg</p>
              </div>
            </div>
            <Divider className="my-3 mx-auto max-w-[700px]" />
            <div className="flex justify-between gap-5">
              <div>
                <p className="font-bold">
                  {dateFormat(item.flight?.return_arriveAt).format("HH:mm")}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {dateFormat(item.flight?.return_arriveAt).format(
                    "DD MMMM YYYY"
                  )}
                </p>
                <p>{item.flight?.from?.name || ""}</p>
              </div>
              <p className="font-bold text-[#9DDE8B]">Arrive</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
