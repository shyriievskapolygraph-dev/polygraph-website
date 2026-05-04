import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Script from "next/script";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import "./globals.css";

const GTM_ID = "GTM-TP4XFMHT";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#2A2A2A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Поліграфолог у Києві — Ірина Ширієвська",
    template: "%s | Поліграфолог Ірина Ширієвська",
  },
  description:
    "Сертифікований поліграфолог у Києві з досвідом 11+ років. Перевірка персоналу, службові розслідування, приватні запити.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "geo.region": "UA-30",
    "geo.placename": "Київ",
    "geo.position": "50.4501;30.5234",
    ICBM: "50.4501, 30.5234",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${cormorant.variable} ${jost.variable} h-full`}>
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="min-h-full antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
