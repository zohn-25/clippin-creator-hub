import { useEffect, useState } from 'react';

export const SmoothCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setCursorVariant('text');
    const handleMouseLeave = () => setCursorVariant('default');

    document.addEventListener('mousemove', handleMouseMove);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]');
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

  const variants = {
    default: {
      height: 20,
      width: 20,
      fontSize: '16px'
    },
    text: {
      height: 40,
      width: 40,
      fontSize: '18px'
    }
  };

  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 28
  };

  return (
    <div
      className="smooth-cursor"
      style={{
        left: mousePosition.x - variants[cursorVariant].width / 2,
        top: mousePosition.y - variants[cursorVariant].height / 2,
        width: variants[cursorVariant].width,
        height: variants[cursorVariant].height,
      }}
    />
  );
};