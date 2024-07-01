import React from "react";
import { FaWhatsapp, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const scrollToSection = (sectionId, event, scrollOffset = 0) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.scrollBy(0, scrollOffset);
    }
  };

  return (
    <footer
      className="text-black py-6 sm:text-white"
      style={{
        background: "linear-gradient(#006769, #006769, #9DDE8B, #D6FFDE)",
        color: "#f8f9fa",
        fontFamily: "'Montserrat', sans-serif",
        width: "100%",
        position: "relative",
        top: 20,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {" "}
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <a
              href="/"
              className="text-2xl sm:text-4xl font-bold text-black sm:text-white hover:text-primary transition duration-300"
              style={{ marginBottom: "0.5rem" }}
            >
              NgeFly.com
            </a>{" "}
            <p className="mt-1 mb-6 text-lg text-center md:text-left text-black sm:text-white">
              {" "}
              Dream High, Fly High
            </p>
            <div className="flex justify-center md:justify-start mt-4 sm:mt-5 space-x-4">
              {" "}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  window.open("https://wa.me/6285150677749", "_blank");
                }}
                className="text-black sm:text-white hover:text-green-400 transition duration-300"
              >
                <FaWhatsapp className="text-xl sm:text-2xl" />
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://github.com/Farrelx9/FER24001083-km6-far-Ngefly-fp"
                  );
                }}
                className="text-black sm:text-white hover:text-blue-400 transition duration-300"
              >
                <FaGithub className="text-xl sm:text-2xl" />
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://www.instagram.com/ngefly.com01?igsh=MW01NzFpN3pnM2l6Yg=="
                  );
                }}
                className="text-black sm:text-white hover:text-pink-500 transition duration-300"
              >
                <FaInstagram className="text-xl sm:text-2xl" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col items-center mt-3 md:mt-0">
            {" "}
            <h4 className="text-xl font-semibold mb-2 text-center text-black sm:text-white">
              {" "}
              Quick Links{" "}
            </h4>
            <ul className="text-sm flex flex-col items-center gap-1 sm:gap-3 text-black sm:text-white">
              {" "}
              <li>
                <a
                  href="/"
                  onClick={() => scrollToSection("home")}
                  className="hover:text-primary transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => scrollToSection("aboutUsSection", e, -1800)}
                  className="hover:text-primary transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => scrollToSection("advantagesection", e, -1200)}
                  className="hover:text-primary transition duration-300"
                >
                  Advantages
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-end mt-3 md:mt-0">
            {" "}
            <h4 className="text-xl font-semibold mb-2 text-center md:text-right text-black sm:text-white">
              {" "}
              Contact{" "}
            </h4>
            <ul className="text-sm text-center md:text-right text-black sm:text-white">
              <li className="mb-2">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://mail.google.com/mail/?view=cm&fs=1&to=ngefly.com01@gmail.com",
                      "_blank"
                    );
                  }}
                  className="hover:text-primary transition duration-300 cursor-pointer"
                >
                  ngefly.com01@gmail.com
                </a>
              </li>
              <li className="mb-2">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "https://wa.me/6285150677749";
                  }}
                  className="hover:text-primary transition duration-300 cursor-pointer"
                >
                  +6285150677749
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Links */}
        <div className="border-t pt-3 mt-4 text-center text-black sm:text-white">
          {" "}
          <div className="text-sm mt-3">
            {" "}
            <strong style={{ color: "#006769", fontSize: "1rem" }}>
              © {new Date().getFullYear()} Ngefly.com | All Rights Reserved
            </strong>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
