"use client";

import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Simple ISS Model Component
function ISSModel({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Main Truss */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.5, 0.5]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Solar Panels */}
      <mesh position={[0, 0, 2]}>
        <boxGeometry args={[6, 0.1, 3]} />
        <meshStandardMaterial color="#1a3a5f" metalness={0.5} roughness={0.3} />
      </mesh>
      
      <mesh position={[0, 0, -2]}>
        <boxGeometry args={[6, 0.1, 3]} />
        <meshStandardMaterial color="#1a3a5f" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Cupola Module */}
      <mesh position={[3, 0.5, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#a0d0e0" transparent opacity={0.7} />
      </mesh>
      
      {/* Laboratory Modules */}
      <mesh position={[-2, 0.3, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.6} roughness={0.4} />
      </mesh>
      
      <mesh position={[2, 0.3, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

// Earth Component
function Earth() {
  const earthRef = useRef();
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <group ref={earthRef}>
      <mesh>
        <sphereGeometry args={[30, 64, 64]} />
        <meshStandardMaterial 
          color="#2a5caa" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh>
        <sphereGeometry args={[30.1, 64, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

// Floating Astronaut Component
function FloatingAstronaut() {
  const astronautRef = useRef();
  
  useFrame(({ clock }) => {
    if (astronautRef.current) {
      const time = clock.getElapsedTime();
      astronautRef.current.position.y = Math.sin(time * 0.5) * 0.5;
      astronautRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }
  });
  
  return (
    <group ref={astronautRef} position={[0, 0, 0]}>
      {/* Astronaut body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.3, 1, 4, 8]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Helmet */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#a0d0e0" transparent opacity={0.7} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  );
}

// Cupola View Scene
function CupolaScene({ setActiveInfo }) {
  const { camera } = useThree();
  
  // Position camera inside the Cupola
  camera.position.set(3, 0.5, 0);
  camera.lookAt(10, 0, 0);
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Earth />
      <ISSModel />
      
      {/* Hotspots */}
      <mesh position={[15, 5, 0]} onClick={() => setActiveInfo('sunrise')}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={0.5} />
        <Html distanceFactor={10}>
          <div className="bg-black/70 text-white p-2 rounded text-sm max-w-xs">
            <h3 className="font-bold text-yellow-300">🌅 Sunrise View</h3>
            <p>Astronauts see 16 sunrises every day from orbit!</p>
          </div>
        </Html>
      </mesh>
      
      <mesh position={[12, -8, 0]} onClick={() => setActiveInfo('ocean')}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="blue" emissive="blue" emissiveIntensity={0.5} />
        <Html distanceFactor={10}>
          <div className="bg-black/70 text-white p-2 rounded text-sm max-w-xs">
            <h3 className="font-bold text-blue-300">🌊 Ocean Observation</h3>
            <p>Monitor ocean currents and marine ecosystems from space</p>
          </div>
        </Html>
      </mesh>
      
      <mesh position={[18, 0, 5]} onClick={() => setActiveInfo('cities')}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
        <Html distanceFactor={10}>
          <div className="bg-black/70 text-white p-2 rounded text-sm max-w-xs">
            <h3 className="font-bold text-white">🌇 City Lights</h3>
            <p>Track urban growth and energy consumption patterns</p>
          </div>
        </Html>
      </mesh>
    </>
  );
}

// NBL Training Scene
function NBLScene({ setActiveInfo }) {
  return (
    <>
      {/* Underwater lighting */}
      <ambientLight intensity={0.3} color="#a0c0e0" />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#80a0c0" />
      
      {/* Water effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#204060" 
          transparent 
          opacity={0.6}
          roughness={0.9}
        />
      </mesh>
      
      <FloatingAstronaut />
      
      {/* Bubbles */}
      {[...Array(20)].map((_, i) => (
        <Bubble key={i} index={i} />
      ))}
      
      {/* Info Markers */}
      <mesh position={[3, 2, 0]} onClick={() => setActiveInfo('training')}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.5} />
        <Html distanceFactor={10}>
          <div className="bg-black/70 text-white p-2 rounded text-sm max-w-xs">
            <h3 className="font-bold text-green-300">🧑‍🚀 Astronaut Training</h3>
            <p>NBL simulates microgravity through neutral buoyancy</p>
          </div>
        </Html>
      </mesh>
      
      <mesh position={[-3, -1, 0]} onClick={() => setActiveInfo('benefits')}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f87171" emissive="#f87171" emissiveIntensity={0.5} />
        <Html distanceFactor={10}>
          <div className="bg-black/70 text-white p-2 rounded text-sm max-w-xs">
            <h3 className="font-bold text-red-300">🧠 Research Benefits</h3>
            <p>Advances in muscle atrophy research and robotics</p>
          </div>
        </Html>
      </mesh>
    </>
  );
}

// Bubble Component
function Bubble({ index }) {
  const bubbleRef = useRef();
  const { clock } = useThree();
  
  useFrame(() => {
    if (bubbleRef.current) {
      const time = clock.getElapsedTime();
      bubbleRef.current.position.y += 0.01;
      bubbleRef.current.position.x = Math.sin(time * 0.5 + index) * 0.2;
      bubbleRef.current.position.z = Math.cos(time * 0.3 + index) * 0.2;
      
      // Reset bubble position when it goes too high
      if (bubbleRef.current.position.y > 10) {
        bubbleRef.current.position.y = -10;
      }
    }
  });
  
  return (
    <mesh ref={bubbleRef} position={[Math.random() * 20 - 10, Math.random() * -10, Math.random() * 20 - 10]}>
      <sphereGeometry args={[0.1 + Math.random() * 0.2, 8, 8]} />
      <meshStandardMaterial 
        color="#a0d0ff" 
        transparent 
        opacity={0.4}
        roughness={0.1}
      />
    </mesh>
  );
}

// Info Cards Data
const infoCards = {
  sunrise: {
    title: "🌅 Sunrise Every 90 Minutes",
    content: "Astronauts aboard the ISS experience 16 sunrises and sunsets each day as they orbit Earth every 90 minutes. This unique perspective provides insights into atmospheric phenomena and Earth's curvature.",
    benefits: "Helps scientists study atmospheric layers, weather patterns, and climate change effects"
  },
  ocean: {
    title: "🌊 Ocean Current Observation",
    content: "From orbit, astronauts can track ocean currents, temperature changes, and marine ecosystems. This vantage point is crucial for understanding global climate systems.",
    benefits: "Enables monitoring of ocean health, fish migration patterns, and early detection of environmental changes"
  },
  cities: {
    title: "🌇 Night Lights Tracking",
    content: "Observing Earth's city lights from space reveals urban growth patterns, energy consumption, and population distribution. This data is invaluable for urban planning and economic studies.",
    benefits: "Supports disaster response planning, economic analysis, and sustainable development initiatives"
  },
  training: {
    title: "🧑‍🚀 NBL Training Experience",
    content: "The Neutral Buoyancy Laboratory (NBL) at NASA simulates microgravity conditions using a massive pool. Astronauts train underwater for up to 6 hours to prepare for spacewalks.",
    benefits: "Develops muscle memory, coordination, and technical skills needed for complex space operations"
  },
  benefits: {
    title: "🧠 Scientific Benefits",
    content: "Research conducted during NBL training contributes to understanding human physiology in microgravity, leading to medical advances in muscle atrophy, bone density loss, and balance disorders.",
    benefits: "Informs treatments for osteoporosis, develops rehabilitation techniques, and advances robotics technology"
  }
};

export default function page() {
  const [activeView, setActiveView] = useState('cupola');
  const [activeInfo, setActiveInfo] = useState(null);
  const [showWeightlessness, setShowWeightlessness] = useState(false);

  const currentInfo = activeInfo ? infoCards[activeInfo] : null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Beyond the Window: Life in Orbit
        </h1>
        <p className="text-center text-gray-300 mt-2">
          A 3D Exploration of the ISS Experience
        </p>
      </div>

      {/* View Controls */}
      <div className="absolute top-24 left-6 z-10 flex flex-col gap-3">
        <button 
          onClick={() => setActiveView('cupola')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeView === 'cupola' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/70'
          }`}
        >
          🪟 Cupola View
        </button>
        
        <button 
          onClick={() => setActiveView('nbl')}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeView === 'nbl' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/70'
          }`}
        >
          🪶 NBL Training
        </button>
        
        {activeView === 'nbl' && (
          <button 
            onClick={() => setShowWeightlessness(!showWeightlessness)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors mt-2"
          >
            {showWeightlessness ? '⏹️ Stop Experience' : '🌀 Experience Weightlessness'}
          </button>
        )}
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-screen">
        <Canvas>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} />
            
            {activeView === 'cupola' ? (
              <CupolaScene setActiveInfo={setActiveInfo} />
            ) : (
              <NBLScene setActiveInfo={setActiveInfo} />
            )}
            
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Info Panel */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-black/70 backdrop-blur-sm"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentInfo ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{currentInfo.title}</h2>
            <p className="text-gray-300 mb-3">{currentInfo.content}</p>
            <div className="bg-blue-900/30 p-3 rounded-lg">
              <h3 className="font-bold text-blue-300 mb-1">🌍 Earth Benefits:</h3>
              <p>{currentInfo.benefits}</p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">
              {activeView === 'cupola' 
                ? '🪟 Explore Earth from the ISS Cupola' 
                : '🪶 Experience NBL Training Simulation'}
            </h2>
            <p className="text-gray-300">
              {activeView === 'cupola' 
                ? 'Click on the glowing markers to learn about Earth observations from space' 
                : 'Click on the markers to learn about astronaut training and its benefits'}
            </p>
          </div>
        )}
      </motion.div>

      {/* Weightlessness Effect */}
      {showWeightlessness && activeView === 'nbl' && (
        <motion.div 
          className="absolute inset-0 bg-blue-900/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      )}

      {/* Navigation Hint */}
      <div className="absolute top-24 right-6 z-10 bg-black/50 p-4 rounded-lg max-w-xs">
        <h3 className="font-bold mb-2">Navigation Tips:</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Drag to rotate view</li>
          <li>• Scroll to zoom in/out</li>
          <li>• Click glowing markers for info</li>
        </ul>
      </div>
    </div>
  );
}