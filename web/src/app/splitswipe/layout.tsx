import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "SplitSwipe - Window Manager for macOS | Vesslo",
   description: "Intuitive window management for macOS. Organize your workspace with elegant snapping, resizing, and keyboard shortcuts.",
   keywords: ["window manager", "macOS", "SplitSwipe", "window snapping", "screen layout", "Mac productivity", "window organizer"],
   openGraph: {
      title: "SplitSwipe - Window Manager for macOS",
      description: "Intuitive window management for macOS. Organize your workspace effortlessly.",
      url: "https://vesslo.top/splitswipe",
      images: [{ url: "https://vesslo.top/og-image.png" }],
   },
   alternates: {
      canonical: 'https://vesslo.top/splitswipe',
      languages: {
         'en': 'https://vesslo.top/splitswipe',
         'ko': 'https://vesslo.top/splitswipe',
         'x-default': 'https://vesslo.top/splitswipe',
      },
   },
};

export default function SplitSwipeLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify([
                  {
                     "@context": "https://schema.org",
                     "@type": "VideoObject",
                     "name": "SplitSwipe — Window Manager Demo",
                     "description": "SplitSwipe lets you snap and arrange windows effortlessly on macOS with intuitive swipe gestures.",
                     "thumbnailUrl": "https://vesslo.top/splitswipe-preview.png",
                     "uploadDate": "2026-01-31T00:00:00+09:00",
                     "contentUrl": "https://vesslo.top/splitswipe/splitswipe_move.mp4",
                     "embedUrl": "https://vesslo.top/splitswipe",
                     "publisher": {
                        "@type": "Organization",
                        "name": "Vesslo",
                        "logo": {
                           "@type": "ImageObject",
                           "url": "https://vesslo.top/vesslo_icon.png"
                        }
                     }
                  },
                  {
                     "@context": "https://schema.org",
                     "@type": "VideoObject",
                     "name": "SplitSwipe — 3-Way Split Demo",
                     "description": "SplitSwipe 3-way split mode for advanced window management on macOS.",
                     "thumbnailUrl": "https://vesslo.top/splitswipe-preview.png",
                     "uploadDate": "2026-01-31T00:00:00+09:00",
                     "contentUrl": "https://vesslo.top/splitswipe/splitswipe_3move.mp4",
                     "embedUrl": "https://vesslo.top/splitswipe",
                     "publisher": {
                        "@type": "Organization",
                        "name": "Vesslo",
                        "logo": {
                           "@type": "ImageObject",
                           "url": "https://vesslo.top/vesslo_icon.png"
                        }
                     }
                  }
               ])
            }}
         />
         {children}
      </>
   );
}
