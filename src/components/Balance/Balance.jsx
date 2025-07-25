import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import back from "../../../public/back icon/back1.png";
import back1 from "../../../public/back icon/Back.png";
import Link from "next/link";
import Script from "next/script";
import { useToast } from "@/hooks/use-toast";
import {
  createOrderRazorpay,
  fetchStates,
  fetchTransactionsAPI,
  fetchUserBalance,
  verifyOrderRazorpay,
} from "@/services/services";
import { RechargeContext } from "@/lib/context/RechargeContext";
import { useSearchParams } from "next/navigation";
import StateDropdown from "./components/StateDropdown";

const coupons = [
  {
    id: 1,
    title: "Get",
    details: "20% extra ",
    offer: "on recharge of ₹ 150 or more",
  },
  {
    id: 2,
    title: "Get",
    details: "25% extra ",
    offer: "on recharge of ₹ 300 or more",
  },
  {
    id: 3,
    title: "Get",
    details: "30% extra ",
    offer: "on recharge of ₹ 500 or more",
  },
];
const CouponCard = ({ id, title, details, offer, handleCuponClick }) => (
  <div
    className="lg:w-[300px] xl:w-[300px] 2xl:w-[300px] w-[159px] rounded-xl overflow-hidden shadow-lg border border-[#67308c] cursor-pointer"
    onClick={() => handleCuponClick(id)}
  >
    <div className="bg-[#6F2C91]  text-center py-[3.5px] lg:py-3 xl:py-3 2xl:py-3 lg:text-[24px] xl:text-[24px] 2xl:text-[24px] text-[14px] font-normal text-[#F3F3F3]">
      {title}
    </div>
    <div className="bg-[#f9f4fd] lg:p-6 xl:p-6 2xl:p-6 py-2 text-center">
      <p className="text-[#67308c] lg:text-[32px] xl:text-[32px] 2xl:text-[32px] text-[14px] font-[500]">
        {details}
      </p>
      <p className="lg:mt-3 xl:mt-3 2xl:mt-3 mt-1 text-black lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[10px] font-[400] ">
        {offer}
      </p>
    </div>
  </div>
);

