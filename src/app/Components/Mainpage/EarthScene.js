import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { SRGBColorSpace, NoColorSpace } from "three";
import * as THREE from "three";   // Named imports for color spaces
const ED = "/textures/earth_daymap.jpg";
const EN = "/textures/earth_normalmap.jpg";

function EarthMesh() {
  const earthRef = useRef();

  // ✅ Load textures INSIDE Canvas context
  const [map, normalMap, bumpMap, specMap] = useTexture([
    ED,
    EN,   // optional
  ]);

  // Fix orientation / color space for PBR
if (map) map.colorSpace = SRGBColorSpace;  // For color textures (diffuse map)
  if (normalMap) normalMap.colorSpace = NoColorSpace;

  // rotate slowly
  useFrame((state, delta) => {
    earthRef.current.rotation.y += 0.02 * delta;
  });

  return (
    <group>
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 128, 128]} /> 
        <meshStandardMaterial
          map={map}
          normalMap={normalMap} 
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshBasicMaterial
          color={"#6fa9ff"}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function EarthScene({ className, style }) {
  return (
    <div className={className} style={style}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 30 }} 
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        {/* Main directional light from the front */}
        <directionalLight position={[0, 0, 5]} intensity={2} castShadow />
        {/* Fill directional light for softer shadows */}
        <directionalLight position={[-5, -3, -5]} intensity={0.5} />

        <Suspense fallback={<Html center>Loading Earth…</Html>}>
          <EarthMesh />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
}