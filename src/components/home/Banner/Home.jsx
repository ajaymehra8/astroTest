import Link from "next/link";
import bgImage from "../../../../public/Home/banner.jpg";
import { FaArrowRight } from "react-icons/fa6";


function Banner() {
    const bannerupdated = "https://cdn.astrovachan.com/website/cover.jpg"
    return (
        <>
        
            <div className="w-full  h-[503px] bg-cover bg-black  opacity-98 bg-center flex align-middle"
                style={{
                    backgroundImage: `url(${bannerupdated})`,
                }}    >
                <div className="absolute lg:max-h-[603px] max-h-[503px] inset-0 bg-black bg-opacity-75"></div>
                <div className=" relative z-20 m-auto w-[915px] self-center h-auto flex flex-col align-middle justify-center gap-12 text-[#ffff] text-center ">
                    <div className="">
                        <h1 className=" font-extrabold lg:text-[42px] text-[20px]  playfair-display-heading" >Welcome to Astro Vachan</h1>
                       
                       
                        <h2 className=" font-extrabold lg:text-[42px] text-[20px] playfair-display-heading" >Your Portal to Cosmic Guidance</h2>
                        <p className="lg:text-[20px] text-[14px] font-normal px-6 lg:px-0 hidden lg:block">(Developed & marketed by Scaltra Technologies Pvt. Ltd.)</p>
                        <p className="lg:text-[20px] text-[14px] font-normal font-roboto tracking-[0.14px] px-6 lg:px-0 block lg:hidden">(Developed & marketed by Scaltra<br /> Technologies Pvt. Ltd.)</p>
                    </div>
                    <button className="font-medium lg:text-[20px] text-[12px] self-center rounded-lg flex  justify-center items-center gap-2 lg:w-[249px] w-[164px] lg:h-[52px] h-[36px]  bg-custom-gradient">
                             <Link
                           
                           
                             href="/talk-to-astrologer"
                            // target="_blank"
                            // rel="noopener noreferrer"
                            className="block font-roboto ">Talk to Astrologers</Link>
                        <FaArrowRight />
                    </button>
                </div>


            </div>
        </>
    )
}

export default Banner;