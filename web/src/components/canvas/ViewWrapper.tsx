"use client";

import dynamic from "next/dynamic";

const AppIconViewer = dynamic(() => import("./AppIconViewer"), { ssr: false });

export default function ViewWrapper(props: { iconUrl: string, color: string }) {
   return <AppIconViewer {...props} />;
}
