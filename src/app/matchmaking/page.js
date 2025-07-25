"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import cover from '../../../public/matchmaking/cover.png';
import banner from '../../../public/matchmaking/matchmaking.png';
import map from '../../../public/matchmaking/map-pin.svg';
import icon from '../../../public/horoscope/report.svg';
import cover2 from "../../../public/numeropage/numero_phone.png";
import cserviceImage1 from '../../../public/Home/1.png';
import cserviceImage6 from '../../../public/Home/6.png';
import cserviceImage7 from '../../../public/Home/7.png';
import cserviceImage8 from '../../../public/Home/8.png';
import { useToast } from "@/hooks/use-toast";
import Head from 'next/head';
import Link from 'next/link';
import { searchCities } from '../../services/services';


const Page = () => {
  const [activeTab, setActiveTab] = useState('form1');
  const [isOpen, setIsOpen] = useState(false);
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

    if (id === 'place1'||id==='place2' && value.trim()) {
      fetchCities(value);
    } else {
      setFilteredOptions([]);
      setShowOptions(false);
    }
  };

  const handleSelectOption = (option) => {
    setFormData((prev) => ({
      ...prev,
      place1: option.city,
      place2:option.city,
      lat: option.lat,
      lon: option.lon,
    }));
    setShowOptions(false);
    console.log(option.lat,option.lon)
  };


  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    lang: "",
    name1: "",
    dob1: "",
    time1: "",
    place1: "",
    name2: "",
    dob2: "",
    time2: "",
    place2: "",
  });
 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldLabels = {
      email: "Email Address",
      phone: "Phone Number",
      lang: "Language of Report",
      name1: "Full Name (Male)",
      dob1: "Date of Birth (Male)",
      time1: "Time of Birth (Male)",
      place1: "Place of Birth (Male)",
      name2: "Full Name (Female)",
      dob2: "Date of Birth (Female)",
      time2: "Time of Birth (Female)",
      place2: "Place of Birth (Female)"
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
       <title>Matchmaking- AstroVachan: Consult expert astrologers online now</title>
        <meta
          name="description"
          content="Matchmaking- Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey."
        />


        <meta property="og:title" content="Matchmaking- AstroVachan: Consult expert astrologers online now" />
        <meta property="og:description" content="Matchmaking- Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey." />
        <meta property="og:image" content="https://www.astrovachan.com/Footer/FooterLogo.png" />
    </Head>
 </Head>

 
    <div>
      {/* Hero Section with Text Overlay */}
      <div className="relative w-full h-[259px]">
        <Image src={cover} alt="numerology_reading" className="w-full h-full object-cover bg-black bg-opacity-50 cursor-pointer hidden lg:block" />
         <Image
                  src={cover2}
                  alt="numerology_reading"
                  className="w-full h-full object-cover bg-black bg-opacity-50 cursor-pointer lg:hidden block"
                />
        {/* Overlay */}
        <div className="absolute bottom-[100px] left-[80px]  -mx-20 lg:-mx-0 px-4 py-2 rounded-md ">
          <p className="text-white  font-bold playfair-display-heading lg:tracking-[-1.26px] tracking-[0.2px] lg:text-[42px] text-[20px] w-[195px] lg:w-auto">Kundli Matching for Marriage</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto" >
        {/* Content Section */}
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="flex-1 bg-white lg:px-8 px-[16px] py-16 flex flex-col items-center justify-center -mr-10">
            <div className="w-full max-w-[600px] mx-auto">
              <h1 className="lg:text-[28px] text-[20px] playfair-display-heading1 text-[#67308C] font-[500] mb-4 lg:tracking-[-0.84px] tracking-[0.4px] w-[323px] lg:w-auto">
                Soulmate Compatibility Premium Report
              </h1>
              <Image src={banner} alt="image" className="lg:h-[246px] h-[146px] w-[323px] lg:w-full object-cover mb-[26px] rounded-md cursor-pointer" />
              <p className="text-left text-[#000] lg:text-[18px] text-[14px] font-roboto lg:w-auto w-[328px]">
                Unlock personalised insights into your relationship compatibility with our tailored Match-Making Premium Report [20-24 Pages].<br />
                Receive in-depth, customised guidance on love, harmony, and future potential through expert Vedic astrological analysis.
              </p>
              <div className="text-left text-[#000] text-[16px] font-roboto">
                <h1 className="lg:text-[18px] text-[14px] font-roboto tracking-[-0.54px] mb-3 mt-[32px]">
                  Generate your report in simple steps:
                </h1>
                <ol className="list-decimal pl-5">
                  <li className="mb-3 font-roboto lg:text-[18px] text-[14px] lg:w-auto w-[310px]">
                    <span className="font-bold">Enter Details:</span> Provide your contact information and the birth details of both partners.
                  </li>
                  <li className="mb-3 font-roboto lg:text-[18px] text-[14px] lg:w-auto w-[328px]">
                    <span className="font-bold">Make Payment:</span> Complete the payment securely with UPI, VISA, and RuPay.
                  </li>
                  <li className="mb-3 font-roboto lg:text-[18px] text-[14px] lg:w-auto w-[328px]">
                    <span className="font-bold">Receive Report:</span> Your report will be delivered on WhatsApp within 4-6 business hours.
                  </li>
                  <li className="mb-3 font-roboto lg:text-[18px] text-[14px] lg:w-auto w-[328px]">
                    <span className="font-bold">Need Help?:</span> Contact us at support@astrovachan.com or +91 9953906154.
                  </li>
                </ol>
              </div>


            </div>
          </div>

          {/* Right Section (Form) */}
          <div className="flex-1 bg-white p-8 flex flex-col justify-start items-start -ml-10">
            <form className="lg:w-[630px] w-[375px] mx-auto bg-white p-6 rounded-lg border lg:border-[#9E6AC0] border-white mt-10" onSubmit={handleSubmit}>
              <h2 className=" font-thin lg:text-[24px] text-[20px] mb-4 playfair-display-heading1 lg:tracking-[-0.72px] tracking-[0.4px] -mt-32 lg:-mt-0">Enter Birth Details</h2>

              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  id="phone"
                  className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4 relative">
                <select
                  id="lang"
                  className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px] appearance-none pr-10"
                  onClick={() => setIsOpen(!isOpen)} // Toggle on click
                  onBlur={() => setIsOpen(false)} // Close when clicking outside
                  value={formData.lang}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Report Language
                  </option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
                <div
                  className={`absolute inset-y-0 right-3 flex items-center pointer-events-none transition-transform duration-200 ${isOpen ? "rotate-180" : ""
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

              <div className="mb-4">
                <div
                  className="mt-1 block w-full rounded-md bg-[#F2E4FC] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                >
                  <div className="flex mb-6">
                    <button
                      type="button"
                      className={`flex-1  px-[28px] text-center font-medium lg:text-[20px] text-[16px] hover:bg-gradient-to-b from-[#4C2666] to-[#6E4A86] hover:text-white font-roboto rounded-md me-3 lg:w-[255px] w-[133.5px] py-[14px]  ${activeTab === 'form1' ? 'bg-[#67308C] text-white' : 'bg-[#F9F4FD] text-black'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('form1');
                      }}
                    >
                      Male
                    </button>

                    <button
                      type="button"
                      className={`flex-1 px-[28px] cursor-pointer text-center font-medium hover:bg-gradient-to-b from-[#4C2666] to-[#6E4A86] hover:text-white lg:text-[20px] text-[16px] lg:w-[255px] w-[133.5px] py-[14px]  font-roboto rounded-md ${activeTab === 'form2' ? 'bg-[#67308C] text-white' : 'bg-[#F9F4FD] text-black'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('form2');
                      }}
                    >
                      Female
                    </button>

                  </div>
                  {activeTab === 'form1' && (
                    <>
                      <div className="mb-4">
                        <input
                          type="name"
                          id="name1"
                          className="mt-1 block w-full cursor-pointer  rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                          placeholder="Full Name"
                          value={formData.name1}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4 flex space-x-4">
                        <div className="flex-1">
                          <input
                            type="date"
                            id="dob1"
                            value={formData.dob1}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="time"
                            id="time1"
                            value={formData.time1}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                          />
                        </div>
                      </div>
                      <div className="mb-4 relative">
      <input
        type="text"
        id="place1"
        value={formData.place1}
        onChange={handleInputChange}
        className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px] pr-10"
        placeholder="Place of Birth"
      />
      <div className="absolute inset-y-0 right-3 flex items-center">
        <Image src={map} alt="map-pin" className="w-5 h-5 cursor-pointer" />
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

                    </>)}
                  {activeTab === 'form2' && (
                    <>
                      <div className="mb-4">
                        <input
                          type="name"
                          id="name2"
                          value={formData.name2}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md bg-[#F9F4FD]  focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="mb-4 flex space-x-4">
                        <div className="flex-1">
                          <input
                            type="date"
                            id="dob2"
                            value={formData.dob2}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="time"
                            id="time2"
                            value={formData.time2}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                          />
                        </div>
                      </div>
                      <div className="mb-4 relative">
      <input
        type="text"
        id="place1"
        value={formData.place1}
        onChange={handleInputChange}
        className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px] pr-10"
        placeholder="Place of Birth"
      />
      <div className="absolute inset-y-0 right-3 flex items-center">
        <Image src={map} alt="map-pin" className="w-5 h-5 cursor-pointer" />
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


                    </>)}
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#F9F4FD] p-4 rounded-lg mt-6">
                <h3 className="text-[18px] font-bold font-roboto text-[#000]">Total Amount</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium font-roboto text-[#646464] line-through">
                    ₹999
                  </span>
                  <span className="text-[20px] font-bold font-roboto text-[#000]">₹299</span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full mt-4 bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white py-2 px-4 rounded-md font-roboto font-medium lg:text-[20px] text-[16px] flex items-center justify-center gap-2"
              >
                <Image src={icon} alt="icon" className="lg:w-6 lg:h-6 w-[19px] h-[19px]" />
                <span>Generate Report</span>
              </button>
            </form>
          </div>
        </div>

        {/* Other Services Section */}
        <h1 className="text-[#6F2C91] playfair-display-heading lg:text-[32px] text-[20px] font-bold tracking-[-0.96px] flex justify-center items-center">
          Other Services
        </h1>
        <div className="lg:grid hidden grid-cols-1 sm:grid-cols-2 font-[Roboto] lg:grid-cols-3 gap-6 px-6 md:px-16 mt-[42px] mb-[42px] l1:ms-10 l1:me-[28px]">
          {services.map((service,index) => (
            <Link key={index} href={service.redirect}>
           <div
              key={service.title}
              className="bg-orange-50 text-black rounded-lg p-6 flex flex-col items-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]"
            >
              <Image  width={64}
                    height={64} src={service.icon} alt="icons" className='cursor-pointer' />
              <p className="text-lg font-semibold text-center">{service.title}</p>
            </div>
            </Link>
          ))}

        </div>
<div className="lg:hidden w-full max-w-xs mx-auto overflow-hidden relative mb-8">
          <div className="flex flex-col items-center">
            <div className="flex gap-4 infinite-scroll">
              {[...services, ...services].map((service, index) => (
                 <Link key={index} href={service.redirect}>
                <div key={index} className="w-40 flex-shrink-0">
                  <div className="p-4 h-40 bg-orange-50 text-black rounded-lg flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132] ">
                    <Image
                     width={64}
                     height={64}
                      src={service.icon}
                      alt={service.title}
                      className="w-16 h-16 object-contain"
                    />
                    <p className="text-center text-[#000] text-sm font-bold font-roboto">
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
  )
}

export default Page

export const services = [
  // { title: "Birth Chart Generator", icon: cserviceImage7 ,redirect:"/birthchart" },
  { title: "Online Pooja ", icon: "https://cdn.astrovachan.com/website/srv-pooja.jpg" ,redirect:"/#Online Pooja"},
  { title: "Free Kundli", icon: cserviceImage1 , redirect:"/kundligeneration"},
  { title: "Numerology Reading", icon: cserviceImage6 ,redirect:"/numerology"}
];
