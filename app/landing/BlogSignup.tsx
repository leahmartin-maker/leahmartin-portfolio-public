// app/landing/BlogSignup.tsx
// Simple, accessible blog signup link for landing page
// Follows ARIA and Tailwind standards

interface Props {
  label: string;
  href: string;
  ariaLabel?: string;
}

export default function BlogSignup({ label, href, ariaLabel }: Props) {
  return (
    <div className="mt-8 text-center">
      <a
        href={href}
        className="inline-block text-teal-700 underline text-base hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
        aria-label={ariaLabel || label}
      >
        {label}
      </a>
    </div>
  );
}
