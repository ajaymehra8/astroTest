"use client";
import React, { useState } from 'react';
import cover1 from '../../../public/horoscope/horoscope_desk.png';
import cover2 from '../../../public/horoscope/horoscope_mobile.png';
import Image from 'next/image';
import map from '../../../public/matchmaking/map-pin.svg';
import banner from '../../../public/horoscope/banner.png';
import icon from '../../../public/horoscope/report.svg';
import icon1 from '../../../public/horoscope/tick-circle.svg';
import card from '../../../public/horoscope/card.png';
import cserviceImage1 from '../../../public/Home/1.png';
import cserviceImage3 from '../../../public/Home/3.png';
import cserviceImage7 from '../../../public/Home/7.png';
import cserviceImage6 from '../../../public/Home/6.png';
import { useToast } from "@/hooks/use-toast";
import Head from 'next/head';
import Link from 'next/link';
import { searchCities } from '../../services/services';

const Page = () => {
  const [activeTab, setActiveTab] = useState('form1');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isOpenGender, setIsOpenGender] = useState(false);

  const { toast } = useToast();
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);


  const fetchCities = async (query) => {
    if (!query) {
      setFilteredOptions([]);
      setShowOptions(false);
      return;
    }

    try {
      const data = await searchCities(query);
      setFilteredOptions(data || []);
      setShowOptions(data.length > 0);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setFilteredOptions([]);
      setShowOptions(false);
    }
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === 'place' && value.trim()) {
      fetchCities(value);
    } else {
      setFilteredOptions([]);
      setShowOptions(false);
    }
  };

  const handleSelectOption = (option) => {
    setFormData((prev) => ({
      ...prev,
      place: option.city,
      lat: option.lat,
      lon: option.lon,
    }));
    setShowOptions(false);
    console.log(option.lat, option.lon)
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    lang: "",
    gender: "",
    dob: "",
    time: "",
    place: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldLabels = {
      name: "Full Name",
      phone: "Phone Number",
      lang: "Language of Report",
      gender: "Gender",
      dob: "Date of Birth",
      time: "Time of Birth",
      place: "Place of Birth",
    };
    const unfilledFields = [];
    for (const key in formData) {
      if (formData[key]?.trim() === "") {
        unfilledFields.push(fieldLabels[key]);
      }
    }

    if (unfilledFields.length > 0) {
      toast({
        title: `Please fill in ${unfilledFields.join(", ")}`,
        variant: "destructive",
        duration: 5000,
        className: "toast",
      });
      console.log("toast generated");
      return;
    }

    toast({
      title: "Form submitted successfully!",
      variant: "success",
      duration: 5000, // 5 seconds
      style: {
        backgroundColor: "#28a745",
        color: "white",
        fontSize: "18px",
      },
    });
    console.log("success toast generated");
  };
  return (
    <>
      <Head>
        <Head>
       <title>Horoscope- AstroVachan: Consult expert astrologers online now</title>
        <meta
          name="description"
          content="Horoscope- Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey."
        />


        <meta property="og:title" content="Horoscope- AstroVachan: Consult expert astrologers online now" />
        <meta property="og:description" content="Horoscope- Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey." />
        <meta property="og:image" content="https://www.astrovachan.com/Footer/FooterLogo.png" />
    </Head>
  </Head>
  
      <div>
        <div className="relative w-full h-[259px]">
          <Image src={cover1} alt="horoscope" className="w-full h-[259px] lg:block hidden cursor-pointer" />
          <Image src={cover2} alt="horoscope" className="w-full h-[259px] block lg:hidden cursor-pointer" />
          <div className="absolute bottom-[100px] left-[80px] px-4 py-2 rounded-md ">
            <p className="text-white font-bold playfair-display-heading tracking-[-1.26px] lg:text-[42px] text-[20px] -ml-20 lg:-ml-0">
              Horoscope
            </p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto" >
          <div className="flex flex-col md:flex-row">
            {/* Left section */}
            <div className="flex-1 bg-white lg:px-8 ps-4  lg:py-16 py-[44px] flex flex-col items-start justify-start -mr-10">
              {activeTab === 'form1' && (
                <div className="w-full max-w-[600px] mx-auto ">

                  <h1 className="lg:text-[28px] text-[20px] playfair-display-heading text-[#67308C] font-medium mb-4">
                    Basic Horoscope
                  </h1>
                  <Image
                    src={banner}
                    alt="image"
                    className="lg:h-[246px] h-[146px] lg:max-w-full max-w-[340px] object-cover mb-[26px] rounded-md cursor-pointer"
                  />
                  <p className="text-left text-[#000] lg:text-[18px] text-[14px] mr-[16px] max-w-[340px] lg:max-w-full lg:mr-0 font-roboto mb-6">
                    Basic horoscopes provide general predictions for the day, week, or month based on your sun sign. They
                    offer broad insights into potential trends in love, career, and overall well-being. These horoscopes
                    are often freely available or available at a low cost and can typically be found in newspapers,
                    magazines, or online platforms.
                  </p>

                  {/* Points List */}
                  <div className="text-left text-[#000] text-[16px] font-roboto">
                    <h1 className='lg:text-[18px] text-[14px] font-roboto font-bold tracking-[-0.54px] mb-3'>What we offer:</h1>
                    <ul className="list-none">
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        General predictions for your sun sign
                      </li>
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        Usually short
                      </li>
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        Less accurate due to general nature
                      </li>
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        Often free or low-cost
                      </li>
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        Broad overview of potential trends
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {activeTab === 'form2' && (
                <div className="w-full max-w-[600px] mx-auto">

                  <h1 className="lg:text-[28px] text-[20px] playfair-display-heading text-[#67308C] font-medium mb-4 lg:leading-[120%] lg:tracking-[-0.84px]">
                    Professional Horoscope
                  </h1>
                  <Image
                    src={banner}
                    alt="image"
                    className="lg:h-[246px] lg:max-w-full max-w-[340px]  h-[146px] object-cover mb-[26px] rounded-md cursor-pointer"
                  />
                  <p className="text-left text-[#000] lg:text-[18px] text-[14px] mr-[16px] lg:mr-0 font-roboto mb-6">
                    Professional horoscopes provide general predictions for the day, week, or month based on your sun sign. They offer broad insights into potential trends in love, career, and overall well-being. These horoscopes are often freely available or available at a low cost and can typically be found in newspapers, magazines, or online platforms.
                  </p>

                  {/* Points List */}
                  <div className="text-left text-[#000] text-[16px] font-roboto">
                    <h1 className='lg:text-[18px] text-[14px] font-roboto font-bold tracking-[-0.54px] mb-3'>What we offer:</h1>
                    <ul className="list-none">
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        Personalized analysis based on your birth chart
                      </li>
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        Typically involves a fee
                      </li>
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        In-depth exploration of various life areas
                      </li>
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        More accurate due to personalized analysis
                      </li>
                      <li className="flex items-center mb-3 font-roboto lg:text-[18px] text-[14px]">
                        <Image
                          src={icon1}
                          alt="tick"
                          className="w-6 h-6 mr-2"
                        />
                        Can include consultations
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {/* Right section */}
            <div className="flex-1 bg-white p-8 flex flex-col justify-center items-center lg:-ml-10 -ml-8">
              <p className='text-[20px] playfair-display-heading1 self-start font-medium lg:hidden block ml-6 lg:ml-12'>Enter Details</p>
              {/* Tabs */}
              <div className="lg:w-[90%] w-[100%] max-w-4xl mx-auto ms-[16px] my-8 lg:p-6 p-0 bg-white rounded-lg border lg:border-[#9E6AC0] border-white ">
                <div className="w-full">
                  <div className="flex mb-6">
                    <button
                      className={`flex-1 py-2 px-4 text-center font-medium lg:text-[20px] text-[16px] font-roboto rounded-[8px] me-3 lg:h-[52px] lg:w-[274px] ${activeTab === 'form1'
                          ? 'bg-[#67308C] text-white'
                          : 'bg-[#F9F4FD] text-black'
                        }`}
                      onClick={() => setActiveTab('form1')}
                    >
                      Basic
                    </button>
                    <button
                      className={`flex-1 py-2 px-4 text-center font-medium lg:text-[20px] text-[16px] font-roboto rounded-[8px] lg:h-[52px] lg:w-[274px] ${activeTab === 'form2'
                          ? 'bg-[#67308C] text-white'
                          : 'bg-[#F9F4FD] text-black'
                        }`}
                      onClick={() => setActiveTab('form2')}
                    >
                      Professional
                    </button>
                  </div>
                </div>
                {activeTab === 'form1' && (
                  <>
                    <form className="w-full bg-[#F2E4FC] p-6 rounded-lg">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-[16px] font-medium font-roboto text-[#000]"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[10px] py-[12px]"
                          placeholder="Enter Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="phone"
                          className="block text-[16px] font-medium font-roboto text-[#000]"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="phone"
                          className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[10px] py-[12px]"
                          placeholder="Enter Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4 relative">
                        <label htmlFor="lang" className="block text-[16px] font-medium font-roboto text-[#000]">
                          Language of Report
                        </label>
                        <select
                          id="lang"
                          className="block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[10px] py-[12px] appearance-none pr-10 mt-1"
                          value={formData.lang} // Controlled by formData.lang
                          onChange={handleInputChange}
                          onFocus={() => setIsOpenLang(true)}
                          onBlur={() => setTimeout(() => setIsOpenLang(false), 200)}
                        >
                          <option value="" disabled>
                            Select Report Language
                          </option>
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                        </select>
                        <div
                          className={`absolute inset-y-0 right-3 flex items-center pointer-events-none transition-transform duration-200 mt-6 ${isOpenLang ? "rotate-180" : ""
                            }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-[#67308C]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Gender Field */}
                      <div className="mb-4 relative">
                        <label htmlFor="gender" className="block text-[16px] font-medium font-roboto text-[#000]">
                          Gender
                        </label>
                        <select
                          id="gender"
                          className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px] appearance-none pr-10"
                          value={formData.gender} // Controlled by formData.gender
                          onChange={handleInputChange}
                          onFocus={() => setIsOpenGender(true)}
                          onBlur={() => setTimeout(() => setIsOpenGender(false), 200)}
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <div
                          className={`absolute inset-y-0 right-3 flex items-center pointer-events-none transition-transform duration-200 mt-6 ${isOpenGender ? "rotate-180" : ""
                            }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-[#67308C]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Additional Fields */}
                      <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <div className="flex-1">
                          <label
                            htmlFor="dob"
                            className="block text-[16px] font-medium font-roboto text-[#000]"
                          >
                            Birth Date
                          </label>
                          <input
                            type="date"
                            id="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="time"
                            className="block text-[16px] font-medium font-roboto text-[#000]"
                          >
                            Birth Time
                          </label>
                          <input
                            type="time"
                            id="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                          />
                        </div>
                      </div>

                      <div className="mb-4 relative">
                        <label
                          htmlFor="place"
                          className="block text-[16px] font-medium font-roboto text-[#000]"
                        >
                          Birth Place
                        </label>
                        <input
                          type="text"
                          id="place"
                          value={formData.place}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px] pr-10"
                          placeholder="Place of Birth"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          <Image src={map} alt="map-pin" className="w-5 h-5 mt-6 cursor-pointer" />
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
                              <li className="px-4 py-2 text-sm text-gray-500">No options found</li>
                            )}
                          </ul>
                        )}
                      </div>

                    </form>
                    <div className="flex justify-between items-center bg-[#F2E4FC] p-4 rounded-lg mt-6">
                      <h3 className="text-[18px] font-bold font-roboto text-[#000]">Total Amount</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-medium font-roboto text-[#646464] line-through">
                          ₹999
                        </span>
                        <span className="text-[20px] font-bold font-roboto text-[#000]">₹299</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full mt-4 bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white py-2 px-4 rounded-md font-roboto font-medium lg:text-[20px] text-[16px] flex items-center justify-center gap-2"
                    >
                      <Image src={icon} alt="icon" className="w-6 h-6" />
                      <span className='lg:text-[20px] cursor-pointer'>Generate Report</span>
                    </button>
                  </>
                )}
                {activeTab === 'form2' && <>
                  <form className="w-full bg-[#F2E4FC] p-6 rounded-lg">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-[16px] font-medium font-roboto text-[#000]"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[10px] py-[12px]"
                        placeholder="Enter Full Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-[16px] font-medium font-roboto text-[#000]"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[10px] py-[12px]"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <div className="mb-4 relative">
                      <label htmlFor="lang" className="block text-[16px] font-medium font-roboto text-[#000]">
                        Language of Report
                      </label>
                      <select
                        id="lang"
                        className="block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[10px] py-[12px] appearance-none pr-10 mt-1"
                        value={formData.lang} // Controlled by formData.lang
                        onChange={handleInputChange}
                        onFocus={() => setIsOpenLang(true)}
                        onBlur={() => setTimeout(() => setIsOpenLang(false), 200)}
                      >
                        <option value="" disabled>
                          Select Report Language
                        </option>
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                      </select>
                      <div
                        className={`absolute inset-y-0 right-3 flex items-center pointer-events-none transition-transform duration-200 mt-6 ${isOpenLang ? "rotate-180" : ""
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#67308C]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Gender Field */}
                    <div className="mb-4 relative">
                      <label htmlFor="gender" className="block text-[16px] font-medium font-roboto text-[#000]">
                        Gender
                      </label>
                      <select
                        id="gender"
                        className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px] appearance-none pr-10"
                        value={formData.gender} // Controlled by formData.gender
                        onChange={handleInputChange}
                        onFocus={() => setIsOpenGender(true)}
                        onBlur={() => setTimeout(() => setIsOpenGender(false), 200)}
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <div
                        className={`absolute inset-y-0 right-3 flex items-center pointer-events-none transition-transform duration-200 mt-6 ${isOpenGender ? "rotate-180" : ""
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#67308C]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Additional Fields */}
                    <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                      <div className="flex-1">
                        <label
                          htmlFor="dob"
                          className="block text-[16px] font-medium font-roboto text-[#000]"
                        >
                          Birth Date
                        </label>
                        <input
                          type="date"
                          id="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="time"
                          className="block text-[16px] font-medium font-roboto text-[#000]"
                        >
                          Birth Time
                        </label>
                        <input
                          type="time"
                          id="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                        />
                      </div>
                    </div>

                    <div className="mb-4 relative">
                      <label
                        htmlFor="place"
                        className="block text-[16px] font-medium font-roboto text-[#000]"
                      >
                        Birth Place
                      </label>
                      <input
                        type="text"
                        id="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px] pr-10"
                        placeholder="Place of Birth"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        <Image src={map} alt="map-pin" className="w-5 h-5 mt-6 cursor-pointer" />
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
                            <li className="px-4 py-2 text-sm text-gray-500">No options found</li>
                          )}
                        </ul>
                      )}
                    </div>


                  </form>
                  <div className="flex justify-between items-center bg-[#F2E4FC] p-4 rounded-lg mt-6">
                    <h3 className="text-[18px] font-bold font-roboto text-[#000]">Total Amount</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-medium font-roboto text-[#646464] line-through">
                        ₹999
                      </span>
                      <span className="text-[20px] font-bold font-roboto text-[#000]">₹299</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full mt-4 bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white py-2 px-4 rounded-md font-roboto font-medium text-[20px] flex items-center justify-center gap-2"
                  >
                    <Image src={icon} alt="icon" className="lg:w-6 lg:h-6 w-[19px] h-[19px]" />
                    <span className='lg:text-[20px] cursor-pointer'>Generate Report</span>
                  </button>
                </>}
              </div>
            </div>

          </div>
          <div className="lg:w-[1280px] w-full lg:h-[280px] mt-10 lg:mb-[64px]  md:px-16 lg:px-[77.71px] py-6 md:py-8 lg:py-[41.41px] flex items-center space-x-4 bg-[#FCF8FF] mx-auto lg:rounded-sm">

            <div className="max-w-[220px] max-h-[164px] lg:mr-[32px] mr-0  flex items-center justify-center rounded-xl">
              <Image src={card} alt="pic" className='w-[55px] h-[55px] lg:w-auto lg:h-auto ms-4 lg:ms-0' />
            </div>


            <div className="flex-1 ">
              <p className="text-black xl:text-[32px] 2xl:text-[32px] lg:text-[32px] text-[16px] font-roboto font-medium mb-4 lg:tracking-[-0.96px] leading-[120%]">
                Improve your love life, career, and overall well-being with our astrological guidance
              </p>
              <div className="flex gap-6">
              
                <button className="bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white lg:px-6 py-2 rounded-[8px] font-medium lg:text-[20px] text-[10px] font-roboto tracking-[-0.6px] w-[120px] lg:w-auto">
                  <Link href="/astrologer"> Talk to Astrologer</Link>
                </button>
              </div>
            </div>
          </div>
          <h1 className='text-[#6F2C91] playfair-display-heading text-[32px] font-bold tracking-[-0.96px] flex justify-center align-center mt-6'>Other Services</h1>
          <div className="lg:grid hidden  grid-cols-1 sm:grid-cols-2 font-[Roboto] lg:grid-cols-4 gap-6 px-6 md:px-16 mt-[42px] mb-[42px] lg:w-[1386px] lg:-ms-[60px]">
            {services.map((service,index) => (
             <Link key={index} href={service.redirect}>
             <div
                key={service.title}
                className="bg-orange-50 text-black rounded-[8px] p-6 flex flex-col items-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132] lg:w-[305px] lg:h-[167px]"
              >
                <Image  width={64}
                       height={64} src={service.icon} alt="icons" />
                <p className="text-lg font-semibold text-center ">
                  {service.title}
                </p>
              </div>
              </Link>
            ))}
          </div>
          <div className="lg:hidden w-full max-w-xs mx-auto overflow-hidden relative mb-8 mt-10">
            <div className="flex flex-col items-center ">

              <div className="flex gap-4 infinite-scroll">
                {[...services, ...services].map((service, index) => (
                  <Link key={index} href={service.redirect}>
                  <div key={index} className="w-40 flex-shrink-0">
                    <div className="p-4 h-40 bg-orange-50 text-black rounded-[8px] flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]">
                      <Image
                       width={64}
                       height={64}
                        src={service.icon}
                        alt={service.title}
                        className="w-16 h-16 object-contain"
                      />
                      <p className="text-center text-[#000] text-sm font-[500] font-roboto ">
                        {service.title}
                      </p>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default Page;


export const services = [
  { title: "Free Matchmaking", icon: cserviceImage3, redirect: "https://rzp.io/rzp/qkBRsPJ" },
  // { title: "Birth Chart Generator", icon: cserviceImage7, redirect: "/birthchart" },
  { title: "Online Pooja ", icon: "https://cdn.astrovachan.com/website/srv-pooja.jpg" ,redirect:"/#Online Pooja"},
  { title: "Free Kundli", icon: cserviceImage1, redirect: "/kundli-generation" },
  { title: "Numerology Reading", icon: cserviceImage6, redirect: "/numerology" }
];