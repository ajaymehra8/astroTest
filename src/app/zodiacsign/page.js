import Head from 'next/head';
import Zodiacsign from '../../components/ZodiacSign/Zodiac'

function page() {
  return (
    <>
    <Head>
     <Head>
       <title>Zodiac Sign - AstroVachan: Consult expert astrologers online now</title>
        <meta
          name="description"
          content="Zodiac Sign - Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey."
        />


        <meta property="og:title" content="Zodiac Sign - AstroVachan: Consult expert astrologers online now" />
        <meta property="og:description" content="Zodiac Sign - Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey." />
        <meta property="og:image" content="https://www.astrovachan.com/Footer/FooterLogo.png" />
    </Head>
  </Head>
    <Zodiacsign/>
    </>
  )
}

export default page;