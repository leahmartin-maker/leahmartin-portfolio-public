"use client";
// app/landing/LinkButton.tsx
// Accessible, styled button for individual links
// Follows ARIA, modularity, and Tailwind standards

import type { LinkItem } from './cardLinks';

interface Props {
  item: LinkItem;
}

export default function LinkButton({ item }: Props) {
  // Handle vCard data URI
  if (item.type === 'vcard') {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Grundhauser;Leah;;;',
      'FN:Leah Grundhauser',
      'EMAIL:artbyleahmartin@gmail.com',
      'TEL;TYPE=cell:361-453-9120',
      'URL:https://leahmartin-portfolio-public.vercel.app/landing',
      'END:VCARD'
    ].join('\n');
    
    const dataUri = `data:text/vcard;base64,${btoa(unescape(encodeURIComponent(vCardData)))}`;
    
    return (
      <a
        href={dataUri}
        download="leah-martin-contact.vcf"
        className="block w-full text-center px-4 py-2 rounded bg-sunset-yellow/80 hover:bg-sunset-yellow/40 text-black/60 font-medium focus:outline-none transition"
        aria-label={item.ariaLabel || item.label}
      >
        {item.label}
      </a>
    );
  }

  // For regular links and downloads
  if (item.href) {
    return (
      <a
        href={item.href}
        className="block w-full text-center px-4 py-2 rounded bg-sunset-yellow/80 hover:bg-sunset-yellow/40 text-black/60 font-medium focus:outline-none transition"
        target={item.type === 'external' ? '_blank' : undefined}
        rel={item.type === 'external' ? 'noopener noreferrer' : undefined}
        aria-label={item.ariaLabel || item.label}
        download={item.type === 'download' ? true : undefined}
      >
        {item.label}
      </a>
    );
  }
  
  // Placeholder for forms or modals
  return (
    <button
      className="block w-full text-center px-4 py-2 rounded bg-sunset-yellow/80 hover:bg-sunset-yellow/40 text-black/60 font-medium focus:outline-none transition"
      aria-label={item.ariaLabel || item.label}
      type="button"
      // onClick={...}
    >
      {item.label}
    </button>
  );
}
