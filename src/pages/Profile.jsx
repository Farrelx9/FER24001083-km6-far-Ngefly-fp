import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiLogout } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Navbar from "../assets/Properties/Navbar";
import "animate.css";
import Footer from "../assets/Properties/Footer";

export default function Profile() {
  const [activeSection, setActiveSection] = useState("Change Profile");
  const [showEditFields, setShowEditFields] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isResetConfirmationVisible, setIsResetConfirmationVisible] =
    useState(false);
  const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] =
    useState(false);
  const [tempPasswords, setTempPasswords] = useState({
    password: "",
    confirm: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://binar-project-426902.et.r.appspot.com/api/v1/profile/`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response data:", response.data);

        if (response.data && response.data.data) {
          const profileData = response.data.data;
          const profile = profileData.profile || {};
          setProfileData({
            name: profileData.name || "",
            address: profile ? profile.address : "",
            phone: profile ? profile.phone : "",
            occupation: profile ? profile.occupation : "",
            birthdate: profile ? profile.birthdate : "",
            email: profileData.email || "",
            isVerified: profileData.is_verified || false,
          });
          console.log("Profile data:", profileData);
        } else {
          throw new Error("Profile data is missing");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to fetch profile data!");
      }
    };

    fetchProfile();
  }, []);

  const handleConfirmReset = () => {
    handleChangePassword(tempPasswords.password, tempPasswords.confirm);
    setIsResetConfirmationVisible(false);
  };

  const handleCancelReset = () => {
    setIsResetConfirmationVisible(false);
  };

  const handleLogoutClick = () => {
    setIsLogoutConfirmationVisible(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    setIsLogoutConfirmationVisible(false);
    navigate("/");
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmationVisible(false);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (
      !e.target.name.value ||
      !e.target.address.value ||
      !e.target.phone.value ||
      !e.target.occupation.value ||
      !e.target.birthdate.value
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const updatedData = {
      name: e.target.name.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      occupation: e.target.occupation.value,
      birthdate: e.target.birthdate.value,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://binar-project-426902.et.r.appspot.com/api/v1/profile/`,
        updatedData,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.status) {
        setProfileData(response.data.data || updatedData);
        setShowEditFields(false);
        console.log("Updated profile data:", response.data.data);
        toast.success("Profile updated successfully!");
      } else {
        throw new Error("Failed to update profile data");
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
      toast.error("Failed to update profile!");
    }
  };

  const handleChangePassword = async (password, confirm) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://binar-project-426902.et.r.appspot.com/api/v1/auth/changepassword",
        {
          password,
          confirm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Handle response here
      console.log("Password changed successfully", response.data);
      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Failed to change password", error);
      toast.error("Failed to change password!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPassword = e.target.elements.newPassword.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    setTempPasswords({ password: newPassword, confirm: confirmPassword });
    setIsResetConfirmationVisible(true);
  };

  return (
    <div>
      <Navbar />
      <ToastContainer toastClassName="lg:w-[100%] md:w-[90%] w-[70%] lg:mt-0 md:mt-0 mt-36 lg:mx-0 md:mx-0 mx-auto " />
      {isResetConfirmationVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
          <div className="bg-white p-6 rounded shadow-md animate__animated animate__zoomIn px">
            <p>Are you sure you want to change your password?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmReset}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={handleCancelReset}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {isLogoutConfirmationVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 animate__animated ">
          <div className="bg-white p-6 rounded shadow-md animate__animated animate__slideInDown">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmLogout}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={handleCancelLogout}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-[230px] shadow-2xl flex flex-col gap-2 items-center justify-center">
        <div className="lg:w-[1100px] md:w-[750px] w-[360px] px-4 mt-20 lg:text-lg md:text-lg text-sm font-semibold">
          Profile
        </div>
        <div className="flex items-center gap-4">
          <div className="lg:w-[968px] md:w-[668px] w-[290px] h-[33px] bg-[#9DDE8B] flex items-center px-4 gap-2">
            <IoMdArrowRoundBack
              size={20}
              className="text-white cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => navigate("/")}
            />
            <div className="text-white text-sm font-semibold">Home</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center lg:flex-row md:flex-col lg:items-start md:items-center gap-4 lg:mt-10 md:mt-10 mt-4">
        <div>
          <div
            className={`flex items-center gap-2 border-b w-[328px] p-2 cursor-pointer ${
              activeSection === "Change Profile"
                ? "border-blue-500 text-blue-500 bg-blue-100 shadow-md transform scale-105 transition-all duration-300"
                : "border-gray-300"
            }`}
            onClick={() => setActiveSection("Change Profile")}
          >
            <FiEdit3 size={15} />
            <div>Profile</div>
          </div>
          <div
            className={` flex items-center border-b gap-2 w-[328px] p-2 cursor-pointer ${
              activeSection === "Account Settings"
                ? "border-blue-500 text-blue-500 bg-blue-100 shadow-md transform scale-105 transition-all duration-300"
                : "border-gray-300"
            }`}
            onClick={() => setActiveSection("Account Settings")}
          >
            <MdSettings />
            <div>Account Settings</div>
          </div>
          <div
            className={` flex items-center gap-2 border-b w-[328px] p-2 cursor-pointer ${
              activeSection === "Logout"
                ? "border-blue-500 text-blue-500 bg-blue-100 shadow-md transform scale-105 transition-all duration-300"
                : "border-gray-300"
            }`}
            onClick={handleLogoutClick}
          >
            <CiLogout />
            <div>Logout</div>
          </div>
        </div>
        <div className="flex flex-col">
          {activeSection === "Change Profile" && (
            <div
              className="border-2 lg:w-[518px] md:w-[518px] w-[300px]  p-4 mb-10"
              style={{ height: showEditFields ? "738px" : "338px" }}
            >
              <div className="lg:ms-2 md:ms-2 ms-2 mb-2 font-semibold text-lg">
                Change Profile
              </div>
              <div className="lg:w-[454px] md:w-[454px] w-[230px] rounded-t-lg bg-black text-white p-2 mb-2 mx-4 px-2">
                Personal Data
              </div>
              <div>
                <div className="flex flex-col gap-2 px-4">
                  <div>
                    <span className="font-semibold text-[#006769]">Name:</span>{" "}
                    {profileData?.name || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#006769]">
                      Address:
                    </span>{" "}
                    {profileData?.address || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#006769]">Phone:</span>{" "}
                    {profileData?.phone || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#006769]">
                      Occupation:
                    </span>{" "}
                    {profileData?.occupation || "N/A"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#006769]">
                      Birth Date:
                    </span>{" "}
                    {profileData?.birthdate
                      ? new Date(profileData.birthdate).toLocaleDateString(
                          "id-ID"
                        )
                      : "N/A"}
                  </div>
                </div>

                <button
                  className="bg-gradient-to-r from-green-400 to-green-600 text-white ml-4 px-4 py-2 rounded-lg mt-2 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:from-green-500 hover:to-green-700 hover:shadow-xl"
                  onClick={() => setShowEditFields(true)}
                >
                  Edit Profile
                </button>
              </div>

              {showEditFields && (
                <form
                  className="flex flex-col gap-1 mt-2 px-4"
                  onSubmit={handleSaveChanges}
                >
                  <div>
                    <label htmlFor="name">Name:</label>
                    <input
                      id="name"
                      className="border-black border rounded-md lg:w-[454px] md:w-[454px] w-[230px] h-[40px] px-2"
                      defaultValue={profileData?.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="address">Address:</label>
                    <input
                      id="address"
                      className="border-black border rounded-md lg:w-[454px] md:w-[454px] w-[230px] h-[40px] px-2"
                      defaultValue={profileData?.address}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                      id="phone"
                      className="border-black border rounded-md lg:w-[454px] md:w-[454px] w-[230px] h-[40px] px-2"
                      defaultValue={profileData?.phone}
                    />
                  </div>
                  <div>
                    <label htmlFor="occupation">Occupation:</label>
                    <input
                      id="occupation"
                      className="border-black border rounded-md lg:w-[454px] md:w-[454px] w-[230px] h-[40px] px-2"
                      defaultValue={profileData?.occupation}
                    />
                  </div>
                  <div>
                    <label htmlFor="birthdate">Birth Date:</label>
                    <input
                      id="birthdate"
                      className="border-black border rounded-md lg:w-[454px] md:w-[454px] w-[230px] h-[40px] px-2"
                      defaultValue={
                        profileData?.birthdate
                          ? new Date(profileData.birthdate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      type="date"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white rounded-md px-4 py-2 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-600"
                    >
                      Save Changes
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-md px-4 py-2 ml-2 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600"
                      onClick={() => setShowEditFields(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeSection === "Account Settings" && (
            <div className="border-2 lg:w-[518px] md:w-[518px] w-[300px] mb-10  p-4">
              <div className="lg:ms-2 md:ms-2 ms-2 mb-2 font-semibold text-lg">
                Account Settings
              </div>
              <div className="lg:w-[454px] md:w-[454px] w-[230px] rounded-t-lg bg-black text-white p-2 mb-2 mx-4 px-2">
                Change Password
              </div>
              <form
                className="flex flex-col gap-2 mt-4 px-4"
                onSubmit={handleSubmit}
              >
                <div>New Password</div>
                <input
                  className="border-black border rounded-md lg:w-[454px] md:w-[454px] w-[230px] h-[40px] px-2"
                  placeholder="********"
                  type="password"
                  name="newPassword"
                  required
                />
                <div>Confirm Password</div>
                <input
                  className="border-black border rounded-md lg:w-[454px] md:w-[454px] w-[230px] h-[40px] px-2"
                  placeholder="********"
                  type="password"
                  name="confirmPassword"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white rounded-md px-4 py-2 w-[150px] h-[48px] mx-auto mt-2 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-green-600"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
