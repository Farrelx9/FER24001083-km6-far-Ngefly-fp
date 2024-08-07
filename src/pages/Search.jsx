import { Icon } from "@iconify/react/dist/iconify.js";
import Container from "../components/atoms/Container";
import Layout from "../components/templates/Layout";
import WeekPicker from "../components/atoms/WeekPicker";
import Divider from "../components/atoms/Divider";
import Loading from "../components/atoms/Loading";
import NotFound from "../components/atoms/NotFound";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Modal from "../components/atoms/Modal";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import CardFlight from "../components/molecules/CardFlight";
import { FLIGHT_CLASS } from "../constant/type";
import { dateFormat } from "../lib/function";
import Footer from "../assets/Properties/Footer";

const OPTION_SORT = [
  {
    value: {
      type: "price",
      order: "asc",
    },
    label: (
      <>
        <span className="font-medium">Price</span> - Cheapest
      </>
    ),
    label_short: "Cheapest",
  },
  {
    value: {
      type: "departure_at",
      order: "asc",
    },
    label: (
      <>
        <span className="font-medium">Departure</span> - First
      </>
    ),
    label_short: "Earliest Departure",
  },
  {
    value: {
      type: "departure_at",
      order: "desc",
    },
    label: (
      <>
        <span className="font-medium">Departure</span> - Last
      </>
    ),
    label_short: "Latest Departure",
  },
  {
    value: {
      type: "arrival_at",
      order: "asc",
    },
    label: (
      <>
        <span className="font-medium">Arrive</span> - First
      </>
    ),
    label_short: "Earliest Arrival",
  },
  {
    value: {
      type: "arrival_at",
      order: "desc",
    },
    label: (
      <>
        <span className="font-medium">Arrive</span> - Last
      </>
    ),
    label_short: "Latest Arrival",
  },
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    sort: false,
    filter: false,
  });
  const API_URL = process.env.API_URL;

  // set default value untuk search
  const params = {
    page: searchParams.get("page") || 1,
    from: searchParams.get("from") || "", // required from url
    to: searchParams.get("to") || "",
    p: searchParams.get("p") ? Number(searchParams.get("p")) : 1, // required from url
    sc: searchParams.get("sc") || "", // required from url
    rt: searchParams.get("rt") || "",
    rd: searchParams.get("rd") || "",
    d: searchParams.get("d") || "",
    type: searchParams.get("type") || "",
    order: searchParams.get("order") || "",
  };
  const paramsPassenger = {
    ...(searchParams.get("adult") && {
      adult: Number(searchParams.get("adult")),
    }),
    ...(searchParams.get("child") && {
      child: Number(searchParams.get("child")),
    }),
    ...(searchParams.get("baby") && {
      baby: Number(searchParams.get("baby")),
    }),
  };

  const selectedSort =
    params.order && params.type
      ? OPTION_SORT.find(
          (item) =>
            item.value.type === params.type && item.value.order === params.order
        ) || OPTION_SORT[0]
      : OPTION_SORT[0];

  const [currentSort, setCurrentSort] = useState(selectedSort);
  const [sort, setSort] = useState(selectedSort);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const createParamsString = (newValue, redirect) => {
    const urlParams = new URLSearchParams({
      page: newValue?.page || params.page,
      from: newValue?.from || params.from, // required from url
      p: newValue?.p || params.p || 1, // required from url
      sc: newValue?.sc || params.sc, // required from url
      ...(redirect && paramsPassenger),
    });

    if (newValue?.to || params.to)
      urlParams.append("to", newValue?.to || params.to);
    if (newValue?.rt || params.rt)
      urlParams.append("rt", newValue?.rt || params.rt);
    if (newValue?.rd || params.rd)
      urlParams.append("rd", newValue?.rd || params.rd);
    if (newValue?.d || params.d) urlParams.append("d", newValue?.d || params.d);
    if (newValue?.type || params.type)
      urlParams.append("type", newValue?.type || params.type);
    if (newValue?.order || params.order)
      urlParams.append("order", newValue?.order || params.order);

    return urlParams.toString();
  };

  const redirect = (params) => {
    const urlParams = createParamsString(params, true);

    window.location.href = `/search?${urlParams}`;
  };

  const handleSubmit = async () => {
    const urlParams = createParamsString();

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/flight?` + urlParams,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setLoading(false);
      if (response.status === 404) {
        return;
      }

      if (response.status === 200 && result.status) {
        setList(result?.data?.flights || []);
      } else {
        throw new Error(result);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [searchParams]);

  const changeDate = (date) => {
    const d = dateFormat(date).format();

    redirect({ d });
  };

  const totalPassenger = {
    adult: !isNaN(Number(searchParams.get("adult")))
      ? Number(searchParams.get("adult"))
      : 0,
    child: !isNaN(Number(searchParams.get("child")))
      ? Number(searchParams.get("child"))
      : 0,
    baby: !isNaN(Number(searchParams.get("baby")))
      ? Number(searchParams.get("baby"))
      : 0,
  };

  return (
    <>
      <Layout>
        <Container className="pt-[60px]">
          <h1 className="text-3xl mb-10">Search Flight</h1>
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full bg-[#9DDE8B] flex items-center text-white h-[50px] rounded-[10px] px-5 gap-4">
              <Link to="/">
                <Icon icon="ion:arrow-back-outline" width={24} />
              </Link>
              <div className="font-medium">
                <span>
                  {params.from}
                  {" > "}
                  {params.to}{" "}
                </span>{" "}
                -{" "}
                <span>
                  {params.p
                    ? params.p
                    : totalPassenger.adult +
                      totalPassenger.child +
                      totalPassenger.baby}{" "}
                  Passengers
                </span>{" "}
                - <span>{FLIGHT_CLASS[params.sc.toLowerCase()] || ""}</span>
              </div>
            </div>
            <div
              className="bg-[#40A578] font-medium flex w-full md:max-w-[220px] justify-center items-center text-white h-[50px] rounded-[10px] px-5 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Change Search
            </div>
          </div>
          <WeekPicker
            onChange={(date) => changeDate(date)}
            defaultDate={params.d || ""}
          />
          <Divider className="my-7" />
          <div className="flex justify-between xl:justify-end mb-4">
            {/* <button
              className="xl:hidden flex items-center gap-3 px-4 py-3 rounded-full border border-[#40A578] text-[#40A578]"
              onClick={() => {
                setModal({ ...modal, filter: true });
              }}
            >
              <Icon icon="flowbite:filter-outline" width={21} />
              <span>Filter</span>
            </button> */}
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#40A578] text-[#40A578]"
              onClick={() => {
                setModal({ ...modal, sort: true });
                setSort(currentSort);
              }}
            >
              <Icon icon="fluent:arrow-sort-28-filled" width={21} />
              <span>{currentSort.label_short}</span>
            </button>
          </div>
          <div className="flex gap-4">
            {/* <div className="hidden xl:block w-full max-w-[270px]">
              <FilterSearch />
            </div> */}
            <div className="flex-1 ">
              {loading ? (
                <Loading label="Mencari penerbangan terbaik.." />
              ) : list?.length > 0 ? (
                list?.map((item, index) => (
                  <CardFlight key={index} index={index} item={item} />
                ))
              ) : (
                <NotFound>
                  <p className="font-medium mt-5">
                   Sorry, Flight Not Found
                  </p>
                  <p className="font-medium text-[#40A578]">
                    Please, Try Looking for Another Trip
                  </p>
                </NotFound>
              )}

              {/* 
              <Empty>
                <p className="font-medium mt-5">Maaf, Tiket terjual habis!</p>
                <p className="font-medium text-[#7126B5]">
                  Coba cari perjalanan lainnya!
                </p>
              </Empty> */}
            </div>
          </div>
          
        </Container>
        <Footer/>
      </Layout>

      <Modal
        open={modal.filter}
        onClose={() => setModal({ ...modal, filter: false })}
      >
        <div className="flex justify-end p-3">
          <button onClick={() => setModal(false)} className="p-1">
            <Icon icon="iconamoon:sign-times-bold" width={28} />
          </button>
        </div>
        <div className="flex gap-2 flex-col px-3">
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2 cursor-pointer py-3">
              <Icon icon="mynaui:box" width={25} />
              <span>Transit</span>
            </div>
            <Icon icon="octicon:chevron-right-24" width={25} />
          </div>
          <Divider />
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2 cursor-pointer py-3">
              <Icon icon="tabler:heart" width={25} />
              <span>Facility</span>
            </div>
            <Icon icon="octicon:chevron-right-24" width={25} />
          </div>
          <Divider />
          <div className="flex items-center justify-between cursor-pointer ">
            <div className="flex items-center gap-2 cursor-pointer py-3">
              <Icon icon="mynaui:dollar" width={25} />
              <span>Price</span>
            </div>
            <Icon icon="octicon:chevron-right-24" width={25} />
          </div>
        </div>
        <div className="flex justify-end p-3">
          <button
            className="px-10 py-2 rounded-[10px] bg-[#006769] hover:bg-[#104b4c] duration-150 text-white"
            onClick={() => {
              setCurrentSort(sort);
              setModal({ ...modal, sort: false });
            }}
          >
            Choose
          </button>
        </div>
      </Modal>
      <Modal
        open={modal.filter}
        onClose={() => setModal({ ...modal, filter: false })}
      >
        <div className="flex justify-end p-3">
          <button onClick={() => setModal(false)} className="p-1">
            <Icon icon="iconamoon:sign-times-bold" width={28} />
          </button>
        </div>
        <div className="flex gap-2 flex-col px-3">
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2 cursor-pointer py-3">
              <Icon icon="mynaui:box" width={25} />
              <span>Transit</span>
            </div>
            <Icon icon="octicon:chevron-right-24" width={25} />
          </div>
          <Divider />
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2 cursor-pointer py-3">
              <Icon icon="tabler:heart" width={25} />
              <span>Facility</span>
            </div>
            <Icon icon="octicon:chevron-right-24" width={25} />
          </div>
          <Divider />
          <div className="flex items-center justify-between cursor-pointer ">
            <div className="flex items-center gap-2 cursor-pointer py-3">
              <Icon icon="mynaui:dollar" width={25} />
              <span>Price</span>
            </div>
            <Icon icon="octicon:chevron-right-24" width={25} />
          </div>
        </div>
        <div className="flex justify-end p-3">
          <button
            className="px-10 py-2 rounded-[10px] bg-[#006769] hover:bg-[#104b4c] duration-150 text-white"
            onClick={() => {
              setCurrentSort(sort);
              setModal({ ...modal, sort: false });
            }}
          >
            Choose
          </button>
        </div>
      </Modal>
      <Modal
        open={modal.sort}
        onClose={() => setModal({ ...modal, sort: false })}
      >
        <div className="flex justify-end p-3">
          <button
            onClick={() => setModal({ ...modal, sort: false })}
            className="p-1"
          >
            <Icon icon="iconamoon:sign-times-bold" width={28} />
          </button>
        </div>
        <div>
          {OPTION_SORT.map((item, index) => {
            const selected =
              item.value.order === sort.value.order &&
              item.value.type === sort.value.type;

            return (
              <div
                key={`options-sort-${index}`}
                className={twMerge(
                  "px-3 duration-150",
                  selected && "bg-[#40A578] text-white"
                )}
              >
                <button
                  className={twMerge(
                    "flex justify-between items-center border-b border-gray-300 py-3 px-3 w-full"
                  )}
                  onClick={() => setSort(item)}
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
              setCurrentSort(sort);
              setModal({ ...modal, sort: false });
              redirect({ ...sort.value });
            }}
          >
            Choose
          </button>
        </div>
      </Modal>
    </>
  );
}
