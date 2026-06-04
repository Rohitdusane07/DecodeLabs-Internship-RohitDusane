import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hologram3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Group to hold all hologram pieces
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // 1. Outer Geodesic Sphere (Blue Wireframe)
    const outerGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const outerSphere = new THREE.Mesh(outerGeo, outerMat);
    hologramGroup.add(outerSphere);

    // 2. Chromatic Secondary Shell (Cyan Wireframe, slightly larger)
    const secondaryGeo = new THREE.IcosahedronGeometry(1.52, 2);
    const secondaryMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const secondarySphere = new THREE.Mesh(secondaryGeo, secondaryMat);
    secondarySphere.rotation.y = Math.PI / 4;
    hologramGroup.add(secondarySphere);

    // 3. Inner Core Sphere (Purple Wireframe/Points)
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    hologramGroup.add(innerSphere);

    // Inner Points Core
    const innerPointsMat = new THREE.PointsMaterial({
      color: 0xe879f9,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const innerPoints = new THREE.Points(innerGeo, innerPointsMat);
    hologramGroup.add(innerPoints);

    // 4. Orbiting Ring (Cyan)
    const ringGeo = new THREE.TorusGeometry(1.9, 0.015, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    hologramGroup.add(ring);

    // Orbiting Ring Particles
    const ringParticlesCount = 36;
    const ringPPositions = new Float32Array(ringParticlesCount * 3);
    for (let i = 0; i < ringParticlesCount; i++) {
      const angle = (i / ringParticlesCount) * Math.PI * 2;
      ringPPositions[i * 3] = Math.cos(angle) * 1.9;
      ringPPositions[i * 3 + 1] = Math.sin(angle) * 1.9;
      ringPPositions[i * 3 + 2] = 0;
    }
    const ringPGeo = new THREE.BufferGeometry();
    ringPGeo.setAttribute('position', new THREE.BufferAttribute(ringPPositions, 3));
    const ringPMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.9,
    });
    const ringParticles = new THREE.Points(ringPGeo, ringPMat);
    ringParticles.rotation.x = Math.PI / 2.5;
    hologramGroup.add(ringParticles);

    // 5. Laser Scanning Ring (Cyan Torus sweeping up and down)
    const scanRingGeo = new THREE.TorusGeometry(1.53, 0.02, 6, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.rotation.x = Math.PI / 2;
    hologramGroup.add(scanRing);

    // 6. Hologram Base glow lines
    const baseLinesCount = 5;
    const lineGroup = new THREE.Group();
    hologramGroup.add(lineGroup);

    for (let i = 0; i < baseLinesCount; i++) {
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.15,
      });
      const points = [];
      const x = (Math.random() - 0.5) * 1.2;
      const z = (Math.random() - 0.5) * 1.2;
      points.push(new THREE.Vector3(x, -2.5, z));
      points.push(new THREE.Vector3(x * 0.5, 2.5, z * 0.5));
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      lineGroup.add(line);
    }

    // Interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / width - 0.5) * 2;
      mouseY = -(y / height - 0.5) * 2;
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation variables
    let scanDirection = 1;
    const startTime = performance.now();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Rotations
      outerSphere.rotation.y = elapsedTime * 0.15;
      outerSphere.rotation.x = elapsedTime * 0.05;
      
      secondarySphere.rotation.y = -elapsedTime * 0.12;
      secondarySphere.rotation.x = -elapsedTime * 0.07;
      
      innerSphere.rotation.y = -elapsedTime * 0.25;
      innerPoints.rotation.y = -elapsedTime * 0.25;
      
      ring.rotation.z = -elapsedTime * 0.1;
      ringParticles.rotation.z = -elapsedTime * 0.1;

      // Laser scan sweep
      scanRing.position.y += 0.02 * scanDirection;
      if (scanRing.position.y > 1.5) {
        scanDirection = -1;
      } else if (scanRing.position.y < -1.5) {
        scanDirection = 1;
      }

      // Smooth mouse follow (tilting the group)
      targetX = mouseX * 0.3;
      targetY = mouseY * 0.3;
      hologramGroup.rotation.y += (targetX - hologramGroup.rotation.y) * 0.05;
      hologramGroup.rotation.x += (targetY - hologramGroup.rotation.x) * 0.05;

      // Subtly pulsate scale
      const pulse = 1 + Math.sin(elapsedTime * 4) * 0.03;
      innerSphere.scale.set(pulse, pulse, pulse);
      innerPoints.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      secondaryGeo.dispose();
      secondaryMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      innerPointsMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringPGeo.dispose();
      ringPMat.dispose();
      scanRingGeo.dispose();
      scanRingMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[450px] flex items-center justify-center">
      {/* Glow aura background */}
      <div className="absolute w-[200px] h-[200px] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute w-[180px] h-[180px] bg-purple-500/10 rounded-full blur-[60px] pointer-events-none animate-float"></div>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
