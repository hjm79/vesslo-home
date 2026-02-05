import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Gallery - Vesslo Ecosystem Showcase",
   description: "Explore the Vesslo ecosystem in an interactive 3D gallery. See Vesslo, KeyHarbor, and SplitSwipe in action.",
   openGraph: {
      title: "Gallery - Vesslo Ecosystem Showcase",
      description: "Explore the Vesslo ecosystem in an interactive 3D gallery.",
      url: "https://vesslo.top/gallery",
      images: [{ url: "https://vesslo.top/og-image.png" }],
   },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
