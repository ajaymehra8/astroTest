"use client"
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndex((previndexes)=>previndexes.includes(index)? previndexes.filter((i) => i!==index) : [...previndexes,index]);
  };

  
  const faqData = [
    {
      question: "Are astrology readings accurate?",
      answer: `The accuracy of astrology readings can vary significantly depending on the astrologer's skill, experience, and the astrological methods they use. 
      When conducted by knowledgeable astrologers who deeply understand Vedic astrology, Western astrology, or other astrological systems, and have access to precise birth details, astrology readings can provide significant insights into various aspects of life. These aspects include personality traits, potential challenges, and future events.
      
      For instance, an experienced astrologer can offer accurate horoscope readings, kundali matching for marriage, and detailed janam kundali predictions. By analyzing an individual's birth chart, astrologers can uncover information about career astrology, love and marriage predictions, and even health-related guidance.
      
      It's important to approach astrology with an open mind, understanding that it offers guidance rather than definitive predictions. Astrology serves as a tool for self-awareness and personal growth, helping individuals navigate life's uncertainties and make informed decisions.`,
    },
    {
      question: "Can astrology predict the future?",
      answer: "Astrology can provide insights and guidance based on the analysis of celestial patterns, but it does not predict the future with absolute certainty.",
    },
    {
      question: "Can astrology predict marriage?",
      answer: "Astrology can offer insights into compatibility and timing for marriage, often using kundali matching or horoscope analysis.",
    },
    {
      question: "Are astrology apps safe?",
      answer: "Astrology apps can be safe if they are from trusted sources. Always check reviews and data privacy policies before using any app.",
    },

    {
      question: "Can astrology be trusted?",
      answer: "Astrology has been practiced for thousands of years and can be a reliable source of guidance when used correctly. The trustworthiness of astrology largely depends on the expertise of the astrologer and their approach. Astrologers who adhere to traditional practices and deeply understand astrological principles can provide valuable insights. It is important to approach astrology with an open mind and use it as a tool for self-reflection and guidance rather than expecting it to provide absolute answers.",
    },

    {
      question: "Can astrology predict career success?",
      answer: "Astrology can offer valuable guidance on career choices and success by analysing an individual’s birth chart. Astrologers can identify strengths, talents, and potential challenges based on the positions of planets and other astrological factors. This information can help individuals make informed decisions about their career paths, choose suitable professions, and identify the best times for making significant career moves. Astrology provides a framework for understanding one's vocational potential and aligning career choices with natural inclinations and strengths.",
    },
    {
      question: "How does astrology work in human life?",
      answer: "Astrology works by examining the positions and movements of celestial bodies (such as planets and stars) and their influence on human life. Each individual's birth chart, created based on the exact time, date, and place of birth, maps their personality, strengths, weaknesses, and potential life events. Astrologers interpret these charts to provide insights into various aspects of life, including relationships, career, health, and personal growth. Astrology helps individuals understand their inherent traits and navigate life’s challenges with greater awareness.",
    },
    {
      question: "Can astrology predict love marriages?",
      answer: "Astrology can provide indications about the likelihood of a love marriage by analysing specific planetary combinations and aspects in a person’s birth chart. Factors such as the position of Venus and Mars, the seventh house, and its ruling planet play crucial roles in determining romantic inclinations and the potential for a love marriage. Astrologers can offer insights into the nature of romantic relationships and the timing of significant events related to love and marriage.",
    },
    {
      question: "Why is astrology sometimes considered dangerous?",
      answer: "Astrology can be considered dangerous if it is misused or if individuals become overly reliant on it for making decisions. Some people may use astrology to manipulate others or to avoid taking responsibility for their actions. It is important to approach astrology as a tool for guidance and self-reflection rather than a definitive source of answers. Ethical astrologers use their knowledge to empower individuals and help them make informed decisions rather than instilling fear or dependency.",
    },
    {
      question: "How can astrology help you?",
      answer: "Astrology can help individuals better understand themselves and their life path. By analysing a birth chart, astrology provides insights into personality traits, strengths, weaknesses, and potential challenges. It can offer guidance on relationships, career choices, health, and personal growth, helping individuals make informed decisions and navigate life’s uncertainties. Astrology promotes self-awareness and can provide comfort and clarity during challenging times.",
    },
    {
      question: "Can astrology predict pregnancy?",
      answer: "Astrology can provide insights into fertility and the timing of pregnancy by examining specific planetary influences in a person’s birth chart. Factors such as the fifth house, its ruling planet, and aspects related to the Moon and Venus play significant roles in indicating periods of fertility and potential for pregnancy. While astrology can suggest favourable times for conception, it is not a substitute for medical advice and should be used as a complementary tool.",
    },
  ];

  return (
    <>
     <div id="FAQs" className='h-20 bg-[#F8F8F8] lg:bg-white'></div>
    <section className="pt-[30px] pb-[60px] lg:px-[80px] px-[18px] bg-[#F8F8F8] lg:bg-white">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="lg:text-[32px] text-[20px] font-bold text-center text-[#67308C] mb-8 playfair-display-heading">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg border-[#6F2C91] lg:text-[20px] text-[14px] bg-[#ffffff]`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <h3
                  className={`font-medium ${
                    openIndex === index ? "text-[#6F2C91] font-roboto font-bold" : "text-[#67308C] font-roboto font-bold "
                  }`}
                >
                  {item.question}
                </h3>
                <span
  className={`transition-transform duration-300 flex items-center justify-center w-12 h-12 bg-[#F2E4FC] rounded-full ${
    openIndex.includes(index) ? "rotate-180" : "rotate-0"
  } text-[#6F2C91]`}
>
  <IoIosArrowDown className="text-xl" />
</span>

              </button>

              {openIndex.includes(index) && (
                <div className="p-4 text-[#424242] font-[Roboto] font-normal lg:text-lg text-[12px] border-t border-gray-200">
                  <p className="leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default FAQs;
