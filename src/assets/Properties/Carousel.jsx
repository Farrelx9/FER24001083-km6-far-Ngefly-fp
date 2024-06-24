import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Icon } from "@iconify/react";

export default function Carousel({ fromAirportCode }) {
  const [fetchFavoriteFlights, setFetchFavoriteFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      if (fromAirportCode) {
        setTimeout(() => {
          const flightsData = response.data.data.flights;
          setFetchFavoriteFlights(flightsData);
          setIsLoading(false);
        }, 2000);
      } else {
        const flightsData = response.data.data.flights;
        setFetchFavoriteFlights(flightsData);
        setIsLoading(false);
      }
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
          infinite: true,
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
      <Slider {...settings}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full mt-20">
            <Icon
              icon="eos-icons:bubble-loading"
              className="text-5xl  mb-4 ms-40"
            />
            <p className="text-center text-lg font-semibold mt-6">
              Looking for a favorite destination...
            </p>
          </div>
        ) : (
          fetchFavoriteFlights.map((flight) => (
            <div key={flight.id} className="px-4 py-4">
              <div className="max-w-xs mx-auto h-[300px] bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 hover:cursor-pointer ">
                <div className="relative">
                  <img
                    className="object-cover w-full h-[150px] "
                    src={flight.to.image_url}
                    alt={flight.title}
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
          ))
        )}
      </Slider>
    </div>
  );
}
