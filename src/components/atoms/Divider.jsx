import { twMerge } from "tailwind-merge";

export default function Divider({ className, type = "horizontal" }) {
  return (
    <div
      className={twMerge(
        "bg-gray-300",
        type === "vertical"
          ? "w-[1px] h-full"
          : type === "horizontal"
          ? "w-full h-[1px]"
          : "",
        className
      )}
    />
  );
}
