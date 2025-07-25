import image1 from '../../../../public/whyChooseus/w1.png';
import image2 from '../../../../public/whyChooseus/w2.png';
import image3 from '../../../../public/whyChooseus/w3.png';
import image4 from '../../../../public/whyChooseus/w4.png';
import Image from 'next/image';

function FeaturesSection() {
    const features = [
        {
            title: "Expert Astrologers",
            description: "Our team consists of highly experienced and renowned expert astrologers from across India. With decades of collective experience and a deep understanding of Vedic astrology, our astrologers provide accurate and insightful readings to guide you on your life journey. Whether you seek advice on marriage, career, health, or personal growth, our expert astrologers are here to help you navigate your path with confidence. We strive to onboard expert astrologers and select fine-tuned astrologers through a meticulous selection process. The scrutiny comes from highly experienced astrology experts.",
            image: "https://cdn.astrovachan.com/website/why-service.jpg" 

            
        },
        {
            title: "Comprehensive Services",
            description: "We offer a wide range of comprehensive astrology services to meet all your needs. Our services include Kundli matching, horoscope consultations, Vastu consultations, numerology, palmistry, and more. Whether you are looking for detailed Janam Kundli predictions, marriage matching, career guidance, or business astrology insights, AstroVachan has you covered. Our holistic approach ensures that you receive well-rounded guidance on every aspect of your life.",
            image: "https://cdn.astrovachan.com/website/why-astro.jpg"
        },
        {
            title: "User-Friendly Platform",
            description: "AstroVachan is designed with user convenience in mind. Our platform is intuitive and easy to navigate, allowing you to quickly access and book the services you need from the comfort of your home. You can easily browse through our services, select your preferred astrologer, and schedule consultations at your convenience. We also offer seamless online payment options to make your experience as smooth as possible.",
            image: "https://cdn.astrovachan.com/website/why-p13n.jpg"
        },
        {
            title: "Personalized Consultations",
            description: "Receive personalised horoscope consultations tailored to your unique birth chart and personal details. Our astrologers take the time to understand your circumstances and provide customised advice and predictions based on your situation. This personalised approach ensures that the guidance you receive is relevant and actionable, helping you make informed decisions and achieve your life goals.",
            image: "https://cdn.astrovachan.com/website/why-user.jpg"
        }
    ];

    return (
        <>
        <div className='h-16 bg-[#F8F8F8] lg:bg-white'></div>
        <div id='Why Us?' className='lg:bg-[#FFFFFF] bg-[#F8F8F8]'>
        <section  className="lg:pt-[24px]  lg:px-20 ">
            <div className="container mx-auto px-[18px]  max-w-[1280px]">
                <h2 className="lg:text-[32px] text-[20px] playfair-display-heading font-bold text-center text-[#6F2C91] mb-12">
                    Why Choose AstroVachan?
                </h2>

                <div className="space-y-5">
                    {features.map((feature, index) => (
                        <div  
                            key={index}
                            className={`flex flex-col md:flex-row bg-[#FCF8FF] items-center border border-[#6F2C91]  rounded-lg p-6 shadow-md ${
                                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                        >
                            <div   className="w-full md:w-1/3 flex flex-col items-center lg:mb-4 mb-0 md:mb-0">
                            <h3 className="w-max lg:text-xl text-[16px] h-11 bg-[#F2E4FC] font-medium text-center py-2 rounded-full px-8 text-[#6F2C91] font-roboto ">
                                    {feature.title}
                                </h3>
                                <Image width={160} height={160}
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-40 h-40 object-contain"
                                />
                            </div>

                            {/* Text */}
                            <div className="w-full pt-8 text-gray-700">
                                
                                <p className="lg:text-[18px] text-[12px] text-center font-medium leading-relaxed font-roboto text-[#646464]">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </div>
        </>
    );
}

export default FeaturesSection;
