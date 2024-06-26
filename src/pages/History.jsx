import { Fragment, useEffect, useState } from "react";
import Layout from "../components/templates/Layout";
import Container from "../components/atoms/Container";
import { Link, useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Divider from "../components/atoms/Divider";
import { countDetailAmount, dateFormat, formatCurrency } from "../lib/function";
import { FLIGHT_CLASS, PAYMENT_STATUS } from "../constant/type";
import { twMerge } from "tailwind-merge";
import Modal from "../components/atoms/Modal";
import Loading from "../components/atoms/Loading";
import NotFound from "../components/atoms/NotFound";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/styles/datepicker.css";

const OPTION_FILTER = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "UNPAID",
    label: "Unpaid",
  },
  {
    value: "ISSUED",
    label: "Issued",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];
export default function History() {
  const token = window?.localStorage?.getItem("token") || "";

  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);

  const params = {
    page: searchParams.get("page") || 1,
    status: searchParams.get("status") || "", // required from url
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  };

  const selectedFilter = params.status
    ? OPTION_FILTER.find((item) => item.value === params.status) ||
      OPTION_FILTER[0]
    : OPTION_FILTER[0];

  const [filter, setFilter] = useState(selectedFilter);
  const [currentFilter, setCurrentFilter] = useState(selectedFilter);
  const [startDate, setStartDate] = useState(
    params.startDate ? new Date(params.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    params.endDate ? new Date(params.endDate) : null
  );
  const onChangeDate = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  const createParamsString = (newValue) => {
    const urlParams = new URLSearchParams({
      page: newValue?.page || params.page,
    });

    if (
      (newValue?.status && newValue?.status !== "all") ||
      (params.status && newValue?.status !== "all")
    )
      urlParams.append("status", newValue?.status || params.status);

    if (
      !(newValue?.skipFilter || false) &&
      ((startDate && endDate) || (params.startDate && params.endDate))
    ) {
      const startD = dateFormat(
        startDate || newValue?.startDate || params.startDate
      ).format();
      const endD = dateFormat(
        endDate || newValue?.endDate || params.endDate
      ).format();
      urlParams.append("startDate", startD);
      urlParams.append("endDate", endD);
    }

    return urlParams.toString();
  };

  const redirect = (params) => {
    const urlParams = createParamsString(params);

    window.location.href = `/history?${urlParams}`;
  };

  const fetchData = async () => {
    const urlParams = createParamsString();

    setLoading(true);

    try {
      const response = await fetch(
        `https://binar-project-426902.et.r.appspot.com/api/v1/bookings/?` +
          urlParams,
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

      if (response.status === 200 && result.status) {
        const data = result?.data?.bookings || [];

        // group by month
        let dataMonth = [];
        data.forEach((item) => {
          const dateItem = dateFormat(item.createdAt).format("MMMM YYYY");

          if (dataMonth.find((item) => item.date === dateItem)) {
            const index = dataMonth.findIndex((item) => item.date === dateItem);
            dataMonth[index].data.push(item);
          } else {
            dataMonth.push({
              date: dateItem,
              data: [item],
            });
          }
        });

        setList(dataMonth);
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
  }, [searchParams]);

  if (!token) {
    window.location.href = "/login";
    return <></>;
  }

  const amount = countDetailAmount(selected);

  return (
    <>
      <Layout>
        <Container className="pt-[60px]">
          <h1 className="text-3xl font-bold mb-10">Riwayat Pesanan</h1>
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full bg-[#9DDE8B] flex items-center text-white h-[50px] rounded-[10px] px-5 gap-4">
              <Link to="/">
                <Icon icon="ion:arrow-back-outline" width={24} />
              </Link>
              <div className="font-medium">Beranda</div>
            </div>
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#40A578] text-[#40A578]"
              onClick={() => {
                setModalFilter(true);
              }}
            >
              <Icon icon="flowbite:filter-outline" width={21} />
              <span>Filter</span>
            </button>
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#40A578] text-[#40A578]"
              onClick={() => {
                setModal(true);
                setFilter(currentFilter);
              }}
            >
              <Icon icon="fluent:arrow-sort-28-filled" width={21} />
              <span>{currentFilter.label}</span>
            </button>
          </div>
        </Container>
        <div className="shadow-lg h-[25px]" />
        <Container className="mt-10 pb-[80px]">
          <div className="flex gap-[60px]">
            <div className={twMerge("flex-1", selected && "hidden xl:block")}>
              {loading ? (
                <Loading label="Mencari data booking anda" />
              ) : list?.length > 0 ? (
                list.map((item, index) => (
                  <Fragment key={`group-card-history-${index}`}>
                    <p className="text-xl font-bold mb-3">{item.date}</p>
                    {item.data.map((subItem, subIndex) => (
                      <div
                        key={`card-history-${index}-${subIndex}`}
                        className={twMerge(
                          "cursor-pointer border-2 border-gray-300 rounded-[10px] p-4 mb-5 duration-150",
                          selected?.id === subItem.id ? "border-[#006769]" : ""
                        )}
                        onClick={() => setSelected(subItem)}
                      >
                        <div
                          className="px-3 py-1 rounded-full text-white inline-block"
                          style={{
                            backgroundColor:
                              PAYMENT_STATUS[
                                subItem.payment?.status
                                  .toString()
                                  .toLowerCase() || ""
                              ]?.color,
                          }}
                        >
                          {
                            PAYMENT_STATUS[
                              subItem.payment?.status
                                .toString()
                                .toLowerCase() || ""
                            ]?.label
                          }
                        </div>
                        <div className="flex justify-between items-center gap-5 mt-5">
                          <div className="flex gap-3 min-w-[100px]">
                            <div className="min-w-[12px]">
                              <Icon icon="fa:map-marker" width={12} />
                            </div>
                            <div>
                              <p className="font-bold">
                                {subItem.flight_class?.flight?.from?.city || ""}
                              </p>
                              <p className="text-xs whitespace-nowrap">
                                {dateFormat(
                                  subItem.flight_class?.flight?.departureAt ||
                                    ""
                                ).format("D MMMM YYYY")}
                              </p>
                              <p className="text-xs whitespace-nowrap">
                                {dateFormat(
                                  subItem.flight_class?.flight?.departureAt ||
                                    ""
                                ).format("HH:mm")}
                              </p>
                            </div>
                          </div>
                          <div className="w-full h-[2px] bg-gray-300" />

                          <div className="flex gap-3 min-w-[100px]">
                            <div className="min-w-[12px]">
                              <Icon icon="fa:map-marker" width={12} />
                            </div>
                            <div>
                              <p className="font-bold">
                                {subItem.flight_class?.flight?.to?.city || ""}
                              </p>
                              <p className="text-xs whitespace-nowrap">
                                {dateFormat(
                                  subItem.flight_class?.flight?.arriveAt || ""
                                ).format("D MMMM YYYY")}
                              </p>
                              <p className="text-xs whitespace-nowrap">
                                {dateFormat(
                                  subItem.flight_class?.flight?.arriveAt || ""
                                ).format("HH:mm")}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Divider className="my-4" />
                        <div className="flex justify-between">
                          <div>
                            <p className="font-bold">Bookin Code:</p>
                            <p>{subItem.id}</p>
                          </div>
                          <div>
                            <p className="font-bold">Class:</p>
                            <p>
                              {
                                FLIGHT_CLASS[
                                  subItem.flight_class?.name
                                    ?.toString()
                                    .toLowerCase() || ""
                                ]
                              }
                            </p>
                          </div>
                          <p className="font-bold mb-2 text-[#006769]">
                            {formatCurrency(subItem.total_price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Fragment>
                ))
              ) : (
                <NotFound>
                  <p className="font-medium mt-5">Belum ada data</p>
                </NotFound>
              )}
            </div>
            {selected && !loading && (
              <div className="xl:w-[320px] flex-1 xl:flex-none">
                <div
                  className="xl:hidden inline-flex items-center gap-2 cursor-pointer font-bold text-gray-500"
                  onClick={() => setSelected(null)}
                >
                  <Icon icon="ion:arrow-back-outline" width={18} />
                  Back to List
                </div>
                <Divider className="my-3 block xl:hidden" />
                <div className="flex items-center justify-between gap-5 mb-5">
                  <p className="text-xl font-bold">Detail Pesanan</p>
                  <div
                    className="px-3 py-1 rounded-full text-white inline-block"
                    style={{
                      backgroundColor:
                        PAYMENT_STATUS[
                          selected.payment?.status.toString().toLowerCase() ||
                            ""
                        ]?.color,
                    }}
                  >
                    {
                      PAYMENT_STATUS[
                        selected.payment?.status.toString().toLowerCase() || ""
                      ]?.label
                    }
                  </div>
                </div>
                <div className="mb-5">
                  Booking Code:{" "}
                  <span className="text-[#006769] font-bold">
                    {selected.id}
                  </span>
                </div>
                <div className="flex justify-between gap-5">
                  <div>
                    <p className="font-bold">
                      {dateFormat(
                        selected.flight_class?.flight?.departureAt || ""
                      ).format("HH:mm")}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      {dateFormat(
                        selected.flight_class?.flight?.departureAt || ""
                      ).format("DD MMMM YYYY")}
                    </p>
                    <p>{selected.flight_class?.flight?.from?.name || ""}</p>
                  </div>
                  <p className="font-bold text-[#9DDE8B] text-xs">
                    Keberangkatan
                  </p>
                </div>
                <Divider className="my-3 mx-auto" />
                <div className="pl-10">
                  <p className="font-bold">
                    {selected?.flight_class?.flight?.plane?.airline || ""} -{" "}
                    {FLIGHT_CLASS[
                      selected.flight_class?.name.toString().toLowerCase()
                    ] || ""}
                  </p>
                  <p className="font-bold">
                    {selected?.flight_class?.flight?.plane?.plane_code || ""}
                  </p>
                  <div className="text-sm mt-4">
                    <p className="font-bold">Informasi:</p>
                    {selected.passengers?.map((passenger, indexPassenger) => (
                      <Fragment key={`passenger-${indexPassenger}`}>
                        <p className="text-[#4B1979]">
                          Penumpang {indexPassenger + 1}: Mr. {passenger.name}
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
                        selected.flight_class?.flight?.arriveAt || ""
                      ).format("HH:mm")}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      {dateFormat(
                        selected.flight_class?.flight?.arriveAt || ""
                      ).format("DD MMMM YYYY")}
                    </p>
                    <p>{selected.flight_class?.flight?.to?.name || ""}</p>
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
                  <p>{formatCurrency(selected.total_price || 0)}</p>
                </div>
                {selected.payment?.status === "ISSUED" && (
                  <>
                    <Divider className="my-3 mx-auto" />
                    <button
                      className="bg-[#006769] hover:bg-[#40A578] text-white rounded-lg w-full h-[48px]"
                      type="button"
                    >
                      Cetak Tiket
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </Container>
      </Layout>
      <Modal open={modalFilter} onClose={() => setModalFilter(false)}>
        <div className="flex justify-end p-3">
          <button onClick={() => setModalFilter(false)} className="p-1">
            <Icon icon="iconamoon:sign-times-bold" width={28} />
          </button>
        </div>
        <div className="py-3 px-3">
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            calendarClassName="tailwind-datepicker w-full"
          />
        </div>
        <div className="flex justify-end p-3 gap-4">
          {startDate && endDate && (
            <button
              className="px-10 py-2 rounded-[10px] border-2 border-[#006769] hover:border-[#104b4c] hover:bg-[#104b4c] duration-150 text-[#006769] hover:text-white"
              onClick={() => {
                redirect({ skipFilter: true });
              }}
            >
              Restart
            </button>
          )}

          <button
            className="px-10 py-2 rounded-[10px] bg-[#006769] hover:bg-[#104b4c] duration-150 text-white"
            onClick={() => {
              setCurrentFilter(filter);
              setModalFilter(false);
              redirect({ status: filter.value });
            }}
          >
            Simpan
          </button>
        </div>
      </Modal>
      <Modal open={modal} onClose={() => setModal(false)}>
        <div className="flex justify-end p-3">
          <button onClick={() => setModal(false)} className="p-1">
            <Icon icon="iconamoon:sign-times-bold" width={28} />
          </button>
        </div>
        <div>
          {OPTION_FILTER.map((item, index) => {
            const selected = item.value === filter.value;

            return (
              <div
                key={`options-filter-${index}`}
                className={twMerge(
                  "px-3 duration-150",
                  selected && "bg-[#40A578] text-white"
                )}
              >
                <button
                  className={twMerge(
                    "flex justify-between items-center border-b border-gray-300 py-3 px-3 w-full"
                  )}
                  onClick={() => setFilter(item)}
                >
                  <span>{item.label}</span>
                  {selected && (
                    <Icon
                      className="text-[#73CA5C]"
                      icon="icon-park-solid:check-one"
                      width={21}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end p-3">
          <button
            className="px-10 py-2 rounded-[10px] bg-[#006769] hover:bg-[#104b4c] duration-150 text-white"
            onClick={() => {
              setCurrentFilter(filter);
              setModal(false);
              redirect({ status: filter.value });
            }}
          >
            Pilih
          </button>
        </div>
      </Modal>
    </>
  );
}
