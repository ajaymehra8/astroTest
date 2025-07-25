"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import back from "../../../public/back icon/back1.png";
import back1 from "../../../public/back icon/Back.png";
import filter from "../../../public/talktoastrologer/Filter.png";
import sort from "../../../public/talktoastrologer/Vector.png";
import search from "../../../public/talktoastrologer/search.png";
import close from "../../../public/talktoastrologer/cross.png";
import Link from "next/link";
import { fetchMetadataFiltersAPI, fetchUserBalance } from "@/services/services";
import { useAuth } from "@/hooks/useAuth";

const FilterComponent = ({ onApplyFilters }) => {
  const [selectedSortOption, setSelectedSortOption] = useState("EXPENSIVE");
  const [selectedGender, setSelectedGender] = useState("MALE");
  const [balance, setBalance] = useState(null);
    const { isLoggedIn } = useAuth();
  

  const [selectedExpertises, setSelectedExpertises] = useState([
    "VEDIC",
    "NUMEROLOGY",
    "NADI",
    "PALMISTRY",
    "TAROT",
    "VASTU",
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState([
    "HINDI",
    "ENGLISH",
    "ASSAMESE",
    "BENGALI",
    "GUJARATI",
    "KANNADA",
    "MALAYALAM",
    "MARATHI",
    "ODIA",
    "PUNJABI",
    "TAMIL",
    "TELEGU",
  ]);

  const handleApplyAll = () => {
    let payload = {
      pageNo: 1,
      pageSize: 20,
    };

    if (selectedFilters.sortFields.length > 0) {
      payload.sortBy = selectedFilters.sortFields[0];
    }

    if (selectedFilters.genders.length > 0) {
      payload.gender = selectedFilters.genders[0];
    }

    if (selectedFilters.expertises.length > 0) {
      payload.expertises = selectedFilters.expertises;
    }

    if (selectedFilters.languages.length > 0) {
      payload.languages = selectedFilters.languages;
    }

    // console.log("Payload in FiltersComponent:", payload);
    onApplyFilters(payload);
    setIsOpen(false);
  };

  const [sortOptions, setSortOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [dat, setDat] = useState();
  const [authToken, setAuthToken] = useState(null);
  const [width, setWidth] = useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchdata = async () => {
    try {
      const data = await fetchMetadataFiltersAPI(authToken);
      setDat(data);
      setSortOptions(data.sortFields);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    // if(isDropdownOpen){
    setIsDropdownOpen(false);
    // }
  };

  const sortdropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    setIsOpen(false);
  };

  useEffect(() => {
    if (isDropdownOpen && width < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isDropdownOpen, width]);

  const [activeTab, setActiveTab] = useState("languages");
  const [selectedFilters, setSelectedFilters] = useState({
    languages: [],
    expertises: [],
    genders: [],
    sortFields: [],
  });

  const currentFilters = dat?.[activeTab] || [];

  const handleCheckboxChange = (category, id) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[category]?.includes(id);
      const updatedFilters = {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== id)
          : [...(prev[category] || []), id],
      };
      console.log("Selected Filters:", updatedFilters);
      return updatedFilters;
    });
  };

  const clearAll = () => {
    setSelectedFilters({
      languages: [],
      expertises: [],
      genders: [],
      sortFields: [],
    });

    onApplyFilters({
      pageNo: 1,
      pageSize: 20,
    });

    setIsOpen(false);
  };

  const handleSortChange = (event, sortValue) => {
    const isChecked = event.target.checked;

    setSelectedFilters((prev) => {
      const updatedSortFields = isChecked ? [sortValue] : [];

      const updatedFilters = {
        ...prev,
        sortFields: updatedSortFields,
      };

      // console.log("Updated Sort Filters:", updatedFilters);

      let payload = {
        pageNo: 1,
        pageSize: 20,
        ...(updatedSortFields.length > 0 && { sortBy: updatedSortFields[0] }),
      };

      // console.log("Payload in Sort:", payload);
      onApplyFilters(payload);

      return updatedFilters;
    });
  };

  const applyFilters = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);


    useEffect(() => {
      const fetchBalance = async () => {
        const token = localStorage.getItem("token");
        
        if (!token || !isLoggedIn) return;
  
        try {
          const value = await fetchUserBalance(token);
          if (value && value.balance !== undefined) {
            setBalance(value.balance);
          }
        } catch (error) {
          console.error("Failed to fetch balance:", error);
          toast.error("Failed to fetch balance", {
            position: "bottom-right",
            autoClose: 3000,
          });
        }
      };
      
      fetchBalance();
    }, [isLoggedIn]);
  

  const formattedBalance =
    balance !== null ? `₹${balance.toFixed(2)}` : "₹0.00";
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4 lg:px-6 bg-white shadow-sm rounded-md">
      <div
       
        className="flex flex-row items-center w-full lg:w-auto lg:justify-center text-black font-semibold  mt-12 lg:mt-0"
      >
        <div className="flex items-center">
          <Link  href="/">
          <Image src={back} alt="back" className="lg:block ms-6" />
        </Link>
        </div>
        <div className="ml-2 lg:ml-4 text-[20px] lg:text-[32px] text-left text-[#67308C]">
          Talk to Astrologer
        </div>
      </div>

      <div className="flex flex-row  md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
       {isLoggedIn &&
       <div className="text-[#67308C] text-[16px] font-medium mt-4 lg:mt-0 ">
          <span className="hidden lg:block">Available Balance: {formattedBalance}</span>
        </div>
       }
        

      {isLoggedIn &&
      <button className="lg:px-4 px-2 lg:py-2 py-[0.20rem] ml-2 lg:ml-0   border border-[#67308C] text-[16px] font-medium text-[#67308C] rounded-md hover:bg-purple-100 mr-2 lg:mr-0">
          <Link href="/balance" className="lg:block hidden">
            {" "}
            Recharge
          </Link>
          <Link href="/balance" className="lg:hidden">
            {" "}
           {formattedBalance}
          </Link>
        </button>
      }
        

        <div className="flex">
          {/*  <div className="flex mr-2 -ml-6 items-center border border-[#67308C] rounded-md overflow-hidden lg:hidden w-[250px] h-[32px]">
            <input
              type="text"
              placeholder="Search astrologer"
              className="px-4 py-2 placeholder-[#67308C] placeholder:text-[14px] outline-none"
            />
            <button className="px-[0.6rem] min-h-[42px] bg-[#F2E4FC] text-[#67308C]">
              <Image src={search} alt="search" className="w-[16px] h-[16px]" />
            </button>
          </div>*/}

          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="flex gap-2 mr-2 items-center lg:px-4 lg:py-2  border border-[#67308C] text-[16px] font-medium text-[#67308C] rounded-md hover:bg-purple-100 h-[32px] w-[32px] lg:h-auto lg:w-auto "
            >
              <span className="hidden lg:block">Filter</span>
              <Image
                src={filter}
                alt="filter"
                className="h-[16px] w-[16px] lg:h-[20px] lg:w-[20px] ms-[0.4rem] lg:ms-0"
              />
            </button>
            {isOpen && (
              <div className="fixed inset-0 z-20 bg-white overflow-y-auto lg:absolute lg:right-0 lg:mt-2 mt-12 lg:inset-auto lg:w-[415px] xl:w-[415px] 2xl:w-[415px] lg:h-auto lg:rounded-md lg:shadow-lg border border-gray-300">
                <div className="px-4 py-3 flex justify-between items-center border-b">
                  <span className="font-semibold text-[24px] text-[#424242] ">
                    Filter
                  </span>

                  <button onClick={toggleDropdown}>
                    <div className="w-6 h-6">
                      <Image src={close} alt="close" />
                    </div>
                  </button>
                </div>
                <div className="flex gap-3 px-4 py-2">
                  <div className=" flex flex-col w-1/3 border-r  gap-2">
                    {["languages", "expertises", "genders"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`w-1/4 text-center py-2 font-medium ${
                          activeTab === tab
                            ? "border-b-2 border-[#6F2C91] text-[#6F2C91]"
                            : "text-gray-500"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div>
                    {currentFilters.length > 0 ? (
                      currentFilters.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center p-2 cursor-pointer"
                        >
                          {activeTab === "genders" ? (
                            <input
                              type="radio"
                              name="gender"
                              value={item.id}
                              checked={selectedFilters.genders[0] === item.id}
                              onChange={() =>
                                setSelectedFilters((prev) => ({
                                  ...prev,
                                  genders: [item.id],
                                }))
                              }
                              className="accent-[#6F2C91] form-radio h-4 w-4 text-[#6F2C91] border-gray-400 rounded-full"
                            />
                          ) : (
                            <input
                              type="checkbox"
                              checked={selectedFilters[activeTab]?.includes(
                                item.id
                              )}
                              onChange={() =>
                                handleCheckboxChange(activeTab, item.id)
                              }
                              className="accent-[#6F2C91] form-checkbox h-4 w-4 text-[#6F2C91] border-gray-400 rounded"
                            />
                          )}
                          <span className="ml-2 text-sm">{item.name}</span>
                        </label>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No data available</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between px-4 py-3 border-t border-gray-300">
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 text-sm font-medium text-[#67308C] border border-gray-300 rounded-md  hover:bg-gray-100"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={handleApplyAll}
                    className="px-6 py-2 lg:w-[253px] xl:w-[253px] 2xl:w-[253px] w-[169px] text-sm font-medium text-white bg-[#67308C] rounded-md hover:bg-purple-700"
                  >
                    Apply all
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative mr-2">
            <button
              className="flex items-center gap-2 border lg:px-4 lg:py-2 border-[#67308C] text-[16px] font-medium text-[#67308C] rounded-md hover:bg-purple-100 h-[32px] w-[32px] lg:h-auto lg:w-auto"
              onClick={sortdropdown}
            >
              <span className="hidden lg:block">Sort</span>
              <Image
                src={sort}
                alt="sort"
                className="h-[16px] w-[16px] lg:h-[20px] lg:w-[20px] ms-2 lg:ms-0"
              />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
                  onClick={sortdropdown}
                ></div>

                <div className="fixed lg:absolute inset-x-0 bottom-0 lg:bottom-auto lg:top-full lg:right-0 lg:left-auto mt-2 lg:w-[307px] w-full bg-white border rounded-t-[16px] lg:rounded-[16px] p-4 shadow-lg z-20">
                  <ul className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="px-4 text-[#424242] text-[24px] font-medium">
                        Sort by
                      </div>
                      <div className="w-6 h-6">
                        <Image src={close} onClick={sortdropdown} alt="close" />
                      </div>
                    </div>
                    <hr className="border-t border-gray-200" />
                    {sortOptions?.map((option) => (
                      <li
                        key={option.id}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          value={option.id}
                          checked={
                            selectedFilters?.sortFields?.includes(option.id) ||
                            false
                          }
                          onChange={(e) => handleSortChange(e, option.id)}
                          className="h-4 w-4 accent-[#6F2C91] border-[#67308C] checked:bg-[#67308C] checked:border-purple-600 focus:ring-purple-500"
                        />
                        <label className="text-gray-700">{option.name}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <div className=" mr-2 items-center border border-[#67308C] rounded-md overflow-hidden hidden lg:flex">
          <input
            type="text"
            placeholder="Search astrologer"
            className="px-4 py-2 placeholder-[#67308C] placeholder:text-[16px] outline-none"
          />
          <button className="px-4 min-h-[42px] bg-[#F2E4FC] text-[#67308C]">
            <Image src={search} alt="search" />
          </button>
        </div>
*/}
      </div>
    </div>
  );
};

export default FilterComponent;
