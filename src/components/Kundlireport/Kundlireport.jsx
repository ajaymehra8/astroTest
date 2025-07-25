"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/kundlireport/reportlogo.png";
import birthchart from "../../../public/kundlireport/birthchart.png";
import sanitizeHtml from "sanitize-html";

const KundliReport = ({ basicDetails, planetaryPlacements, insights, headings = {} }) => {
  const router = useRouter();
  const isKundliReportPage = router.pathname === "/kundlireport";

  const placementsArray = Array.isArray(planetaryPlacements) ? planetaryPlacements : [];
  const tableHeaders = placementsArray.length > 0 ? Object.keys(placementsArray[0]) : [];
  const hasBirthChart = isKundliReportPage && basicDetails?.birthChartUrl;

  return (

    
    <div className="min-h-screen py-4 px-2 sm:px-6 md:px-10 lg:px-16">
      {/* Header */}
      <div className="w-full flex flex-col items-center py-4 mt-[64px] lg:mt-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black flex items-center justify-center">
          <Image src={logo} alt="Kundli Logo" className="w-16 h-16 sm:w-20 sm:h-20 cursor-pointer" />
        </div>
        <h2 className="text-[#6F2C91] text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-medium mt-2 text-center playfair-display-heading1 ">
          {headings.mainTitle}
        </h2>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto p-2 sm:p-4">
        <div className="flex flex-col lg:flex-row flex-wrap justify-center w-full gap-4 sm:gap-6">
          {/* Basic Details Table */}
          <div className="border rounded-lg shadow-md w-full lg:w-[45%]">
            <div className="bg-[#6F2C91] text-[20px] font-roboto sm:text-xl md:text-2xl font-medium text-white px-3 sm:px-5 py-2 rounded-t-lg playfair-display-heading1">
              {headings.table1}
            </div>
            <div className="p-3 overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {basicDetails?.map((detail, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 text-sm sm:text-lg lg:text-[20px] font-roboto  font-medium pr-4 sm:pr-10">{detail.field}</td>
                      <td className="p-2 text-sm sm:text-lg lg:text-[20px] font-roboto font-normal">{detail.value}</td>
                    </tr>
                  ))}
                 {hasBirthChart && (
  <tr>
    <td className="p-2 text-sm sm:text-lg font-medium">{headings.birthchart}</td>
    <td className="p-2">
      <Image
        src={basicDetails?.birthChartUrl}
        alt="birthchart"
        width={250}
        height={150}
        className="rounded-lg border"
      />
    </td>
  </tr>
)}

                </tbody>
              </table>
            </div>
          </div>

          {/* Planetary Placements Table */}
          {planetaryPlacements?.length > 0 && (
            <div className="border rounded-lg shadow-md w-full lg:w-[50%]">
              <div className="bg-[#6F2C91] text-lg sm:text-xl md:text-2xl font-medium text-white px-3 sm:px-5 py-2 rounded-t-lg playfair-display-heading1">
                {headings.table2}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border">
                {/*
                <thead>
                    <tr className="bg-[#EAEAEA] h-[36px] sm:h-[42px]">
                      {tableHeaders.map((header, index) => (
                        <th key={index} className="px-1 sm:px-2 text-sm sm:text-lg  font-medium lg:text-[20px] font-roboto">
                          {headings[header] || header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                */}  
                  <tbody>
                    {planetaryPlacements?.map((placement, rowIndex) => (
                      <tr key={rowIndex} className="border-b h-[44px] sm:h-[54px] ">
                        
                        {tableHeaders.map((key, colIndex) => (
                            <td
                           key={colIndex}
                           className="p-1 sm:p-2  align-top text-sm sm:text-lg lg:text-[20px] font-roboto"
                           dangerouslySetInnerHTML={{
                             __html: placement[key] ? sanitizeHtml(placement[key]) : "-",
                           }}
                         />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Insights Table */}
      {insights?.length > 0 && (
        <div className="max-w-[1370px] lg:mt-[64px] mx-auto p-2 sm:p-4">
          <div className="border rounded-lg shadow-md">
            <div className="bg-[#6F2C91] text-lg sm:text-xl md:text-2xl font-medium text-white px-3 sm:px-5 py-2 rounded-t-lg">
              {headings.table3}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead>
                  <tr className="bg-[#EAEAEA] h-[40px] sm:h-[52px]">
                    <th className="p-1 sm:p-2  text-left text-sm sm:text-lg font-medium lg:text-[20px] font-roboto">{headings.suh1}</th>
                    <th className="p-1 sm:p-2  text-left text-sm sm:text-lg font-medium lg:text-[20px] font-roboto">{headings.suh2}</th>
                  </tr>
                </thead>
                <tbody>
                  {insights.map((insight, index) => (
                    <tr key={index} className="border-b h-auto sm:h-[120px]">
                      <td className="p-1 sm:p-2 text-black  text-sm sm:text-lg font-medium lg:text-[20px]">{insight.title}</td>
                      <td className="p-1 sm:p-2  text-sm sm:text-lg lg:text-[20px]">{insight.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KundliReport;
