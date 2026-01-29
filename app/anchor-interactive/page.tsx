
"use client";
import dynamic from "next/dynamic";

// Dynamically import the Three.js component to avoid SSR issues
const AnchorInteractive = dynamic(() => import("../components/AnchorInteractive"), { ssr: false });

export default function AnchorInteractiveTestPage() {
  return <AnchorInteractive />;
}
