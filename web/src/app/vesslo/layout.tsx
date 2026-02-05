import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Vesslo - Ultimate Update Manager for macOS",
   description: "The ultimate update manager for macOS. Track App Store, Homebrew, Sparkle, and Electron app updates in one unified dashboard.",
   keywords: ["update manager", "macOS", "Vesslo", "App Store updates", "Homebrew", "Sparkle", "Electron", "Mac app updates"],
   openGraph: {
      title: "Vesslo - Ultimate Update Manager for macOS",
      description: "Track all your Mac app updates in one place. App Store, Homebrew, and more.",
      url: "https://vesslo.top/vesslo",
      images: [{ url: "https://vesslo.top/og-image.png" }],
   },
};

export default function VessloLayout({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
