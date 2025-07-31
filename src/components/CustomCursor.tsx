import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Delayed trail animation
      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 80);

      // Create particle trail
      if (Math.random() > 0.7) {
        const newParticle = { 
          x: e.clientX + (Math.random() - 0.5) * 20, 
          y: e.clientY + (Math.random() - 0.5) * 20, 
          id: particleId++ 
        };
        
        setParticles(prev => [...prev.slice(-8), newParticle]);
        
        // Remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 2000);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`cursor ${isHovering ? 'scale-150' : ''}`}
        style={{
          left: `${mousePosition.x - 6}px`,
          top: `${mousePosition.y - 6}px`,
        }}
      />
      
      {/* Trail ring */}
      <div
        className={`cursor-trail ${isHovering ? 'scale-150 border-2' : ''}`}
        style={{
          left: `${trailPosition.x - 15}px`,
          top: `${trailPosition.y - 15}px`,
        }}
      />

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="cursor-particles"
          style={{
            left: `${particle.x - 2}px`,
            top: `${particle.y - 2}px`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </>
  );
};