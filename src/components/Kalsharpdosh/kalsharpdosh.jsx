'use client'
import Image from "next/image";
import logo from '../../../public/ZodiacSign/bannerkalsarpdosh.png'
import kalsarpdoshimage2 from '../../../public/ZodiacSign/kalsarpdoshimage2.png'
import logores from '../../../public/ZodiacSign/ID18responsive.png'
import image1 from '../../../public/ZodiacSign/kalsharpdoshimage1.png'
import cserviceImage3 from '../../../public/Home/3.png';
import cserviceImage7 from '../../../public/Home/7.png';
import cserviceImage8 from '../../../public/Home/8.png';
import cserviceImage6 from '../../../public/Home/6.png';
import map from '../../../public/ZodiacSign/map.png';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import KundliReport from "../Kundlireport/Kundlireport";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { getKalsarpReport, searchCities } from "@/services/services";



const Kalsarpdosh = () => {

  const [kalsarpdata, setKalsarpdata] = useState(null);



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
    
  };
  const [formData, setFormData] = useState({
    // name: "",
    // gender: "Male",
    dob: "",
    time: "",
    place: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // Validate form fields
    const fieldLabels = {
      // name: "Full Name",
      // gender: "Gender",
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
    const { lat, lon } = formData; 

    if (!lat || !lon) {
      toast({
        title: "Please select a valid place from the dropdown.",
        variant: "destructive",
        duration: 5000,
        className: "toast",
      });
    }

    if (unfilledFields.length > 0) {
      toast({
        title: `Please fill in ${unfilledFields.join(", ")}`,
        variant: "destructive",
        duration: 5000,
        className: "toast",
      });
      return;
    }

    try {

      const [hour, min] = formData.time.split(":").map(Number);
      const [year, month, day] = formData.dob.split("-").map(Number);
      const payload = {
        lat,
        lon,
        day,
        month,
        year,
        hour,
        min,
      };
  
      const data = await getKalsarpReport(payload);
      setKalsarpdata(data);




      // Handle success response
      toast({
        title: data.message || "Report generated!",
        variant: "success",
        duration: 5000,
        className: "toast",
        style: {
          backgroundColor: "#28a745",
          color: "white",
          fontSize: "18px",
        },
      });



    } catch (error) {
      // Handle error response
      toast({
        title: error.message || "An error occurred while submitting the form.",
        variant: "destructive",
        duration: 5000,
        className: "toast",
      });
    }
  };

  const basicDetails = kalsarpdata
    ? [
      { label: "Present", field: kalsarpdata.present.field, value: kalsarpdata.present.value },
      ...(kalsarpdata.name ? [{ label: "Name", field: kalsarpdata.name.field, value: kalsarpdata.name.value }] : []),
      ...(kalsarpdata.type ? [{ label: "Type", field: kalsarpdata.type.field, value: kalsarpdata.type.value }] : []),
      ...(kalsarpdata.house ? [{ label: "House", field: kalsarpdata.house.field, value: kalsarpdata.house.value }] : []),
      // Add more fields as needed
    ]
    : [];

  const planetaryPlacements = kalsarpdata
    ? [
      { label: "Summary", value: kalsarpdata.summary.value },
      ...(kalsarpdata.detail ? [{ label: "Detail", value: kalsarpdata.detail.value }] : []),
    ]
    : [];

  const headings = {
    mainTitle: "Kalsarp Dosh Report",
    table1: "Basic Details",
    table2: "Additional Information",
    birthchart: "Birth Chart",
  };




  return (
<> <Head>
    <title>AstroVachan: Consult expert astrologers online now</title>
    <meta 
      name="description" 
      content="Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey." 
    />
  </Head>

  

    <div className="h-full">
      <div className="lg:hidden xl:hidden 2xl:hidden relative w-full lg:top-[-95px] xl:top-[-95px] 2xl:top-[-95px] top-[55px] h-[243px] lg:h-[376px] xl:h-[376px] 2xl:h-[376px]">
        <Image src={logores} alt="numerology_reading" className="w-full h-full object-cover bg-black bg-opacity-50 cursor-pointer" />

        <div className="absolute bottom-[100px]  lg:left-[80px] xl:left-[80px] 2xl:left-[80px] left-[16px]  py-2 rounded-md ">
          <p className="text-white  font-bold playfair-display-heading lg:tracking-[-1.26px] xl:tracking-[-1.26px] 2xl:tracking-[-1.26px] tracking-[1px]  lg:text-[42px] xl:text-[42px] 2xl:text-[42px] text-[20px]">Kalsarp Dosh</p>
        </div>
      </div>

      <div className="hidden lg:block xl:block 2xl:block relative w-full lg:top-[-95px] xl:top-[-95px] 2xl:top-[-95px] h-[243px] top-[55px] lg:h-[376px] xl:h-[376px] 2xl:h-[376px]">
        <Image src={logo} alt="numerology_reading" className="w-full h-full object-cover bg-black bg-opacity-50 cursor-pointer" />

        <div className="absolute bottom-[100px]  lg:left-[80px] xl:left-[80px] 2xl:left-[80px] left-[16px]  py-2 rounded-md ">
          <p className="text-white  font-bold playfair-display-heading lg:tracking-[-1.26px] xl:tracking-[-1.26px] 2xl:tracking-[-1.26px] tracking-[1px]  lg:text-[42px] xl:text-[42px] 2xl:text-[42px] text-[20px]">Kalsarp Dosh</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto" >
        <div className="lg:mx-16 xl:mx-16 2xl:mx-16 mx-3 my-3">



          <div className=" flex space-x-2 lg:space-x-4 xl:space-x-4 2xl:space-x-4 flex-col xl:flex-row 2xl:flex-row lg:flex-row">
            {!kalsarpdata ? (
              <>
                <div className="flex-1 bg-white  pb-16 pt-16 lg:pt-0 xl:pt-0 2xl:pt-0 flex flex-col items-center justify-center lg:mr-5 xl:mr-5 2xl:mr-5">
                  <div className="w-full max-w-[600px] mx-auto">
                    <h1 className="lg:text-[28px] xl:text-[28px] 2xl:text-[28px] text-[20px] playfair-display-heading text-[#67308C] font-medium mb-4">
                      Navigating Life's Twists and Turns
                    </h1>
                    <Image src={image1} alt="image" className="h-[275px] w-[630px]  mb-[10px] rounded-xl" />
                    <p className="text-left text-[#000] lg:text-[19px] xl:text-[19px] 2xl:text-[19px] text-[14px] font-roboto font-normal">
                      Kalsarp Dosh, a specific planetary alignment in Vedic astrology, is believed to bring unique challenges.  This occurs when all seven planets are positioned between Rahu and Ketu.  Understanding the potential effects of Kalsarp Dosh on areas like career, relationships, and health can empower individuals to explore remedies and mitigate its impact for a more harmonious life.
                    </p>
                  </div>
                </div>

                <div className="flex-1 bg-white flex flex-col -ml-10">
                  <form onSubmit={handleSubmit} className="max-w-[630px] w-full mx-auto lg:bg-[#F2E4FC] xl:bg-[#F2E4FC] 2xl:bg-[#F2E4FC] lg:p-6 xl:p-6 2xl:p-6 lg:rounded-lg xl:rounded-lg 2xl:rounded-lg lg:border xl:border 2xl:border lg:border-[#9E6AC0] xl:border-[#9E6AC0] 2xl:border-[#9E6AC0] sm:p-5 md:p-6">
                    <h2 className="lg:text-[24px] xl:text-[24px] 2xl:text-[24px] text-[20px] mb-4 playfair-display-heading font-medium tracking-[-0.72px]">Enter Birth Details</h2>

                    {/* <div className="mb-4">
                <label htmlFor="name" className="block lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[14px] font-medium font-roboto tracking-[-0.48px] text-[#000]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md bg-[#F9F4FD]  focus:border-[#67308C] sm:text-sm text-[#000] font-roboto text-[14px] px-[12px] py-[10px]"
                  placeholder="Full Name"
                  value={formData.name}
                    onChange={handleInputChange}
                />
              </div> */}

                    {/* <div className="mb-4 relative">
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
             
                     
                     
                     <div  className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                       {isDropdownArrowOpen ? (
                         <FiChevronUp size={24} className="text-gray-500" />
                       ) : (
                         <FiChevronDown size={24} className="text-gray-500" />
                       )}
                     </div>
                     
                   </div>
                 </div> */}



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
                          className="w-full mt-1 p-2 border rounded-lg bg-[#F9F4FD]"
                          id='time'
                          value={formData.time}
                          onChange={handleInputChange}
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





                    <button
                      type="submit"
                      className="w-full mt-4 bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white py-2 px-4 rounded-md font-roboto font-medium lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[16px] focus:ring-offset-2 tracking-[-0.6px]"
                    >
                      Generate Kundli
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <>
                {kalsarpdata && (
                  <KundliReport
                    basicDetails={basicDetails} // Convert numbers object to an array
                    planetaryPlacements={planetaryPlacements} // Convert favorables object to an array
                    headings={headings}
                  />
                )}


              </>
            )}
          </div>

          <div className="max-w-[1280px] rounded-xl w-full py-6 md:py-8 lg:py-[41.41px] flex items-center bg-[#FCF8FF] mx-auto">

            <div className="lg:max-w-[220px] xl:max-w-[220px] 2xl:max-w-[220px] max-w-[67px] max-h-[164px] lg:mr-[32px] xl:mr-[32px] 2xl:mr-[32px] mr-[12px]  flex items-center justify-center rounded-xl">
              <Image src={kalsarpdoshimage2} alt="pic" />
            </div>


            <div className="flex-1">
              <p className="hidden lg:block xl:block 2xl:block text-black xl:text-[28px] 2xl:text-[28px] lg:text-[28px] text-[16px] font-roboto font-medium mb-4">
                Kalsarp Dosh? Find clarity, explore remedies, and empower yourself for a brighter future.
              </p>
              <p className="lg:hidden xl:hidden 2xl:hidden text-black xl:text-[28px] 2xl:text-[28px] lg:text-[28px] text-[16px] font-roboto font-medium mb-4">
                Kalsarp Dosh? Clear doubts, find remedies, brighter future now!
              </p>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-gradient-to-b from-[#67308C] to-[#9E6AC0] text-white lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px] font-medium rounded-md hover:bg-purple-700">
                  <Link href="/talk-to-astrologer"
                 // href="/online-astrology-consultation.html"
                  > Talk to Astrologer</Link>
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
                  <Image  width={64}
                    height={64} src={service.icon} alt="icons" />
                  <p className="text-lg  font-roboto font-medium text-center ">
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
                       width={64}
                       height={64}
                        src={service.icon}
                        alt={service.title}
                        className="w-16 h-16 object-contain"
                      />
                      <p className="self-center text-center text-sm font-medium font-roboto">
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

export default Kalsarpdosh;

export const services = [

  // { title: "Birth Chart Generator", icon: cserviceImage7 ,redirect:"/birthchart" },
  { title: "Online Pooja ", icon: "https://cdn.astrovachan.com/website/srv-pooja.jpg" ,redirect:"/#Online Pooja"},
  { title: "Numerology Reading", icon: cserviceImage6 ,redirect:"/numerology"},
  { title: "Premium matchmaking", icon: cserviceImage3 ,redirect:"https://rzp.io/rzp/qkBRsPJ"},

];

