
import Image from "next/image";
import cycleImage from '../../../../public/Home/cycle.png'
import cserviceImage1 from '../../../../public/Home/1.png'
import cserviceImage2 from '../../../../public/Home/2.png'
import cserviceImage3 from '../../../../public/Home/3.png'
import cserviceImage4 from '../../../../public/Home/4.png'
import cserviceImage5 from '../../../../public/Home/5.png'
import cserviceImage6 from '../../../../public/Home/6.png'
import cserviceImage7 from '../../../../public/Home/7.png'
import cserviceImage8 from '../../../../public/Home/8.png'
import * as React from "react"
import Link from "next/link";

export default function ServiceAndAboutus() {

  return (
    <div className="min-h-screen">

      <section id="About Us" className="bg-white lg:h-[700px] h-[450px] flex lg:pl-[85px] px-[19px] align-middle ">
        <div className="flex flex-col md:flex-row items-center lg:justify-end justify-center">
          <div className="md:w-1/2">
            <h2 className="playfair-display-heading text-[20px] lg:text-3xl md:text-4xl font-bold text-purple-800 mb-4 flex lg:justify-start justify-center items-center">
              About Us
            </h2>
            <p className="text-gray-600 mb-6 lg:text-[20px] text-[14px] font-roboto">
              Welcome to <span className="text-purple-600 font-bold">AstroVachan</span> where we bring the ancient wisdom of astrology to the modern world through our comprehensive online platform.
            </p>
            <p className="text-gray-600 lg:text-[20px] text-[14px] font-roboto">
              Whether you're seeking insights into your future, looking for the perfect match, or needing guidance on important life decisions, our expert astrologers are here to help. We specialize in online astrology consultations, Kundli matching, and horoscope services tailored to meet your unique needs.
            </p>
          </div>
          <div className="md:w-1/2 hidden lg:visible lg:flex justify-center mt-8 md:mt-0 2xl:w-[684px] xl:w-[684px] lg:w-[684px]">
            <Image
              src="https://cdn.astrovachan.com/website/sign-wheel.jpg"
              alt="Zodiac Wheel"
              width={684}
              height={380}
              className=" relative rounded-lg h-[692px]"
            />
          </div>
        </div>
      </section>
      <div id="Our Services" className="bg-[#F8F8F8]">
        <section className="lg:bg-gradient-to-br from-orange-500 to-purple-700 bg-[#F8F8F8] text-white lg:px-20 px-2 pt-16 pb-24">
          <div className="text-center mb-8  ">
            <h2 className="text-[20px] lg:text-white text-purple-800 md:text-4xl font-[Playfair Display] font-medium playfair-display-heading">Our Services</h2>
            {/* <button className="lg:hidden  block underline text-purple-800 text-[14px] font-[roboto] self-end justify-end absolute right-4">View all</button> */}
          </div>

          {/* <div className="lg:grid hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16">
            {services.map((service) => (
              <Link key={service.title} href={service.redirect}>
                <div
                  key={service.title}
                  className="bg-orange-50 min-h-[188px] text-black rounded-lg p-7 flex flex-col items-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]"
                >
                  <Image src={service.icon} width={64} height={64} alt="icons" />
                  <p className="text-lg font-semibold text-center ">
                    {service.title}
                  </p>
                </div>
              </Link>
            ))}

            
            
          </div> */}


<div className="lg:grid hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16">
  {services.slice(0, 3).map((service) => (
    <Link key={service.title} href={service.redirect}>
      <div className="bg-orange-50 min-h-[188px] text-black rounded-lg p-7 flex flex-col items-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]">
        <Image src={service.icon} width={64} height={64} alt="icons" />
        <p className="text-lg font-semibold text-center">{service.title}</p>
      </div>
    </Link>
  ))}

  {/* Center the last row if there are exactly 2 items */}
  {services.length % 3 === 2 && (
    <div className="lg:col-span-3 flex justify-center gap-6">
      {services.slice(3).map((service) => (
        <Link key={service.title} href={service.redirect}>
          <div className="min-w-[337px] bg-orange-50 min-h-[188px] text-black rounded-lg p-7 flex flex-col items-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]">
            <Image src={service.icon} width={64} height={64} alt="icons" />
            <p className="text-lg font-semibold text-center">{service.title}</p>
          </div>
        </Link>
      ))}
    </div>
  )}
</div>




          <div className="lg:hidden w-full max-w-xs mx-auto overflow-hidden relative">
            <div className="flex flex-col items-center">
              {/* <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <Link key={index} href={service.redirect}>
                    <div className="w-30">
                      <div className="p-4 h-40 bg-orange-50 text-black rounded-lg flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]">
                        <Image
                          width={64}
                          height={64}
                          src={service.icon}
                          alt={service.title}
                          className="w-16 h-16 object-contain"
                        />
                        <p className="text-black text-center text-sm font-bold font-roboto">
                          {service.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div> */}


<div className="flex flex-col items-center">
  <div className="grid grid-cols-2 gap-4">
    {services.slice(0, Math.floor(services.length / 2) * 2).map((service, index) => (
      <Link key={index} href={service.redirect}>
        <div className="w-30">
          <div className="p-4 h-40 bg-orange-50 text-black rounded-lg flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]">
            <Image
              width={64}
              height={64}
              src={service.icon}
              alt={service.title}
              className="w-16 h-16 object-contain"
            />
            <p className="text-black text-center text-sm font-bold font-roboto">
              {service.title}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>

  {/* Center the last row if there's a single item left */}
  {services.length % 2 !== 0 && (
    <div className="flex justify-center mt-4">
      <Link key={services[services.length - 1].title} href={services[services.length - 1].redirect}>
        <div className="min-w-[155px]">
          <div className="p-4 h-40 bg-orange-50 text-black rounded-lg flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg transition border-2 border-[#F58132]">
            <Image
              width={64}
              height={64}
              src={services[services.length - 1].icon}
              alt={services[services.length - 1].title}
              className="w-16 h-16 object-contain"
            />
            <p className="text-black text-center text-sm font-bold font-roboto">
              {services[services.length - 1].title}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )}
</div>

            </div>

          </div>

        </section>
      </div>
    </div>
  );
}

export const services = [
  { title: "Talk to Astrologer", icon: "https://cdn.astrovachan.com/website/srv-talk.jpg" ,redirect:"/talk-to-astrologer"},
  { title: "Free Kundli generator", icon: "https://cdn.astrovachan.com/website/srv-bc.jpg" , redirect:"/kundli-generation" },
  { title: "Free Numerology chart", icon: "https://cdn.astrovachan.com/website/srv-numero.jpg" ,redirect:"/numerology"},
  // { title: "Free daily horoscope", icon: "https://cdn.astrovachan.com/website/srv-horo.jpg" ,redirect:"/zodiacsign"},
  
  { title: "Premium match-making report", icon: "https://cdn.astrovachan.com/website/srv-marr.jpg" ,redirect:"https://rzp.io/rzp/qkBRsPJ"},
  { title: "Online Pooja ", icon: "https://cdn.astrovachan.com/website/srv-pooja.jpg" ,redirect:"/#Online Pooja"},
 
];
