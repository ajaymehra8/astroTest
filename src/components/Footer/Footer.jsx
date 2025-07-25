import logo from "../../../public/Footer/FooterLogo.png";
import Image from "next/image";
import { MdFacebook } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";


const Footer = () => {


    return (
        <footer  className="bg-[#272727] text-white lg:px-20 ps-[17px] pe-[16px]  pt-[60px] pb-[30px]">
            <div className="container flex gap-8 mx-auto flex-col md:flex-row md:gap-12">

                <div className="w-[338px]">
                    <div className="mb-4">
                        <Image src={logo} alt="Logo" className="h-16 w-auto" />
                    </div>
                    <h3 className="font-bold mb-2 font-roboto">Disclaimer</h3>
                    <p className="lg:text-sm text-[12px] leading-relaxed font-roboto">
                        AstroVachan only provides astrological services. Our platform does
                        not offer medical, legal, or financial advice. Users are advised to
                        use their discretion and judgement when seeking guidance from our
                        astrologers.
                    </p>
                </div>


                {/* <div>
                    <h3 className="font-bold mb-4 font-roboto">Important Links</h3>
                    <ul className="space-y-2">
                        {[
                            "Free Kundli Generation",
                            "Free matchmaking",
                            "Daily Horoscope",
                            "Chat with Astrologer",
                            "Talk to Astrologers",
                            "Numerology Reading",
                            "Birth Chart Generator",
                            "Zodiac Signs",
                        ].map((link, index) => (
                            <li key={index} className="text-sm font-normal hover:underline cursor-pointer font-roboto">
                                {link}
                            </li>
                        ))}
                    </ul>
                </div> */}

                <div>
                    <h3 className="font-bold mb-4 font-roboto">Legal</h3>
                    <ul className="space-y-2">
                        <li className="text-sm hover:underline cursor-pointer font-roboto">
                           <Link href={{pathname: "/terms-and-conditions",query: { name: "privacy" }}} >
                           Privacy policy
                           </Link>
                        </li>
                        <li className="text-sm hover:underline cursor-pointer font-roboto">
                        <Link href={{pathname: "/terms-and-conditions",query: { name: "terms" }}}>
                            Terms and Conditions
                            </Link>
                        </li>
                        <li className="text-sm font-roboto">GST No: 29ABLCS6083L1ZH</li>
                    </ul>
                </div>

                <div  className="w-[339px]">
                    <h3 id="Contact Us" className="font-bold mb-4 font-roboto">Contact</h3>
                    <a href="https://wa.me/919535587860"  target="_blank" className="flex items-center gap-2">
                    <FaWhatsapp className="mb-2 align-middle" />
                    <p className="text-sm mb-2 font-roboto cursor-pointer">
                        WhatsApp: +91 9535587860</p>
                        </a>
                         <a  className="flex items-center gap-2">
                        <IoIosCall className="mb-2 align-middle" />
                    <p className="text-sm mb-2 font-roboto cursor-pointer">Call: +91 9953906154</p>
                    </a>
                    <a href="mailto:support@astrovachan.com" className="text-sm mb-2 font-roboto cursor-pointer">Email: support@astrovachan.com</a>
                    <p className="text-sm font-roboto mt-2">
                        Address: Scaltra Technologies Pvt. Ltd. (Opposite Westside),
                        Doddakannelli, Sarjapur Road, Bengaluru-560035
                    </p>
                </div>
                <div className="flex min-w-fit flex-col gap-4 font-roboto">
                    <h3 className="font-[600]">Follow us on</h3>
                    <div className=" flex gap-4 " >
                        <a href="https://www.facebook.com/iloveastrovachan"  target="_blank" className="hover:text-gray-400">
                            <MdFacebook className=" w-6 h-6 " />
                        </a>
                        <a href="https://www.instagram.com/astro_vachan/"  target="_blank" className="hover:text-gray-400">
                            <AiFillInstagram className=" w-6 h-6 "/>
                        </a>
                        <a href="https://www.linkedin.com/company/astro-vachan"  target="_blank" className="hover:text-gray-400">
                            <IoLogoLinkedin className=" w-6 h-6 "/>
                        </a>
                    </div>
                </div>

            </div>
            <div  className=" items-center  border-t border-[#FFFFFF] mt-8 pt-4">
                <p className="text-sm text-center font-roboto">Copyright&copy; 2024. All rights reserved.</p>

            </div>

        </footer>

    );
};

export default Footer;
