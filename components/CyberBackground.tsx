import React, { useEffect, useRef } from 'react';

const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true }); 
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const gridSize = 80; 
    
    // OPTIMIZATION: Reduced star count significantly
    const isMobile = width < 768;
    const numStars = isMobile ? 20 : 40; 
    
    const stars: {x: number, y: number, z: number, size: number}[] = [];
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 2 
      });
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.01;
      const currentScrollY = window.scrollY; 
      
      ctx.clearRect(0, 0, width, height);

      // Draw Grid
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'; 
      ctx.lineWidth = 1;

      const gridScroll = (time * 5 + currentScrollY * 0.1) % gridSize;
      for (let y = 0; y < height; y += gridSize) {
        const yPos = y + gridScroll;
        if (yPos > height) continue;
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
      }
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      
      ctx.stroke();

      // Draw Stars
      const cx = width / 2;
      const cy = height / 2;

      stars.forEach(star => {
        let speed = 0.5 + (currentScrollY * 0.002); 
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height && star.z < width) {
          const size = Math.max(0, (1 - star.z / width) * 2);
          const alpha = Math.max(0, (1 - star.z / width) * 0.7); 
          
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();

          // Mouse Interaction - Optimization: Simple distance check
          const dx = mouseRef.current.x - px;
          const dy = mouseRef.current.y - py;
          // Avoid sqrt if possible, compare squares
          const distSq = dx * dx + dy * dy;
          const connectionDistSq = 150 * 150;

          if (distSq < connectionDistSq) {
            ctx.beginPath();
            const lineAlpha = (1 - distSq / connectionDistSq) * 0.3; // Reduced opacity
            ctx.strokeStyle = `rgba(0, 255, 65, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(px, py);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" 
    />
  );
};

export default React.memo(CyberBackground);