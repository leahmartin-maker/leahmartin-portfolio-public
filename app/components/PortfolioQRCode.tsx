// PortfolioQRCode.tsx
// QR code component for Leah's portfolio site
// Real World Context: Used for business cards, event materials, and quick sharing in tech companies.

import { QRCodeSVG } from 'qrcode.react';

export default function PortfolioQRCode() {
  return (
    <div className="flex flex-col items-center my-6">
      <QRCodeSVG
        value="https://leahmartin-portfolio-public.vercel.app/landing"
        size={160}
        bgColor="#ffffff"
        fgColor="#00c5cd"
        level="H"
        includeMargin={true}
        aria-label="Scan to visit Leah Grundhauser's portfolio site"
      />
      <p className="mt-2 text-sm text-coral font-semibold text-center">Scan to visit my site!</p>
    </div>
  );
}
