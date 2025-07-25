'use client'
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import back from '../../../../public/back icon/arrow-right.png'
import back2 from '../../../../public/back icon/Back.png'
import { sendOTP, verifyOTP } from "@/services/services";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import useLoginFlow from "@/hooks/useLoginFlow";


const OTPVerificationModal = ({ mobile, onVerify, onBack, requestid }) => {



  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);
  const [token, setToken] = useState("");
  const router = useRouter();

  const [counter, setCounter] = useState(59);
  const [isActive, setIsActive] = useState(false);
  const [requestID, setRequestID] = useState(requestid);

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setIsActive(true);
    }
    return () => clearTimeout(timer);
  }, [counter]);


  const handleResend = async () => {
    if (isActive) {
      try {

        setCounter(60);
        setIsActive(false);

        const data = await sendOTP(mobile);

        setRequestID(data.requestId);
        console.log('New requestId:', data.requestId);

        toast.success('OTP resent successfully!');
      } catch (error) {
        console.error('Error resending OTP:', error);
        toast.error('Failed to resend OTP');
        setIsActive(true);
      }
    }
  };

  useEffect(() => {
    // Focus the first OTP input box when the modal opens
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  const handleChange = (e) => {
    // Only allow one digit and ensure it's a number
    // const digit = value.slice(-1); // take the last digit only

    // if (!/^\d?$/.test(digit)) return;

    // const newOtp = [...otp];
    // newOtp[idx] = digit;
    // setOtp(newOtp);

    // // Auto-focus next box if filled
    // if (digit && inputRefs.current[idx + 1]) {
    //   inputRefs.current[idx + 1].focus();
    // }

    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);

    // Auto-submit when 6 digits entered

  };

  const handleKeyDown = (e, index) => {
    // if (e.key === "Backspace" && index > 0 && otp[index] === "") {
    //   inputRefs.current[index - 1].focus();
    // }
    // if (e.key === "Enter") {
    //   handleVerify();
    // }

    if (
      !/[0-9]/.test(e.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handleVerify = async () => {
    // const otpValue = otp.join("");

    // if (otpValue.length < 6 || otp.includes("")) {
    //   toast.error("Please enter the complete 6-digit OTP.");
    //   return;
    // }

    if (otp.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    try {
      const responseData = await verifyOTP(requestID, otp);

      setToken(responseData.token);
      localStorage.setItem("token", responseData.token);
      console.log("Token saved to localStorage");

      onVerify(responseData.token);
      // router.push("/");
    } catch (error) {
      console.log("OTP verification error:", error);
      toast.error("Invalid OTP. Please try again.");
      localStorage.removeItem("token");
    }
  };

  return (
    <div className=" fixed z-50  inset-0 flex items-center justify-center min-h-screen bg-black  bg-opacity-75">
      <div className="flex flex-col items-center w-full bg-white md:w-[468px] md:max-h-[425px] md:rounded-lg shadow-lg pb-4 ">

        <div className=" flex items-center text-[#ffffff] md:rounded-t-lg lg:justify-between justify-normal w-full h-[60px] lg:bg-[#662e8b] bg-[#F8F8F8] py-6 px-4 mb-8">

          <button
            onClick={onBack}
            className=" text-2xl font-medium  flex items-center"
          >
            <Image src={back2} alt="back" className="h-8 w-8 mr-2 lg:hidden " />
            <Image src={back} alt="back" className="lg:block hidden" />
          </button>

          <h2 className="text-[18px] font-semibold text-[#FFFFFF] text-center hidden lg:block ">
            Verify Phone
          </h2>
          <h2 className="text-xl font-semibold text-left lg:hidden justify-start flex text-[#1C1C1C] font-roboto">
            Login/Register
          </h2>
          <div></div>
        </div>

        <strong className="text-center text-[16px] font-medium text-black mb-9 self-center ps-5 font-roboto">
          OTP sent to +91 {mobile}
        </strong>


        <div className="flex gap-2 justify-center mb-4">
          {/* {otp.map((_, idx) => (
            <input
              key={idx}
              type="number"
              maxLength={1}
              value={otp[idx]}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputRefs.current[idx] = el)}
              className="w-12 h-12 border rounded-lg text-center text-lg font-medium bg-[#F2E4FC] focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          ))} */}

          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={6}
            value={otp}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter 6-digit OTP"
            autoFocus
          />
        </div>

        <div className="">
          <button
            onClick={handleVerify}
            className="bg-custom-gradient text-white text-[16px] lg:w-[367px] w-[328px] py-2 rounded-lg font-medium hover:bg-purple-700 transition "
          >
            Verify
          </button>





          <p className="text-xs font-normal text-black mt-4 font-roboto">
            {isActive ? (
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={handleResend}
              >
                Resend OTP
              </span>
            ) : (
              <>
                Resend OTP is available in{" "}
                <span className="font-bold">{counter} sec</span>
                <span className="text-gray-400 ps-2">Resend OTP</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;
