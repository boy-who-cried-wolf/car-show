import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface CarModelProps {
  modelPath: string
}

export function CarModel({ modelPath }: CarModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF(modelPath)
  
  // Clone the scene to avoid sharing materials between instances
  const clonedScene = scene.clone()
  
  // Set up materials and lighting
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      
      // Enhance material properties
      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material.metalness = 0.8
        child.material.roughness = 0.2
        child.material.envMapIntensity = 1.5
      }
    }
  })

  // Add floating animation
  useFrame((state) => {
    if (group.current) {
      // Auto-rotation
      group.current.rotation.y += 0.005
      
      // Floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <>
      <group ref={group} position={[0, -0.5, 0]} scale={[0.6, 0.6, 0.6]}>
        <primitive object={clonedScene} />
      </group>
      
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.8} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <spotLight
        position={[-10, 10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={1.5}
        castShadow
      />
    </>
  )
} 