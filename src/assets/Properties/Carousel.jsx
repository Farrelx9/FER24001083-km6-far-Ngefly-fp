import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
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
    afterChange: (current) => {
      setCurrentPage(current);
    },
  };

  const handlePageClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div className="slider-container bg-none p-5 px-2 bg-[#FFFFFF]">
      <Slider {...settings} ref={sliderRef}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className="px-1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_2i8ppVU5Sn29MLI5TACFDJ7gYbwAqVUzRA&s"
              alt={`Dummy ${index + 1}`}
              className=" w-[190px] h-[196px] object-cover  mb-4 rounded-lg"
            />
          </div>
        ))}
      </Slider>
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(settings.responsive[0].settings.slidesToShow)].map(
          (_, index) => (
            <button
              key={index}
              className={`${
                currentPage === index
                  ? "bg-[#40A578] text-white"
                  : "bg-[#EBFFEF] text-black"
              } px-3 py-1 rounded`}
              onClick={() => handlePageClick(index)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
