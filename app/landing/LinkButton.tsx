// app/landing/LinkButton.tsx
// Accessible, styled button for individual links
// Follows ARIA, modularity, and Tailwind standards

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
        className="block w-full text-left px-4 py-2 rounded bg-teal-100 hover:bg-teal-200 text-teal-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
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
      className="block w-full text-left px-4 py-2 rounded bg-teal-100 hover:bg-teal-200 text-teal-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
      aria-label={item.ariaLabel || item.label}
      type="button"
      // onClick={...}
    >
      {item.label}
    </button>
  );
}
