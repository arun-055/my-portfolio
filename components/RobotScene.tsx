'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RobotScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const W = mountRef.current.clientWidth;
    const H = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x050d1a,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x001122,
    });
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x00f5ff,
      emissiveIntensity: 2,
      metalness: 0.1,
      roughness: 0.2,
    });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      metalness: 0.1,
      roughness: 0.0,
      transparent: true,
      opacity: 0.7,
      emissive: 0x001a33,
      emissiveIntensity: 0.5,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x0a1628,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0x000a14,
    });
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xff2222,
      emissive: 0xff0000,
      emissiveIntensity: 1.5,
    });
    const greenMat = new THREE.MeshStandardMaterial({
      color: 0x39ff14,
      emissive: 0x39ff14,
      emissiveIntensity: 1.5,
    });

    // Robot group
    const robot = new THREE.Group();

    // HEAD
    const headGroup = new THREE.Group();
    const headGeo = new THREE.BoxGeometry(1.2, 1.1, 1.0);
    const head = new THREE.Mesh(headGeo, bodyMat);
    head.castShadow = true;
    headGroup.add(head);

    // Head top fin
    const finGeo = new THREE.BoxGeometry(0.15, 0.35, 0.6);
    const fin = new THREE.Mesh(finGeo, accentMat);
    fin.position.set(0, 0.7, 0);
    headGroup.add(fin);

    // Visor
    const visorGeo = new THREE.BoxGeometry(0.9, 0.28, 0.1);
    const visor = new THREE.Mesh(visorGeo, glassMat);
    visor.position.set(0, 0.1, 0.52);
    headGroup.add(visor);

    // Eyes
    const eyeGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16);
    const leftEye = new THREE.Mesh(eyeGeo, glowMat);
    leftEye.rotation.x = Math.PI / 2;
    leftEye.position.set(-0.25, 0.1, 0.52);
    const rightEye = new THREE.Mesh(eyeGeo, glowMat);
    rightEye.rotation.x = Math.PI / 2;
    rightEye.position.set(0.25, 0.1, 0.52);
    headGroup.add(leftEye, rightEye);

    // Mouth - horizontal lines
    for (let i = 0; i < 4; i++) {
      const mouthGeo = new THREE.BoxGeometry(0.55, 0.025, 0.05);
      const mouth = new THREE.Mesh(mouthGeo, glowMat);
      mouth.position.set(0, -0.22 + i * 0.08, 0.52);
      mouth.scale.x = i === 0 || i === 3 ? 0.6 : 1;
      headGroup.add(mouth);
    }

    // Antenna
    const antBaseGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8);
    const antBase = new THREE.Mesh(antBaseGeo, accentMat);
    antBase.position.set(-0.2, 0.85, 0);
    const antBallGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const antBall = new THREE.Mesh(antBallGeo, glowMat);
    antBall.position.set(-0.2, 1.08, 0);
    headGroup.add(antBase, antBall);

    // Side panels
    for (const side of [-1, 1]) {
      const panelGeo = new THREE.BoxGeometry(0.12, 0.5, 0.7);
      const panel = new THREE.Mesh(panelGeo, accentMat);
      panel.position.set(side * 0.66, 0, 0);
      headGroup.add(panel);

      // Ear glow strips
      const stripGeo = new THREE.BoxGeometry(0.04, 0.3, 0.04);
      const strip = new THREE.Mesh(stripGeo, glowMat);
      strip.position.set(side * 0.74, 0, 0.15);
      headGroup.add(strip);
    }

    headGroup.position.set(0, 2.1, 0);
    robot.add(headGroup);

    // NECK
    const neckGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.35, 12);
    const neck = new THREE.Mesh(neckGeo, accentMat);
    neck.position.set(0, 1.72, 0);
    robot.add(neck);

    // TORSO
    const torsoGroup = new THREE.Group();
    const torsoGeo = new THREE.BoxGeometry(1.8, 1.6, 1.0);
    const torso = new THREE.Mesh(torsoGeo, bodyMat);
    torso.castShadow = true;
    torsoGroup.add(torso);

    // Chest panel glow lines
    const chestPanelGeo = new THREE.BoxGeometry(0.9, 0.5, 0.08);
    const chestPanel = new THREE.Mesh(chestPanelGeo, new THREE.MeshStandardMaterial({
      color: 0x001a33,
      emissive: 0x001a33,
      metalness: 0.5,
    }));
    chestPanel.position.set(0, 0.2, 0.54);
    torsoGroup.add(chestPanel);

    // Chest core
    const coreGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const core = new THREE.Mesh(coreGeo, glowMat);
    core.position.set(0, 0.2, 0.54);
    torsoGroup.add(core);

    // Chest strips
    for (let i = 0; i < 3; i++) {
      const stripGeo = new THREE.BoxGeometry(0.6, 0.04, 0.06);
      const strip = new THREE.Mesh(stripGeo, glowMat);
      strip.position.set(0, -0.15 - i * 0.15, 0.54);
      torsoGroup.add(strip);
    }

    // Shoulder pads
    for (const side of [-1, 1]) {
      const shoulderGeo = new THREE.BoxGeometry(0.25, 0.35, 0.9);
      const shoulder = new THREE.Mesh(shoulderGeo, accentMat);
      shoulder.position.set(side * 1.05, 0.5, 0);
      torsoGroup.add(shoulder);
    }

    // Torso status lights
    const statuses = [redMat, greenMat, glowMat];
    for (let i = 0; i < 3; i++) {
      const lightGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const light = new THREE.Mesh(lightGeo, statuses[i]);
      light.position.set(-0.55 + i * 0.15, -0.4, 0.54);
      torsoGroup.add(light);
    }

    torsoGroup.position.set(0, 0.85, 0);
    robot.add(torsoGroup);

    // ARMS
    for (const side of [-1, 1]) {
      const armGroup = new THREE.Group();

      // Upper arm
      const upperArmGeo = new THREE.BoxGeometry(0.38, 0.9, 0.4);
      const upperArm = new THREE.Mesh(upperArmGeo, bodyMat);
      armGroup.add(upperArm);

      // Elbow joint
      const elbowGeo = new THREE.SphereGeometry(0.22, 12, 12);
      const elbow = new THREE.Mesh(elbowGeo, accentMat);
      elbow.position.set(0, -0.5, 0);
      armGroup.add(elbow);

      // Forearm
      const forearmGeo = new THREE.BoxGeometry(0.32, 0.75, 0.35);
      const forearm = new THREE.Mesh(forearmGeo, bodyMat);
      forearm.position.set(0, -1.1, 0);
      armGroup.add(forearm);

      // Arm glow strip
      const stripGeo = new THREE.BoxGeometry(0.04, 0.5, 0.04);
      const strip = new THREE.Mesh(stripGeo, glowMat);
      strip.position.set(side * 0.18, -1.1, 0.18);
      armGroup.add(strip);

      // Hand
      const handGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
      const hand = new THREE.Mesh(handGeo, accentMat);
      hand.position.set(0, -1.62, 0);
      armGroup.add(hand);

      armGroup.position.set(side * 1.2, 0.95, 0);
      armGroup.rotation.z = side * 0.08;
      robot.add(armGroup);
    }

    // WAIST
    const waistGeo = new THREE.BoxGeometry(1.4, 0.3, 0.85);
    const waist = new THREE.Mesh(waistGeo, accentMat);
    waist.position.set(0, 0.05, 0);
    robot.add(waist);

    // LEGS
    for (const side of [-1, 1]) {
      const legGroup = new THREE.Group();

      // Hip
      const hipGeo = new THREE.BoxGeometry(0.55, 0.3, 0.55);
      const hip = new THREE.Mesh(hipGeo, accentMat);
      legGroup.add(hip);

      // Thigh
      const thighGeo = new THREE.BoxGeometry(0.5, 0.85, 0.5);
      const thigh = new THREE.Mesh(thighGeo, bodyMat);
      thigh.position.set(0, -0.6, 0);
      legGroup.add(thigh);

      // Knee
      const kneeGeo = new THREE.SphereGeometry(0.28, 12, 12);
      const knee = new THREE.Mesh(kneeGeo, accentMat);
      knee.position.set(0, -1.1, 0);
      legGroup.add(knee);

      // Shin
      const shinGeo = new THREE.BoxGeometry(0.45, 0.8, 0.48);
      const shin = new THREE.Mesh(shinGeo, bodyMat);
      shin.position.set(0, -1.65, 0);
      legGroup.add(shin);

      // Shin glow strip
      const sGeo = new THREE.BoxGeometry(0.04, 0.5, 0.04);
      const sStrip = new THREE.Mesh(sGeo, glowMat);
      sStrip.position.set(0, -1.65, 0.25);
      legGroup.add(sStrip);

      // Foot
      const footGeo = new THREE.BoxGeometry(0.5, 0.22, 0.7);
      const foot = new THREE.Mesh(footGeo, accentMat);
      foot.position.set(0, -2.14, 0.1);
      legGroup.add(foot);

      legGroup.position.set(side * 0.45, -0.2, 0);
      robot.add(legGroup);
    }

    robot.position.set(0, -1.2, 0);
    scene.add(robot);

    // LIGHTING
    const ambient = new THREE.AmbientLight(0x112233, 1.5);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x00f5ff, 3);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbf00ff, 1.5);
    fillLight.position.set(-3, 2, 1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x00f5ff, 2);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // Ground glow plane
    const groundGeo = new THREE.CircleGeometry(1.5, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x00f5ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.15,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.3;
    scene.add(ground);

    // Floating particles
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 450; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x00f5ff, size: 0.03, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let frameId: number;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.016;

      // Smooth robot follow mouse
      robot.rotation.y += (mouseRef.current.x * 0.5 - robot.rotation.y) * 0.05;
      robot.rotation.x += (mouseRef.current.y * 0.2 - robot.rotation.x) * 0.05;

      // Bob
      robot.position.y = -1.2 + Math.sin(t * 0.8) * 0.12;

      // Head slight bob
      headGroup.rotation.y = Math.sin(t * 0.5) * 0.08;

      // Eye glow pulse
      const pulse = 1.5 + Math.sin(t * 3) * 0.5;
      (leftEye.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      (rightEye.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
      (antBall.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5 + Math.sin(t * 4) * 0.8;
      (core.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.8 + Math.sin(t * 2.5) * 0.6;

      // Particles rotate
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
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
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
