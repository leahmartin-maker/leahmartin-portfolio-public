"use client";
// app/landing/LinkButton.tsx
// Accessible, styled button for individual links
// Follows ARIA, modularity, and Tailwind standards

import type { LinkItem } from './cardLinks';
import { useCallback } from 'react';

interface Props {
  item: LinkItem;
}

export default function LinkButton({ item }: Props) {
  // Handle vCard with Blob URL
  const handleVCardClick = useCallback(() => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Grundhauser;Leah;;;',
      'FN:Leah Grundhauser',
      'EMAIL:artbyleahmartin@gmail.com',
      'TEL;TYPE=cell:361-453-9120',
      'URL:https://leahmartin-portfolio-public.vercel.app/landing',
      'END:VCARD'
    ].join('\r\n');
    
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary link and click it
    const link = document.createElement('a');
    link.href = url;
    link.click();
    
    // Cleanup
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }, []);

  if (item.type === 'vcard') {
    return (
      <button
        onClick={handleVCardClick}
        className="block w-full text-center px-4 py-2 rounded bg-sunset-yellow/80 hover:bg-sunset-yellow/40 text-black/60 font-medium focus:outline-none transition"
        aria-label={item.ariaLabel || item.label}
      >
        {item.label}
      </button>
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
