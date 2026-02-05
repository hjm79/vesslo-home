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
};

export default function SplitSwipeLayout({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
