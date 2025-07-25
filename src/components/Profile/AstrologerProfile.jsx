"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import back from "../../../public/back icon/back1.png";
import Image from "next/image";
import birthchart from "../../../public/Profile/birthchart.jpeg";
import back1 from "../../../public/back icon/Back.png";
import map from "../../../public/matchmaking/map-pin.svg";
import {
  fetchUserBalance,
  updateCustomer,
  searchCities,
} from "@/services/services";
import { useToast } from "@/hooks/use-toast";
import DatePicker from "./components/DatePicker";

const AstrologerProfile = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState();
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const [formData, setFormData] = useState({
    // FirstName: "",
    // LastName: "",
    FullName: "",
    BirthPlace: "",
    email: "",
    BirthTime: "",
    BirthDate: "",
    Gender: "Male",
    Lat: "",
    Lon: "",
    cityId: "",
    birthChart: "",
  });

  const fetchCities = async (query) => {
    if (!query) return;

    try {
      const data = await searchCities(query);
      setFilteredOptions(data || []);
      setShowOptions(data.length > 0);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setFilteredOptions([]);
      setShowOptions(false);
    }
  };
  const handleSelectOption = (option) => {
    setFormData((prev) => ({
      ...prev,
      BirthPlace: option.city,
      Lat: option.lat,
      Lon: option.lon,
      cityId: option.id,
    }));
    setShowOptions(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "BirthPlace") fetchCities(value);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const [balance, setBalance] = useState(null);

  const handlesubmit = async () => {
    try {
      const requiredFields = {
        FullName: "Full Name",
        BirthDate: "Birth Date",
        BirthTime: "Birth Time",
        BirthPlace: "Birth Place",
        Gender: "Gender",
      };

      const missingFields = [];

      for (const [field, fieldName] of Object.entries(requiredFields)) {
        if (!formData[field] || formData[field].trim() === "") {
          missingFields.push(fieldName);
        }
      }

      if (missingFields.length > 0) {
        toast({
          title: "Missing required fields",
          description: `Please fill in: ${missingFields.join(", ")}`,
          variant: "destructive",
          duration: 4000,
        });
        return;
      }

      const data = await updateCustomer(formData);

      toast({
        title: data.message,
        duration: 4000,
      });
      const token = localStorage.getItem("token");
      const value = await fetchUserBalance(token);
      setUserData(value);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    //const token = "42948056-9492-49e1-a536-3e5743e6871d";

    const getBalance = async () => {
      try {
        const value = await fetchUserBalance(token);
        setUserData(value);

        setBalance(value.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        toast({
          title: "Failed to fetch balance",
          description: error.message,
          variant: "destructive",
          duration: 4000,
        });
      }
    };

    if (token) {
      getBalance();
    } else {
      toast({
        title: "Please login",
        variant: "destructive",
        duration: 4000,
      });
    }
  }, []);

  useEffect(() => {
    if (userData) {
      // const [firstName = '', lastName = ''] = userData?.fullName?.split(' ') || [];
      const formattedDate = userData.birthDate
        ? (() => {
            const [day, month, year] = userData.birthDate.split("-");
            return `${year}-${month}-${day}`;
          })()
        : "";
      const formattedTime = userData.birthTime
        ? (() => {
            const [time, meridiem] =
              userData.birthTime.split(":").length === 3
                ? [
                    userData.birthTime.slice(0, 5),
                    userData.birthTime.slice(6).toUpperCase(),
                  ]
                : ["", ""];
            let [hours, minutes] = time.split(":");
            hours = parseInt(hours, 10);

            if (meridiem === "PM" && hours < 12) hours += 12;
            if (meridiem === "AM" && hours === 12) hours = 0;

            return `${hours.toString().padStart(2, "0")}:${minutes}`;
          })()
        : "";

      setFormData((prev) => ({
        ...prev,
        // FirstName: firstName,
        // LastName: lastName,
        FullName: userData.fullName || "",
        BirthPlace: userData.cityName || "",
        email: userData.email || "",
        BirthTime: formattedTime,
        BirthDate: formattedDate,
        Gender: userData.userGender
          ? userData.userGender.charAt(0).toUpperCase() +
            userData.userGender.slice(1).toLowerCase()
          : "Male",
        Lat: userData.latitude || "",
        Lon: userData.longitude || "",
        cityId: userData.cityId == 0 ? " " : userData.cityId,
      }));
    }
  }, [userData]);

  return (
    <div className="lg:p-6 xl:p-6 2xl:p-6 p-4 w-full mx-auto">
      <div className="flex  items-center justify-between py-4 px-6 bg-white">
        <Link
          href="/talk-to-astrologer"
          className="flex flex-row items-center  lg:w-auto lg:justify-center text-black font-semibold hover:underline mt-12 lg:mt-0"
        >
          <div className="flex items-center">
            <Image src={back} alt="back" className="hidden lg:block" />
            <Image src={back1} alt="back" className="block lg:hidden" />
          </div>
          <div className="ml-2 lg:ml-4 xl:ml-4 2xl:ml-4 text-[20px] lg:text-[32px] xl:text-[32px] 2xl:text-[32px] text-left text-[#67308C]">
            Profile
          </div>
        </Link>

        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="text-[#67308C] text-[16px] font-medium mt-12 lg:mt-0 xl:mt-0 2xl:mt-0  lg:block">
            Balance:{" "}
            {balance !== null ? `₹${balance.toFixed(2)}` : "Loading..."}
          </div>

          <Link
            href={`/balance`}
            className="px-4 py-2  border border-[#67308C] text-[16px] font-medium text-[#67308C] rounded-md hover:bg-purple-100 hidden lg:block"
          >
            Recharge
          </Link>
        </div>
      </div>

      {/* <div className="flex flex-col items-center justify-center">

                <div className="lg:w-[198px] xl:w-[198px] 2xl:w-[198px] w-[90px] lg:h-[198px] xl:h-[198px] 2xl:h-[198px] h-[92px] bg-purple-100 rounded-full  flex items-center justify-center relative cursor-pointer">
                    <Image src={camera} alt='profile' className="text-purple-600 lg:w-16 xl:w-16 2xl:w-16 w-7 h-7 lg:h-16 xl:h-16 2xl:h-16" />
                </div>


                <p className="mt-2 text-black lg:text-[29.44px] xl:text-[29.44px] 2xl:text-[29.44px] text-[14px] font-medium">+918971371966</p>
            </div> */}

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
        <div className="flex flex-col lg:grid xl:grid 2xl:grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6">
          <div>
            <label className="block text-[16px] font-normal mb-4">
              Full Name<span className="text-black">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-purple-50"
              id="FullName"
              value={formData.FullName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-[16px] font-normal mb-4">
              Gender<span className="text-black">*</span>
            </label>
            <select
              id="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-purple-50"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="relative">
            <label
              htmlFor="dob"
              className="block text-[16px] font-normal font-roboto text-[#000]"
            >
              Birth Date<span className="text-black">*</span>
            </label>
            <DatePicker
              id="BirthDate"
              value={formData.BirthDate}
              onChange={(newDate) =>{
                console.log(newDate);
                setFormData((prev) => ({ ...prev, BirthDate: newDate }))
              }
              }
            />
          </div>

          <div className="relative">
            <label
              htmlFor="time"
              className="block text-[16px] font-normal font-roboto text-[#000]"
            >
              Birth Time<span className="text-black">*</span>
            </label>
            <input
              type="time"
              id="BirthTime"
              value={formData.BirthTime}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
            />
          </div>

          <div className="relative">
            <label className="block text-[16px] font-normal mb-4">
              Birth Place<span className="text-black">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="BirthPlace"
                value={formData.BirthPlace}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px] pr-10"
                placeholder="Place of Birth"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <Image src={map} alt="map-pin" className="w-5 h-5" />
              </div>

              {showOptions && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <li
                        key={option.id}
                        onClick={() => handleSelectOption(option)}
                        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                      >
                        {option.city}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-gray-500">
                      No options found
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* <div>
            <label className="block text-[16px] font-normal mb-4">Email</label>
            <input type="text" className="w-full p-2 border rounded bg-purple-50" id='email' value={formData.email} onChange={handleInputChange} />
          </div> */}
          {/* <div>
                        <label className="block text-[16px] font-normal mb-4">Latitude</label>
                        <input type="text" className="w-full p-2 border rounded bg-purple-50" id='Lat' value={formData.Lat} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label className="block text-[16px] font-normal mb-4">Longitude</label>
                        <input type="text" className="w-full p-2 border rounded bg-purple-50" id='Lon' value={formData.Lon} onChange={handleInputChange} />
                    </div> */}
        </div>

        <div className="flex flex-col items-center gap-4 mt-6 lg:flex-row lg:justify-between lg:items-end">
          {userData?.birthChart && (
            <Image
              src={userData.birthChart}
              alt="Birth Chart"
              width={280}
              height={325}
              className="max-w-[280px] max-h-[325px] border rounded-lg"
            />
          )}
          <button
            onClick={handlesubmit}
            className="bg-[#67308C] text-white px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AstrologerProfile;
