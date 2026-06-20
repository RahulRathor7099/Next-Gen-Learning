'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import ParticleField from './ParticleField'

function GlassMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      // Rotation interpolation based on pointer movement
      const targetRotationY = mouse.x * 0.8
      const targetRotationX = -mouse.y * 0.6
      
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05

      // Floating sine wave animation along Y axis
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.15
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.3, 2]} />
      <meshPhysicalMaterial
        color="#8b5cf6"
        transmission={0.9}
        roughness={0.15}
        metalness={0.1}
        thickness={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        ior={1.5}
      />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#3b82f6" />

        {/* Ambient floating elements */}
        <ParticleField count={60} />

        {/* Glass shape */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <GlassMesh />
        </Float>
      </Canvas>
    </div>
  )
}
