import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaRss,
} from "react-icons/fa";

const Footer = () => {
  const scrollToSection = (sectionId, event, scrollOffset = 0) => {
    event.preventDefault(); // Mencegah perilaku default dari tautan <a>

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Optional: Adjust scroll position with additional offset
      window.scrollBy(0, scrollOffset);
    }
  };

  return (
    <footer
      className="text-black py-6 sm:text-white" // Decreased py-8 to py-6 for smaller padding
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
          {/* Decreased sm:gap-8 to sm:gap-6 for smaller gap */}
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <a
              href="/"
              className="text-2xl sm:text-4xl font-bold text-black sm:text-white hover:text-primary transition duration-300"
              style={{ marginBottom: "0.5rem" }}
            >
              NgeFly.com
            </a>{" "}
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  src={ngefly}
                  alt="Icon"
                  style={{
                    width: "150px",
                    height: "150px",
                    transition: "transform 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </div> */}
            <p className="mt-1 mb-6 text-lg text-center md:text-left text-black sm:text-white">
              {" "}
              {/* Decreased mt-4 to mt-2 */}
              Dream High, Fly High
            </p>
            <div className="flex justify-center md:justify-start mt-4 sm:mt-5 space-x-4">
              {" "}
              {/* Decreased mt-6 to mt-4, sm:mt-6 to sm:mt-5 */}
              <a
                href="https://www.instagram.com/ngefly.com01?igsh=MW01NzFpN3pnM2l6Yg=="
                className="text-black sm:text-white hover:text-blue-600 transition duration-300"
              >
                <FaFacebookF className="text-xl sm:text-2xl" />
              </a>
              <a
                href="#"
                className="text-black sm:text-white hover:text-blue-400 transition duration-300"
              >
                <FaTwitter className="text-xl sm:text-2xl" />
              </a>
              <a
                href="#"
                className="text-black sm:text-white hover:text-pink-500 transition duration-300"
              >
                <FaInstagram className="text-xl sm:text-2xl" />
              </a>
              <a
                href="#"
                className="text-black sm:text-white hover:text-red-500 transition duration-300"
              >
                <FaYoutube className="text-xl sm:text-2xl" />
              </a>
              <a
                href="#"
                className="text-black sm:text-white hover:text-orange-400 transition duration-300"
              >
                <FaRss className="text-xl sm:text-2xl" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col items-center mt-3 md:mt-0">
            {" "}
            <h4 className="text-xl font-semibold mb-2 text-center text-black sm:text-white">
              {" "}
              Informasi{" "}
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
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => scrollToSection("advantagesection", e, -1200)}
                  className="hover:text-primary transition duration-300"
                >
                  Keuntungan
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-end mt-3 md:mt-0">
            {" "}
            {/* Decreased mt-4 to mt-3 */}
            <h4 className="text-xl font-semibold mb-2 text-center md:text-right text-black sm:text-white">
              {" "}
              {/* Decreased mb-4 to mb-2 */}
              Kontak{" "}
            </h4>
            <ul className="text-sm text-center md:text-right text-black sm:text-white">
              <li className="mb-2">
                <a
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default anchor tag behavior
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
                    e.preventDefault(); // Prevent the default anchor tag behavior
                    window.open("https://wa.me/6285150677749", "_blank");
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
            <strong style={{ color: "#D6FFDE", fontSize: "1rem" }}>
              © {new Date().getFullYear()} Ngefly.com | Hak Cipta Dilindungi
            </strong>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
