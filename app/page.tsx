"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import SwimmingTurtles from "./components/SwimmingTurtles";

export default function Home() {
  return (
    <>
      {/* Navigation Header */}
      <Navbar />
      
      {/* Hero Section */}
      <SwimmingTurtles />
      <main className="min-h-screen bg-gradient-to-b from-stucco to-white">
        <div className="max-w-6xl mx-auto px-8 py-20">
          
          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row items-center gap-[-4] lg:gap-12 mb-20">
            
            {/* Left: Profile Image */}
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-sea-life shadow-2xl flex-shrink-0">
              <Image
                src="/images/profile.jpg" 
                alt="Leah Grundhauser"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Right: Text Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Signature */}
              <div className="relative w-full max-w-[500px] h-60 mb-[-2.75rem] mx-auto lg:mx-0">
                <Image
                  src="/images/grundhausersignature.png"
                  alt="Leah Grundhauser"
                  fill
                  className="object-contain object-center lg:object-left"
                  priority
                />
              </div>
              <p className="text-2xl text-gray-600 mb-2 font-semibold">
                Artist • Developer • Conservationist
              </p>
              <p className="text-lg text-[#d89b85] italic mb-6">
                Where Murals Meet Code
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">
                I'm a mural artist turned creative developer, bridging the physical and digital worlds. 
                I create <span className="text-sea-life font-semibold">interactive experiences</span> for 
                coastal preservation and community impact — from location-based art maps to 
                AR murals that come to life.
              </p>
              
              {/* Social & Contact Links */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-4">
                <a
                  href="https://github.com/leahmartin-maker"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="bg-coral text-white px-6 py-2 rounded-lg font-semibold border-2 border-coral hover:bg-coral/90 transition-colors shadow-lg inline-flex items-center gap-2 text-lg"
                >
                  <span className="inline-flex items-center gap-2">
                    <FaGithub size={22} aria-hidden="true" />
                    GitHub
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/leah-grundhauser-535237398/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="bg-sea-life text-white px-6 py-2 rounded-lg font-semibold hover:bg-sea-life/90 transition-colors shadow-lg inline-flex items-center gap-2 text-lg"
                >
                  <span className="inline-flex items-center gap-2">
                    <FaLinkedin size={22} aria-hidden="true" />
                    LinkedIn
                  </span>
                </a>
                <a
                  href="/contact"
                  aria-label="Contact Form"
                  className="bg-coral text-white px-6 py-2 rounded-lg font-semibold border-2 border-coral hover:bg-coral/90 transition-colors shadow-lg inline-flex items-center gap-2 text-lg"
                >
                  <span className="inline-flex items-center gap-2">
                    <MdEmail size={22} aria-hidden="true" />
                    Get In Touch
                  </span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Quick Preview Section */}
        <div className="border-t-2 border-gray-200 pt-16">
            <h3 className="text-3xl font-bold text-center text-gray-600 mb-8">
              What I Do
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-sea-life flex flex-col h-full text-center">
                <h4 className="text-xl font-bold text-sea-life mb-3">Interactive Mural Maps</h4>
                <p className="text-gray-600 mb-4">
                  Location-based experiences showcasing public art with custom markers and detailed galleries.
                </p>
                <div className="flex justify-center mt-2">
                  <Link 
                    href="/murals"
                    className="bg-sea-life text-white px-6 py-2 rounded-lg font-semibold hover:bg-sea-life/90 transition-colors shadow-lg"
                    aria-label="Explore My Murals"
                  >
                    Explore My Murals
                  </Link>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-coral flex flex-col h-full text-center">
                <h4 className="text-xl font-bold text-coral mb-3">AR Experiences</h4>
                <p className="text-gray-600 mb-4">
                  Scan QR codes to bring physical murals to life with animations and live environmental data.
                </p>
                <div className="flex justify-center mt-2">
                  <button
                    className="bg-coral text-white px-6 py-2 rounded-lg font-semibold border-2 border-coral hover:bg-coral/90 transition-colors shadow-lg cursor-not-allowed"
                    aria-label="AR Experiences Coming Soon"
                    disabled
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-sea-life flex flex-col h-full text-center">
                <h4 className="text-xl font-bold text-sea-life mb-3">3D Galleries</h4>
                <p className="text-gray-600 mb-4">
                  Immersive virtual environments where art and technology merge for unique storytelling.
                </p>
                <div className="flex justify-center mt-2">
                  <button
                    className="bg-sea-life text-white px-6 py-2 rounded-lg font-semibold hover:bg-sea-life/90 transition-colors shadow-lg cursor-not-allowed"
                    aria-label="3D Galleries Coming Soon"
                    disabled
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact" className="mt-20 text-center bg-gradient-to-r from-sea-life/30 via-sunset-yellow/30 to-coral/50 rounded-lg p-12">
            <h3 className="text-3xl font-bold text-sea-life/80 mb-4">
              Let's Create Something Together
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're looking for public art, digital experiences, or both — 
              I'd love to hear about your project.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-coral text-white px-10 py-4 rounded-lg font-semibold hover:bg-coral/90 transition-colors shadow-lg text-lg"
            >
              Start a Conversation
            </Link>
          </div>
      </main>
    </>
  );
}
