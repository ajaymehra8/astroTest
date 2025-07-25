"use client";
import { sendOTP, verifyOTP } from "@/services/services";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useAuth } from "./useAuth";

export default function useLoginFlow() {
  const [step, setStep] = useState(""); // '', 'login', or 'otp'
  const [mobile, setMobile] = useState("");
  const [requestId, setRequestId] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [modalActive, setModalActive] = useState(true);
  const inputRefs = useRef([]);
  const router = useRouter();
  const { login } = useAuth();
  // Handle OTP input changes
  const handleChange = (value, index) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length <= 6) {
      const updatedOtp = digitsOnly.split("");
      setOtp(new Array(6).fill("").map((_, i) => updatedOtp[i] || ""));
    }

    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    console.log(
      updatedOtp
    );

    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpSingle = (rawValue) => {
    const digitsOnly = rawValue.replace(/\D/g, ""); // Remove non-digits
    const otpArray = new Array(6).fill("").map((_, i) => digitsOnly[i] || "");
    setOtp(otpArray);

    console.log(otp);

  };


  // Send OTP
  const handleSendOTP = async (phoneNumber) => {
    const trimmedPhone = phoneNumber?.trim();
    if (!trimmedPhone || trimmedPhone.length < 10) {
      console.error("Invalid phone number:", trimmedPhone);
      return;
    }

    try {

      const data = await sendOTP(trimmedPhone);

      setMobile(trimmedPhone);
      setRequestId(data.requestId);
      setStep("otp");
    } catch (error) {
      console.error("Send OTP Error:", error.message);
    }
  };


  // Verify OTP and store token
  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    console.log(enteredOtp);

    try {
      const data = await verifyOTP(requestId, enteredOtp); // should return { token: "..." }
      // localStorage.setItem("token", data.token);
      login(data.token);
      toast.success("Logged In Successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setModalActive(false);
      // router.push("/talk-to-astrologer");
      // window.location.reload();
    } catch (error) {
      console.error("OTP Verification Error:", error.message);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  };


  // Navigation handlers
  const handleBack = () => setStep("login");
  const handleOpen = () => setStep("login");
  const handleClose = () => setStep("");

  return {
    step,
    mobile,
    requestId,
    otp,
    inputRefs,
    handleSendOTP,
    handleVerify,
    handleBack,
    handleOtpSingle,
    handleOpen,
    handleClose,
    handleChange,
    setOtp,
    modalActive,
    setModalActive
  };
}
