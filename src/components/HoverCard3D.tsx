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
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.15;
      
      const targetScale = isHovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color={isHovered ? "#a855f7" : "#8b5cf6"} 
          emissive={isHovered ? "#4c1d95" : "#3730a3"}
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.4}
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
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.4} />
          <FloatingCube isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className={`relative z-10 transition-all duration-700 ease-out ${
        isHovered ? 'transform translate-y-[-4px]' : ''
      }`}>
        {children}
      </div>
    </div>
  );
};