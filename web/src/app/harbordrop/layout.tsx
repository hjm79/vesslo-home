import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "HarborDrop - IDM for Mac | Smart Download Manager for macOS | Vesslo",
   description: "HarborDrop is the IDM (Internet Download Manager) for Mac. Multi-segment accelerated downloads, HLS stream capture, and auto-categorization for macOS.",
   keywords: ["IDM for Mac", "Internet Download Manager Mac", "Mac IDM", "download manager", "macOS", "HarborDrop", "IDM macOS", "HLS download", "m3u8", "segmented download", "Mac productivity", "file automation"],
   openGraph: {
      title: "HarborDrop - IDM for Mac | Smart Download Manager",
      description: "The IDM (Internet Download Manager) for Mac. Multi-segment acceleration, HLS workflow, and auto-categorization for macOS.",
      url: "https://vesslo.top/harbordrop",
      images: [{ url: "https://vesslo.top/og-image.png" }],
   },
   alternates: {
      canonical: 'https://vesslo.top/harbordrop',
      languages: {
         'en': 'https://vesslo.top/harbordrop',
         'ko': 'https://vesslo.top/harbordrop',
         'x-default': 'https://vesslo.top/harbordrop',
      },
   },
};

export default function HarborDropLayout({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
