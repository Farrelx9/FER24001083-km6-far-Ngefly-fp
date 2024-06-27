import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Carousel({ fromAirportCode }) {
  const [fetchFavoriteFlights, setFetchFavoriteFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchData = async () => {
    setIsLoading(true);
    const url = fromAirportCode
      ? `https://binar-project-426902.et.r.appspot.com/api/v1/flight/favorite?from=${fromAirportCode}`
      : `https://binar-project-426902.et.r.appspot.com/api/v1/flight/favorite`;
    try {
      const response = await axios.get(url, {
        headers: { accept: "application/json" },
      });
      console.log("carousel", response.data);
      const flightsData = response.data.data.flights;
      setTimeout(() => {
        setFetchFavoriteFlights(flightsData);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error Fetching Data: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fromAirportCode]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", options);
  };

  const handleCarouselClick = (flight) => {
    const params = {
      from: flight.from.airport_code,
      to: flight.to.airport_code,
      p: 1,
      sc: "ECONOMY",
      page: 1,
      d: new Date(flight.departureAt).toISOString(),
      rt: "false", // Set rt to false for all favorites
    };

    const queryString = new URLSearchParams(params).toString();

    setTimeout(() => {
      toast.success("Lets go to favorite flight!");
      navigate(`/search?${queryString}`);
    }, 2000);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-none mb-16 px-20 ">
      <ToastContainer />
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full mt-20">
          <Icon
            icon="eos-icons:bubble-loading"
            className="text-5xl mb-4 ms-30"
          />
          <p className="text-center text-lg font-semibold mt-6">
            Looking for a favorite destination...
          </p>
        </div>
      ) : (
        <Slider {...settings}>
          {fetchFavoriteFlights.map((flight) => (
            <div
              key={flight.id}
              className="lg:px-6 md:px-3 px-0 lg:py-8 md:py-8 py-12 lg:gap-0 md:gap-10 "
            >
              <div className="lg:w-[270px] md:w-[200px] w-[230px] lg:h-[300px] md:h-[300px] h-[300px]  bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 hover:cursor-pointer ">
                <div className="relative">
                  <img
                    className="object-cover w-full h-[150px]"
                    src={flight.to.image_url}
                    alt={flight.title}
                    onClick={() => handleCarouselClick(flight)}
                  />
                </div>
                <div className="p-4">
                  <div className="text-lg font-semibold truncate">
                    {flight.from.city} -&gt; {flight.to.city}
                  </div>
                  <div className="text-xs text-[#9DDE8B]">
                    {flight.plane.airline}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{flight.airline}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {formatDate(flight.departureAt)} -{" "}
                    {formatDate(flight.arriveAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
