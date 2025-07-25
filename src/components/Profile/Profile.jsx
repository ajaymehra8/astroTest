"use client";

import Image from "next/image";
import profile from "../../../public/Home/1.png";
import { FaStar } from "react-icons/fa";
import back1 from "../../../public/back icon/back1.png";
import call from "../../../public/talktoastrologer/phone.png";
import chat from "../../../public/talktoastrologer/message-circle.png";
import back2 from "../../../public/talktoastrologer/back2.png";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/Login/LoginModal";
import { initiateCall } from "@/services/services";
import Link from "next/link";
import { RechargeContext } from "@/lib/context/RechargeContext";
import LoginRegisterModal from "@/components/modals/LoginSignupModal/LoginRegisterModal";
import OTPVerificationModal from "@/components/modals/LoginSignupModal/OTPVerificationModal";
import { sendOTP } from "@/services/services";
import { toast } from "react-toastify";

const Details = () => {

  const router = useRouter();
  const [astrologer, setAstrologer] = useState(null);
  const [loadingg, setLoadingg] = useState(true);
  const authToken = localStorage.getItem("token");
  const { isLoggedIn, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtonLabel, setModalButtonLabel] = useState("Close");
  const { rechargeValue, setRechargeValue } = useContext(RechargeContext);
   const [step, setStep] = useState("");
  const [mobile, setMobile] = useState("");
  const [requestid, setRequestid] = useState("");
  const { login } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false); 


  
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
      
     await login(token);
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
      
    };
  
    const handleOpenLoginModal = () => {
      setShowPrompt(true);
    };
  
    const handleCloseModal = () => {
      setStep("");
    };
  
  
  
  
  
  

  useEffect(() => {
    try {
      const storedAstrologer = sessionStorage.getItem("astrologer");
      if (storedAstrologer) {
        const parsedAstrologer = JSON.parse(storedAstrologer);

        
        setAstrologer(parsedAstrologer);
      }
    } catch (error) {
      console.error("Error retrieving astrologer data:", error);
    } finally {
      setLoadingg(false);
    }
  }, []);


  if (loadingg) {
    return <p>Loading...</p>;
  }


  if (!astrologer) {
    return <p>No astrologer data found.</p>;
  }
  const handleCall = async () => {
    if (!astrologer.callEnabled) return;

    if (!loading && !isLoggedIn) {
      console.log("token not found");
      handleOpenLoginModal();
      return;
    }

    if (isLoggedIn) {
      try {
        const data = await initiateCall(astrologer.id, authToken);
        if (data && data?.action == "RECHARGE") {
          let indexVal = null;
          data?.msg?.split(" ").forEach((item, index) => {
            if (item == "more") {
              indexVal = index - 1;
            }
          });
          console.log(data?.msg?.split(" ")[indexVal],"from Profile page");

          setRechargeValue(data?.msg?.split(" ")[indexVal]);
          
        }
        setModalMessage(
          data.msg || `Call initiated with ${astrologer.fullName}`
        );
        setModalButtonLabel(
          data.action === "PROFILE" ? "My Profile" : data.action || "OK"
        );
        setModalVisible(true);
      } catch (error) {
        console.error("Full error object:", error);
        console.error("Error response data:", error?.response?.data);

        const code = error?.response?.data?.code;
        const msg = error?.response?.data?.msg || "Something went wrong.";
        const action = error?.response?.data?.action || "Close";

        if (code === "AST_OFF") {
          setModalMessage("Astrologer has turned consultations off for now");
          setModalButtonLabel("Close");
        } else {
          setModalMessage(msg);
          setModalButtonLabel(action);
        }

        setModalVisible(true);
      }
    }
  };

 






   const handleModalAction = (e) => {
    e.stopPropagation();
    if (modalButtonLabel === "OK" || modalButtonLabel === "Close") {
      console.log("Reload from profile");
      window.location.reload();
      setModalVisible(false);
    } else if (modalButtonLabel === "RECHARGE") {
      router.push(`/balance?amount=${rechargeValue}`);
    } else if (modalButtonLabel === "My Profile") {
      router.push("/my-profile");
    } else {
      setModalVisible(false); // fallback
    }
  };


  return (
    <div className="p-6 w-full mx-auto">
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-96 relative">
            {/* Cross Icon */}
            <button
              onClick={handleModalAction}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>


            {/* Message */}
            <p className="text-gray-800 mb-4 mt-6 font-roboto">
              {modalMessage}
            </p>


            {/* Divider */}
            <hr className="my-4" />


            {/* Right-Aligned Button */}
            <div className="flex justify-end">
             






              <button
                
                  onClick={(e) => handleModalAction(e)}
                  className="px-4 py-2 bg-custom-gradient text-white rounded hover:bg-blue-700"
              >
                {modalButtonLabel}
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="mt-[35px] lg:mt-0 flex items-center font-medium text-[14px] lg:text-[32px] xl:text-[32px] 2xl:text-[32px]   mb-4 text-purple-800">
        <span className="mr-4 cursor-pointer">
          <Image onClick={() => router.back()} src={back1} alt="back" />
        </span>
        <span className="text-[20px] lg:text-[32px] xl:text-[32px] 2xl:text-[32px] ">Details</span>
      </div>


      <div className=" lg:p-6 xl:p-6 2xl:p-6 p-0">
        <div className=" lg:py-14 xl:py-14 2xl:py-14 lg:px-16 xl:px-16 2xl:px-16 py-4 px-3 bg-[#F9F4FD] border rounded-lg border-[#67308C] flex-row flex  lg:items-center gap-6">
          <div className="w-[92px] h-[90px] md:w-40 md:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72 rounded-full overflow-hidden lg:mr-14 xlmr-14 2xl:mr-14 mr-0">
            <Image
              src={astrologer.profilePic}
              alt="Profile Picture"
              width={225}
              height={225}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="lg:text-[32px] xl:text-[32px] 2xl:text-[32px] text-[14px] font-bold text-[#67308C]">
                  {astrologer.fullName}
                </h2>
                <p className="lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px] text-black">
                  <span>Skills:</span>{" "}
                  <span className="text-[#474747] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px]">
                    {astrologer.skills}
                  </span>
                </p>
                <p className="lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px] text-black">
                  <span>Experience:</span>{" "}
                  <span className="text-[#474747] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px]">
                    {astrologer.experience}
                  </span>
                </p>
                <p className="lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px] text-black">
                  <span>Language:</span>{" "}
                  <span className="text-[#474747] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px]">
                    {astrologer.speaks}
                  </span>
                </p>
                <p className="lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px] text-black">
                  <span>Rate:</span>{" "}
                  <span className="text-[#474747] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px]">
                    {/* {astrologer.offerRate == "FREE"
                      ? "FREE"
                      : astrologer.actualRate} */}



            {astrologer.offerRate ? (
              <>
                <span className="text-[#67308C] font-semibold text-[12px] opacity-50">
                  <span className="lg:text-[20px] text-[16px] font-bold line-through">
                    ₹{astrologer.actualRate?.split(" ")[0]}
                  </span>
                  /min
                </span>
                {astrologer.offerRate == "FREE" ? (
                  <span className="text-[#67308C] font-semibold text-[12px] lg:text-[20px] ms-2">
                    Free
                  </span>
                ) : (
                  <span className="text-[#67308C] font-semibold text-[12px] lg:text-[20px] ms-2">
                    ₹{astrologer.offerRate?.split(" ")[0]}/min
                  </span>
                )}
              </>
            ) : (
              <span className="text-[#67308C] font-semibold text-[12px] lg:text-[20px]">
                ₹{astrologer.actualRate?.split(" ")[0]}/min
              </span>
            )}
          




                  </span>
                </p>
                <button className="lg:hidden whitespace-nowrap flex items-center justify-center px-2 py-2 text-[10px] rounded-md bg-[#67308C] text-white mt-2">
  <Link href={astrologer?.poojaLink || "#"}>
    <span>Online Pooja</span>
  </Link>
</button>
              </div>
              {/* <span className="text-[#B20000] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[10px] font-medium">Currently Offline</span> */}
            </div>
            <div className="hidden mt-4 lg:flex xl:flex 2xl:flex gap-4">
              <button
                onClick={handleCall}
                className={`items-center flex justify-between px-4 py-2 h-[42px] w-[90px] text-[16px] rounded-md ${
                  astrologer.callEnabled
                    ? "bg-[#67308C] text-white"
                    : "bg-gradient-to-r from-[#67308C] to-[#9E6AC0] cursor-no-drop opacity-50 text-white"
                }`}
              >
                <Image src={call} alt="call" />
                Call
              </button>

              <button
                className={`items-center flex justify-between px-4 py-2 h-[42px] w-[90px] text-[16px] rounded-md ${
                  astrologer.chatEnabled
                    ? "bg-[#67308C] text-white"
                    : "bg-gradient-to-r from-[#67308C] to-[#9E6AC0] cursor-no-drop opacity-50 text-white"
                }`}
              >
                <Image src={chat} alt="Chat icon" width={20} height={20} />
                <span>Chat</span>
              </button>
              <button className="whitespace-nowrap items-center flex justify-between px-4 py-2 h-[42px] w-[125px] text-[16px] rounded-md bg-[#67308C] text-white ">
                <Link href={astrologer?.poojaLink || "#"}>
                  <span>Online Pooja</span>
                </Link>
              </button>
            </div>


            <div className="lg:hidden xl:hidden 2xl:hidden fixed bottom-0 left-0 right-0 flex gap-4 p-4">
              <button
                onClick={handleCall}
                className={`flex items-center justify-center gap-2 py-2 h-12 w-1/2 text-base rounded-md ${
                  astrologer.callEnabled
                    ? "bg-[#67308C] text-white"
                    : "bg-gradient-to-r from-[#67308C] to-[#9E6AC0] cursor-no-drop opacity-50 text-white"
                }`}
                disabled={!astrologer.callEnabled}
              >
                <Image src={call} alt="call" width={20} height={20} />
                <span>Call</span>
              </button>

              <button
                className={`flex items-center justify-center gap-2 py-2 h-12 w-1/2 text-base rounded-md ${
                  astrologer.chatEnabled
                    ? "bg-[#67308C] text-white"
                    : "bg-gradient-to-r from-[#67308C] to-[#9E6AC0] cursor-no-drop opacity-50 text-white"
                }`}
                disabled={!astrologer.chatEnabled}
              >
                <Image src={chat} alt="Chat icon" width={20} height={20} />
                <span>Chat</span>
              </button>
            </div>

            {/* {showLoginModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative z-10">
                  <LoginModal onClose={() => setShowLoginModal(false)} />
                </div>

              </div>
            )} */}


{showPrompt && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="relative p-6 bg-gray-100 rounded-lg shadow-md text-center w-[320px] sm:w-[400px]">
      {/* Close Button */}
      <button
        className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-gray-800"
        onClick={() => setShowPrompt(false)}
      >
        ×
      </button>

      <h2 className="text-xl tracking-[-0.6px] font-[500] leading-[24px] mb-4 text-[#151514] font-roboto">
        Please log in/sign up to continue!
      </h2>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowPrompt(false); // Close prompt
          setStep("login"); // Open login modal
        }}
        className="bg-gradient-to-b from-[#67308C] to-[#9E6AC0] font-roboto w-full px-4 py-2 text-white rounded-md hover:bg-[#682988] transition-colors"
      >
        Login / Signup
      </button>
    </div>
  </div>
)}



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


         




          </div>
        </div>


        <div className="flex flex-col-reverse lg:flex-row xl:flex-row 2xl:flex-row mt-4">
          <div className="mt-[10px] lg:mt-0 w-full lg:w-[416px] flex flex-col gap-4 border rounded-lg border-[#67308C] py-5 px-4 lg:px-7 lg:h-36">
            <h3 className="lg:text-[24px] xl:text-[24px] 2xl:text-[24px] text-[14px] font-semibold text-[#67308C]">
              Ratings & Reviews
            </h3>

            <div className="w-full h-auto flex items-center gap-4">
              <p className="text-3xl lg:text-[40px] flex items-center justify-center rounded h-full w-24 lg:w-[126px] text-center bg-[#F2E4FC] font-semibold orbitron-montserrat text-[#67308C]">
                {astrologer.rating}
              </p>
              <div>
                <p className="text-sm lg:text-[20px] text-black font-semibold">
                  {" "}
                  {astrologer.rating >= 4.5
                    ? "Excellent"
                    : astrologer.rating >= 4
                    ? "Very Good"
                    : astrologer.rating >= 3
                    ? "Good"
                    : astrologer.rating >= 2
                    ? "Average"
                    : "No Rating yet"}
                </p>
              </div>
            </div>
          </div>

          <div className=" lg:w-[80%] xl:w-[80%] 2xl:w-[80%] w-full lg:p-4 xl:p-4 2xl:p-4 p-0 flex flex-col gap-4">
            <div className="border rounded-lg border-[#67308C] w-full lg:py-[19px] xl:py-[19px] 2xl:py-[19px] py-[10px] lg:px-[27px] xl:px-[27px] 2xl:px-[27px] px-[15px] ">
              <h3 className="lg:text-[24px] xl:text-[24px] 2xl:text-[24px] text-[14px] font-semibold text-[#67308C]">
                About
              </h3>
              <p className="mt-2 font-medium lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[12px] text-[#474747]">
                {astrologer.bio}
              </p>
            </div>
            <Link
              className=" flex justify-between items-center border rounded-lg border-[#67308C] w-full py-[19px] px-[27px] "
              href="/talk-to-astrologer"
            >
              <button className="text-[#67308C] lg:text-[24px] xl:text-[24px] 2xl:text-[24px] text-[14px] hover:underline flex flex-row items-center">
              View More Astrologers
              </button>
              <span className="ml-2 border-[#F2E4FC] rounded-full ">
                <Image src={back2} alt="back2" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
