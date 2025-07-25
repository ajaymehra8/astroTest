import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import NoScript from '@/components/NoScript';
import { AuthProvider } from "@/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { RechargeProvider } from "@/lib/context/RechargeContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AstroVachan: Consult expert astrologers online now",
  description: "Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey.",
  openGraph: {
    title: "AstroVachan: Consult expert astrologers online now",
    description: "Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://www.astrovachan.com",
    type: "website",
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AstroVachan",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://www.astrovachan.com",
    description: "Unlock your destiny with AstroVachan - the best astrology website offering online astrology consultations. Get insights and guidance for your life's journey.",
  },
  canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://www.astrovachan.com",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
    
    <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1113101680107428');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Google Tag Script */}
        <Script
          id="google-tag"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16622016125"
        />
        <Script
          id="google-tag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16622016125');
            `,
          }}
        />

        {/* Facebook Pixel NoScript Fallback */}
        <NoScript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1113101680107428&ev=PageView&noscript=1"
          />
        </NoScript>


        <AuthProvider>
        <Navbar/>
        <RechargeProvider>{children}</RechargeProvider>
        <Toaster/>
        <ToastContainer />
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
