import Numerology from "@/components/numerology";

export const metadata = {
  title: "AstroVachan: Free Numerology report",
  description:
    "Free online numerology report. Get detailed analysis from the best astrologers online.",
  openGraph: {
    title: "AstroVachan: Consult expert astrologers online now",
    description:
      "Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations.",
    url: "https://www.astrovachan.com/",
    type: "website",
    images: [
      {
        url: "https://www.astrovachan.com/Footer/FooterLogo.png",
        width: 1200, // you can set actual size if known
        height: 630,
        alt: "AstroVachan Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.astrovachan.com/",
  },
};

const Page = () => {
  return (
    <>
      <Numerology />
    </>
  );
};

export default Page;
