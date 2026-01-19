// app/landing/LinkButton.tsx
// Accessible, styled button for individual links
// Follows ARIA, modularity, and Tailwind standards
//
// Real World Context:
// This component is a reusable link/button wrapper used in design systems (like Material Design,
// Chakra UI, and Headless UI). It handles different states (link, button, download) in one place,
// making it easy to update styling or behavior globally. Professional teams use this pattern
// to avoid duplicating button logic across their application.

import type { LinkItem } from './cardLinks';

interface Props {
  item: LinkItem;
}

export default function LinkButton({ item }: Props) {
  // For now, handle only external links and downloads
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
