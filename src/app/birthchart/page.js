'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import cserviceImage1 from '../../../public/kundligeneration/Simplification.png';
import cserviceImage3 from '../../../public/Home/3.png';
import cserviceImage7 from '../../../public/Home/7.png';
import cserviceImage8 from '../../../public/Home/8.png';
import cover from "../../../public/numeropage/numero.jpg";
import cover2 from "../../../public/numeropage/numero_phone.png";
import cardImage from "../../../public/numeropage/numeroi.jpg";
import { useRouter } from 'next/navigation';
import map from '../../../public/ZodiacSign/map.png'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import Head from "next/head";


const Page = () => {
  const [isDropdownArrowOpen, setIsDropdownArrowOpen] = useState(false);
  const router = useRouter();
  
    const { toast } = useToast(); 

    const [formData, setFormData] = useState({
      name: "",
      gender:"Male",
      dob:"",
      time:"",
      place:"",
    });
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const fieldLabels = {
        name: "Full Name",
      
      gender:"Gender",
      dob:"date",
      time:"time",
      place:"place"
      };
      const unfilledFields = [];
      for (const key in formData) {
        if (formData[key]?.trim() === "") {
          unfilledFields.push(fieldLabels[key]);
        }
      }
    
      if (unfilledFields.length > 0) {
        toast({
          title: "Error",
          description: `Please fill in ${unfilledFields.join(", ")}`,
          variant: "destructive",
          duration: 5000, 
          className: "toast",
        });
        console.log("toast generated");
        return;
      }
    
      toast({
        title: "Success",
        description: "Form submitted successfully!",
        variant: "success",
        duration: 5000, // 5 seconds
        style: {
          backgroundColor: "#28a745",
          color: "white",
          fontSize: "18px",
        },
      });
      console.log("success toast generated");
      router.push("/kundlireport");
    };

  

  return (
    <>
     <Head>
       <title>Chart - AstroVachan: Consult expert astrologers online now</title>
        <meta
          name="description"
          content="Chart - Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey."
        />


        <meta property="og:title" content="Chart - AstroVachan: Consult expert astrologers online now" />
        <meta property="og:description" content="Chart - Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey." />
        <meta property="og:image" content="https://www.astrovachan.com/Footer/FooterLogo.png" />
    </Head>
   
    <div className="h-full">
      <div className="relative w-full xl:top-[-95px] lg:top-[-95px] 2xl:top-[-95px] h-[279px] lg:h-[376px] xl:h-[376px] 2xl:h-[376px]">
        <Image src={cover} alt="numerology_reading" className="w-full h-full object-cover bg-black bg-opacity-50 cursor-pointer" />
        {/* Overlay */}
        <div className="absolute bottom-[100px] w-[195px] lg:w-[473px] xl:w-[473px] 2xl:w-[473px] h-[49px] lg:left-[80px] xl:left-[80px] 2xl:left-[80px] left-[16px] py-2 rounded-md ">
          <p className="text-white  font-bold playfair-display-heading lg:tracking-[-1.26px] xl:tracking-[-1.26px] 2xl:tracking-[-1.26px] tracking-[1px] lg:text-[42px] xl:text-[42px] 2xl:text-[42px] text-[20px]">Birth Chart</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto" >
        <div className="lg:mx-16 xl:mx-16 2xl:mx-16 mx-4 my-3">



          <div className=" flex space-x-2 lg:space-x-4 xl:space-x-4 2xl:space-x-4 flex-col xl:flex-row 2xl:flex-row lg:flex-row">

            <div className="flex-1 bg-white pb-16 flex flex-col items-center justify-center lg:mr-5 xl:mr-5 2xl:mr-5">
              <div className="w-full max-w-[600px] mx-auto">
                <h1 className="lg:text-[28px] xl:text-[28px] 2xl:text-[28px] text-[20px] playfair-display-heading text-[#67308C] font-medium mb-4">
                  Birth Chart
                </h1>
                <Image src={cover2} alt="image" className="h-[275px] w-[630px] lg:object-cover xl:object-cover 2xl:object-cover mb-[10px] rounded-md" />
                <p className="text-left text-[#000] lg:text-[19px] xl:text-[19px] 2xl:text-[19px] text-[14px] font-roboto font-normal">
                An astrological birth chart accurately reflects the positions of the Sun, Moon, and planets at the exact moment of a person's birth in a specific location. Creating a precise birth chart, or rasi chart, necessitates knowledge of the individual's date of birth, exact time of birth, and place of birth.
                </p>
              </div>
            </div>




            {/* Right Section */}
            <div className="flex-1 bg-white flex flex-col justify-center -ml-10">
              <form onSubmit={handleSubmit} className="max-w-[630px] w-full mx-auto lg:bg-[#F2E4FC] xl:bg-[#F2E4FC] 2xl:bg-[#F2E4FC] lg:p-6 xl:p-6 2xl:p-6 lg:rounded-lg xl:rounded-lg 2xl:rounded-lg lg:border xl:border 2xl:border lg:border-[#9E6AC0] xl:border-[#9E6AC0] 2xl:border-[#9E6AC0] sm:p-5 md:p-6">
                <h2 className=" font-thin lg:text-[24px] xl:text-[24px] 2xl:text-[24px] text-[20px] mb-4 playfair-display-heading tracking-[-0.72px]">Enter Birth Details</h2>

                <div className="mb-4">
                  <label htmlFor="name" className="block lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[14px] font-medium font-roboto tracking-[-0.48px] text-[#000]">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md bg-[#F9F4FD]  focus:border-[#67308C] sm:text-sm text-black font-roboto text-[14px] px-[12px] py-[10px]"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>


                <div className="mb-4 relative">
                  <label
                    htmlFor="gender"
                    className="block lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[14px] font-medium font-roboto tracking-[-0.48px] text-[#000]"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      id="gender"
                      className="w-full mt-1 p-2 border rounded-lg bg-[#F9F4FD] appearance-none pr-10"
                      
                      onClick={() => setIsDropdownArrowOpen(!isDropdownArrowOpen)}
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>

                    
                    <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                      {isDropdownArrowOpen ? (
                        <FiChevronUp size={24} className="text-gray-500" />
                      ) : (
                        <FiChevronDown size={24} className="text-gray-500" />
                      )}
                    </div>

                  </div>
                </div>


                <div className="lg:grid xl:grid 2xl:grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">

                  <div className="relative mb-4">
                    <label className="block lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[14px] font-medium font-roboto tracking-[-0.48px] text-[#000]">Birth Date</label>
                    <input
                      type="date"
                      className="w-full mt-1 p-2 border rounded-lg bg-[#F9F4FD]"
                      id="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </div>


                  <div className="relative">
                    <label className="block lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[14px] font-medium font-roboto tracking-[-0.48px] text-[#000]">Birth Time</label>
                    <input
                      type="time"
                      id='time'
                      className="w-full mt-1 p-2 border rounded-lg bg-[#F9F4FD]"
                      value={formData.time}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-4">


                  <label className="block lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[14px] font-medium font-roboto tracking-[-0.48px] text-[#000]">Birth Place</label>
                  <div className="relative">
                    <input
                      type="text"
                      id='place'
                      placeholder="Enter place of birth"
                      className="w-full mt-1 p-2 border rounded-lg bg-[#F9F4FD]"
                      value={formData.place}
                      onChange={handleInputChange}
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center">
                      <Image src={map} alt="map" className="w-4 h-4 lg:w-6 xl:w-6 2xl:w-6 lg:h-6 xl:h-6 2xl:h-6" />
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white py-2 px-4 rounded-md font-roboto font-medium lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[16px] focus:ring-offset-2 tracking-[-0.6px]"
                >
                  Generate Kundli
                </button>
              </form>
            </div>
          </div>

          <div className="max-w-[1280px] w-full py-6 lg:px-[48px] md:py-8 rounded-[12px] lg:mt-[64px] lg:mb-[64px] lg:py-[41.41px] flex items-center space-x-4 bg-[#FCF8FF] mx-auto">

            <div className="lg:max-w-[220px] xl:max-w-[220px] 2xl:max-w-[220px] max-w-[67px] max-h-[164px] lg:mr-[32px] xl:mr-[32px] 2xl:mr-[32px] mr-[12px] bg-gray-200 flex items-center justify-center rounded-md">
              <Image src={cardImage} alt="pic" />
            </div>


            <div className="flex-1 ">
              <p className="hidden lg:block xl:block 2xl:block text-black xl:text-[28px] 2xl:text-[28px] lg:text-[28px] text-[16px] font-roboto font-medium mb-4">
              Improve your love life, career, and overall well-being with our astrological guidance
              </p>
              <p className="lg:hidden xl:hidden 2xl:hidden text-black xl:text-[28px] 2xl:text-[28px] lg:text-[28px] text-[16px] font-roboto font-medium mb-4">
                Want to know more? Book your astrology consultation today.
              </p>
              <div className="flex">
                <button className="mt-4 bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white py-2 px-4 font-roboto lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px] font-medium rounded-md focus:ring-offset-2 tracking-[-0.6px]">
                 <Link href="/astrologer"> Talk to Astrologer</Link>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white ">

            <h1 className='text-[#6F2C91] playfair-display-heading text-[32px] font-bold tracking-[-0.96px] flex justify-center align-center'>Other Services</h1>
            <div className="lg:grid hidden  grid-cols-1 sm:grid-cols-2 font-[Roboto] lg:grid-cols-3 gap-6 px-6 md:px-16 mt-[42px] mb-[42px]">
              {services.map((service,index) => (
                <Link key={index} href={service.redirect}>
                <div
                  key={service.title}
                  className="bg-orange-50 text-black rounded-lg p-6 flex flex-col items-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]"
                >
                  <Image src={service.icon} alt="icons" />
                  <p className="text-lg font-medium text-center ">
                    {service.title}
                  </p>
                </div>
                </Link>

              ))}
            </div>
          </div>

          <div className="lg:hidden w-full max-w-xs mx-auto overflow-hidden relative">
            <div className="flex flex-col items-center ">

              <div className="flex gap-4 infinite-scroll">
                {[...services, ...services].map((service, index) => (
                  <Link key={index} href={service.redirect}>
                  <div key={index} className="w-40 flex-shrink-0">
                    <div className="p-4 h-40 bg-orange-50 text-black rounded-lg flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        className="w-16 h-16 object-contain"
                      />
                      <p className="text-center text-sm font-medium font-roboto">
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


    </div>
    </>
  )
}

export default Page;


export const services = [
  { title: "Birth Chart Generator", icon: cserviceImage7, redirect:"/birthchart" },
  { title: "Premium Matchmaking", icon: cserviceImage3,redirect:"https://rzp.io/rzp/qkBRsPJ" },
  { title: "Numerology Reading", icon: cserviceImage1 , redirect:"/numerology"},
];