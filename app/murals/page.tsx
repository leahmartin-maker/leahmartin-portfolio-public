'use client';

/**
 * MURALS PAGE - Interactive Map with Custom Turtle Pins
 * 
 * What you're learning here:
 * - React hooks (useState, useEffect)
 * - Fetching JSON data
 * - Working with map libraries (Mapbox)
 * - Custom markers/icons
 * - Conditional rendering
 * 
 * Real World Context:
 * Location-based apps (Uber, Airbnb, Yelp) all use this pattern:
 * - Fetch data from API/JSON
 * - Plot on a map with custom markers
 * - Show details on click
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navbar from '../components/Navbar';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibGVhaG1hcnRpbi1tYWtlciIsImEiOiJjbWs3OWhtaHYxMnU4M2hwdzhtdjVsbzZsIn0.6v_uxNreMRzVockKLFv80Q';

// TypeScript type for mural data
type Mural = {
  title: string;
  longitude: number;
  latitude: number;
  description: string;
  media: string[];
};

export default function MuralsPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [murals, setMurals] = useState<Mural[]>([]);
  const [selectedMural, setSelectedMural] = useState<Mural | null>(null);

  // Load mural data from JSON file
  useEffect(() => {
    fetch('/murals.json')
      .then(response => response.json())
      .then(data => setMurals(data.murals))
      .catch(error => console.error('Error loading murals:', error));
  }, []);

  // Disable map interactions when card is open on mobile
  useEffect(() => {
    if (!map.current) return;
    
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    
    if (selectedMural && isMobile) {
      // Disable all map interactions when card is open on mobile
      map.current.dragPan.disable();
      map.current.scrollZoom.disable();
      map.current.touchZoomRotate.disable();
      
      // LOCK BODY SCROLL on mobile when card is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable when card is closed
      map.current.dragPan.enable();
      map.current.scrollZoom.enable();
      map.current.touchZoomRotate.enable();
      
      // UNLOCK BODY SCROLL
      document.body.style.overflow = '';
    }
    
    // Cleanup: make sure we unlock scroll when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMural]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-97.3, 27.7], // Centered on Coastal Bend (between Aransas Pass and Padre Island)
      zoom: 10, // Zoomed out to show entire coastal region
      pitch: 45
    });

    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  // Add custom turtle markers when murals are loaded
  useEffect(() => {
    if (!map.current || murals.length === 0) return;

    murals.forEach(mural => {
      // Create wrapper for the marker (Mapbox positions this)
      const wrapper = document.createElement('div');
      wrapper.style.width = '100px';
      wrapper.style.height = '100px';
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.justifyContent = 'center';
      
      // Create the actual turtle image (we transform this)
      const el = document.createElement('div');
      el.className = 'turtle-marker';
      el.style.backgroundImage = 'url(/images/turtle-pin.png)';
      el.style.width = '80px';
      el.style.height = '80px';
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundPosition = 'center';
      el.style.cursor = 'pointer';
      el.style.transition = 'transform 0.3s ease';
      el.style.filter = 'drop-shadow(0 0 3px #00c5cd) drop-shadow(0 0 2px #00c5cd)';
      
      // Add hover effect to the inner element
      wrapper.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.3)';
      });
      wrapper.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });
      
      // Put turtle inside wrapper
      wrapper.appendChild(el);

      // Add marker to map - position the wrapper, not the turtle
      const marker = new mapboxgl.Marker({ 
        element: wrapper,
        anchor: 'center'
      })
        .setLngLat([mural.longitude, mural.latitude])
        .addTo(map.current!);

      // Show mural details on click
      el.addEventListener('click', () => {
        setSelectedMural(mural);
        // Fly to the clicked mural
        map.current?.flyTo({
          center: [mural.longitude, mural.latitude],
          zoom: 15
        });
      });
    });
  }, [murals]);

  return (
    <div className="min-h-screen bg-stucco">
      {/* Navigation */}
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sea-life from-30% to-white py-12 px-8 shadow-lg">
        <h1 className="text-6xl font-bold text-white mb-2 font-[family-name:var(--font-handwriting)]">
          My Murals
        </h1>
        <p className="text-white/90 max-w-2xl text-lg">
          Explore my public art installations across the Texas coast. 
          Click on a sea turtle to see details and photos!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)]">
        {/* Map Container */}
        <div className={`flex-1 relative ${selectedMural ? 'lg:pointer-events-auto pointer-events-none' : ''}`}>
          <div ref={mapContainer} className="w-full h-full" />
        </div>

        {/* Mobile: Dark backdrop when card is open */}
        {selectedMural && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSelectedMural(null)}
          />
        )}

        {/* Mural Details Sidebar/Card */}
        {/* Desktop: Right sidebar | Mobile: Floating card from bottom */}
        <div 
          className={`
            lg:w-96 lg:static lg:border-l-2
            bg-white border-sea-life shadow-xl
            ${selectedMural 
              ? 'fixed bottom-0 left-0 right-0 h-[80vh] z-50 rounded-t-3xl lg:rounded-none' 
              : 'hidden lg:block'
            }
          `}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {selectedMural ? (
            <div className="flex flex-col h-full max-h-full overflow-hidden">
              {/* Close button - Mobile only */}
              <button
                onClick={() => setSelectedMural(null)}
                className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 z-10"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Scrollable content */}
              <div 
                className="overflow-y-auto p-6 pb-8 flex-1"
                style={{ 
                  touchAction: 'pan-y',
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <h2 className="text-3xl font-bold text-sea-life mb-3 font-[family-name:var(--font-handwriting)] pr-10 lg:pr-0">
                  {selectedMural.title}
                </h2>
                <p className="text-gray-700 mb-6 text-base leading-relaxed">
                  {selectedMural.description}
                </p>

                {/* Media Gallery */}
                <div className="space-y-4">
                  {selectedMural.media.map((file, index) => {
                    if (file.endsWith('.mp4')) {
                      return (
                        <video 
                          key={index} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full rounded-lg"
                        >
                          <source src={file} type="video/mp4" />
                        </video>
                      );
                    } else {
                      return (
                        <Image
                          key={index}
                          src={file}
                          alt={selectedMural.title}
                          width={800}
                          height={600}
                          className="w-full rounded-lg"
                          aria-label={selectedMural.title}
                        />
                      );
                    }
                  })}
              </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-6">
              <p className="text-gray-500 text-center px-8">
                Select a location on the map to view mural details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
