// app/landing/page.tsx
// Landing page for Leah's digital business card
// Follows accessibility, modularity, and Tailwind standards


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
      <p className="text-xl text-sea-life mb-8 text-center max-w-xl" aria-label="Artist, Developer, Conservationist">
        Muralist • Developer • Conservationist
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

