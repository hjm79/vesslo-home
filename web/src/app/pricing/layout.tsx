import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Pricing - Vesslo Mac Apps | One-Time Purchase",
   description: "Simple, one-time pricing for Vesslo, KeyHarbor, and SplitSwipe. No subscriptions. Pay once, use forever.",
   keywords: ["Vesslo pricing", "Mac app pricing", "one-time purchase", "no subscription", "KeyHarbor price", "SplitSwipe price"],
   openGraph: {
      title: "Pricing - Vesslo Mac Apps",
      description: "Simple, one-time pricing. No subscriptions. Pay once, use forever.",
      url: "https://vesslo.top/pricing",
      images: [{ url: "https://vesslo.top/og-image.png" }],
   },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
   return <>{children}</>;
}
