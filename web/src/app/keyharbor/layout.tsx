import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "KeyHarbor - License Key Manager for macOS | Vesslo",
   description: "Securely store and manage all your software license keys in one place. Beautiful, encrypted, and always accessible on your Mac.",
   keywords: ["license key manager", "macOS", "KeyHarbor", "software license", "key organizer", "Mac app", "license storage"],
   openGraph: {
      title: "KeyHarbor - License Key Manager for macOS",
      description: "Securely store and manage all your software license keys in one place.",
      url: "https://vesslo.top/keyharbor",
      images: [{ url: "https://vesslo.top/og-image.png" }],
   },
};

export default function KeyHarborLayout({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
