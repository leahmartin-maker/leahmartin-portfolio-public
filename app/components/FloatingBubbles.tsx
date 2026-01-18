'use client';

import { useState, useEffect } from 'react';

export default function FloatingBubbles() {
  // Array of all 18 photo filenames
  const photos = [
    '/images/aboutart/aboutme1.jpg',
    '/images/aboutart/aboutme2.jpg',
    '/images/aboutart/aboutme3.jpg',
    '/images/aboutart/aboutme4.jpg',
    '/images/aboutart/aboutme5.jpg',
    '/images/aboutart/aboutme6.jpg',
    '/images/aboutart/aboutme7.jpg',
    '/images/aboutart/aboutme8.jpg',
    '/images/aboutart/aboutme9.jpg',
    '/images/aboutart/aboutme10.jpg',
    '/images/aboutart/aboutme11.jpg',
    '/images/aboutart/aboutme12.jpg',
    '/images/aboutart/aboutme13.jpg',
    '/images/aboutart/aboutme14.jpg',
    '/images/aboutart/aboutme15.jpg',
    '/images/aboutart/aboutme16.jpg',
    '/images/aboutart/aboutme17.jpg',
    '/images/aboutart/aboutme18.jpg',
  ];

  // State: Control visibility of floating bubbles (15 second timer)
  const [showFloatingBubbles, setShowFloatingBubbles] = useState(true);
  
  // State: Control gallery modal
  const [showGallery, setShowGallery] = useState(false);
  
  // State: Current photo index in gallery (0-17)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  // State: Touch tracking for swipe gestures
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // State: Track which photo index each bubble is currently showing
  const [bubblePhotos, setBubblePhotos] = useState([0, 2, 4, 6, 8, 10, 12, 14, 16, 1, 3]);

  // State: Track available photos that aren't currently in use
  const [availablePhotos, setAvailablePhotos] = useState([5, 7, 9, 11, 13, 15, 17]);

  // Timer: Hide floating bubbles after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingBubbles(false);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, []);

  // TIMING STRATEGY: Instead of using onAnimationIteration, 
  // set up timed photo swaps that happen at EXACTLY 9.5 seconds (95% of 10s animation)
  // This is when bubble is fully invisible, right before it restarts
  useEffect(() => {
    const animationDuration = 10000; // 10 seconds in milliseconds
    const swapTiming = animationDuration * 0.95; // 9.5 seconds - when bubble is invisible
    
    // Set up timed swaps for each bubble based on its delay
    const bubbleDelays = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 1500, 3500, 5500]; // 11 bubbles with overlapping times
    const timers: NodeJS.Timeout[] = [];
    
    bubbleDelays.forEach((delay, bubbleIndex) => {
      // First swap happens at: delay + swapTiming
      // Then repeats every animationDuration
      const firstSwap = delay + swapTiming;
      
      // Wait for first swap, then set up repeating timer
      const initialTimer = setTimeout(() => {
        swapPhoto(bubbleIndex); // Do first swap
        
        // Set up interval for subsequent swaps
        const repeatTimer = setInterval(() => {
          swapPhoto(bubbleIndex);
        }, animationDuration);
        
        timers.push(repeatTimer);
      }, firstSwap);
      
      timers.push(initialTimer);
    });
    
    // Cleanup timers when component unmounts
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []); // Empty dependency array - only run once on mount

  // Function: Swap photo for a specific bubble
  const swapPhoto = (bubbleIndex: number) => {
    if (availablePhotos.length === 0) {
      // If we've used all photos, reset the available pool
      // but exclude the photos currently showing in other bubbles
      const currentPhotos = bubblePhotos.filter((_, idx) => idx !== bubbleIndex);
      const allPhotos = Array.from({ length: 18 }, (_, i) => i);
      const newAvailable = allPhotos.filter(p => !currentPhotos.includes(p));
      setAvailablePhotos(newAvailable);
      return;
    }

    // Pick the first available photo
    const nextPhoto = availablePhotos[0];
    
    // Update bubble with new photo
    setBubblePhotos(prev => {
      const newPhotos = [...prev];
      const oldPhoto = newPhotos[bubbleIndex];
      newPhotos[bubbleIndex] = nextPhoto;
      
      // Return the old photo to available pool
      setAvailablePhotos(prevAvail => {
        const newAvail = prevAvail.slice(1); // Remove the photo we just used
        return [...newAvail, oldPhoto]; // Add the old photo back to the end
      });
      
      return newPhotos;
    });
  };

  return (
    <>
      {/* Floating Bubbles Animation - Shows for 15 seconds then disappears */}
      {showFloatingBubbles && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
          {/* BUBBLE 1 - Desktop & Mobile */}
          <div
            className="bubble bubble-1"
            style={{
              animationDelay: '0s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[0]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 2 - Desktop & Mobile */}
          <div
            className="bubble bubble-2"
            style={{
              animationDelay: '1s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[1]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 3 - Desktop & Mobile */}
          <div
            className="bubble bubble-3"
            style={{
              animationDelay: '2s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[2]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 4 - Desktop & Mobile */}
          <div
            className="bubble bubble-4"
            style={{
              animationDelay: '3s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[3]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 5 - Desktop & Mobile */}
          <div
            className="bubble bubble-5"
            style={{
              animationDelay: '4s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[4]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 6 - Desktop & Mobile */}
          <div
            className="bubble bubble-6"
            style={{
              animationDelay: '5s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[5]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 7 - Desktop Only */}
          <div
            className="bubble bubble-7 hidden lg:block"
            style={{
              animationDelay: '6s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[6]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 8 - Desktop Only */}
          <div
            className="bubble bubble-8 hidden lg:block"
            style={{
              animationDelay: '7s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[7]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 9 - Center-left for organic feel - Mobile Only */}
          <div
            className="bubble bubble-9 lg:hidden"
            style={{
              animationDelay: '1.5s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[8]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 10 - Center for organic feel - Mobile Only */}
          <div
            className="bubble bubble-10 lg:hidden"
            style={{
              animationDelay: '3.5s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[9]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>

          {/* BUBBLE 11 - Center-right for organic feel - Mobile Only */}
          <div
            className="bubble bubble-11 lg:hidden"
            style={{
              animationDelay: '5.5s',
              bottom: '-200px',
              opacity: 0,
            }}
          >
            <img 
              src={photos[bubblePhotos[10]]} 
              alt="Leah painting" 
              className="bubble-image"
            />
          </div>
        </div>
      )}

      {/* Persistent Bubble Button - Appears after floating bubbles disappear */}
      {!showFloatingBubbles && (
        <button
          onClick={() => setShowGallery(true)}
          className="fixed bottom-6 right-6 w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-3 border-sea-life shadow-2xl z-50 pointer-events-auto transition-transform hover:scale-110"
          style={{
            boxShadow: '0 0 20px rgba(0, 197, 205, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3)',
          }}
          aria-label="View painting photos"
        >
          <img 
            src={photos[17]} // aboutme18.jpg (index 17)
            alt="View gallery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
        </button>
      )}

      {/* Photo Gallery Modal - Swipeable */}
      {showGallery && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"
          onClick={() => setShowGallery(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white text-4xl w-12 h-12 flex items-center justify-center hover:bg-white/20 rounded-full z-10 transition-colors"
            aria-label="Close gallery"
          >
            ✕
          </button>

          {/* Photo Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold z-10">
            {currentPhotoIndex + 1} / {photos.length}
          </div>

          {/* Previous Button */}
          {currentPhotoIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex(prev => prev - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl w-14 h-14 flex items-center justify-center hover:bg-white/20 rounded-full z-10 transition-colors"
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}

          {/* Next Button */}
          {currentPhotoIndex < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex(prev => prev + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl w-14 h-14 flex items-center justify-center hover:bg-white/20 rounded-full z-10 transition-colors"
              aria-label="Next photo"
            >
              ›
            </button>
          )}

          {/* Photo Container with Swipe Support */}
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              setTouchEnd(0);
              setTouchStart(e.targetTouches[0].clientX);
            }}
            onTouchMove={(e) => {
              setTouchEnd(e.targetTouches[0].clientX);
            }}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;
              
              const distance = touchStart - touchEnd;
              const isLeftSwipe = distance > 50;
              const isRightSwipe = distance < -50;
              
              if (isLeftSwipe && currentPhotoIndex < photos.length - 1) {
                setCurrentPhotoIndex(prev => prev + 1);
              }
              if (isRightSwipe && currentPhotoIndex > 0) {
                setCurrentPhotoIndex(prev => prev - 1);
              }
            }}
            className="relative w-full h-full flex items-center justify-center p-4 lg:p-8"
          >
            <img
              src={photos[currentPhotoIndex]}
              alt={`Leah painting - photo ${currentPhotoIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{
                maxHeight: 'calc(100vh - 100px)',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
