"use client";
import PortfolioQRCode from "../components/PortfolioQRCode";
import { useState } from "react";

export default function QRPreviewPage() {
  const [value, setValue] = useState("https://leahmartin.art");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  return (
    <main aria-label="QR Code Preview" style={{ padding: "2rem", maxWidth: 400, margin: "auto" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>QR Code Preview</h1>
      <PortfolioQRCode />
      <section style={{ margin: "2rem 0 0 0", fontSize: "1rem", color: '#444' }} aria-label="vCard QR code info">
        <strong>What is this?</strong>
        <p style={{ marginTop: 8 }}>
          This QR code encodes a digital business card (vCard) with Leah Grundhauser’s name, email, phone, and website. When scanned, most phones will offer to add Leah directly to your contacts—perfect for networking, business cards, and events.
        </p>
        <p style={{ marginTop: 8, fontSize: '0.95em', color: '#888' }}>
          <em>Real World Context:</em> Tech teams and professionals use vCard QR codes to make sharing contact info fast, accurate, and accessible.
        </p>
      </section>
    </main>
  );
}

// Real World Context:
// This page lets you preview and customize your QR code in isolation, similar to how tech teams use Storybook or local dev routes for component testing.
// You can experiment with different values, colors, and sizes before using the QR code in production or for printing.
// All form controls have aria-labels for accessibility, and the layout uses CSS Grid for clean, maintainable code.