import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Carousel({ fromAirportCode, adult, child, baby }) {
  const [fetchFavoriteFlights, setFetchFavoriteFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.API_URL;

  const fetchData = async () => {
    setIsLoading(true);
    const url = fromAirportCode
      ? `${API_URL}/flight/favorite?from=${fromAirportCode}`
      : `${API_URL}/flight/favorite`;
    try {
      const response = await axios.get(url, {
        headers: { accept: "application/json" },
      });

      const flightsData = response.data.data.flights;
      setTimeout(() => {
        setFetchFavoriteFlights(flightsData);
        setIsLoading(false);
      }, 2000);
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
      p: adult || 1,
      sc: "ECONOMY",
      page: 1,
      d: new Date(flight.departureAt).toISOString(),
      rt: "false",
      adult: adult || 1,
      child: child || 0,
      baby: baby || 0,
    };
    const queryString = new URLSearchParams(params).toString();
    navigate(`/search?${queryString}`);
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
          {fetchFavoriteFlights
            .filter(
              (flight) =>
                flight.flight_classes &&
                flight.flight_classes.some(
                  (cls) => cls.name === "ECONOMY" && cls.available_seats > 0
                )
            )
            .map((flight) => (
              <div
                key={flight.id}
                className="lg:px-12 md:px-3 px-10 py-8 lg:pb-4 md:pb-4 pb-12  "
              >
                <div className="lg:w-[230px] md:w-[200px] w-[180px] lg:h-[300px] md:h-[300px] h-[240px] bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 hover:cursor-pointer ">
                  <div className="relative">
                    <img
                      className="object-cover w-full lg:h-[150px] md:h-[150px] h-[110px]"
                      src={flight.to.image_url}
                      alt={flight.title}
                      onClick={() => handleCarouselClick(flight)}
                    />
                  </div>
                  <div className="p-4">
                    <div className="lg:text-lg md:text-lg text-xs font-semibold truncate">
                      {flight.from.city} -&gt; {flight.to.city}
                    </div>
                    <div className="text-xs font-semibold text-[#9DDE8B]">
                      {flight.plane.airline}
                    </div>
                    <p className="lg:text-sm md:text-sm text-xs text-gray-600 mb-2">
                      {flight.airline}
                    </p>
                    <p className="lg:text-sm md:text-sm text-xs text-gray-600 mb-2">
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
