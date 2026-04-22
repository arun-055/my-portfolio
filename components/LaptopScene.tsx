'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function LaptopScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    el.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 2, 7);
    camera.lookAt(0, 0, 0);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(5, 8, 5);
    scene.add(dir);

    const cyanLight = new THREE.PointLight(0x00f5ff, 6, 18);
    cyanLight.position.set(-4, 3, 3);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xbf00ff, 4, 14);
    purpleLight.position.set(4, 2, -3);
    scene.add(purpleLight);

    const frontLight = new THREE.PointLight(0x00f5ff, 3, 12);
    frontLight.position.set(0, 1, 5);
    scene.add(frontLight);

    /* ── Neon orbit ring ── */
    const ringGeo = new THREE.TorusGeometry(2.8, 0.012, 8, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x00f5ff,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    /* ── Ground glow disc ── */
    const discGeo = new THREE.CircleGeometry(2, 48);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -1.5;
    scene.add(disc);

    /* ── OrbitControls ── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.rotateSpeed = 0.5;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.target.set(0, 0, 0);
    controls.update();

    /* ── Load GLB ── */
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    let laptopGroup: THREE.Group | null = null;

    loader.load(
      '/laptop-opt.glb',
      (gltf) => {
        laptopGroup = gltf.scene as THREE.Group;

        // ── Auto-fit: compute bounding box and scale to fit nicely ──
        const box = new THREE.Box3().setFromObject(laptopGroup);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const desiredSize = 3.2; // how big it appears in scene
        const scaleFactor = desiredSize / maxDim;
        laptopGroup.scale.setScalar(scaleFactor);

        // Re-center after scaling
        const box2 = new THREE.Box3().setFromObject(laptopGroup);
        const center = box2.getCenter(new THREE.Vector3());
        laptopGroup.position.sub(center);
        laptopGroup.position.y -= 0.2; // slight downward nudge

        // Boost materials
        laptopGroup.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mats = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            mats.forEach((m) => {
              if (m instanceof THREE.MeshStandardMaterial) {
                m.envMapIntensity = 1.5;
                m.needsUpdate = true;
              }
            });
          }
        });

        scene.add(laptopGroup);
      },
      undefined,
      (err) => console.error('GLB load error:', err)
    );

    /* ── Animate ── */
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Float laptop
      if (laptopGroup) {
        laptopGroup.position.y = Math.sin(t * 0.7) * 0.08 - 0.2;
      }

      // Ring spin + pulse glow
      ring.rotation.z = t * 0.3;
      ringMat.emissiveIntensity = 1.2 + Math.sin(t * 2.2) * 0.5;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      discGeo.dispose();
      discMat.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}