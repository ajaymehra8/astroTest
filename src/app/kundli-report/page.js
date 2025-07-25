import KundliReport from "@/components/Kundlireport/Kundlireport";
import Head from "next/head";

const page = () => {
  const basicDetails = [
    { field: "Name", value: "Rajesh Kumar" },
    { field: "Time of Birth", value: "06:30 PM" },
    { field: "Date of Birth", value: "2006, Jan 16" },
    { field: "Birth Place", value: "New Delhi, Delhi, India" },
    { field: "Janam Rashi", value: "Libra" },
    { field: "Ayansamsa", value: "Lahiri" },
  ];

  const planetaryPlacements = [
    { planet: "Ascendant", sign: "Jupiter", house: 1, status: "Friendly" },
    { planet: "Sun", sign: "Taurus", house: 9, status: "Friendly" },
    { planet: "Mercury", sign: "Taurus", house: 7, status: "Friendly" },
    { planet: "Mars", sign: "Gemini", house: 8, status: "Friendly" },
    { planet: "Jupiter", sign: "Taurus", house: 1, status: "Enemy" },
    { planet: "Ketu", sign: "Taurus", house: 4, status: "Friendly" },
    { planet: "Rahu", sign: "Taurus", house: 10, status: "Friendly" },
    { planet: "Saturn", sign: "Gemini", house: 2, status: "Enemy" },
    { planet: "Moon", sign: "Sagittarius", house: 6, status: "Owned" },
  ];

  const insights = [
    {
      title: "Health",
      description:
        "Those born with the Libra ascendant are relatively introverted, despite the fact they represent the animal bull. These people like to create their own little world stud with luxuries and comfort. However, they are also aware of the fact that having these luxuries will require hard work and commitment and thus always try to achieve greater and better things in life. Despite being an introvert, Taurus ascendants are really friendly and fun-loving. These people also have a great sense of humor, and you could never get bored when around them. However, one should know that these people never reveal all of them to anybody. They have their secrets which they try to deal with personally. No matter how close you are with a Taurus ascendant, you would hardly know about their sorrows.",
    },
    {
      title: "Career",
      description:
        "Those born with the Libra ascendant are relatively introverted, despite the fact they represent the animal bull. These people like to create their own little world stud with luxuries and comfort. However, they are also aware of the fact that having these luxuries will require hard work and commitment and thus always try to achieve greater and better things in life. Despite being an introvert, Taurus ascendants are really friendly and fun-loving. These people also have a great sense of humor, and you could never get bored when around them. However, one should know that these people never reveal all of them to anybody. They have their secrets which they try to deal with personally. No matter how close you are with a Taurus ascendant, you would hardly know about their sorrows.",
    },
    {
      title: "Relationship",
      description:
        "Those born with the Libra ascendant are relatively introverted, despite the fact they represent the animal bull. These people like to create their own little world stud with luxuries and comfort. However, they are also aware of the fact that having these luxuries will require hard work and commitment and thus always try to achieve greater and better things in life. Despite being an introvert, Taurus ascendants are really friendly and fun-loving. These people also have a great sense of humor, and you could never get bored when around them. However, one should know that these people never reveal all of them to anybody. They have their secrets which they try to deal with personally. No matter how close you are with a Taurus ascendant, you would hardly know about their sorrows.",
    },
    {
      title: "Future Events",
      description:
        "Those born with the Libra ascendant are relatively introverted, despite the fact they represent the animal bull. These people like to create their own little world stud with luxuries and comfort. However, they are also aware of the fact that having these luxuries will require hard work and commitment and thus always try to achieve greater and better things in life. Despite being an introvert, Taurus ascendants are really friendly and fun-loving. These people also have a great sense of humor, and you could never get bored when around them. However, one should know that these people never reveal all of them to anybody. They have their secrets which they try to deal with personally. No matter how close you are with a Taurus ascendant, you would hardly know about their sorrows.",
    },
  ];
  return (
    <>
     <Head>
       <title>Astrologer Profile - AstroVachan: Consult expert astrologers online now</title>
        <meta
          name="description"
          content="Astrologer Profile - Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey."
        />


        <meta property="og:title" content="Astrologer Profile - AstroVachan: Consult expert astrologers online now" />
        <meta property="og:description" content="Astrologer Profile - Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey." />
        <meta property="og:image" content="https://www.astrovachan.com/Footer/FooterLogo.png" />
    </Head>
    
    <KundliReport
      basicDetails={basicDetails}
      planetaryPlacements={planetaryPlacements}
      insights={insights}
      headings={
        { mainTitle: "Kundli Report",
          table1: "Basic Details",
        birthchart:"Birthchart",
      table2:"Planetary Placements",
      sh1:"Planets",
      sh2:"Sign",
      sh3:"House",
      sh4:"Status",
      table3:"Astrological Insights",
      suh1:"General",
      suh2:"Description"
    }
      }
    />
    </>
  );
};

export default page;
