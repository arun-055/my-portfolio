'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const GLB_URLS = [
  '/Laptop-opt1.glb',
  '/laptop-opt.glb',
  '/laptop.glb',
];

export default function LaptopScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;


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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 2, 7);
    camera.lookAt(0, 0, 0);

  
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

    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    let laptopGroup: THREE.Group | null = null;

    const tryLoad = (urls: string[], index: number) => {
      if (index >= urls.length) {
        console.warn('All GLB URLs failed to load');
        return;
      }
      const url = urls[index];
      console.log(`Trying GLB: ${url}`);
      loader.load(
        url,
        (gltf) => {
          console.log(`Loaded successfully: ${url}`);
          laptopGroup = gltf.scene as THREE.Group;

          const box = new THREE.Box3().setFromObject(laptopGroup);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleFactor = 3.2 / maxDim;
          laptopGroup.scale.setScalar(scaleFactor);

          const box2 = new THREE.Box3().setFromObject(laptopGroup);
          const center = box2.getCenter(new THREE.Vector3());
          laptopGroup.position.sub(center);
          laptopGroup.position.y -= 0.2;

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
        () => {
          console.warn(`Failed: ${url} — trying next...`);
          tryLoad(urls, index + 1);
        }
      );
    };

    tryLoad(GLB_URLS, 0);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (laptopGroup) {
        laptopGroup.position.y = Math.sin(t * 0.7) * 0.08 - 0.2;
      }

      ring.rotation.z = t * 0.3;
      ringMat.emissiveIntensity = 1.2 + Math.sin(t * 2.2) * 0.5;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

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
