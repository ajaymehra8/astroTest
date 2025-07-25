"use client"
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import closeimage from '../../../../public/navbar/x.png';
import back from '../../../../public/back icon/Back.png';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const LoginRegisterModal = ({ onSendOTP, onClose }) => {
  const [mobile, setMobile] = useState('');
  const phoneInputRef = useRef(null);
  const modalRef = useRef(null);
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        console.log('Global Enter detected');
        handleSendOTP();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSendOTP = () => {
    const sanitized = mobile.replace(/\D/g, '');
    console.log('Sanitized mobile:', sanitized, 'Length:', sanitized.length);

    if (sanitized.length === 10) {
      onSendOTP(sanitized);
    } else {
      console.log("Number is invalid");

    }
  };
  useEffect(() => {
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, []);

  return (
    <div className="fixed z-50  inset-0 flex items-center justify-center bg-black  bg-opacity-75 " onClick={handleClickOutside}>
      <div className="bg-white flex flex-col items-center gap-8 w-full h-full max-w-full lg:max-h-full xl:max-h-full 2xl:max-h-full md:max-h-full sm:w-[468px] sm:h-fit lg:rounded-lg xl:rounded-lg 2xl:rounded-lg md:rounded-lg sm:pb-4 overflow-y-hidden" ref={modalRef}>

        <div className=" flex items-center lg:justify-between xl:justify-between 2xl:justify-between md:justify-between justify-start w-full h-[51px] lg:bg-[#662e8b] xl:bg-[#662e8b] 2xl:bg-[#662e8b] md:bg-[#662e8b] py-6 px-4 ">

          <button onClick={onClose}><Image src={back} alt="close" className="h-8 w-8 mr-2 lg:hidden xl:hidden 2xl:hidden md:hidden" /></button>
          <h2 className="text-lg font-semibold lg:text-white xl:text-white 2xl:text-white md:text-white text-center text-[#1C1C1C] font-roboto">Login/Register</h2>

          <button className="text-white" onClick={onClose} >
            <Image src={closeimage} alt="close" />
          </button>
        </div>

        <div className="w-[367px] flex flex-col  gap-6">
          {/*   <div className="flex flex-col justify-center items-center gap-6">
                        <button className="flex lg:w-[367px] w-[328px]  py-2 px-20 h-12 border border-[#67308C] items-center justify-center gap-1 text-[#67308C] rounded text-[14px] whitespace-nowrap">
                            <span className=""><FcGoogle className="w-[28px] h-[28px] lg:w-8 lg:h-8" /> </span> <p className="text-[16px] font-bold font-roboto">Sign Up with Google</p>
                        </button>

                        <button className="lg:w-[367px] w-[328px]  flex py-2 px-20 h-12 border border-[#67308C] items-center justify-center gap-1 text-[#67308C] rounded text-[14px] whitespace-nowrap">
                            <span className=""><RiFacebookCircleFill className="w-[28px] h-[28px] lg:w-8 lg:h-8" /> </span> <p className="text-[16px] font-bold font-roboto">Sign Up with Facebook</p>
                        </button>

                    </div>
                    <div className="w-full flex items-center justify-center ">
                        <div className="flex-1 border border-[#646464] "></div>
                        <p className="text-[14px] font-medium text-[#646464] font-roboto">or continue with</p>
                        <div className="flex-1 border border-[#646464] "></div>
                    </div>*/}
          <div className="flex flex-col  gap-3 w-full flex-grow items-center justify-center ">
            <p className="text-[14px] font-medium self-start ps-6 font-roboto">Phone no.</p>
            <div className="flex items-center  gap-2">
              <select className="bg-[#F2E4FC] text-black font-medium text-[16px] w-16 h-12 py-[12px] px-2 rounded-l ">
                <option value="91">+91</option>
              </select>
              <input
                ref={phoneInputRef}
                type="text"
                placeholder="Mobile no."
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setMobile(value);

                    const sanitized = value.replace(/\D/g, '');
                    if (sanitized.length === 10 && !/^(\d{10})$/.test(sanitized)) {
                      toast.info("Please enter a valid mobile number.", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendOTP();
                  }
                }}
                className="bg-[#F2E4FC] font-medium text-[16px]  lg:w-[290px] xl:w-[290px] 2xl:w-[290px] md:w-[290px] w-[250px] h-12 py-[8px] px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-[#67308C]"
              />
            </div>
          </div>
          <div className="flex flex-grow items-center justify-center sm:mt-4">
            <button
              onClick={handleSendOTP}
              className="font-normal text-[14px] bg-custom-gradient lg:bg-purple-600 xl:bg-purple-600 2xl:bg-purple-600 md:bg-purple-600 text-white lg:w-full xl:w-full 2xl:w-full md:w-full w-[328px] py-2 rounded"
            >
              Send OTP
            </button>
          </div>
          <p className="text-[14px] text-black font-normal text-center mt-2 hidden lg:block xl:block 2xl:block md:block">
            By proceeding, I agree to{" "}
            <Link href="/terms-and-conditions" className="text-[14px] text-[#4646E6] font-normal underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/terms-and-conditions" className="text-[#4646E6] text-[14px] underline font-normal">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
