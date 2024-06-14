import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaRss,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-black py-8 sm:text-white"
      style={{
        background: "linear-gradient(#006769, #006769, #9DDE8B, #D6FFDE)",
        color: "#f8f9fa",
        fontFamily: "'Montserrat', sans-serif", // Menggunakan font Montserrat
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <a
              href="/"
              className="text-4xl font-bold text-black sm:text-white hover:text-primary transition duration-300"
            >
              IMovie
            </a>
            <p className="mt-4 text-sm text-center md:text-left text-black sm:text-white">
              Discover the latest movies, reviews, and entertainment news on
              IMovie. Stay updated with our fresh content and join our
              community.
            </p>
            <div className="flex justify-center md:justify-start mt-6 space-x-4">
              <a
                href="#"
                className="text-black sm:text-white hover:text-blue-600 transition duration-300"
              >
                <FaFacebookF className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-black sm:text-white hover:text-blue-400 transition duration-300"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-black sm:text-white hover:text-pink-500 transition duration-300"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-black sm:text-white hover:text-red-500 transition duration-300"
              >
                <FaYoutube className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-black sm:text-white hover:text-orange-400 transition duration-300"
              >
                <FaRss className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center mt-8 md:mt-0">
            <h4 className="text-lg font-semibold mb-4 text-center text-black sm:text-white">
              Quick Links
            </h4>
            <ul className="text-sm flex flex-col items-center gap-2 text-black sm:text-white">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition duration-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-end mt-8 md:mt-0">
            <h4 className="text-lg font-semibold mb-4 text-center md:text-right text-black sm:text-white">
              Contact Us
            </h4>
            <ul className="text-sm text-center md:text-right text-black sm:text-white">
              <li className="mb-2">
                <a
                  href="mailto:info@imovie.com"
                  className="hover:text-primary transition duration-300"
                >
                  info@imovie.com
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="tel:+123456789"
                  className="hover:text-primary transition duration-300"
                >
                  +1 234 567 89
                </a>
              </li>
              <li>
                <span>123 Movie Lane, Film City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Links */}
        <div className="border-t pt-4 mt-4 text-center text-black sm:text-white">
          <div className="text-sm mt-4">
            <strong style={{ color: "#006769", fontSize: "1rem" }}>
              © {new Date().getFullYear()} Ngefly.com | Hak Cipta Dilindungi
            </strong>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
