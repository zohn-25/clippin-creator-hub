import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCubeProps {
  isHovered: boolean;
}

const FloatingCube = ({ isHovered }: FloatingCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      
      if (isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={isHovered ? "#8b5cf6" : "#a855f7"} 
          emissive={isHovered ? "#4c1d95" : "#3730a3"}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

interface HoverCard3DProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverCard3D = ({ children, className = '' }: HoverCard3DProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingCube isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className={`relative z-10 transition-all duration-500 ${
        isHovered ? 'transform translate-z-4 scale-105' : ''
      }`}>
        {children}
      </div>
    </div>
  );
};