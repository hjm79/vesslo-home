import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a standard modern font
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vesslo - The Ultimate Mac Ecosystem",
  description: "Premium macOS apps: Vesslo (update manager), KeyHarbor (license manager), SplitSwipe (window manager). Native Swift apps for Mac.",
  keywords: ["Mac apps", "macOS", "Vesslo", "KeyHarbor", "SplitSwipe", "update manager", "license manager", "window manager"],
  openGraph: {
    title: "Vesslo - The Ultimate Mac Ecosystem",
    description: "Premium macOS apps for update management, license tracking, and window control.",
    url: "https://vesslo.top",
    siteName: "Vesslo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vesslo - The Ultimate Mac Ecosystem",
    description: "Premium macOS apps for update management, license tracking, and window control.",
  },
  alternates: {
    canonical: 'https://vesslo.top',
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Google Search Console verification code
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-foreground antialiased flex flex-col`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Default to dark for the "diamond" vibe
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex-grow pt-16">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
