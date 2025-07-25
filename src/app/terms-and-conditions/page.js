import SearchParamsComponent from "@/components/TermsAndCondition/SearchParamsComponent";
import { Suspense } from "react";
import Loader from "@/components/ui/loader"

export const metadata = {
  title: "AstroVachan: Terms n Conditions",
  description:
    "Terms and conditions for customers and astrologers usng the AstroVachan online astrology platform.",
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
    <Suspense fallback={<Loader/>}>
      <SearchParamsComponent />
    </Suspense>
  );
};

export default Page;

