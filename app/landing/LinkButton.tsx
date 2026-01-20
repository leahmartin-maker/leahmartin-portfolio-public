"use client";
// app/landing/LinkButton.tsx
// Accessible, styled button for individual links
// Follows ARIA, modularity, and Tailwind standards
//
// Real World Context:
// Individual link buttons are reusable components in digital business cards, navigation menus,
// and call-to-action sections. This component abstracts link behavior (external, download, vcard)
// so the parent (GroupAccordion) doesn't need conditional rendering logic. This pattern scales
// well in agency websites and SaaS landing pages where buttons have varied behaviors.

import type { LinkItem } from './cardLinks';

interface Props {
  item: LinkItem;
}

export default function LinkButton({ item }: Props) {
  // Handle vCard - simple link with proper file
  if (item.type === 'vcard') {
    return (
      <a
        href="/leah-martin-contact.vcf"
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
