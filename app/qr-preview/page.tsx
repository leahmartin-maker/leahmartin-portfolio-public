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
      <PortfolioQRCode value={value} size={size} fgColor={fgColor} bgColor={bgColor} />
      <form aria-label="Customize QR Code" style={{ marginTop: "2rem", display: "grid", gap: "1rem" }}>
        <label>
          URL/Text:
          <input aria-label="QR code value" type="text" value={value} onChange={e => setValue(e.target.value)} style={{ width: "100%" }} />
        </label>
        <label>
          Size (px):
          <input aria-label="QR code size" type="number" min="64" max="512" value={size} onChange={e => setSize(Number(e.target.value))} />
        </label>
        <label>
          Foreground Color:
          <input aria-label="QR code foreground color" type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} />
        </label>
        <label>
          Background Color:
          <input aria-label="QR code background color" type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
        </label>
      </form>
    </main>
  );
}

// Real World Context:
// This page lets you preview and customize your QR code in isolation, similar to how tech teams use Storybook or local dev routes for component testing.
// You can experiment with different values, colors, and sizes before using the QR code in production or for printing.
// All form controls have aria-labels for accessibility, and the layout uses CSS Grid for clean, maintainable code.