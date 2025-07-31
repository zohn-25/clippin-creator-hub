import { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    let particleId = 0;

    // Smooth trail animation using requestAnimationFrame
    const animateTrail = () => {
      setTrailPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15,
      }));
      animationRef.current = requestAnimationFrame(animateTrail);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Create particle trail more consistently
      if (Math.random() > 0.5) {
        const newParticle = { 
          x: e.clientX + (Math.random() - 0.5) * 15, 
          y: e.clientY + (Math.random() - 0.5) * 15, 
          id: particleId++ 
        };
        
        setParticles(prev => [...prev.slice(-6), newParticle]);
        
        // Remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1500);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animateTrail);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mousePosition.x, mousePosition.y]);

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
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        />
      ))}
    </>
  );
};