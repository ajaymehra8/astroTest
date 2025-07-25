"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import FilterComponent from "@/components/Filter/Filter";
import AstrologerCard from "@/components/TalkToAstrologer/AstrologerCard/Astrilogercard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  fetchAstrologersAPI,
  fetchAstrologersAPIPublic,
} from "../../services/services";
import ImageCarousel from "@/components/TalkToAstrologer/AstrologerCard/ImageCarousel";
import { useAuth } from "@/hooks/useAuth";



function TalkToAstrologer() {
  const [astrologers, setAstrologers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const pageSize = 20;

  const fetchAstrologers = useCallback(
    async (filters = { pageNo: currentPage, pageSize }) => {
      try {

        setLoading(true);
    
        let data;
        if (isLoggedIn) {
          data = await fetchAstrologersAPI(filters);
          console.log(data);
        } else {
          data = await fetchAstrologersAPIPublic(filters);
          console.log(data);
        }

        setAstrologers(data.entries);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [isLoggedIn, currentPage]
  );

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAstrologers();
    }
  }, [fetchAstrologers]);

  useEffect(() => {
    fetchAstrologers();
  }, [currentPage, fetchAstrologers]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      //  window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchAstrologers();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, fetchAstrologers]);
  const router = useRouter();

  const handleClick = (astrologer) => {
    sessionStorage.setItem("astrologer", JSON.stringify(astrologer));
    router.push(`/astrologer-profile/${astrologer.id}`);
  };
  return (
    <>
      {/* <Head>
        <title>AstroVachan: Best astrologers online</title>
        <meta
          name="description"
          content="The best astrologers offering online astrology consultations with free consultations for your life and career."
        />

        <meta
          property="og:title"
          content="Talk To Astrologer -  AstroVachan: Consult expert astrologers online now"
        />
        <meta
          property="og:description"
          content="Talk To Astrologer -  Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey."
        />
        <meta
          property="og:image"
          content="https://www.astrovachan.com/Footer/FooterLogo.png"
        />
      </Head> */}
      <FilterComponent onApplyFilters={fetchAstrologers} />
      <ImageCarousel />

      <div className="bg-[#ffffff] lg:px-24 px-2 pb-6 min-h-screen m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          {loading ? (
            <div className="col-span-2 flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : astrologers?.length > 0 ? (
            astrologers.map((astrologer) => (
              <div key={astrologer.id} style={{ cursor: "pointer" }}>
                <AstrologerCard
                  key={astrologer.id}
                  {...astrologer}
                  onCardClick={() => handleClick(astrologer)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-2 flex justify-center items-center py-12 text-center">
              <p className="text-lg font-medium text-gray-600">
                No astrologers found. Please try different filters.
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && astrologers?.length > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              className="px-4 py-2 border rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {[...Array(totalPages)]?.map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === pageNum
                      ? "bg-[#F9F4FD] text-black"
                      : "bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="px-4 py-2 border rounded disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default TalkToAstrologer;
