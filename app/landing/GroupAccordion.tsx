// app/landing/GroupAccordion.tsx
// Accessible, expandable group for landing page links
// Follows ARIA, modularity, and Tailwind standards

import type { LinkGroup } from './cardLinks';
// import LinkButton from './LinkButton';
import { useState } from 'react';

interface Props {
  group: LinkGroup;
}

export default function GroupAccordion({ group }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg shadow bg-white">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-lg font-semibold text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded-t-lg"
        aria-expanded={open}
        aria-controls={`panel-${group.groupLabel}`}
        onClick={() => setOpen(v => !v)}
        aria-label={`Expand ${group.groupLabel} options`}
      >
        <span>{group.groupLabel}</span>
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div id={`panel-${group.groupLabel}`} className="flex flex-col gap-2 px-6 pb-4" role="region" aria-label={group.groupLabel}>
          {/* {group.items.map(item => (
            <LinkButton key={item.label} item={item} />
          ))} */}
        </div>
      )}
    </div>
  );
}
