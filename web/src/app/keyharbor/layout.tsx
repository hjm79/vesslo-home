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
   alternates: {
      canonical: 'https://vesslo.top/keyharbor',
      languages: {
         'en': 'https://vesslo.top/keyharbor',
         'ko': 'https://vesslo.top/keyharbor',
         'x-default': 'https://vesslo.top/keyharbor',
      },
   },
};

export default function KeyHarborLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "VideoObject",
                  "name": "KeyHarbor — License Key Manager Demo",
                  "description": "KeyHarbor securely manages all your software license keys. Add, organize, and protect your licenses with ease.",
                  "thumbnailUrl": "https://vesslo.top/keyharbor-preview.png",
                  "uploadDate": "2026-01-31T00:00:00+09:00",
                  "contentUrl": "https://vesslo.top/keyharbor/keyharbor_add.mp4",
                  "embedUrl": "https://vesslo.top/keyharbor",
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
