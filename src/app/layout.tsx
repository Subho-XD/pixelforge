import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import BackgroundWatermark from "@/components/BackgroundWatermark";
import ThemeProvider from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixelForge | Premium Graphic Design Masterclass & Agency",
  description: "Unlock your creative potential with PixelForge. We offer premium graphic design classes, branding services, and visual storytelling for founders and creative professionals.",
  keywords: ["graphic design classes", "branding agency", "visual design", "learn graphic design", "creative masterclass", "PixelForge", "design education", "social media design", "YouTuber branding"],
  authors: [{ name: "PixelForge Team" }],
  creator: "PixelForge",
  publisher: "PixelForge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://thepixelforge.digital"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PixelForge | Premium Graphic Design Masterclass & Agency",
    description: "Master the art of visual storytelling with our premium design classes and branding services.",
    url: "https://thepixelforge.digital",
    siteName: "PixelForge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelForge | Premium Graphic Design Masterclass & Agency",
    description: "Unlock your creative potential with our premium design classes and branding services.",
    creator: "@pixelforge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased transition-colors duration-500`}
    >
      <body className="flex flex-col font-sans bg-background text-foreground overflow-x-clip overscroll-none">
        <ThemeProvider>
          <BackgroundWatermark />
          <CustomCursor />
          <LenisProvider>
            <div className="flex flex-col min-h-screen">
              {children}
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
