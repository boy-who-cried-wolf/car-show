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
    <div className="min-h-screen bg-gray-900 relative flex flex-col">
      {/* Garage background */}
      <div className="absolute inset-0 bg-[url('/garage-bg.jpg')] bg-cover bg-center opacity-20 blur-sm" />
      
      {/* Header */}
      <header className="relative z-10 bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-gray-300 font-bold text-xl">CS</span>
              </div>
              <span className="text-gray-300 text-xl font-bold">CarShow</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Gallery</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 relative z-10">
        <div className="h-[80vh]">
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
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-sm border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About section */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">About CarShow</h3>
              <p className="text-gray-400">
                Experience the finest collection of luxury and sports cars in our virtual showroom.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@carshow.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Car Street, Auto City</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 CarShow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
