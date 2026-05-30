'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, RoundedBox, Sphere, Torus, Cone } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'

interface Product3DViewerProps {
  category: string
  className?: string
}

function ProductShape({ category }: { category: string }) {
  const color = useMemo(() => {
    switch (category.toLowerCase()) {
      case 'furniture':
        return '#8B7355'
      case 'lighting':
        return '#FFD700'
      case 'decor':
        return '#87CEEB'
      default:
        return '#9CA3AF'
    }
  }, [category])

  const renderShape = () => {
    switch (category.toLowerCase()) {
      case 'furniture':
        return (
          <group>
            {/* Chair-like shape */}
            <RoundedBox args={[1.5, 0.2, 1.5]} position={[0, 0, 0]} radius={0.05}>
              <meshStandardMaterial color={color} />
            </RoundedBox>
            <RoundedBox args={[1.5, 1.2, 0.2]} position={[0, 0.7, -0.65]} radius={0.05}>
              <meshStandardMaterial color={color} />
            </RoundedBox>
            {/* Legs */}
            {[[-0.6, -0.5, 0.6], [0.6, -0.5, 0.6], [-0.6, -0.5, -0.6], [0.6, -0.5, -0.6]].map((pos, i) => (
              <RoundedBox key={i} args={[0.15, 0.8, 0.15]} position={pos as [number, number, number]} radius={0.02}>
                <meshStandardMaterial color="#4A4A4A" />
              </RoundedBox>
            ))}
          </group>
        )
      case 'lighting':
        return (
          <group>
            {/* Lamp shape */}
            <Cone args={[0.8, 1.2, 32]} position={[0, 0.8, 0]}>
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} side={THREE.DoubleSide} />
            </Cone>
            <RoundedBox args={[0.1, 1.5, 0.1]} position={[0, -0.2, 0]} radius={0.02}>
              <meshStandardMaterial color="#2D2D2D" metalness={0.8} roughness={0.2} />
            </RoundedBox>
            <RoundedBox args={[0.6, 0.1, 0.6]} position={[0, -0.95, 0]} radius={0.02}>
              <meshStandardMaterial color="#2D2D2D" metalness={0.8} roughness={0.2} />
            </RoundedBox>
          </group>
        )
      case 'decor':
        return (
          <group>
            {/* Vase shape */}
            <Sphere args={[0.6, 32, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.1} roughness={0.3} />
            </Sphere>
            <Torus args={[0.35, 0.15, 16, 32]} position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.1} roughness={0.3} />
            </Torus>
          </group>
        )
      default:
        return (
          <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.1}>
            <meshStandardMaterial color={color} />
          </RoundedBox>
        )
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {renderShape()}
    </Float>
  )
}

export function Product3DViewer({ category, className = '' }: Product3DViewerProps) {
  return (
    <div className={`w-full h-full min-h-[200px] ${className}`}>
      <Canvas camera={{ position: [3, 2, 3], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          <ProductShape category={category} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}
