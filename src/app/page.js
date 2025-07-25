import Banner from "@/components/home/Banner/Home";
import ServiceAndAboutus from "@/components/home/Service&Aboutus";
import HowItWork from "@/components/home/HowitsWorks/HowItWork";
import FeaturesSection from "@/components/home/Feature/FeatureSection";
import FAQs from "@/components/home/FrequentlyAsked/FrequentlyAsked";
import { Fa0 } from "react-icons/fa6";
import Head from "next/head";
import Script from "next/script";

export const metadata = {
  title: "AstroVachan: Kundli and Astrology consultations",
  description:
    "Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey.",
  openGraph: {
    title: "AstroVachan: Consult expert astrologers online now",
    description:
      "Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations.",
    url: "https://www.astrovachan.com/",
    type: "website",
    images: [
      {
        url: "https://www.astrovachan.com/Footer/FooterLogo.png",
        alt: "AstroVachan Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.astrovachan.com/",
  },
};
export default function Home() {
  return (
    <>
      <Script type="application/ld+json" id="schema-org">
        {`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AstroVachan",
  "logo": "https://www.astrovachan.com/Footer/FooterLogo.png",
  "url": "https://www.astrovachan.com"
}
`}
      </Script>
      <Banner />
      <ServiceAndAboutus />
      <HowItWork />
      <FeaturesSection />
      <FAQs />
    </>
  );
}
