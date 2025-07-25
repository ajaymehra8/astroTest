"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

import call from "../../../../public/talktoastrologer/phone.png";
import chat from "../../../../public/talktoastrologer/message-circle.png";
import { FaRegStar } from "react-icons/fa";
import { useContext, useState } from "react";
import cross from "../../../../public/talktoastrologer/cross.png";
import endbutton from "../../../../public/talktoastrologer/endbutton.png";
import Waveform from "../../../../public/talktoastrologer/Waveform.png";
import { initiateCall } from "@/services/services";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/Login/LoginModal";
import { useRouter } from "next/navigation";
import { RechargeContext } from "@/lib/context/RechargeContext";
import LoginRegisterModal from "@/components/modals/LoginSignupModal/LoginRegisterModal";
import OTPVerificationModal from "@/components/modals/LoginSignupModal/OTPVerificationModal";
import { sendOTP } from "@/services/services";
import { toast } from "react-toastify";

const AstrologerCard = ({
  fullName,
  profilePic,
  rating,
  skills,
  experience,
  speaks,
  actualRate,
  offerRate,
  id,
  free,
  userGender,
  callEnabled,
  chatEnabled,
  onCardClick,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [availablebalance, setAvailablebalance] = useState(1000);
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, loading } = useAuth();
  const authToken = localStorage.getItem("token");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtonLabel, setModalButtonLabel] = useState("Close");
  const { rechargeValue, setRechargeValue } = useContext(RechargeContext);
  const [step, setStep] = useState("");
  const [mobile, setMobile] = useState("");
  const [requestid, setRequestid] = useState("");
  const { login } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);

  const router = useRouter();
  const usertype = "user";

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
    setTimeout(() => {
      router.push("/talk-to-astrologer");
    }, 100);
  };

  const handleOpenLoginModal = () => {
    setShowPrompt(true);
    // setStep("login");
  };

  const handleCloseModal = () => {
    setStep("");
  };

  const handleCall = async () => {
    if (!callEnabled) return;

    if (!loading && !isLoggedIn) {
      handleOpenLoginModal();
      return;
    }

    if (isLoggedIn) {
      try {
        const data = await initiateCall(id, authToken);
        if (data && data?.action == "RECHARGE") {
          let indexVal = null;
          data?.msg?.split(" ").forEach((item, index) => {
            if (item == "more") {
              indexVal = index - 1;
            }
          });
          console.log(
            data?.msg?.split(" ")[indexVal],
            "Amount in card, rechargeValue"
          );
          setRechargeValue(data?.msg?.split(" ")[indexVal]);
        }
        console.log(data.msg);
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
      console.log("reloading her modal");
      window.location.reload();
      setModalVisible(false);
    } else if (modalButtonLabel === "RECHARGE") {
      router.push(`/balance?amount=${rechargeValue}`);
    } else if (modalButtonLabel === "My Profile") {
      router.push("/my-profile");
    } else {
      setModalVisible(false);
    }
  };

  return (
    <div
      key={id}
      className=" lg:max-w-[630px] max-w-[338px]  bg-[#F9F4FD] border border-[#67308C] rounded-lg lg:py-6 py-2  px-8 mx-auto shadow-sm flex gap-5  justify-center items-center "
    >
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-96 relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalVisible(false);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            <p className="text-gray-800 mb-4 mt-6 font-roboto">
              {modalMessage}
            </p>

            <hr className="my-4" />

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
      <div
        onClick={onCardClick}
        className="w-auto  h-auto flex flex-col gap-5 items-center justify-center "
      >
        <Image
          src={profilePic}
          width={134}
          height={138}
          alt={fullName}
          className="lg:w-[138px] lg:h-[134px] w-[66px] h-[68px] object-cover rounded-full overflow-hidden"
        />
        <div className="flex cursor-pointer">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="lg:w-5 lg:h-5 w-[10px] h-[10px] pe-4">
              {index < rating ? (
                <FaStar className="text-yellow-400" />
              ) : (
                <FaRegStar className="text-yellow-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={onCardClick}
        className="flex w-[401px] h-full flex-col justify-between"
      >
        <div className="flex justify-between items-center">
          <h2 className="lg:text-[20px] text-[18px] font-semibold text-[#67308C]">
            {fullName}
          </h2>
          {!free && (
            <span className="text-[#CD0000] lg:text-[20px] text-[12px] font-semibold">
              Busy
            </span>
          )}
        </div>

        <p className="text-[16px] text-black">
          <span className="lg:text-[16px] text-[12px]">Skills:</span>{" "}
          <span className="text-[#646464] lg:text-[16px] text-[12px]">
            {skills}
          </span>
        </p>
        <p className="text-[16px] text-black">
          <span className="lg:text-[16px] text-[12px]">Experience:</span>{" "}
          <span className="text-[#646464] lg:text-[16px] text-[12px]">
            {experience}
          </span>
        </p>
        <p className="text-[16px] text-black">
          <span className="lg:text-[16px] text-[12px]">Language:</span>{" "}
          <span className="text-[#646464] lg:text-[16px] text-[12px]">
            {speaks}
          </span>
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col lg:flex-row justify-items-end pe-1">
            {offerRate ? (
              <>
                <span className="text-[#67308C] font-semibold text-[12px] opacity-50">
                  <span className="lg:text-[20px] text-[16px] font-bold line-through">
                    ₹{actualRate?.split(" ")[0]}
                  </span>
                  /min
                </span>
                {offerRate == "FREE" ? (
                  <span className="text-[#67308C] font-semibold text-[12px] lg:text-[20px] ms-2">
                    Free
                  </span>
                ) : (
                  <span className="text-[#67308C] font-semibold text-[12px] lg:text-[20px] ms-2">
                    ₹{offerRate?.split(" ")[0]}/min
                  </span>
                )}
              </>
            ) : (
              <span className="text-[#67308C] font-semibold text-[12px] lg:text-[20px]">
                ₹{actualRate?.split(" ")[0]}/min
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!free) return;
                handleCall();
              }}
              disabled={!callEnabled || !free}
              className={`items-center flex justify-between px-5 py-2 lg:h-[42px] h-[28px] lg:w-[90px] w-[77px] text-white text-[16px] rounded-md 
    ${
      !free
        ? "bg-[#B20000] cursor-not-allowed"
        : "bg-gradient-to-r from-[#67308C] to-[#9E6AC0] hover:bg-[#67308C]"
    }
    ${!callEnabled || !free ? "cursor-no-drop opacity-50" : ""}`}
            >
              <Image
                src={call}
                alt="call"
                className="w-[12px] lg:w-[16px] h-[12px] lg:h-[16px]"
              />
              <span className="text-[12px] lg:text-[16px]">Call</span>
            </button>

            {/*first*/}
            {isCallOpen && availablebalance >= 250 && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg lg:w-[441px] w-[270px] shadow-lg p-6">
                  <div className="flex justify-end items-center">
                    <button
                      onClick={() => {
                        setIsCallOpen(false);
                      }}
                    >
                      <Image src={cross} alt="cross" />
                    </button>
                  </div>
                  <p className="mt-4 text-[#424242] lg:text-[18px] text-[18px] font-medium">
                    You will receive a call from this number{" "}
                    <strong>920XXXXX57</strong>
                  </p>
                  <hr className="w-[341px] self-center" />
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {
                        setIsCallOpen(false);
                      }}
                      className="px-4 lg:w-[90px] w-[77px] h-[28px] lg:h-[32px] lg:py-1 bg-[#67308C] text-white rounded hover:bg-[#9E6AC0]"
                    >
                      <span className="text-[18px]">OK</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isCallOpen && availablebalance < 250 && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg lg:w-[412px] w-[412px] shadow-lg p-6">
                  <div className="flex justify-end items-center">
                    <button
                      onClick={() => {
                        setIsCallOpen(false);
                      }}
                    >
                      <Image src={cross} alt="cross" />
                    </button>
                  </div>
                  <p className="mt-4 text-[#424242] mb-6 text-[18px] font-medium">
                    You need at least 5 minutes balance(INR 250) to start a call
                    with Arti.
                  </p>
                  <hr className="w-[341px] self-center" />
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {
                        setIsCallOpen(false);
                      }}
                      className=" font-medium border pt-1 px-4 pb-[6px] border-[#67308C]  text-[16px] w-[81px]  h-[42px] mr-2 bg-white  rounded text-[#67308C] "
                    >
                      <span className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                        Cancel
                      </span>
                    </button>
                    <button className="pt-1 px-4 pb-[6px] lg:w-[100px] text-[16px] font-medium w-[100px] h-[42px]  bg-[#67308C] text-white rounded hover:bg-[#9E6AC0]">
                      <span className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                        Recharge
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              disabled={!chatEnabled}
              className={`items-center flex justify-between px-4 py-2 lg:h-[42px] h-[28px] lg:w-[90px] w-[77px] text-white text-[16px] rounded-md 
    ${
      !free
        ? "bg-[#B20000] cursor-no-drop"
        : "bg-gradient-to-r from-[#67308C] to-[#9E6AC0] hover:bg-[#67308C]"
    }
    ${!chatEnabled ? "cursor-no-drop opacity-50" : ""}`}
            >
              <Image
                src={chat}
                alt="chat"
                className="w-[12px] lg:w-[16px] h-[12px] lg:h-[16px]"
              />
              <span className="text-[12px] lg:text-[16px]">Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <LoginModal />
          </div>
        </div>
      )}

 */}

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

      {/*second*/}
      {isOpen &&
        (usertype === "astrologer" ? (
          <div className=" fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 lg:p-9 xl:p-9 2xl:p-9 p-4">
            <div className="bg-white lg:max-w-[768px] xl:max-w-[768px] 2xl:max-w-[768px] max-w-[329px] height-[500px] lg:height-[526px] xl:height-[526px] 2xl:height-[526px] rounded-lg shadow-lg  w-full lg:p-6 xl:p-6 2xl:p-6 p-3 relative">
              <div className="flex flex-col-reverse lg:flex-row xl:flex-row 2xl:flex-row gap-4">
                <div className="lg:w-[236px] xl:w-[236px] 2xl:w-[236px] flex flex-col items-center lg:border-r xl:border-r 2xl:border-r border-t lg:border-t-0 xl:border-t-0 2xl:border-t-0 pt-4 lg:pr-4 xl:pr-4 2xl:pr-4">
                  <Image
                    src={profilePic}
                    alt={fullName}
                    width={4}
                    height={4}
                    className="w-20 h-20 rounded-full border-2 border-gray-300"
                  />
                  <h3 className="text-lg font-semibold mt-2">Akshat Kumar</h3>
                  <p className="text-sm  lg:mb-10 xl:mb-10 2xl:mb-10 mb-6">
                    4:59 mins
                  </p>
                  <div className="w-20 h-2 lg:mb-10 xl:mb-10 2xl:mb-10 mb-6 rounded-full">
                    <Image src={Waveform} alt="wave" height={32} width={130} />
                  </div>
                  <button
                    className="mt-4 flex justify-center items-center h-[47px] w-[204px] bg-red-500 text-white px-6 py-2 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image src={endbutton} alt="end" />
                  </button>
                </div>

                <div className="lg:w-[500px] xl:w-[500px] 2xl:w-[500px] bg-white">
                  <h2 className="lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[18px] font-medium mb-4 pb-2">
                    User Details
                  </h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                      Name:
                    </p>{" "}
                    <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal">
                      {user.name}
                    </p>
                    <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                      Gender:
                    </p>{" "}
                    <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal">
                      {user.gender}
                    </p>
                    <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                      Date of Birth:
                    </p>{" "}
                    <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal">
                      {user.dob}
                    </p>
                    <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                      Time of Birth:
                    </p>{" "}
                    <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal">
                      {user.timeOfBirth}
                    </p>
                    <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                      Birth Place:
                    </p>{" "}
                    <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal">
                      {user.birthPlace}
                    </p>
                    <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                      Latitude:
                    </p>{" "}
                    <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal">
                      {user.latitude}
                    </p>
                    <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                      Longitude:
                    </p>{" "}
                    <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal">
                      {user.longitude}
                    </p>
                    <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]">
                      Vimshottari Dasha:
                    </p>{" "}
                    <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal">
                      {user.dasha}
                    </p>
                  </div>

                  <div className="mt-4 flex ">
                    <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] mr-16 lg:mr-36 xl:mr-36 2xl:mr-36 mb-2">
                      Birth Chart:
                    </p>
                    <img
                      src={user.birthChart}
                      alt="Birth Chart"
                      className="lg:w-32 xl:w-32 2xl:w-32 w-[155px] h-[87px] lg:h-32 xl:h-32 2xl:h-32 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white  lg:max-w-[768px] xl:max-w-[768px] 2xl:max-w-[768px] max-w-[329px] height-[513px] lg:height-[526px] xl:height-[526px] 2xl:height-[526px] rounded-lg shadow-lg w-full lg:p-9 xl:p-9 2xl:p-9 p-4 relative">
                <div className="flex flex-col-reverse lg:flex-row xl:flex-row 2xl:flex-row gap-4">
                  <div className="flex flex-col items-center lg:border-r xl:border-r 2xl:border-r border-t lg:border-t-0 xl:border-t-0 2xl:border-t-0 pt-4 lg:pr-4 xl:pr-4 2xl:pr-4">
                    <Image
                      src={profilePic}
                      alt={name}
                      height={4}
                      width={4}
                      className="w-20 h-20 rounded-full border-2 border-gray-300"
                    />
                    <h3 className="text-lg font-semibold mt-2">{fullName}</h3>
                    <p className="text-sm lg:mb-10 xl:mb-10 2xl:mb-10 mb-6 ">
                      4:59 mins
                    </p>
                    <div className="w-20 h-2 lg:mb-10 xl:mb-10 2xl:mb-10 mb-6 rounded-full">
                      <Image
                        src={Waveform}
                        alt="wave"
                        height={32}
                        width={130}
                      />
                    </div>
                    <button
                      className="mt-4 flex justify-center items-center h-[47px] w-[204px] bg-red-500 text-white px-6 py-2 rounded-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image src={endbutton} alt="end" />
                    </button>
                  </div>

                  <div className="lg:w-[348px] xl:w-[348px] 2xl:w-[348px] bg-white relative">
                    <div className="flex justify-between items-center">
                      <h2 className="lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[18px] font-medium ">
                        Astrologer Details
                      </h2>
                      <button className="text-[16px] w-[84px] h-[42px] font-medium text-[#67308C] border border-[#67308C] px-2 py-0.5 rounded-md">
                        Recharge
                      </button>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="flex">
                        <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]  w-1/3">
                          Name:
                        </p>
                        <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal ">
                          {fullName}
                        </p>
                      </div>

                      <div className="flex">
                        <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]  w-1/3">
                          Gender:
                        </p>
                        <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal ">
                          {userGender}
                        </p>
                      </div>

                      <div className="flex">
                        <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]  w-1/3">
                          Language:
                        </p>
                        <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal ">
                          {speaks}
                        </p>
                      </div>

                      <div className="flex">
                        <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]  w-1/3">
                          Experience:
                        </p>
                        <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal ">
                          {experience}
                        </p>
                      </div>

                      <div className="flex">
                        <p className="font-medium lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px]  w-1/3">
                          Skills:
                        </p>
                        <p className="lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal ">
                          {skills}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default AstrologerCard;
