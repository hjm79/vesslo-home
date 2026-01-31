"use client";

import dynamic from "next/dynamic";

const CSS3DCube = dynamic(() => import("./CSS3DCube"), { ssr: false });

export default function CSS3DCubeWrapper(props: { iconUrl: string, color: string }) {
   return <CSS3DCube {...props} size={180} />;
}
