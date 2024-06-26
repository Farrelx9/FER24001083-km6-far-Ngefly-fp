import { twMerge } from "tailwind-merge";
import { Fragment, useEffect, useState } from "react";
import useGetWeek from "../../hooks/useGetWeek";
import { Icon } from "@iconify/react/dist/iconify.js";
import { dateFormat } from "../../lib/function";

export default function WeekPicker({ onChange, defaultDate }) {
  const [date, setDate] = useState(null);
  const { week, nextWeek, prevWeek } = useGetWeek(
    defaultDate ? new Date(defaultDate) : null
  );

  useEffect(() => {
    if (defaultDate) {
      const dateUpdate = dateFormat(defaultDate);

      setDate(dateUpdate);
    }
  }, [defaultDate]);

  return (
    <div className="flex items-center justify-between mt-6 gap-3 overflow-x-scroll">
      <button
        className="h-full duration-150 hover:bg-[#40A578] hover:text-white rounded-[10px] py-2 px-1"
        onClick={prevWeek}
      >
        <Icon icon="ci:chevron-left" width={30} />
      </button>

      {week.map((item, index) => {
        const dateNow = date ? dateFormat(date) : dateFormat();
        const dateItem = dateFormat(item);

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
              <p className="font-bold">{dateFormat(item).format("dddd")}</p>
              <p
                className={twMerge(
                  "text-gray-400 group-hover:text-white",
                  dateNow.isSame(dateItem, "day") ? "text-white" : ""
                )}
              >
                {dateFormat(item).format("DD/MM/YYYY")}
              </p>
            </button>
            {index + 1 !== week.length && (
              <div className="w-[1px] h-[40px] bg-gray-300" />
            )}
          </Fragment>
        );
      })}
      <button
        className="h-full duration-150 hover:bg-[#40A578] hover:text-white rounded-[10px] py-2 px-1"
        onClick={nextWeek}
      >
        <Icon icon="ci:chevron-right" width={30} />
      </button>
    </div>
  );
}
