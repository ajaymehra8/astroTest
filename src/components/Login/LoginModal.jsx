"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useLoginFlow from "@/hooks/useLoginFlow";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import closeImage from '../../../public/navbar/x.png';
import backIcon from '../../../public/back icon/Back.png';
import arrowRightIcon from '../../../public/back icon/arrow-right.png';
import { useRouter } from "next/navigation";


export default function LoginModal() {
  const {
    step,
    handleSendOTP,
    handleVerify,
    handleBack,
    handleOpen,
    handleClose,
    mobile,
    otp,
    handleChange,
    handleKeyDown,
    modalActive
    //inputRefs
  } = useLoginFlow();

  const [input, setInput] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(true);
  const router = useRouter();
  const handleFullClose = () => {
    setShowLoginPrompt(false);
    router.push("/talk-to-astrologer");
  };
  const inputRefs = useRef([]);
  useEffect(() => {
    if (inputRefs.current.length > 0) {
      if (step === "login") {
        inputRefs.current[0]?.focus();
      } else if (step === "otp" && inputRefs.current[0]) {
        inputRefs.current[0]?.focus();
      }
    }
  }, [step]);

  useEffect(() => {
    if (step === "login") {
      inputRefs.current[0]?.focus();
    } else if (step === "otp") {
      inputRefs.current[0]?.focus();
    }

    const handleEnterPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission behavior
        if (step === "login") {
          handleSendOTP(input);
        } else if (step === "otp") {
          handleVerify();
        }
      }
    };

    window.addEventListener("keydown", handleEnterPress);

    return () => {
      window.removeEventListener("keydown", handleEnterPress);
    };
  }, [step, input, handleSendOTP, handleVerify]);

  const [tempOtp, setTempOtp] = useState()
  const handleHere = (e) => {
    const value = e.target.value; 
    setTempOtp(value);


    if (tempOtp.length + 1 === 6) {
      setTempOtp(value)
      handleChange(value)
    }
  }
  return (
    <>
      {modalActive && (
        <>
          {showLoginPrompt && (
            <div className="flex items-center justify-center min-h-screen">
              <div className="relative p-6 bg-gray-100 rounded-lg shadow-md text-center w-[320px] sm:w-[400px]">

                {/* CLOSE BUTTON */}
                <button
                  className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-gray-800"
                  onClick={handleFullClose}
                >
                  ×
                </button>

                <h2 className="text-xl tracking-[-0.6px] font-[500] leading-[24px] mb-4 text-[#151514] font-roboto">
                  Please log in/sign up to continue!
                </h2>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                  className="bg-gradient-to-b from-[#67308C] to-[#9E6AC0] font-roboto w-full px-4 py-2 bg-custom-gradient text-white rounded-md hover:bg-[#682988] transition-colors "
                >
                  Login / Signup
                </button>
              </div>
            </div>
          )}
          {step && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-lg w-full max-w-sm shadow-xl relative">

                {/* CLOSE BTN - top right */}
                <button className="absolute top-2 right-3 text-xl font-bold" onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}>
                  ×
                </button>

                {step === "login" && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white flex flex-col items-center w-full max-w-[468px] sm:rounded-lg md:rounded-lg sm:pb-4 md:pb-4 relative">


                      {/* Header */}
                      <div className="flex items-center justify-between w-full h-[51px] bg-[#662e8b] px-4">
                        <button><Image src={backIcon} alt="back" className="h-8 w-8  hidden" /></button>
                        <h2 className="text-lg font-semibold text-white font-roboto self-center">Login/Register</h2>
                        <button onClick={handleFullClose}><Image src={closeImage} alt="close" /></button>
                      </div>

                      {/* Social Buttons */}
                      <div className="w-[328px] sm:w-[367px] md:w-[367px] flex flex-col gap-6 mt-8">
                        {/*  <div className="flex flex-col items-center gap-4">
                      <button className="flex items-center gap-2 border border-[#67308C] px-4 py-2 rounded text-[#67308C] w-full">
                        <FcGoogle className="w-6 h-6" />
                        <p className="text-[16px] font-bold font-roboto">Sign Up with Google</p>
                      </button>
                      <button className="flex items-center gap-2 border border-[#67308C] px-4 py-2 rounded text-[#67308C] w-full">
                        <RiFacebookCircleFill className="w-6 h-6" />
                        <p className="text-[16px] font-bold font-roboto">Sign Up with Facebook</p>
                      </button>
                    </div>

                    {/* OR */}
                        {/*  <div className="flex items-center gap-2 text-[#646464] text-sm font-medium font-roboto">
                      <div className="flex-1 border" />
                      <p>or continue with</p>
                      <div className="flex-1 border" />
                    </div>

                    {/* Phone Input */}
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium ps-2 font-roboto">Phone no.</label>
                          <div className="flex gap-2">
                            <select className="bg-[#F2E4FC] text-black text-sm font-medium w-16 h-12 rounded-l px-2 ">
                              <option value="91">+91</option>
                            </select>
                            <input
                              type="number"
                              placeholder="Mobile no."
                              value={input}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d{0,10}$/.test(val)) setInput(val);
                              }}
                              ref={(el) => (inputRefs.current[0] = el)}
                              className="bg-[#F2E4FC] text-sm font-medium w-full h-12 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-[#67308C]"
                            />
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendOTP(input);
                          }}
                          className="mt-4 mb-4 bg-custom-gradient text-white py-2 rounded w-full text-sm"
                        >
                          Send OTP
                        </button>

                        <p className="text-xs text-center mt-2 hidden lg:block xl:block 2xl:block md:block text-black font-roboto">
                          By proceeding, I agree to{" "}
                          <a href="/terms-and-conditions" className="underline text-[#4646E6]">Terms & Conditions</a> and{" "}
                          <a href="/terms-and-conditions" className="underline text-[#4646E6]">Privacy Policy</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* OTP Modal */}
                {step === "otp" && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white w-full max-w-[468px] h-fit pb-6 sm:rounded-lg flex flex-col items-center">

                      {/* OTP Header */}
                      <div className="flex items-center justify-between w-full h-[60px] bg-[#662e8b] px-4 mb-6">
                        <button onClick={(e) => {
                          e.stopPropagation();
                          handleBack();
                        }}>
                          <Image src={arrowRightIcon} alt="back" className="block xl:block 2xl:block md:block" />
                        </button>
                        <h2 className="text-[18px] font-semibold text-[#FFFFFF] hidden lg:block">Verify Phone</h2>
                        <h2 className="text-xl font-semibold text-[#FFFFFF] lg:hidden">Login/Register</h2>
                        <div />
                      </div>

                      <strong className="text-[16px] text-black mb-6 text-center font-medium font-roboto">
                        OTP sent to +91 {mobile}
                      </strong>

                      {/* OTP Inputs */}
                      <div className="flex gap-2 justify-center mb-4">
                        <input
                          type="text"
                          maxLength={6}
                          value={tempOtp} // Combine array to show in one input
                          onChange={handleHere} // No index needed
                          placeholder="Enter OTP"
                          className="bg-[#F2E4FC] text-sm font-medium w-full h-12 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-[#67308C]"

                        />
                      </div>
                      <button
                        onClick={handleVerify}
                        className="bg-custom-gradient text-white py-2 rounded-lg w-[300px]  text-[16px] font-medium hover:bg-purple-700 transition"
                      >
                        Verify
                      </button>

                      <p className="text-xs text-black mt-4 font-roboto">
                        Resend OTP is available in <span className="font-bold">58sec</span>{" "}
                        <span className="text-blue-600 underline cursor-pointer">Resend OTP</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
