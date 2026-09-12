import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AutoScrollReveal from "@/components/AutoScrollReveal";
import TransitionProvider from "@/providers/TransitionProvider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteDescription =
  "Strategic advisory, process optimization, market intelligence, and BI decision support: clarity for leadership decisions.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "http://localhost:3000",
  ),
  title: {
    default: "QuantEdgeDataSolutions",
    template: "QuantEdgeDataSolutions | %s",
  },
  description: siteDescription,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "QuantEdgeDataSolutions",
    title: "QuantEdgeDataSolutions",
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "QuantEdgeDataSolutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantEdgeDataSolutions",
    description: siteDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <TransitionProvider>
          <div className="app-shell">
            <Navbar />
            {children}
            <Footer />
          </div>
          <CookieConsent />
          <GoogleAnalytics />
          <AutoScrollReveal />
        </TransitionProvider>
      </body>
    </html>
  );
}
