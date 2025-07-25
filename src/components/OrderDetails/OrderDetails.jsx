"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import Image from "next/image";
import back1 from "../../../public/back icon/back1.png";
import filter from "../../../public/talktoastrologer/Filter.png";
import sort from "../../../public/talktoastrologer/Vector.png";
import close from "../../../public/talktoastrologer/cross.png";
import trash from "../../../public/orderdetails/trash-2.png";
import { useRouter } from "next/navigation";
import { FaStar, FaTimes } from "react-icons/fa";
import fb from "../../../public/orderdetails/feedback.png";
import { fetchAstrologersAPI, fetchOrdersAPI, fetchSingleAstrologerAPI, submitFeedbackAPI } from "@/services/services";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const router = useRouter();
  const [sortOptions, setSortOptions] = useState([
    { label: "Date: Newest to Oldest", checked: false },
    { label: "Date: Oldest to Newest", checked: false },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [arating, setArating] = useState(0);
  const [prating, setPrating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const handleCheckboxChange = (index) => {
    setSortOptions((prev) =>
      prev.map((option, i) =>
        i === index ? { ...option, checked: !option.checked } : option
      )
    );
  };
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const authToken = localStorage.getItem("token");

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchOrdersAPI(authToken, currentPage);
      setOrders(data.entries || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);
  const submitFeedback = async () => {
    if (!arating || !prating) {
      toast.info("Please provide a rating before submitting.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const feedbackData = {
        astrologerRating: arating,
        platformRating: prating,
        review: feedback.trim(),
      };

      await submitFeedbackAPI(authToken, selectedOrderId, feedbackData);
      toast.success("Feedback submitted successfully.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsFeedbackOpen(false);
      setFeedback("");
      setArating(0);
      setPrating(0);
    } catch (error) {
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
  const handleClick =async (astrologer) => {
    const data=await fetchSingleAstrologerAPI(astrologer.astrologerId);
    console.log(data);
    sessionStorage.setItem("astrologer", JSON.stringify(data)); // Store data in session storage
    router.push(`/astrologer-profile/${astrologer.astrologerId}`); // Navigate to the user profile page
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-[1280px] mt-[35px] lg:mt-0 mx-auto">
        <div className="flex items-center justify-between lg:mb-6 xl:mb-6 2xl:mb-6 mb-3">
          <button className="flex items-center font-medium justify-center lg:text-[32px] xl:text-[32px] 2xl:text-[32px] text-[20px]  mb-4 text-purple-800 hover:underline">
            <span className="mr-4">
              <Image
                onClick={() => router.push("/talk-to-astrologer")}
                src={back1}
                alt="back"
              />
            </span>
            <span>Order History</span>
          </button>

          <div className="flex space-x-4">
            {/* <button
                
                  className="flex mr-2 items-center px-4 py-2 border border-[#67308C] text-[16px] font-medium text-[#67308C] rounded-md hover:bg-purple-100">
                  Filter
                  <Image src={filter} alt="filter" />
                </button> */}

            <div className="relative">
              {/* <button
                        className="flex gap-2 items-center px-4 py-2 border border-[#67308C] text-[16px] font-medium text-[#67308C] rounded-md hover:bg-purple-100"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                      >
                       
                        Sort
                        <Image src={sort} alt="sort" />
                      </button> */}

              {isSortOpen && (
                <div className="absolute top-full mt-2 right-0 w-64 bg-white border rounded-lg shadow-lg z-10">
                  <div className="flex justify-between items-center">
                    <div className="px-4 py-2 text-gray-800 font-medium">
                      Sort by
                    </div>
                    <div className="w-6 h-6">
                      <Image
                        src={close}
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        alt="close"
                      />
                    </div>
                  </div>

                  <hr className="border-t border-gray-200" />
                  <ul className="px-4 py-2 space-y-2">
                    {sortOptions.map((option, index) => (
                      <li
                        key={option.label}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={option.checked}
                          onChange={() => handleCheckboxChange(index)}
                          className="h-4 w-4 border-gray-300 rounded"
                        />
                        <label className="text-gray-700">{option.label}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="lg:py-12 xl:py-12 2xl:py-12 lg:px-8 xl:px-8 2xl:px-8 py-3 px-4  flex gap-2 bg-white rounded-lg  border border-[#67308C]"
            >
              <div className="w-1/3 h-full flex flex-col items-center lg:justify-between xl:justify-between 2xl:justify-between mb-4">
                <div className="flex items-center mb-6 lg:mb-0 xl:mb-0 2xl:mb-0 lg:space-x-4 xl:space-x-4 2xl:space-x-4">
                  <img
                    src={order.astrologerProfilePic}
                    alt={order.astrologerName}
                    className="w-[90px] h-[92px] lg:w-[170px] xl:w-[170px] 2xl:w-[170px]  lg:h-[170px] xl:h-[170px] 2xl:h-[170px] rounded-full border border-gray-300"
                  />
                </div>
                
                  <button onClick={() => handleClick(order)} className="px-1 py-1 border lg:w-[170px] xl:w-[170px] 2xl:w-[170px] w-[89px] h-[33px] border-[#67308C] font-medium text-[#67308C] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[12px]  rounded-md hover:bg-purple-100">
                    View Profile
                  </button>
                
              </div>
              <div className="text-sm w-[366px] flex flex-col lg:gap-6 xl:gap-6 2xl:gap-6  text-gray-600  ml-5">
                <div className=" flex flex-col gap-1 ">
                  <div className="w-full flex lg:justify-between xl:justify-between 2xl:justify-between ">
                    <div>
                    <p>
                    <span className="font-medium text-black lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[12px] mb-2">
                      Name:
                    </span>{" "}
                    {order.astrologerName}
                  </p>
                      <span className="font-medium text-black lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[12px]">
                        Date:
                      </span>{" "}
                      {order.startTime}
                    </div>
                  </div>
                  <p>
                    <span className="font-medium text-black lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[12px]">
                      Mode:
                    </span>{" "}
                    {order.mode}
                  </p>
                  <p>
                    <span className="font-medium text-black lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[12px]">
                      Status:
                    </span>{" "}
                    <span
                      className={
                        order.status === "Completed"
                          ? "text-green-500"
                          : order.status === "Missed"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {order.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[12px] text-black">
                      Rate:
                    </span>{" "}
                    ₹{order.rate}/min
                  </p>
                  <p>
                    <span className="font-medium text-black lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[12px]">
                      Duration:
                    </span>{" "}
                    {order.durationInMin} minutes
                  </p>
                  <p>
                    <span className="font-medium text-black lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[12px]">
                      Deduction:
                    </span>{" "}
                    ₹{order.bill}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsFeedbackOpen(true);
                    setSelectedOrderId(order.id);
                  }}
                  disabled={!order.enableFeedback}
                  className={`px-4 py-2 w-full rounded-md mt-4 bg-[#67308C] 
    ${
      order.enableFeedback
        ? "text-white"
        : "text-white opacity-50 cursor-not-allowed"
    }`}
                >
                  Give Feedback
                </button>
              </div>

              <div className="mt-4 flex justify-between"></div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}

        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="lg:px-4 xl:px-4 2xl:px-4  lg:py-2 xl:py-2 2xl:py-2 px-2 rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return true;
              }
              return false;
            })
            .reduce((acc, page, index, arr) => {
              if (index > 0 && page !== arr[index - 1] + 1) {
                acc.push("...");
              }
              acc.push(page);
              return acc;
            }, [])
            .map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={page === "..."}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === page
                    ? "bg-[#F9F4FD] border-[#CDB9DB] text-[#67308C]"
                    : page === "..."
                    ? "bg-white border-[#CDB9DB] cursor-default"
                    : "bg-white border-[#CDB9DB]"
                }`}
              >
                {page}
              </button>
            ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 lg:px-4 xl:px-4 2xl:px-4 lg:py-2 xl:py-2 2xl:py-2 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {isFeedbackOpen && selectedOrderId && (
        <div className="fixed top-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-auto relative flex flex-col items-center">
            {/* Close Button */}
            <FaTimes
              className="absolute top-4 right-4 text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
              // onClick={onClose}
              onClick={() => setIsFeedbackOpen(false)}
            />
            {/* Centered Image */}
            <div className="mb-4">
              <Image
                src={fb} // Replace with actual image path
                alt="feedback icon"
                width={64}
                height={64}
              />
            </div>

            {/* Feedback Title */}
            <h2 className="text-xl tracking-[-0.6px] font-roboto leading-6 font-[500] mb-6">
              Feedback for your consultation with [1] on [2]
            </h2>
            {/* Horizontally Aligned Stars */}
            <h3 className="text-[18px] tracking-[0.18px] font-[500] font-roboto leading-[150%] self-start">
              How would you rate our astrologer?
            </h3>
            <div className="flex self-start space-x-2 mt-[16px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= arating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setArating(star)}
                  onChange={(e) => setArating(Number(e.target.value))}
                />
              ))}
            </div>
            <h3 className="text-[18px] tracking-[0.18px] font-[500] font-roboto leading-[150%] self-start mt-4">
              How would you rate our platform?
            </h3>
            <div className="flex self-start space-x-2 mt-[16px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= prating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setPrating(star)}
                  onChange={(e) => setPrating(Number(e.target.value))}
                />
              ))}
            </div>
            <h3 className="text-[18px] tracking-[0.18px] font-[500] font-roboto leading-[150%] self-start mt-4">
              Comments,if any?
            </h3>
            <textarea
              className="w-full border mt-4 border-[#cdb9db] rounded-md font-roboto text-[14px] p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows="4"
              placeholder="Your message..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
              className="mt-6 w-full bg-custom-gradient text-white px-4 py-2 rounded-md hover:bg-purple-800 text-[16px] font-roboto"
              onClick={submitFeedback}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