const TransactionCard = ({
  date,
  time,
  amount,
  tax,
  tran,
  tranLabel,
  status,
}) => (
  <div className="max-w-[413.33px] bg-[#f9f4fd] rounded-xl p-6">
    <div className="grid grid-cols-2 gap-y-3 text-[18px]">
      <span className="text-[16px] font-[600] text-black">Date:</span>
      <span className="text-[16px] font-[400] text-[#646464]">{date}</span>

      <span className="text-[16px] font-[600] text-black">Time:</span>
      <span className="text-[16px] font-[400] text-[#646464]">{time}</span>

      <span className="text-[16px] font-[600] text-black">Amount:</span>
      <span className="text-[16px] font-[400] text-[#646464]">₹ {amount}</span>

      <span className="text-[16px] font-[600] text-black">Tax & Services:</span>
      <span className="text-[16px] font-[400] text-[#646464]">
        ₹ {tax || "N/A"}
      </span>

      <span className="text-[16px] font-[600] text-black">{tranLabel}:</span>
      <span className="text-[14px] font-[400] text-[#646464] whitespace-normal break-words">
        {tran || "N/A"}
      </span>

      <span className="text-[16px] font-[600] text-black">Status:</span>
      <span
        className={`text-[16px] font-[400] ${
          status === "SUCCESS"
            ? "text-green-600"
            : status === "PENDING"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {status}
      </span>
    </div>
  </div>
);

const Balance = () => {
  const searchParams = useSearchParams();
  const rechargeParam = searchParams.get("amount");

  const [states, setStates] = useState([]);
  const [alreadyHaveState, setAlreadyHaveState] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [amount, setAmount] = useState(200);

  const { toast } = useToast();
  const { rechargeValue } = useContext(RechargeContext);

  const [balance, setBalance] = useState(null);
  const authToken = localStorage.getItem("token");
  const [amountError, setAmountError] = useState("");


  useEffect(() => {
    if (searchParams) {
      const rechargeParam = searchParams.get("amount");
      console.log(rechargeParam," this is the param in balance file")
      if (rechargeParam) {
        setAmount(Number(rechargeParam));
      }
    }
  }, [searchParams]);
  

  //step 1 create order
  const createorder = async (amount) => {
    try {
      const paymentAmount = amount === "" ? 0 : Number(amount);

      if (!paymentAmount || paymentAmount < 5) {
        setAmountError("Amount should be between ₹5 & ₹9999");
        return;
      } else {
        setAmountError("");
      }
      if (!selectedState && !alreadyHaveState) {
        toast({
          title: "Error",
          description: `Please select a state`,
          variant: "destructive",
          duration: 5000,
          className: "toast",
        });
        return;
      }
      const orderdata = await createOrderRazorpay(
        paymentAmount,
        authToken,
        selectedState?.id
      );
      if (orderdata && selectedState) {
        setAlreadyHaveState(selectedState);
        setSelectedState(null);
      }
      const paymentdata = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderdata.rzpOrderId,

        handler: async function (response) {
          // step 2 : verify payment

          const avorderid = orderdata.avOrderId;
          const razorpay_payment_id = response.razorpay_payment_id;
          const razorpay_order_id = response.razorpay_order_id;
          const razorpay_signature = response.razorpay_signature;
          const data = await verifyOrderRazorpay(
            avorderid,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            authToken
          );

          console.log(data);
          if (data && data.isOk) {
            // step -3 payment completed
            toast({
              title: `Payment completed`,
              variant: "success",
              duration: 4000,
              className: "bg-green-500 ",
            });
            // window.location.reload();

            const token = authToken;
            if (token) {
              const value = await fetchUserBalance(token);
              setBalance(value.balance);
              window.dispatchEvent(
                new CustomEvent("balanceUpdated", {
                  detail: { newBalance: value.balance },
                })
              );
            }

            // Optional: Refetch transactions to show the new transaction
            const transactionsData = await fetchTransactionsAPI(authToken, {
              pageNo: 1, // Reset to first page to see the latest transaction
              pageSize: itemsPerPage,
            });
            if (transactionsData && Array.isArray(transactionsData.entries)) {
              const mappedData = transactionsData.entries.map((item) => ({
                date: item.time ? item.time.split(" ")[0] : "N/A",
                time: item.time
                  ? item.time.split(" ").slice(1).join(" ")
                  : "N/A",
                amount: item.amount || "N/A",
                tax: item.charges || "N/A",
                tran: item.transactionId || "N/A",
                tranLabel: "Transaction ID",
                status: item.status || "UNKNOWN",
              }));
              setTransactions(mappedData);
            }
          } else {
            toast({
              title: `Payment Failed`,
              variant: "destructive",
              duration: 4000,
            });
          }
        },
      };

      const payment = new window.Razorpay(paymentdata);
      payment.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await fetchTransactionsAPI(authToken, {
          pageNo: currentPage,
          pageSize: itemsPerPage,
        });

        // console.log("API Response:", data);

        if (data && Array.isArray(data.entries)) {
          const mappedData = data.entries.map((item) => ({
            date: item.time ? item.time.split(" ")[0] : "N/A",
            time: item.time ? item.time.split(" ").slice(1).join(" ") : "N/A",
            amount: item.amount || "N/A",
            tax: item.charges || "N/A",
            tran: item.transactionId || "N/A",
            tranLabel: "Transaction ID",
            status: item.status || "UNKNOWN",
          }));

          setTransactions(mappedData);
          setTotalPages(data.totalPages || 1); // Corrected total pages from API
        } else {
          console.log("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const token = authToken;
    const getBalance = async () => {
      const value = await fetchUserBalance(token);
      setBalance(value.balance);
      if (value.state) {
        setAlreadyHaveState(value.state);
        setSelectedState(null);
      }
    };
    const getStates = async () => {
      const states = await fetchStates(token);
      setStates(states);
    };

    if (token) {
      getStates();
      getBalance();
    } else {
      toast({
        title: "Please login",
        variant: "destructive",
        duration: 4000,
      });
    }
  }, []);
  function getPercentage(x, amount) {
    return (x / 100) * Number(amount);
  }

  const handleAmountChnage = (e) => {
    const rawValue = e.target.value;
    setAmount(rawValue);
  };

  const handleCuponClick = (id) => {
    if (id == 1) {
      setAmount(150);
    } else if (id == 2) {
      setAmount(300);
    } else if (id == 3) {
      setAmount(500);
    } else {
      return;
    }
  };
  console.log(amount,"1")

  useEffect(() => {
    if (rechargeValue) {
      console.log(amount,"rechargeValue Changed");
      setAmount(rechargeValue);
    }
  }, [rechargeValue]);

  return (
    <div className="lg:mx-[80px] mx-4 my-[46px]">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Link
        href="/talk-to-astrologer"
        className="flex flex-row items-center lg:w-auto lg:justify-start playfair-display-heading1 tracking-[-0.96px] text-black font-semibold mt-12 lg:mt-0"
      >
        <div className="flex items-center">
          <Image src={back} alt="back" className="hidden lg:block" />
          <Image src={back1} alt="back" className="block lg:hidden" />
          <div className="lg:ml-4 text-[20px] lg:text-[32px] font-semibold text-left text-[#67308C]">
            Balance Recharge
          </div>
        </div>
      </Link>
      <div className="flex justify-center items-center lg:mt-10 xl:mt-10 2xl:mt-10 mt-[32px]">
        <div className="bg-white lg:p-6 xl:p-6 2xl:p-6 max-w-md w-full lg:text-center xl:text-center 2xl:text-center">
          <h2 className="lg:text-[24px] xl:text-[24px] 2xl:text-[24px] text-[18px] tracking-[-0.72px]  font-medium text-black ">
            <span className="lg:font-semibold xl:font-semibold 2xl:font-semibold font-normal">
              Current Balance :
            </span>{" "}
            {balance !== null ? `₹${balance.toFixed(2)}` : "Loading..."}
          </h2>
          {/* <p className="text-[#67308c]  lg:text-[32px] xl:text-[32px] 2xl:text-[32px] text-[24px] tracking-[-0.03em] font-medium mt-2 underline underline-offset-4"> ₹ 200</p> */}
          <div className="flex flex-col gap-3 self-center items-center justify-center">
            {!alreadyHaveState && (
              <div>
                <StateDropdown
                  options={states}
                  selected={selectedState}
                  setSelected={setSelectedState}
                />
              </div>
            )}

            <div className="">
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => handleAmountChnage(e)}
                className="your-classes px-4 py-2 mt-2 w-fit border border-[#67308c]  rounded-md"
                placeholder="₹ 200"
                inputMode="numeric"
              />
              {amountError && (
                <p className="text-red-600 text-sm mt-1">{amountError}</p>
              )}
            </div>
          </div>
          <div className="mt-6 text-left">
            <p className="text-black lg:text-center xl:text-center 2xl:text-center  lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal">
              You will pay ₹
              {(getPercentage(18, amount) + Number(amount)).toFixed(2)}{" "}
              including 18% GST
            </p>
            {/* <p className="text-black  lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal mt-2">Your new balance will be ₹ 240.00 (20% extra credits)</p> */}
            {/* <p className="text-black  lg:text-[18px] xl:text-[18px] 2xl:text-[18px] text-[14px] font-normal mt-2">
              {amount >= 150 && amount < 300
                ? `Your new balance will be ₹ ${(
                    getPercentage(20, amount) + Number(amount)
                  ).toFixed(2)} (20% extra credits)`
                : amount >= 300 && amount < 500
                ? `Your new balance will be ₹ ${(
                    getPercentage(25, amount) + Number(amount)
                  ).toFixed(2)} (25% extra credits)`
                : amount >= 500
                ? `Your new balance will be ₹ ${(
                    getPercentage(30, amount) + Number(amount)
                  ).toFixed(2)} (30% extra credits)`
                : `Your new balance will be ₹ ${amount} (0% extra credits)`}
            </p> */}
          </div>
          <button
            onClick={() => createorder(amount)}
            className="font-medium lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-[14px] self-center rounded-lg flex justify-center items-center gap-2 lg:w-[397px] w-[120px] lg:h-[52px] h-[36px] bg-custom-gradient mt-[32px] text-white  tracking-[-0.6px]"
          >
            <span className="">Recharge</span>
          </button>
        </div>
      </div>

      {/* Coupons Section */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 lg:gap-6 justify-center mt-10">
        {coupons.map((coupon, index) => (
          <CouponCard
            id={coupon.id}
            key={index}
            {...coupon}
            handleCuponClick={handleCuponClick}
          />
        ))}
      </div>

      <h1 className="playfair-display-heading1 text-[20px] lg:text-[24px] text-[#6f2c91] mt-[64px]">
        Payment History
      </h1>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center mt-10">
          {transactions.map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {/* Previous Button */}
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* Page Numbers */}
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
                  className={`px-3 py-1 border border-[#CDB9DB] rounded-md ${
                    currentPage === page
                      ? "bg-[#F9F4FD] text-[#67308C]"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}

            {/* Next Button */}
            <button
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
