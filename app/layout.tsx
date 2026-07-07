import type { Metadata } from "next";
import { Poppins, Prompt } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "./providers";
import NavSection from "@/components/sections/NavSection";
import FooterSection from "@/components/sections/FooterSection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ScrollIndicator from "@/components/ScrollIndicator";
import PageTransition from "@/components/PageTransition";

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const prompt = Prompt({
  variable: "--font-support",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rannastudios.com"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  title: "Ranna Studios — Experiences People Remember. Systems Events Rely On.",
  description:
    "Ranna Studios is a multidisciplinary studio network designing, building, and operating high-impact experiences across activations, creative direction, technology, and event production throughout the GCC.",
  keywords: [
    "experiential marketing GCC",
    "activation agency Saudi Arabia",
    "fan zone activations",
    "event entertainment GCC",
    "Formula 1 activations",
    "event systems integration",
    "guest flow management",
    "cultural activations",
    "immersive experiences GCC",
    "luxury event experiences",
    "event operations consultancy",
    "VIP event experiences",
    "destination activations",
    "public space activations",
    "government event activations",
  ],
  openGraph: {
    title: "Ranna Studios — A multidisciplinary studio network for the region's most ambitious experiences.",
    description:
      "Activations · Creative Direction · Entertainment Technology · Production Execution. Built for the GCC.",
    type: "website",
    locale: "en_US",
    url: "https://rannastudios.com",
    siteName: "Ranna Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ranna Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rannastudios",
    title: "Ranna Studios — Experiences People Remember. Systems Events Rely On.",
    description:
      "Activations · Creative Direction · Entertainment Technology · Production Execution. Built for the GCC.",
    images: ["/og-image.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ranna Studios",
  "url": "https://rannastudios.com",
  "logo": "https://rannastudios.com/logo.png",
  "description":
    "Ranna Studios designs, builds, and operates high-impact experiences across activations, creative direction, technology, and event production throughout the GCC.",
  "foundingDate": "2021",
  "areaServed": ["Saudi Arabia", "UAE", "Qatar", "Lebanon"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966-55-152-0499",
    "contactType": "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${prompt.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          <PageTransition />
          <NavSection />
          <main>{children}</main>
          <FooterSection />
          <WhatsAppCTA />
          <ScrollIndicator />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
