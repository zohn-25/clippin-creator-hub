import { useEffect, useState } from 'react';

export const BackgroundParticles = () => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number; delay: number }>>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          id: i,
          delay: Math.random() * 6,
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const handleResize = () => {
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-particles">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};