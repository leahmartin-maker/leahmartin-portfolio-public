"use client";
import { useRef, useEffect } from "react";



export default function AnchorInteractive() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer, scene, camera, controls;
    let frameId;
    let isMounted = true;

    Promise.all([
      import('three'),
      import('three/examples/jsm/controls/OrbitControls')
    ]).then(([THREE, controlsModule]) => {
      if (!isMounted) return;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);


      // Load mural texture and add as a large background plane
      const loader = new THREE.TextureLoader();
      loader.load("/anchor_interactive/anchorempty.png", (texture) => {
        const muralWidth = 2.0;
        const muralHeight = 4.0;
        const muralGeometry = new THREE.PlaneGeometry(muralWidth, muralHeight);
        const muralMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const muralPlane = new THREE.Mesh(muralGeometry, muralMaterial);
        muralPlane.position.set(0, 0, -1);
        scene.add(muralPlane);

        // Load caustics PNG sequence and animate as overlay
        const causticsFrameCount = 6;
        const causticsTextures = [];
        let loadedCount = 0;
        for (let i = 1; i <= causticsFrameCount; i++) {
          const frameNum = i.toString().padStart(3, '0');
          loader.load(`/anchor_interactive/watercaustics_${frameNum}.png`, (tex) => {
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(1, 1);
            causticsTextures[i - 1] = tex;
            loadedCount++;
            if (loadedCount === causticsFrameCount) {
              // All frames loaded, create the plane
              const causticsMaterial = new THREE.MeshBasicMaterial({
                map: causticsTextures[0],
                transparent: true,
                opacity: 0.45,
                depthWrite: false,
              });
              const causticsPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(muralWidth, muralHeight),
                causticsMaterial
              );
              causticsPlane.position.set(0, 0, -0.98);
              scene.add(causticsPlane);

              // Animate by swapping textures
              let frame = 0;
              setInterval(() => {
                frame = (frame + 1) % causticsFrameCount;
                causticsMaterial.map = causticsTextures[frame];
                causticsMaterial.needsUpdate = true;
              }, 100); // 100ms per frame = 10 FPS (adjust as needed)
            }
          });
        }
      });

      // Add underwater lighting (soft blue directional light)
      const light = new THREE.DirectionalLight(0x66ccff, 1.2);
      light.position.set(0, 2, 2);
      scene.add(light);

      camera.position.z = 5;

      // Mount renderer to DOM
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
        mountRef.current.appendChild(renderer.domElement);
      }

      // Add OrbitControls for camera movement
      const OrbitControls = controlsModule.OrbitControls;
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 2;
      controls.maxDistance = 20;
      controls.enablePan = true;
      controls.enableZoom = true;
      controls.enableRotate = true;

      // Animation loop
      const animate = () => {
        renderer.render(scene, camera);
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
        isMounted = false;
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        controls.dispose();
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => { isMounted = false; };
  }, []);

  // Only render the Three.js canvas container
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
