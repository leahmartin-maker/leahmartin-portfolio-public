/**
 * SWIMMING TURTLES ANIMATION COMPONENT
 * 
 * What this component does:
 * - Creates 3 animated turtles that swim across the screen
 * - Each turtle starts at a different time (staggered)
 * - After 30 seconds, all turtles disappear
 * - Uses CSS animations (lightweight and smooth)
 * 
 * Key Concepts You're Learning:
 * - React useState hook (for showing/hiding)
 * - useEffect hook (for timing)
 * - CSS keyframe animations
 * - Positioning (absolute vs relative)
 */

'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SwimmingTurtles() {
  // STATE: Controls whether turtles are visible or not
  // Think of this like a light switch - true = on, false = off
    const [isVisible, setIsVisible] = useState(true);

  // EFFECT: Runs once when component loads
  // Sets a timer to hide turtles after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Turn off the turtles
    }, 30000); // 30000 milliseconds = 30 seconds
    // Cleanup: Cancel timer if component unmounts early
    return () => clearTimeout(timer);
  }, []); // Empty array = only run once on mount

  // If isVisible is false, don't render anything
    if (!isVisible) return null;

    return (
    <>
      {/* INLINE CSS: Keyframe animations defined here */}
      <style jsx>{`
        /* KEYFRAMES: Define the animation path */
        /* "swim" is the animation name we'll reference later */
        @keyframes swim {
            0% {
            /* Start: Far off-screen so turtles are completely hidden while waiting */
            left: -200px;
            opacity: 0;
          }
          5% {
            /* Fade in quickly as turtle enters */
            opacity: 1;
          }
          95% {
            /* Stay visible most of the way */
            opacity: 1;
          }
          100% {
            /* End: Off-screen to the right, fade out */
            left: calc(100% + 150px);
            opacity: 0;
          }
        }

        /* Add slight vertical "bobbing" motion */
        @keyframes bob {
            0%, 100% {
            transform: translateY(0px);
            }
            50% {
            /* Increased from -10px to -20px for more visible bobbing */
            transform: translateY(-20px);
            }
        }

        /* RESPONSIVE POSITIONING: Different on mobile vs desktop */
        .turtle-1 {
          top: 15%; /* Desktop default */
        }
        .turtle-2 {
          top: 25%; /* Desktop default */
        }
        .turtle-3 {
          top: 35%; /* Desktop default */
        }

        /* MOBILE: Spread out more vertically */
        @media (max-width: 768px) {
          .turtle-1 {
            top: 10% !important;
          }
          .turtle-2 {
            top: 35% !important;
          }
          .turtle-3 {
            top: 60% !important;
          }
        }
        `}</style>

      {/* CONTAINER: Holds all turtles, positioned relative to viewport */}
        <div className="fixed inset-0 pointer-events-none z-[60]">
        
        {/* TURTLE 1: Swims across top of hero section */}
        <div
            className="turtle-1"
            style={{
            position: 'absolute',
            left: '-200px', // Start hidden off-screen
            opacity: 0, // Start invisible
            width: '250px',
            height: '250px',
            animation: 'swim 20s linear infinite, bob 3s ease-in-out infinite',
            }}
        >
            <Image
            src="/images/turtle-pin.png"
            alt="Swimming turtle"
            width={145}
            height={145}
            style={{ objectFit: 'contain', transform: 'scaleX(-1)' }} // Flipped to face right
            />
        </div>

        {/* TURTLE 2: Swims across middle of hero, starts 2 seconds later */}
        <div
            className="turtle-2"
            style={{
            position: 'absolute',
            left: '-200px', // Start hidden off-screen
            opacity: 0, // Start invisible
            width: '230px',
            height: '230px',
            animation: 'swim 25s linear 2s infinite, bob 4s ease-in-out infinite',
            }}
        >
            <Image
            src="/images/turtle-pin.png"
            alt="Swimming turtle"
            width={150}
            height={150}
            style={{ objectFit: 'contain', transform: 'scaleX(-1)' }} // Flipped to face right
            />
        </div>

        {/* TURTLE 3: Swims across lower hero area, starts 4 seconds later */}
        <div
            className="turtle-3"
            style={{
            position: 'absolute',
            left: '-200px', // Start hidden off-screen
            opacity: 0, // Start invisible
            width: '280px',
            height: '280px',
            animation: 'swim 30s linear 4s infinite, bob 3.5s ease-in-out infinite',
            }}
        >
            <Image
            src="/images/turtle-pin.png"
            alt="Swimming turtle"
            width={140}
            height={140}
            style={{ objectFit: 'contain', transform: 'scaleX(-1)' }} // Flipped to face right
            />
        </div>
        </div>
    </>
    );
}
