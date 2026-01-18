'use client';

/**
 * NAVIGATION BAR COMPONENT
 * 
 * The Sketch (HTML Structure):
 * - <nav> = The main navigation container (like your canvas frame)
 * - <div> with logo = Left side placeholder for your hand-painted signature
 * - <ul> with links = Right side navigation menu
 * 
 * Accessibility (A11y):
 * - <nav> tells screen readers "this is the main navigation"
 * - aria-label describes the navigation purpose
 * - Each link has descriptive text for screen readers
 */
import React from 'react';
export default function Navbar() {
    return (
    <nav 
    className="w-full bg-stucco border-b border-gray-200 sticky top-0 z-50"
    aria-label="Main navigation"
    >
    <div className="flex items-center justify-between px-8 py-4">
        
        {/* LEFT SIDE: Logo Placeholder */}
        <div className="flex items-center">
          {/* Empty - no logo/name */}
        </div>

        {/* RIGHT SIDE: Navigation Links */}
        <ul className="flex items-center gap-8">
        <li>
            <a href="/" className="text-gray-700 hover:text-sea-life transition-colors duration-200">
        Home
            </a>
        </li>
        <li>
            <a href="/projects" className="text-gray-700 hover:text-sea-life transition-colors duration-200">
        Projects
            </a>
        </li>
        <li>
            <a href="/about" className="text-gray-700 hover:text-sea-life transition-colors duration-200">
            About
            </a>
        </li>
        <li>
            <a href="/contact" className="text-gray-700 hover:text-sea-life transition-colors duration-200">
            Contact
            </a>
        </li>
        </ul>
    </div>
    </nav>
);
}
