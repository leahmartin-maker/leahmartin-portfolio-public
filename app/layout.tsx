import type { Metadata } from "next";
import { Geist, Geist_Mono, Loved_by_the_King, Just_Another_Hand } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Handwriting font - Loved by the King
const lovedByTheKing = Loved_by_the_King({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: "400",
});

// Name font - Just Another Hand
const justAnotherHand = Just_Another_Hand({
  variable: "--font-name",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Leah Grundhauser Portfolio",
  description: "Portfolio website for Leah Grundhauser: Full Stack Developer, Mural Artist, and Community Creator.",
  openGraph: {
    title: "Leah Grundhauser Portfolio",
    description: "Portfolio website for Leah Grundhauser: Full Stack Developer, Mural Artist, and Community Creator.",
    url: "https://leahmartin-maker.github.io/",
    siteName: "Leah Grundhauser Portfolio",
    images: [
      {
        url: "https://leahmartin-maker-github-io.vercel.app/images/turtle-pin-transparent.png",
        width: 1200,
        height: 630,
        alt: "Leah Grundhauser Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lovedByTheKing.variable} ${justAnotherHand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
