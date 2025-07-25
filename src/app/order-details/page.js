import Main from "@/components/OrderDetails/Main";

export const metadata = {
  title: "AstroVachan: Order History",
  description:
    "View order details for previous consultations with expert astrologers",
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

function Page() {
  return (
    <>
      <Main />
    </>
  );
}

export default Page;
