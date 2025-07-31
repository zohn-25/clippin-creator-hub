import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingSphereProps {
  isHovered: boolean;
}

const FloatingSphere = ({ isHovered }: FloatingSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      
      if (isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.15);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={isHovered ? "#06d6a0" : "#8b5cf6"} 
          emissive={isHovered ? "#023e8a" : "#4c1d95"}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline';
}

export const Button3D = ({ children, onClick, className = '', variant = 'default' }: Button3DProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.6} />
          <FloatingSphere isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Button Content */}
      <div className={`relative z-10 px-6 py-3 transition-all duration-300 ${
        isHovered ? 'transform translate-y-[-2px]' : ''
      }`}>
        {children}
      </div>
    </button>
  );
};