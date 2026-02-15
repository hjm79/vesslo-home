import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "HarborDrop - Smart Download Manager for macOS | Vesslo",
   description: "Speed up large downloads with multi-segment acceleration, capture HLS streams, and auto-categorize files by extension and domain. Built for macOS.",
   keywords: ["download manager", "macOS", "HarborDrop", "HLS download", "m3u8", "segmented download", "Mac productivity", "file automation"],
   openGraph: {
      title: "HarborDrop - Smart Download Manager for macOS",
      description: "Multi-segment acceleration, HLS workflow, and auto-categorization for macOS downloads.",
      url: "https://vesslo.top/harbordrop",
      images: [{ url: "https://vesslo.top/og-image.png" }],
   },
};

export default function HarborDropLayout({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
