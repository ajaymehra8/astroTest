
'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import cserviceImage1 from '../../../public/kundligeneration/Simplification.png';
import cserviceImage3 from '../../../public/Home/3.png';
import cserviceImage7 from '../../../public/Home/7.png';
import cserviceImage8 from '../../../public/Home/8.png';
import personsectionimg from '../../../public/ZodiacSign/kalsarpdoshimage2.png'
import image2 from '../../../public/kundligeneration/kundligenerationimage2.png'
import { useEffect } from 'react';
import Link from 'next/link';
import { getDays, getZodiacReport, getZodiacs } from '@/services/services';


const Zodiacsign = () => {
  const bannerimageUrl = "https://cdn.astrovachan.com/website/rep-zod.jpg";
  const [zodiacs, setZodiacs] = useState([]);
  const [days, setDays] = useState([]);
  const [zodiacdata, setZodiacdata] = useState([]);
  const [date,setDate] = useState("TOMORROW");
  const [selectedzodiac , setSelectedzodiac] = useState("ARIES");


  const fetchzodiacs = async () => {
    try {
      const data = await getZodiacs();
      setZodiacs(data);
    } catch (error) {
      console.error('Error fetching zodiac', error);
    }
  };

  const fetchdays = async () => {
    try {
      const data = await getDays();
      setDays(data);
    } catch (error) {
      console.error('Error fetching days', error);
    }
  };

  const fetchdata = async () => {
    try {
      const data = await getZodiacReport(date, selectedzodiac);
      setZodiacdata(data);
    } catch (error) {
      console.error('Error fetching zodiac data', error);
    }
  };

  useEffect(() => {
    fetchdays();
    fetchzodiacs();
    fetchdata();
  }, []);

  useEffect(() => {
    fetchdata();
  }, [date, selectedzodiac]);

  return (
    <>
      <div className="h-full">
        <div className="relative w-full xl:top-[-95px] lg:top-[-95px] 2xl:top-[-95px] h-[279px] lg:h-[376px] xl:h-[376px] 2xl:h-[376px]">
          <Image src={bannerimageUrl} fill alt="zodiac banner" className="w-auto h-auto object-cover bg-black bg-opacity-50 cursor-pointer" />
          {/* Overlay */}
          <div className="absolute bottom-[100px] w-[195px] lg:w-[473px] xl:w-[473px] 2xl:w-[473px] h-[49px] lg:left-[80px] xl:left-[80px] 2xl:left-[80px] left-[16px] py-2 rounded-md ">
            <p className="text-white  font-bold lg:tracking-[-1.26px] xl:tracking-[-1.26px] 2xl:tracking-[-1.26px] tracking-[1px] lg:text-[42px] xl:text-[42px] 2xl:text-[42px] text-[20px]">Zodiac Sign</p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto" >
          <div className="lg:mx-16 xl:mx-16 2xl:mx-16 mx-4 my-3">



            <div className="flex  lg:space-x-4 xl:space-x-4 2xl:space-x-4 flex-col xl:flex-row 2xl:flex-row lg:flex-row">

              <div className="max-w-[1280px]">
                <div className="p-4 rounded-md">
                  <div className="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row items-center justify-between">
                   <div>
                     <h1 className="text-[#6F2C91] text-[28px]  playfair-display-heading font-medium lg:mr-[200px] xl:mr-[200px] 2xl:mr-[200px]">Today's Readings</h1>
                   </div>
                    <div className="flex lg:flex-row xl:flex-row 2xl:flex-row flex-col  lg:space-x-4 xl:space-x-4 2xl:space-x-4">
                      <select onChange={(e) => setSelectedzodiac(e.target.value)} defaultValue={date} className="border h-[44px] lg:w-[304px] xl:w-[304px] 2xl:w-[304px] min-w-[300px] border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                        
                         
                          {zodiacs.map((zodiac, index) => (
                            <option key={index} className='text-black' value={zodiac.id}>
                              {zodiac.name}
                            </option>
                          ))}
                        

                      </select>
                      <select value={date} onChange={(e) => setDate(e.target.value)} className="mt-3 lg:mt-0 xl:mt-0 2xl:mt-0 h-[44px] border lg:w-[304px] xl:w-[304px] 2xl:w-[304px] min-w-[300px] border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                           
                          {days.map((day, index) => (
                            <option key={index} className='text-black' value={day.id}>
                              {day.name}
                            </option>
                          ))}
                        

                      </select>

                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col lg:flex-row xl:flex-row 2xl:flex-row space-x-4 ">
                  <div className="flex flex-col  h-[253px] items-center space-y-2">
                    <Image
                      src={zodiacdata.imageUrl}
                      alt="Zodiac image"
                      className="w-[197px]  bg-[#D7D7D7] h-[164px] rounded-xl"
                      width={197} height={253}
                    />
                    <h1 className="text-lg font-bold text-black">{zodiacdata.zodiac}</h1>
                    <p className="text-sm text-gray-600">{zodiacdata.date}</p>
                  </div>

                  <div className="flex-1 h-[366px] " >
                    <p className="mb-6">
                      <span className="font-bold text-[18px]">{zodiacdata.prediction}</span> 
                    </p>
                    
                  </div>
                </div>
              </div>



            </div>

            <div className="rounded-xl w-full py-6 md:py-8 lg:py-[41.41px] flex items-center space-x-4 bg-[#FCF8FF] mx-auto">

              <div className="lg:max-w-[220px] xl:max-w-[220px] 2xl:max-w-[220px] max-w-[67px] max-h-[164px] lg:mr-[32px] xl:mr-[32px] 2xl:mr-[32px] mr-[12px] flex items-center justify-center rounded-md">
                <Image src={personsectionimg} className='lg:max-w-[220px] xl:max-w-[220px] 2xl:max-w-[220px] max-w-[67px] h-[100px] ml-[48px] bg-[#D7D7D7]  rounded-xl' alt="pic" />
              </div>


              <div className="flex-1 ">
                <p className="hidden lg:block xl:block 2xl:block text-black xl:text-[28px] 2xl:text-[32px] lg:text-[32px] text-[16px] font-roboto font-medium mb-4">
                  Improve your love life, career, and overall well-being with our astrological guidance
                </p>
                <p className="lg:hidden xl:hidden 2xl:hidden text-black xl:text-[28px] 2xl:text-[28px] lg:text-[28px] text-[16px] font-roboto font-medium mb-4">
                  Improve your love life, career, and overall well-being with our astrological guidance
                </p>
                <div className="flex">
                  <button className="mt-4 w-[110px] lg:w-[228px] xl:w-[228px] 2xl:w-[228px] bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white py-2 px-4 font-roboto lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px] font-medium rounded-md focus:ring-offset-2 tracking-[-0.6px]">
                    <Link 
                  //  href="/online-astrology-consultation.html"
                  href="/talk-to-astrologer"
                    > Talk to Astrologer</Link>
                  </button>
                </div>
              </div>
            </div>

            <div className=" bg-white ">

              <h1 className='text-[#6F2C91] playfair-display-heading text-[32px] font-bold tracking-[-0.96px] flex justify-center align-center'>Other Services</h1>
              <div className="lg:grid hidden  grid-cols-1 sm:grid-cols-2 font-[Roboto] lg:grid-cols-3 gap-6  mt-[42px] mb-[42px]">
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
              <div className="flex flex-col items-center">

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

export default Zodiacsign;

export const services = [

  { title: "Birth Chart Generator", icon: cserviceImage7,redirect:"/birthchart" },
  { title: "Premium Matchmaking", icon: cserviceImage3, redirect:"https://rzp.io/rzp/qkBRsPJ" },
  { title: "Numerology Reading", icon: cserviceImage1, redirect:"/numerology" },
];