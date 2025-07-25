import Kalsarpdosh from "@/components/Kalsharpdosh/kalsharpdosh";
import Head from "next/head";


function page () {
    return (
        <div className="min-h-screen">
             <Head>
       <title>Kalsarpdosh- AstroVachan: Consult expert astrologers online now</title>
        <meta
          name="description"
          content="Kalsarpdosh- Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey."
        />


        <meta property="og:title" content="Kalsarpdosh- AstroVachan: Consult expert astrologers online now" />
        <meta property="og:description" content="Kalsarpdosh- Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey." />
        <meta property="og:image" content="https://www.astrovachan.com/Footer/FooterLogo.png" />
    </Head>
       <Kalsarpdosh/>
        </div>
    )
}

export default page;