import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface CarModelProps {
  modelPath: string
}

export function CarModel({ modelPath }: CarModelProps) {
  const group = useRef<THREE.Group>(null)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
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

  // Add rotation animation only when user is not interacting
  useFrame(() => {
    if (group.current && !isUserInteracting) {
      // Auto-rotation - reduced speed for more elegant movement
      group.current.rotation.y += 0.002
    }
  })

  return (
    <>
      <group 
        ref={group} 
        position={[0, 0, 0]} 
        scale={[0.6, 0.6, 0.6]}
        onPointerDown={() => setIsUserInteracting(true)}
        onPointerUp={() => setIsUserInteracting(false)}
        onPointerLeave={() => setIsUserInteracting(false)}
      >
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