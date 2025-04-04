import { Canvas } from '@react-three/fiber'
import { CarModel } from './components/CarModel'
import { Environment, OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import './App.css'

function App() {
  const [currentModel, setCurrentModel] = useState(0)
  const models = ['bmw_i8', 'free_bmw_m3_e30', 'bmw_e34_stance_style']

  const nextModel = () => {
    setCurrentModel((prev) => (prev + 1) % models.length)
  }

  const prevModel = () => {
    setCurrentModel((prev) => (prev - 1 + models.length) % models.length)
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Garage background */}
      <div className="absolute inset-0 bg-[url('/garage-bg.jpg')] bg-cover bg-center opacity-20 blur-sm" />
      
      <header className="text-center py-8 relative z-10">
        <h1 className="text-4xl font-bold text-white glow">Car Show</h1>
      </header>
      
      <main className="h-[80vh] relative z-10">
        <Canvas shadows camera={{ position: [3, 3, 3], fov: 45 }}>
          <CarModel modelPath={`/models/${models[currentModel]}.glb`} />
          <Environment preset="warehouse" />
          <OrbitControls
            enableZoom={true}
            minDistance={2}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
        
        {/* Navigation buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={prevModel}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full transition-all backdrop-blur-sm"
          >
            Previous
          </button>
          <button
            onClick={nextModel}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full transition-all backdrop-blur-sm"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
