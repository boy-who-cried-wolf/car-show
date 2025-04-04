import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import CarModel from './components/CarModel'
import { gsap } from 'gsap'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="garage-window flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Car Show</h1>
      </header>
      
      <main className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 2, 5], fov: 50 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <CarModel />
            <Environment preset="warehouse" />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full transition-all">
            Previous
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full transition-all">
            Next
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
