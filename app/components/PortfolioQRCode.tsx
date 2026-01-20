// PortfolioQRCode.tsx
// QR code component for Leah's portfolio site
// Real World Context: Used for business cards, event materials, and quick sharing in tech companies.


import { QRCodeSVG } from 'qrcode.react';

// vCard string for Leah Grundhauser (for reference, used in download button on landing page)
const vCard = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Grundhauser;Leah;;;',
  'FN:Leah Grundhauser',
  'EMAIL:artbyleahmartin@gmail.com',
  'TEL;TYPE=cell:361-453-9120',
  'URL:https://leahmartin-portfolio-public.vercel.app/landing',
  'END:VCARD'
].join('\n');

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
