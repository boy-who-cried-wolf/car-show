import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CarModel() {
  const group = useRef<THREE.Group>(null)
  
  // For now, we'll use a placeholder model
  // In a real application, you would load your car model here
  // const { scene } = useGLTF('/path/to/your/car/model.glb')
  
  useFrame((state) => {
    if (group.current) {
      // Add subtle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group ref={group}>
      {/* Placeholder car model - replace with your actual model */}
      <mesh>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
} 