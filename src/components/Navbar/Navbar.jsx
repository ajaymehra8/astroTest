"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/navIcon/mainLogo.png";
import Link from "next/link";
import LoginRegisterModal from "../modals/LoginSignupModal/LoginRegisterModal";
import OTPVerificationModal from "../modals/LoginSignupModal/OTPVerificationModal";
import { useRouter } from "next/navigation";
import menuicon from "../../../public/navbar/menuicon.png";
import msg from "../../../public/navbar/message-circle.png";
import { fetchUserBalance, sendOTP } from "@/services/services";
import { useAuth } from "../../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

function Navbar() {
  const [step, setStep] = useState("");
  const [token, setToken] = useState("");
  const [mobile, setMobile] = useState("");
  const { login, logout } = useAuth();
  const [isTalkToAstrologerRoute, setIsTalkToAstrologerRoute] = useState(false);
  const router = useRouter(); 
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("About Us");
  const [requestid, setRequestid] = useState("");
  const { isLoggedIn } = useAuth();
  const [balance, setBalance] = useState(null);

  const pathname = usePathname();


  useEffect(() => {
  const pathToMenuMap = {
    "/talk-to-astrologer": "Talk to astrologer",
    "/balance": "Balance Recharge",
    "/my-profile": "My Profile",
    "/order-details": "Order History",
    "/#Our Services": "Our Services",
    "/#Online Pooja": "Online Pooja",
    "/#Why Us?": "Why Us?",
    "/#FAQs": "FAQs",
    "/#Contact Us": "Contact Us",
  };

  

  const matched = Object.entries(pathToMenuMap).find(([path]) =>
    pathname.startsWith(path.replace("#", ""))
  );

  if (matched) {
    setActive(matched[1]);
  }
}, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTalkToAstrologerRoute(
        window.location.pathname === "/talktoastrologer"
      );
    }
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

  
useEffect(() => {
  const handleBalanceUpdate = () => {
    const token = localStorage.getItem("token");
    if (!token || !isLoggedIn) return;

    const fetchBalance = async () => {
      try {
        const value = await fetchUserBalance(token);
        if (value?.balance !== undefined) {
          setBalance(value.balance);
        }
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    fetchBalance();
  };

  window.addEventListener("balanceUpdated", handleBalanceUpdate);

  return () => {
    window.removeEventListener("balanceUpdated", handleBalanceUpdate);
  };
}, [isLoggedIn]);


  const handleSendOTP = async (mobile) => {
    setMobile(mobile);

    try {
      const responseData = await sendOTP(mobile);
      setRequestid(responseData.requestId);
    } catch (error) {
      console.log(error);
    }
    setStep("otp");
  };

  const handleBack = () => {
    setStep("login");
  };

  const handleVerify = async (token) => {
    login(token);
    setStep("");
    toast.success("Logged In Successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      router.push("/talk-to-astrologer");
    }, 100);
  };

  const handleOpenLoginModal = () => {
    setStep("login");
  };

  const handleCloseModal = () => {
    setStep("");
  };

  const menuItems = [
    "Talk to astrologer",
    "Balance Recharge",
    "My Profile",
    "Order History",
    "Our Services",
    "Online Pooja",
    "Why Us?",
    "FAQs",
    "Contact Us",
    "Log Out",
  ];

  const handleOutsideClick = (e) => {
    if (e.target.id === "modalBackdrop") {
      setIsOpen(false);
    }
  };

  const formattedBalance = balance !== null ? `₹${balance.toFixed(2)}` : "₹0.00";

  return (
    <>
      <div className="h-[100px] hidden 2xl:block xl:block lg:block">
        <nav className="w-full fixed z-50 top-0 right-0 left-0 h-[100px] bg-[#6F2C91] py-1 px-20">
          <div className="w-full h-full flex items-center justify-between">
            <div className="flex items-center bg-white w-[243px] border rounded-lg p-1">
              <Link href="/" className="flex items-center ">
                {/* Logo Image */}
                <Image
                  src="https://cdn.astrovachan.com/website/logo.png"
                  alt="AstroVachan Logo"
                  width={60}
                  height={60}
                />

                {/* Text beside Logo */}
                <span className="text-2xl font-bold">
                  <span className="text-[#6F2C91]">Astro</span>
                  <span className="text-orange-500">Vachan</span>
                </span>
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-end items-center">
                {isLoggedIn ? (
                  <>
                    <span className="text-white mx-6">Balance: {formattedBalance}</span>
                    <Link href="/my-profile" className="text-white mx-6">
                      My Profile
                    </Link>
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        logout();
                        window.location.reload();
                        toast.success("Logged out successfully!", {
                          position: "bottom-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <button
                    className=" bg-orange-500 text-white px-4 py-2 rounded"
                    onClick={handleOpenLoginModal}
                  >
                    Login/Sign up
                  </button>
                )}

                {/*  <select
                                name="language"
                                className="cursor-pointer bg-transparent ml-2 text-[#ffffff] px-2 py-1 rounded"
                            >
                                <option value="ENG" selected>
                                    ENG
                                </option>
                                <option value="Hindi">Hindi</option>
                            </select> */}
              </div>
              <div className="flex gap-4 ">
                <Link href="/talk-to-astrologer" className="text-white">
                  Talk to astrologer
                </Link>

                <Link href="/balance" className="text-white">
                  Balance Recharge
                </Link>

                <Link href="/order-details" className="text-white">
                  Order History
                </Link>
                {/* <Link href="/#About Us" className="text-white">
                                    About Us
                                </Link> */}
                <Link href="/#Our Services" className="text-white">
                  Our Services
                </Link>
                <Link href="/#Online Pooja" className="text-white">
                  Online Pooja
                </Link>

                <Link href="/#Why Us?" className="text-white">
                  Why Us?
                </Link>

                <Link href="/#FAQs" className="text-white">
                  FAQs
                </Link>

                <Link href="/#Contact Us" className="text-white">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div
        id="responsivenavbar"
        className="block 2xl:hidden xl:hidden lg:opacity-0"
      >
        <div className="bg-white h-[55px] fixed top-0 w-full z-50">
          <nav className="flex items-center h-full px-4 justify-between">
            <div className="flex items-center">
              <Image
                onClick={() => setIsOpen(!isOpen)}
                src={menuicon}
                alt="Menu Icon"
                className="w-[24px] h-[24px] cursor-pointer"
              />
            </div>
            <div className="flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="flex items-center ">
                {/* Logo Image */}
                <Image
                  src="https://cdn.astrovachan.com/website/logo.png"
                  alt="AstroVachan Logo"
                  width={34}
                  height={42.1}
                />

                {/* Text beside Logo */}
                <span className="text-2xl font-bold">
                  <span className="text-[#6F2C91]">Astro</span>
                  <span className="text-orange-500">Vachan</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              {isTalkToAstrologerRoute ? (
                <div className="flex mr-3">
                  <button className="w-[36px] h-[24px] p-[4px] flex gap-2 mr-2 items-center lg:px-4 lg:py-2  border border-[#67308C] text-[16px] font-medium text-[#67308C] rounded-md hover:bg-purple-100 lg:h-auto lg:w-auto ">
                    <span className="text-black text-[12px] ms-[0.4rem]">
                      {formattedBalance}
                    </span>
                  </button>
                  <Image src={msg} alt="" className="h-[24px] w-[24px]" />
                </div>
              ) : (
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    if (isLoggedIn) {
                      await logout();
                      window.location.reload();
                    } else {
                      handleOpenLoginModal();
                    }
                  }}
                  className="text-[#6F2C91] pointer font-semibold text-[14px] bg-white px-4 py-2 rounded-md underline"
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
      {step === "login" && (
        <LoginRegisterModal
          onSendOTP={handleSendOTP}
          onClose={handleCloseModal}
        />
      )}
      {step === "otp" && (
        <OTPVerificationModal
          requestid={requestid}
          mobile={mobile}
          onVerify={handleVerify}
          onBack={handleBack}
          onClose={handleCloseModal}
        />
      )}

      {isOpen && (
        <div
          id="modalBackdrop"
          className="fixed inset-0 bg-black bg-opacity-50  mt-11 z-50"
          onClick={handleOutsideClick}
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="bg-purple-900 text-white w-80 p-5 rounded-lg shadow-lg relative"
          >
            <ul className="flex flex-col space-y-3 mt-4">
              <Link
                href="/talk-to-astrologer"
                onClick={() => setActive(menuItems[0])}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  active === menuItems[0]
                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                    : "hover:bg-purple-800"
                }`}
              >
                {menuItems[0]}
              </Link>

              <Link
                href="/balance"
                onClick={() => setActive(menuItems[1])}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  active === menuItems[1]
                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                    : "hover:bg-purple-800"
                }`}
              >
                {menuItems[1]}
              </Link>

              <Link
                href="/my-profile"
                onClick={() => setActive(menuItems[2])}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  active === menuItems[2]
                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                    : "hover:bg-purple-800"
                }`}
              >
                {menuItems[2]}
              </Link>
              <Link
                href="/order-details"
                onClick={() => setActive(menuItems[3])}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  active === menuItems[3]
                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                    : "hover:bg-purple-800"
                }`}
              >
                {menuItems[3]}
              </Link>
              {/* <a
                                href="/#About Us"
                                onClick={() => setActive(menuItems[1])}
                                className={`px-4 py-2 rounded-lg cursor-pointer ${active === menuItems[1]
                                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                                    : "hover:bg-purple-800"
                                    }`}
                            >
                                {menuItems[1]}
                            </a> */}
              <Link
                href="/#Our Services"
                onClick={() => setActive(menuItems[4])}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  active === menuItems[4]
                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                    : "hover:bg-purple-800"
                }`}
              >
                {menuItems[4]}
              </Link>

              <Link
                href={`/#Online Pooja`}
                onClick={() => setActive(menuItems[5])}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  active === menuItems[5]
                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                    : "hover:bg-purple-800"
                }`}
              >
                {menuItems[5]}
              </Link>

              <Link
                href={`/#${menuItems[6]}`}
                onClick={() => setActive(menuItems[6])}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  active === menuItems[6]
                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                    : "hover:bg-purple-800"
                }`}
              >
                {menuItems[6]}
              </Link>
              <Link
                href={`/#${menuItems[7]}`}
                onClick={() => setActive(menuItems[7])}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  active === menuItems[7]
                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                    : "hover:bg-purple-800"
                }`}
              >
                {menuItems[7]}
              </Link>
               <Link
                href={`/#${menuItems[8]}`}
                onClick={() => setActive(menuItems[8])}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  active === menuItems[8]
                    ? "font-bold text-orange-300 border-b-2 border-orange-300"
                    : "hover:bg-purple-800"
                }`}
              >
                {menuItems[8]}
              </Link>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;