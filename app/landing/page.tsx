// app/landing/page.tsx
// Main landing/business card page showcasing Leah's work, services, and call-to-actions
// Follows Leah's standards: A11y, modularity, clean code, no slop
//
// Real World Context:
// Digital business card landing pages (like this) serve as entry points for portfolios,
// agencies, and freelancers. They typically feature a hero section, grouped CTAs, and
// social links. This component uses Next.js Image optimization for performance and
// accessible semantic HTML for screen readers. The modular structure (cardLinkGroups)
// makes it easy to add/remove actions without touching component code.


import { cardLinkGroups, blogSignup } from './cardLinks';
import GroupAccordion from './GroupAccordion';
import BlogSignup from './BlogSignup';
import SwimmingTurtles from '../components/SwimmingTurtles';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-8 px-4 bg-gradient-to-r from-sea-life/45 via-sunset-yellow/50 to-coral/70">
      {/* Brand Animation */}
      <SwimmingTurtles />
      <div className="relative w-full max-w-[500px] h-60 mb-0 mx-auto">
        <Image
          src="/images/grundhausersignature.png"
          alt="Leah Grundhauser signature"
          fill
          className="object-contain object-center"
          priority
        />
      </div>
      <p className="text-2xl text-black mt-0 mb-6 text-center max-w-xl" aria-label="Artist, Developer, Conservationist">
        Artist • Developer • Conservationist
      </p>
      {/* Link Groups */}
      <section className="w-full max-w-md flex flex-col gap-4" aria-label="Quick Actions">
        {cardLinkGroups.map(group => (
          <GroupAccordion key={group.groupLabel} group={group} />
        ))}
      </section>
      {/* Blog Signup */}
      <BlogSignup {...blogSignup} />
    </main>
  );
}

