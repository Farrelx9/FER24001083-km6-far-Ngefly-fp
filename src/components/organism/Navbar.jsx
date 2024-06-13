import { useEffect, useState } from "react";
import ngefly from "../../assets/logo/ngefly.png";
import { CiLogin } from "react-icons/ci";
import { MdNotificationsNone, MdOutlineList } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkTokenStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkTokenStatus();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen bg-white">
      <div className="flex justify-between gap-3 bg-none shadow-lg px-3 md:px-10 lg:px-32">
        <div className="flex gap-5">
          <img
            src={ngefly}
            className="w-[98px] h-[93px] hidden md:flex lg:flex"
          />
        </div>
        {!isLoggedIn ? (
          <>
            <div className="flex items-center">
              <button
                className="bg-[#40A578] md:w-[105px] lg:w-[105px] w-[90px] h-[48px]  p-2 my-6 text-white font-semibold rounded-2xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769] flex items-center justify-center"
                onClick={() => navigate("/login")}
              >
                <CiLogin size={20} className="mr-2 text-white " />
                Login
              </button>
            </div>
          </>
        ) : (
          <div className="flex gap-4 mr-2 items-center">
            <MdOutlineList size={20} />
            <MdNotificationsNone size={20} />
            <FiUser size={20} />
            <button onClick={() => navigate("/login")}>logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
