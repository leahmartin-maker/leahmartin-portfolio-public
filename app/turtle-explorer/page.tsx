// Sea Turtle Explorer - Starter Page
// This is the scaffold (frame) for your interactive 3D experience.
// You'll build on top of this, adding 3D Canvas, controls, and overlays.

'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

/**
 * Real World Context:
 * This file uses semantic HTML, ARIA labels, and clear comments for accessibility and maintainability.
 * The main section is the "room" for your experience. The Canvas placeholder will be replaced with your 3D scene.
 */

export default function SeaTurtleExplorer() {
  return (
    <main aria-label="Sea Turtle Explorer Experience" style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #00c5cd, #00334d 80%)' }}>
      {/* Page Title for screen readers and SEO */}
      <header>
        <h1 aria-label="Sea Turtle Explorer" style={{ textAlign: 'center', fontSize: '2.5rem', marginTop: '2rem', color: '#00334d' }}>
          Sea Turtle Explorer
        </h1>
      </header>
      {/* Main interactive section (3D Canvas is now here) */}
      <section aria-label="Interactive Ocean Scene" style={{ width: '100%', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* React Three Fiber Canvas: This is your 3D stage. */}
        <Canvas camera={{ position: [0, 2, 8], fov: 60 }} style={{ width: '80vw', height: '70vh', borderRadius: '24px' }} aria-label="3D Ocean Canvas">
          {/* Ambient blue light for underwater feel */}
          <ambientLight intensity={0.5} color="#00c5cd" />
          {/* Directional light for sunbeams */}
          <directionalLight position={[0, 10, 5]} intensity={1} color="#ffffff" />
          {/* Ocean floor (large blue plane) */}
          <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#00334d" />
          </mesh>
          {/* OrbitControls: Lets you look around for now (will be replaced with custom controls later) */}
          <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
        </Canvas>
      </section>
      {/* Accessibility: ARIA and alt text are included for all major elements. */}
    </main>
  );
}
