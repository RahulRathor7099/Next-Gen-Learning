'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 80 }) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 6 // spread coordinates between -3 and 3
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle floating animation
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8b5cf6"
        size={0.06}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  )
}
