'use client'

import { fetchPoojaDataAPI } from "@/services/services";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";
import { useEffect } from 'react';


function HowItWork() {
  const [poojadata, setPoojadata] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchpoojadata = async () => {

    try {

      const data = await fetchPoojaDataAPI();
      console.log(data);
      
      setPoojadata(data);
      setLoading(false);


    } catch (error) {
      console.error('Error fetching pooja data', error);

    }


  }

  useEffect(() => {
    fetchpoojadata();

  }, [])



  return (
    <>
     <div id='Online Pooja' className="lg:bg-white bg-[#F8F8F8]"></div>
      {loading ? (
        <>
          <div className="hidden  lg:px-20 2xl:block xl:block lg:block lg:w-1030px ">
            <div  className="py-[36px] flex flex-col items-center">
              <h2 className="lg:text-[32px] text-[20px] playfair-display-heading font-bold text-center text-[#6F2C91] mb-12">
                Online Pooja
              </h2>
            </div>
          </div>


          <section  className="bg-gray-50 pb-8 lg:py-8 lg:hidden xl:hidden 2xl:hidden ">
            <h2  className="text-center text-[#6F2C91] text-[20px] font-semibold mb-4 playfair-display-heading">Online Pooja</h2>

          </section>
          <div className="col-span-2 bg-gray-50 flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" />
          </div>
        </>
      ) : (
        <>
          <div className='lg:h-24 h-1 bg-[#F8F8F8] lg:bg-white'></div>
          <div id='Online Pooja' className="lg:bg-white bg-[#F8F8F8]">
            <div className="hidden  lg:px-20 2xl:block xl:block lg:block lg:w-1030px ">
              <div className="py-[36px] flex flex-col items-center">

                <h2 className="lg:text-[32px] text-[20px] playfair-display-heading font-bold text-center text-[#6F2C91] mb-12">
                  Online Pooja
                </h2>

                <div className="container mx-auto px-18 py-8 max-w-[1280px]">

                  <div className="grid grid-cols-1 md:grid-cols-2 px-[18px] lg:grid-cols-3 gap-6">
                    {poojadata.map((pooja, index) => (
                      <Link key={index} href={pooja.name} target="_blank">
                        <Image key={index} src={pooja.id} alt="Pooja service" width={400} height={300} className=" object-contain rounded-lg" />


                      </Link>
                    ))}
                  </div>
                </div>



              </div>
            </div>


            <section className="bg-gray-50 pb-8 lg:py-8 lg:hidden xl:hidden 2xl:hidden ">
              <h2 className="text-center text-[#6F2C91] text-[20px] font-semibold mb-4 playfair-display-heading">Online Pooja</h2>

            </section>
            <div className="lg:bg-white bg-[#F8F8F8] pb-6">


              <div className="lg:hidden w-full max-w-xs mx-auto overflow-hidden relative">
                <div className="flex flex-col justify-center align-middle space-y-4 animate-marquee-vertical">
                  {[...poojadata].map((pooja, index) => (
                    <Link key={index} href={pooja.name} target="_blank">
                      <Image
                        src={pooja.id}
                        alt="Pooja service"
                        width={400}
                        height={300}
                        className="object-contain rounded-lg"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}


    </>
  );
}

export default HowItWork;
