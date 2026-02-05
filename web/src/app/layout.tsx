import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a standard modern font
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vesslo - The Ultimate Mac Ecosystem",
  description: "Elevate your Mac experience with Vesslo, KeyHarbor, and SplitSwipe ecosystem. The ultimate update manager, license key organizer, and window manager for macOS.",
  keywords: ["Mac apps", "macOS", "Vesslo", "KeyHarbor", "SplitSwipe", "update manager", "license manager", "window manager", "Mac utility", "app update", "Homebrew", "App Store updates", "Mac productivity"],
  openGraph: {
    title: "Vesslo - The Ultimate Mac Ecosystem",
    description: "Elevate your Mac experience with Vesslo, KeyHarbor, and SplitSwipe ecosystem.",
    url: "https://vesslo.top",
    siteName: "Vesslo",
    type: "website",
    images: [
      {
        url: "https://vesslo.top/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vesslo - The Ultimate Mac Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vesslo - The Ultimate Mac Ecosystem",
    description: "Elevate your Mac experience with Vesslo, KeyHarbor, and SplitSwipe ecosystem.",
    images: ["https://vesslo.top/og-image.png"],
  },
  alternates: {
    canonical: 'https://vesslo.top',
    languages: {
      'en': 'https://vesslo.top',
      'ko': 'https://vesslo.top?lng=ko',
      'x-default': 'https://vesslo.top',
    },
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
