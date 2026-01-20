

"use client";
// app/landing/GroupAccordion.tsx
// Modal popup for grouped links, matching murals map style
// Follows ARIA, modularity, and Tailwind standards

import type { LinkGroup } from './cardLinks';
import LinkButton from './LinkButton';
import ContactForm from '../components/ContactForm';
import MuralSubmissionForm from './MuralSubmissionForm';
import { useState, useRef, useEffect } from 'react';

interface Props {
  group: LinkGroup;
}

export default function GroupAccordion({ group }: Props) {
  const [open, setOpen] = useState(false);
  const [showMuralForm, setShowMuralForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus in modal for accessibility
  useEffect(() => {
    if (open && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    }
  }, [open]);

  // Close modal on Escape key
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Use group.color for button background
  const buttonColor = group.color || 'bg-sea-life';

  return (
    <>
      <button
        className={`w-full px-6 py-4 text-lg font-semibold text-white rounded-lg shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 transition ${buttonColor}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`modal-${group.groupLabel}`}
        onClick={() => setOpen(true)}
        aria-label={`Open ${group.groupLabel} options`}
      >
        {group.groupLabel}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-label={group.groupLabel}
        >
          <div
            ref={modalRef}
            id={`modal-${group.groupLabel}`}
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative flex flex-col items-center animate-fadeIn"
          >
            <button
              className="absolute top-3 right-3 text-coral hover:text-sunset-yellow text-2xl font-bold focus:outline-none"
              aria-label="Close dialog"
              onClick={() => setOpen(false)}
              tabIndex={0}
            >
              ×
            </button>
            <h2 className="text-5xl font-name text-sea-life/80 mb-4 text-center">{group.groupLabel}</h2>
            <div className="flex flex-col gap-3 w-full">
              {group.items.map(item => {
                // Open mural form modal
                if (item.type === 'form' && item.label === 'Community & Non-Profit Applications') {
                  return (
                    <button
                      key={item.label}
                      className="block w-full text-center px-4 py-2 rounded bg-sunset-yellow/80 hover:bg-sunset-yellow/40 text-black/60 font-medium focus:outline-none transition"
                      aria-label={item.ariaLabel || item.label}
                      type="button"
                      onClick={() => setShowMuralForm(true)}
                    >
                      {item.label}
                    </button>
                  );
                }
                // Open contact form modal
                if (item.label === 'Contact Me about a New Project') {
                  return (
                    <button
                      key={item.label}
                      className="block w-full text-center px-4 py-2 rounded bg-sunset-yellow/80 hover:bg-sunset-yellow/40 text-black/60 font-medium focus:outline-none transition"
                      aria-label={item.ariaLabel || item.label}
                      type="button"
                      onClick={() => setShowContactForm(true)}
                    >
                      {item.label}
                    </button>
                  );
                }
                return <LinkButton key={item.label} item={item} />;
              })}
            </div>
            {/* MuralSubmissionForm Modal */}
            {showMuralForm && (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
                <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">
                  <button
                    className="absolute top-3 right-3 text-coral hover:text-sunset-yellow text-2xl font-bold focus:outline-none"
                    aria-label="Close mural submission form"
                    onClick={() => setShowMuralForm(false)}
                    tabIndex={0}
                  >
                    ×
                  </button>
                  <MuralSubmissionForm />
                </div>
              </div>
            )}
            {/* ContactForm Modal */}
            {showContactForm && (
              <ContactForm onClose={() => setShowContactForm(false)} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
