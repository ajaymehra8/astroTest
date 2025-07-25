import Details from "@/components/Profile/Profile";

export const metadata = {
  title: "AstroVachan: Online Astrologer",
  description:
    "Expert astrologer with astrology, numerology, palmistry, nadi, tarot offerings online for free.",
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

function page() {
  return (
    <>
      <Details />
    </>
  );
}

export default page;
