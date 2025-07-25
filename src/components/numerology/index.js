"use client";
import React, { useState } from "react";
import Image from "next/image";
import cover from "../../../public/numeropage/numero.jpg";
import cover2 from "../../../public/numeropage/numero_phone.png";
import banner from "../../../public/numeropage/numbers.png";
import cardImage from "../../../public/numeropage/numeroi.jpg";
import cserviceImage1 from "../../../public/Home/1.png";
import cserviceImage3 from "../../../public/Home/3.png";
import cserviceImage7 from "../../../public/Home/7.png";
import cserviceImage8 from "../../../public/Home/8.png";
import logo from "../../../public/Home/6.png";
import birthchart from "../../../public/kundlireport/birthchart.png";
import KundliReport from "@/components/Kundlireport/Kundlireport";
import { useToast } from "@/hooks/use-toast";
import Head from "next/head";
import Link from "next/link";
import { fetchNumerologyDetails } from "../../services/services";

const Numerology = () => {
  const [formData, setFormData] = useState({ name: "", dob: "" });
  const [numerologyData, setNumerologyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldLabels = {
      name: "Full Name",
      dob: "Date of Birth",
    };

    const unfilledFields = Object.keys(formData).filter(
      (key) => formData[key]?.trim() === ""
    );

    if (unfilledFields.length > 0) {
      toast({
        title: `Please fill in ${unfilledFields.map((key) => fieldLabels[key]).join(", ")}`,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    const dob = new Date(formData.dob);
    const payload = {
      name: formData.name,
      day: dob.getDate(),
      month: dob.getMonth() + 1,
      year: dob.getFullYear(),
    };

    try {
      setLoading(true);
      const data = await fetchNumerologyDetails(payload);
      setNumerologyData(data);

      toast({
        title: "Report generated!",
        variant: "success",
        duration: 5000,
        style: {
          backgroundColor: "#28a745",
          color: "white",
          fontSize: "18px",
        },
      },

      );
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: error.message || "Something went wrong! Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>   

      <div>
        {/* Hero Section with Text Overlay */}
        <div className="relative w-full h-[259px]">
          <Image
            src=" https://cdn.astrovachan.com/website/rep-num.png"
            fill
            alt="numerology_reading"
            className="w-full h-full object-cover bg-black bg-opacity-50 cursor-pointer lg:block hidden"
          />
          <Image
            src="https://cdn.astrovachan.com/website/rep-num.png"
            fill
            alt="numerology_reading"
            className="w-full h-full object-cover bg-black bg-opacity-50 cursor-pointer lg:hidden block"
          />
          <div className="absolute bottom-[100px] left-[80px] px-4 py-2 rounded-md ">
            <p className="text-white font-bold playfair-display-heading tracking-[-1.26px] lg:text-[42px] text-[20px] -ml-20 lg:-ml-0 w-3 lg:w-auto">
              Numerology Reading
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[1280px] mx-auto">
          {!numerologyData ? (
            <>
              <div className="flex flex-col lg:flex-row gap-8 px-8 py-12">
                {/* Left Section */}
                <div className="flex-1 bg-white flex flex-col items-center justify-center">
                  <div className="w-full max-w-[600px] mx-auto">
                    <h1 className="lg:text-[28px] text-[20px] playfair-display-heading1 text-[#67308C] font-[500] mb-4 lg:tracking-[-0.84px] tracking-[0.4px]">
                      Unveiling the Hidden Language of Numbers
                    </h1>
                    <Image
                      src={banner}
                      alt="image"
                      className="lg:h-[246px] lg:w-full w-[328px] h-[146px]  object-cover mb-[26px] rounded-md cursor-pointer"
                    />
                    <p className="text-left text-[#000] lg:text-[18px] text-[14px] font-roboto font-[400]">
                      Numerology is the ancient art of interpreting the
                      vibrational meanings of numbers. By analyzing your birth
                      date, name, and other significant numbers in your life,
                      numerology can offer profound insights into your
                      personality, strengths, weaknesses, life path, and potential
                      challenges. Discover the hidden messages the universe is
                      sending you through the mystical language of numbers.
                    </p>
                  </div>
                </div>

                {/* Right Section (Form) */}
                <div className="flex-1 bg-white lg:p-8 p-0 flex flex-col justify-start items-start">
                  <form
                    className="w-full max-w-[630px] lg:mx-auto  lg:bg-[#F2E4FC] bg-white lg:p-6 p-0 rounded-lg lg:border border-[#9E6AC0]"
                    onSubmit={handleSubmit}
                  >
                    <h2 className="font-thin text-[24px] mb-4 playfair-display-heading1 tracking-[-0.72px]">
                      Enter Birth Details
                    </h2>

                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-[16px] font-medium font-roboto tracking-[-0.48px] text-[#000]"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="dob"
                        className="block text-[16px] font-medium font-roboto tracking-[-0.48px] text-[#000]"
                      >
                        Birth Date
                      </label>
                      <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md bg-[#F9F4FD] focus:border-[#67308C] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px]"
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full mt-4 bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white py-2 px-4 rounded-md font-roboto font-medium lg:text-[20px] text-[16px] focus:ring-offset-2 lg:tracking-[-0.6px] tracking-[-0.46px]"
                    >
                      {loading ? "Generating..." : "Generate Report"}
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            // Numerology Result Section (Table Format)
            <>
              {/* Header Section */}

              {numerologyData && (
                <KundliReport
                  basicDetails={Object.values(numerologyData.numbers || {})} // Convert numbers object to an array
                  planetaryPlacements={Object.values(numerologyData.favorables || {})} // Convert favorables object to an array
                  headings={{
                    mainTitle: "Numerology Report",
                    table1: "Numerology Numbers",
                    table2: "Favorable Attributes",
                    birthchart: "Birth Chart",
                  }}
                />
              )}

            </>
          )}

          {/* Expert Consultation Section */}
          <div className="max-w-[1380px] mt-10 lg:mb-[64px] w-full px-4 md:px-16 lg:px-[77.71px] py-6 md:py-8 lg:py-[41.41px] flex items-center space-x-4 bg-[#FCF8FF] mx-auto lg:rounded-sm">
            <div className="max-w-[220px] max-h-[164px] lg:mr-[32px]  flex items-center justify-center rounded-[12px]">
              <Image src={cardImage} alt="pic" className='w-[55px] h-[55px] lg:w-auto lg:h-auto  lg:ms-0 rounded-[12px]' />
            </div>

            <div className="flex-1 ">
              <p className="text-black xl:text-[32px] 2xl:text-[32px] lg:text-[32px] text-[16px] font-roboto font-medium mb-4">
                Want to know more? Connect with our expert astrologers.
              </p>
              <div className="flex gap-6">
                <button className="bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white lg:px-[28px] py-2 rounded-md font-medium lg:text-[20px] text-[10px] font-roboto tracking-[-0.6px] w-[120px] lg:w-auto">
                  <Link href="/talk-to-astrologer"
                 // href="/online-astrology-consultation.html"
                  > Talk to Astrologer</Link>
                </button>
              </div>
            </div>
          </div>
          {/* Other Services Section */}
          <h1 className="text-[#6F2C91] playfair-display-heading lg:text-[32px] text-[20px] font-bold lg:tracking-[-0.96px] tracking-[0.4px] flex justify-center items-center mt-10 mb-8">
            Our Services
          </h1>
          <div className="lg:grid hidden  grid-cols-1 sm:grid-cols-2 font-[Roboto] lg:grid-cols-3 gap-6 px-6 md:px-16 mt-[42px] mb-[42px]">
            {services.map((service, index) => (
              <Link key={index} href={service.redirect}>
                <div
                  key={service.title}
                  className="bg-orange-50 text-black rounded-lg p-6 flex flex-col items-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]"
                >
                  <Image width={64}
                    height={64} src={service.icon} alt="icons" />
                  <p className="text-lg font-medium text-center ">
                    {service.title}
                  </p>
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
  );
};

export default Numerology;
export const services = [
  { title: "Premium Matchmaking", icon: cserviceImage3, redirect: "https://rzp.io/rzp/qkBRsPJ" },
  // { title: "Birth Chart Generator", icon: cserviceImage7 ,redirect:"/birthchart" },
  { title: "Online Pooja ", icon: "https://cdn.astrovachan.com/website/srv-pooja.jpg", redirect: "/#Online Pooja" },

  { title: "Free Kundli", icon: cserviceImage1, redirect: "/kundli-generation" },
];
