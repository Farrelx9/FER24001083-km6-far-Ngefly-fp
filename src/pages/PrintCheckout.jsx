import { Fragment, useEffect, useRef, useState } from "react";
import Divider from "../components/atoms/Divider";
import { countDetailAmount, dateFormat, formatCurrency } from "../lib/function";
import { FLIGHT_CLASS, PAYMENT_STATUS } from "../constant/type";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Container from "../components/atoms/Container";

export default function PrintCheckout() {
  const { id } = useParams();
  const token = window?.localStorage?.getItem("token") || "";
  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const API_URL = process.env.API_URL;

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/bookings/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setLoading(false);
      if (response.status === 404) {
        return;
      }

      console.log(result);
      if (response.status === 200 && result.status) {
        const temp = result?.data || null;

        setData(temp);
      } else {
        throw new Error(result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data)
      setTimeout(() => {
        handlePrint();
      }, 500);
  }, [loading, data, handlePrint]);

  const amount = countDetailAmount(data);

  if (!loading && data)
    return (
      <div>
        <Container className="flex justify-end pt-[40px]">
          <button
            className="px-10 py-2 rounded-[10px] bg-[#006769] hover:bg-[#104b4c] duration-150 text-white"
            onClick={handlePrint}
          >
            Print
          </button>
        </Container>
        <div
          className="w-screen min-h-[calc(100vh-80px)] flex justify-center items-center"
          ref={printRef}
        >
          <div className="w-full max-w-[500px] border-2 p-5">
            <div className="flex items-center justify-between gap-5 mb-5">
              <p className="text-xl font-bold">Detail Pesanan</p>
              <div
                className="px-3 py-1 rounded-full text-white inline-block"
                style={{
                  backgroundColor:
                    PAYMENT_STATUS[
                      data?.payment?.status.toString().toLowerCase() || ""
                    ]?.color,
                }}
              >
                {
                  PAYMENT_STATUS[
                    data?.payment?.status.toString().toLowerCase() || ""
                  ]?.label
                }
              </div>
            </div>
            <div className="mb-5">
              Booking Code:{" "}
              <span className="text-[#006769] font-bold">{data?.id}</span>
            </div>
            <div className="flex justify-between gap-5">
              <div>
                <p className="font-bold">
                  {dateFormat(
                    data?.flight_class?.flight?.departureAt || ""
                  ).format("HH:mm")}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {dateFormat(
                    data?.flight_class?.flight?.departureAt || ""
                  ).format("DD MMMM YYYY")}
                </p>
                <p>{data?.flight_class?.flight?.from?.name || ""}</p>
              </div>
              <p className="font-bold text-[#9DDE8B] text-xs">Keberangkatan</p>
            </div>
            <Divider className="my-3 mx-auto" />
            <div className="pl-10">
              <p className="font-bold">
                {data?.flight_class?.flight?.plane?.airline || ""} -{" "}
                {FLIGHT_CLASS[
                  data?.flight_class?.name.toString().toLowerCase()
                ] || ""}
              </p>
              <p className="font-bold">
                {data?.flight_class?.flight?.plane?.plane_code || ""}
              </p>
              <div className="text-sm mt-4">
                <p className="font-bold">Informasi:</p>
                {data?.passengers?.map((passenger, indexPassenger) => (
                  <Fragment key={`passenger-${indexPassenger}`}>
                    <p className="text-[#4B1979]">
                      Penumpang {indexPassenger + 1}: {passenger.name}
                    </p>
                    <p>ID: {passenger.id}</p>
                  </Fragment>
                ))}
              </div>
            </div>
            <Divider className="my-3 mx-auto" />
            <div className="flex justify-between gap-5">
              <div>
                <p className="font-bold">
                  {dateFormat(
                    data?.flight_class?.flight?.arriveAt || ""
                  ).format("HH:mm")}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {dateFormat(
                    data?.flight_class?.flight?.arriveAt || ""
                  ).format("DD MMMM YYYY")}
                </p>
                <p>{data?.flight_class?.flight?.to?.name || ""}</p>
              </div>
              <p className="font-bold text-[#9DDE8B] text-xs">Kedatangan</p>
            </div>
            <Divider className="my-3 mx-auto" />
            <p className="font-bold">Rincian harga</p>
            {amount.category.adult > 0 && (
              <div className="flex justify-between items-center">
                <p>{amount.category.adult} Adults</p>
                <p>{formatCurrency(amount.adult)}</p>
              </div>
            )}
            {amount.category.child > 0 && (
              <div className="flex justify-between items-center">
                <p>{amount.category.child} Child</p>
                <p>{formatCurrency(amount.child)}</p>
              </div>
            )}
            {amount.category.baby > 0 && (
              <div className="flex justify-between items-center">
                <p>{amount.category.baby} Baby</p>
                <p>{formatCurrency(amount.baby)}</p>
              </div>
            )}
            {amount.tax > 0 && (
              <div className="flex justify-between items-center">
                <p>Tax</p>
                <p>{formatCurrency(amount.tax)}</p>
              </div>
            )}
            <Divider className="my-3 mx-auto" />
            <div className="flex justify-between gap-5">
              <p className="font-bold">Total</p>
              <p>{formatCurrency(data?.total_price || 0)}</p>
            </div>
          </div>
        </div>
      </div>
    );
}
