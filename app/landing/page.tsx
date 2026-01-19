// app/landing/page.tsx
// Landing page for Leah's digital business card
// Follows accessibility, modularity, and Tailwind standards


import { cardLinkGroups, blogSignup } from './cardLinks';
import GroupAccordion from './GroupAccordion';
import BlogSignup from './BlogSignup';
import SwimmingTurtles from '../components/SwimmingTurtles';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-start pt-8 px-4">
      {/* Brand Animation */}
      <SwimmingTurtles />
      <h1 className="text-3xl md:text-5xl font-bold text-teal-700 mb-2" aria-label="Leah Grundhauser Digital Business Card">
        Leah Grundhauser
      </h1>
      <p className="text-lg text-teal-900 mb-8 text-center max-w-xl" aria-label="Artist, Developer, Conservationist">
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
