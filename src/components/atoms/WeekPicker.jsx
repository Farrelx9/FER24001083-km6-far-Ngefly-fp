import moment from "moment";
import { twMerge } from "tailwind-merge";
import { Fragment, useEffect, useState } from "react";
import useGetWeek from "../../hooks/useGetWeek";

export default function WeekPicker({ onChange, defaultDate = new Date() }) {
  const [date, setDate] = useState(defaultDate);
  const week = useGetWeek(new Date());

  useEffect(() => {
    const dateUpdate = moment(defaultDate);

    setDate(dateUpdate);
  }, [defaultDate]);

  return (
    <div className="flex items-center justify-between mt-6 gap-3 overflow-x-scroll">
      {week.map((item, index) => {
        const dateNow = moment(date);
        const dateItem = moment(item);

        return (
          <Fragment key={`week-${index}`}>
            <button
              key={`date-${index}`}
              className={twMerge(
                "group cursor-pointer text-center flex-1 duration-150 hover:bg-[#40A578] rounded-[10px] hover:text-white py-2 px-2",
                dateNow.isSame(dateItem, "day") ? "bg-[#9DDE8B] text-white" : ""
              )}
              onClick={() => {
                if (dateNow.isSame(dateItem, "day")) return;
                setDate(item);
                onChange(item);
              }}
            >
              <p className="font-bold">{moment(item).format("dddd")}</p>
              <p
                className={twMerge(
                  "text-gray-400 group-hover:text-white",
                  dateNow.isSame(dateItem, "day") ? "text-white" : ""
                )}
              >
                {moment(item).format("DD/MM/YYYY")}
              </p>
            </button>
            {index + 1 !== week.length && (
              <div className="w-[1px] h-[40px] bg-gray-300" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
