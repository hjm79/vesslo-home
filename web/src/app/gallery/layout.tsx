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
   alternates: {
      canonical: 'https://vesslo.top/gallery',
      languages: {
         'en': 'https://vesslo.top/gallery',
         'ko': 'https://vesslo.top/gallery',
         'x-default': 'https://vesslo.top/gallery',
      },
   },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
