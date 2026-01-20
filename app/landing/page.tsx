"use client";
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


import { useState } from 'react';
import { cardLinkGroups, blogSignup } from './cardLinks';
import GroupAccordion from './GroupAccordion';
import BlogSignup from './BlogSignup';
import SwimmingTurtles from '../components/SwimmingTurtles';
import ContactForm from '../components/ContactForm';
import Image from 'next/image';

export default function LandingPage() {
  const [showContact, setShowContact] = useState(false);
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-8 px-4 bg-gradient-to-r from-sea-life/45 via-sunset-yellow/50 to-coral/70 pb-8 md:pb-0">
      <div className="relative w-full max-w-[500px] h-60 mb-0 mx-auto">
        <Image
          src="/images/grundhausersignature.png"
          alt="Leah Grundhauser signature"
          fill
          className="object-contain object-center"
          priority
        />
      </div>
      <p className="text-xl text-black/80 mt-0 mb-2 text-center max-w-xl" aria-label="Artist, Developer, Conservationist">
        Artist • Developer • Conservationist
      </p>
      {/* Sea Turtle Link to Main Page */}
      <a
        href="/"
        aria-label="Go to Leah Grundhauser's main page"
        className="block mb-0 mx-auto w-72 h-72 ml-18"
      >
        <Image
          src="/images/turtle-pin.png"
          alt="Sea turtle illustration by Leah Grundhauser"
          width={225}
          height={225}
          className="object-contain object-center drop-shadow-lg hover:scale-105 transition-transform duration-200 bg-transparent"
          priority
        />
      </a>
      {/* Link Groups */}
        <section className="w-full max-w-md flex flex-col gap-4 -mt-26" aria-label="Quick Actions">
        {cardLinkGroups.map(group => (
          <GroupAccordion key={group.groupLabel} group={group} />
        ))}
      </section>
      {/* Blog Signup removed as requested */}
      {/* Contact Modal */}
      {showContact && <ContactForm onClose={() => setShowContact(false)} />}
    </main>
  );
}

