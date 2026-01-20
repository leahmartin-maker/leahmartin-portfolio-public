// cardLinks.ts
// Data structure for Leah's digital business card landing page (Landing)
// Modular, accessible, and ready for dynamic content

import { color } from "three/tsl";

export type LinkItem = {
  label: string;           // Button or link text
  href?: string;           // URL or mailto/tel (if applicable)
  icon?: React.ReactNode;  // Icon component (optional)
  type?: 'form' | 'download' | 'external' | 'modal'; // For special actions
  ariaLabel?: string;      // For accessibility
};

export type LinkGroup = {
  groupLabel: string;      // Main button text (e.g., "Let's Connect")
  icon?: React.ReactNode;  // Main button icon (optional)
  color?: string;          // Tailwind color class for button (e.g., 'bg-sea-life')
  items: LinkItem[];       // Sub-links or actions
};

export const cardLinkGroups: LinkGroup[] = [
  {
    groupLabel: "Let's Connect",
    color: "bg-sea-life/50",
    items: [
      {
        label: "Contact Me about a New Project",
        href: "/contact",
        type: "external",
        ariaLabel: "Open contact form to email Leah"
      },
      {
        label: "Community & Non-Profit Applications",
        type: "form",
        ariaLabel: "Submit a mural request"
      }
    ]
  },
  {
    groupLabel: "Let's Be Friends",
    color: "bg-coral/80",
    items: [
        { label: "Instagram", href: "https://www.instagram.com/leahmuralartist/", ariaLabel: "Visit Leah's Instagram" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/leah-grundhauser-535237398/", ariaLabel: "Visit Leah's LinkedIn" },
        { label: "GitHub", href: "https://github.com/leahmartin-maker", ariaLabel: "Visit Leah's GitHub" },
        { label: "Facebook", href: "https://www.facebook.com/artbyLeahmartin", ariaLabel: "Visit Leah's Facebook" }
    ]  
  },
  {
    groupLabel: "Let's Make Change",
    color: "bg-sea-life/50",
    items: [
        { label: "Show Your Support-Coming Soon", href: "#", ariaLabel: "Support Leah on Buy Me a Coffee (coming soon)" },

    ]
  },
{
    groupLabel: "Let's Keep in Touch",
    color: "bg-coral/80",
    items: [
        { label: "Add Me to Your Contacts", href: "/leah-martin-contact.vcf", type: "download", ariaLabel: "Download Leah's contact card" },
        { label: "Download My Resume-Coming Soon", href: "/resume/leah_resume.pdf", type: "download", ariaLabel: "Download Leah's resume" }
    ]
}
];

// Blog signup (coming soon)
export const blogSignup = {
    label: "Sign up to Follow My Adventures",
    color: "bg-sea-life/50",
    href: "#",
    ariaLabel: "Sign up to receive Leah's blog updates (coming soon)"
};
