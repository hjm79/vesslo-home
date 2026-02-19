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
   alternates: {
      canonical: 'https://vesslo.top/vesslo',
      languages: {
         'en': 'https://vesslo.top/vesslo',
         'ko': 'https://vesslo.top/vesslo',
         'x-default': 'https://vesslo.top/vesslo',
      },
   },
};

export default function VessloLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "VideoObject",
                  "name": "Vesslo — Mac App Manager Overview",
                  "description": "Vesslo manages all your Mac apps in one place. Update Homebrew, Sparkle, and App Store apps with a single click.",
                  "thumbnailUrl": "https://vesslo.top/vesslo-preview.png",
                  "uploadDate": "2026-01-31T00:00:00+09:00",
                  "contentUrl": "https://vesslo.top/vesslo/vesslo_05.mp4",
                  "embedUrl": "https://vesslo.top/vesslo",
                  "publisher": {
                     "@type": "Organization",
                     "name": "Vesslo",
                     "logo": {
                        "@type": "ImageObject",
                        "url": "https://vesslo.top/vesslo_icon.png"
                     }
                  }
               })
            }}
         />
         {children}
      </>
   );
}
