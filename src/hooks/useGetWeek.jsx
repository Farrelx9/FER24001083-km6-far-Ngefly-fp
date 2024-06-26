import { useState } from "react";

export default function useGetWeek(fromDate) {
  const [date, setDate] = useState(fromDate || new Date());

  var sunday = new Date(date.setDate(date.getDate() - date.getDay())),
    result = [new Date(sunday)];
  while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
    result.push(new Date(sunday));
  }

  const nextWeek = () => {
    setDate(new Date(date.setDate(date.getDate() + 7)));
  };

  const prevWeek = () => {
    setDate(new Date(date.setDate(date.getDate() - 7)));
  };

  return { week: result, nextWeek, prevWeek };
}
