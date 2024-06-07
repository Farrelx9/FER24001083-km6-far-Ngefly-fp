import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Icon } from "@iconify/react";

export default function Carousel() {
  const [fetchFavoriteFlights, setFetchFavoriteFlights] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://binar-project-backend-staging.vercel.app/api/v1/flight/favorite`,
        { headers: { accept: "application/json" } }
      );
      console.log("response.data", response.data);
      const flightsData = response.data.data.flights;
      setFetchFavoriteFlights(flightsData);
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("en-ID", options);
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
    <div className="bg-none ">
      <Slider {...settings}>
        {fetchFavoriteFlights ? (
          fetchFavoriteFlights.map((flight) => (
            <div key={flight.id} className="px-4 py-3">
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
                    {formatDate(flight.arriveAt)} -{" "}
                    {formatDate(flight.departureAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Icon
            icon="line-md:loading-alt-loop"
            className="mt-6"
            fontSize={40}
          />
        )}
      </Slider>
    </div>
  );
}
