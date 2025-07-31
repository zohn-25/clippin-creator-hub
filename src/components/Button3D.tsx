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
      meshRef.current.rotation.y += delta * 0.3;
      
      const targetScale = isHovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.15}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={isHovered ? "#06d6a0" : "#8b5cf6"} 
          emissive={isHovered ? "#023e8a" : "#4c1d95"}
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.6}
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
      className={`relative overflow-hidden rounded-xl transition-all duration-500 ease-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 3, 3]} intensity={0.4} />
          <FloatingSphere isHovered={isHovered} />
        </Canvas>
      </div>
      
      {/* Button Content */}
      <div className={`relative z-10 px-6 py-3 transition-all duration-500 ease-out ${
        isHovered ? 'transform translate-y-[-1px]' : ''
      }`}>
        {children}
      </div>
    </button>
  );
};