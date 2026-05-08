import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppFloatingButton from "@/components/Client/WhatsAppFloatingButton/WhatsAppFloatingButton";
import Scroll from "@/components/Client/Scroll/Scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO OPTIMIZED METADATA
export const metadata = {
  title: {
    default: "Visa Express Hub – Visa Guides Worldwide",
    template: "%s | Visa Express Hub",
  },
  description:
    "Get latest visa requirements, processing times, document checklists, SOP & NOC templates, and application guides for tourist, student, work, and transit visas worldwide. Free and always updated.",

  keywords: [
    "visa guide",
    "visa requirements",
    "tourist visa",
    "student visa",
    "work visa",
    "visa processing time",
    "visa checklist",
    "SOP template",
    "NOC letter",
    "Schengen visa",
  ],

  metadataBase: new URL("https://visaexpresshub.com"), // change to your domain

  openGraph: {
    title: "Visa Express Hub – Visa Guides for 195+ Countries",
    description:
      "Free visa guides, processing time tracker, document checklist, SOP & NOC templates.",
    url: "https://visaexpresshub.com",
    siteName: "Visa Express Hub",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* 🔒 FORCE LIGHT MODE ON ALL DEVICES */}
        <meta name="color-scheme" content="light" />
      </head>

      <body className="min-h-screen flex flex-col bg-white text-black">
        <Header />

        <main className="flex-grow">
          {children}
        </main>
        <WhatsAppFloatingButton />
        <Scroll />

        <Footer />
      </body>
    </html>
  );
}