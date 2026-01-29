"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * AnchorInteractive - Minimal Three.js Scene
 *
 * This component renders a Three.js canvas with a spinning cube.
 * You can reuse this component anywhere in your app.
 *
 * Real World Context:
 * This is how interactive 3D scenes are embedded in modern web apps.
 * You can expand this to load images, models, or add interactivity.
 */

export default function AnchorInteractive() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent background

    // Add a spinning cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00c5cd });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5; // Move camera back for better 3D effect

    // Mount renderer to DOM
    // Remove any existing canvas before appending (prevents duplicates)
    if (mountRef.current) {
      // Remove all children (should only be one canvas)
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add OrbitControls for camera movement (desktop & mobile)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // smooth camera motion
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.enablePan = true; // allow panning
    controls.enableZoom = true; // allow zoom
    controls.enableRotate = true; // allow rotation

    // Animation loop
    let frameId: number;
    const animate = () => {
      // Cube no longer spins automatically; only moves with camera controls
      renderer.render(scene, camera);
      // Debug: log rotation to confirm animation is running
      // Remove this after confirming
      // console.log('Cube rotation:', cube.rotation.x, cube.rotation.y);
      controls.update();
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        zIndex: 10,
        overflow: "hidden",
      }}
      aria-label="Anchor Interactive 3D Scene"
    />
  );
}
