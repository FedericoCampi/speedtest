import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import * as dotenv from 'dotenv';
import Script from "next/script";

dotenv.config();

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Speed test App",
  description: "App for testing speed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="description" content="Mide la velocidad de tu conexión a internet de manera rápida y precisa. Descubre tu velocidad de descarga, carga y latencia en segundos." />
        <meta name="keywords" content="speedtest, speed test, internet, velocidad, test, conexión, descarga, carga, ping, latencia, pc lenta, pc rapida, ejecución, wifi" />
        <meta property="og:title" content="Speedtest - Mide tu velocidad de Internet" />
        <meta property="og:description" content="Mide la velocidad de tu conexión a internet de manera rápida y precisa. Descubre tu velocidad de descarga, carga y latencia en segundos." />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://speedtest.com" />
        <meta name="google-site-verification" content="G-ZG526NXPX8" />
      </head>

      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-ZG526NXPX8`}></Script>
      <Script id="ga-script" strategy="afterInteractive">
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());

           gtag('config', 'G-ZG526NXPX8');
          
          `}
      </Script>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
