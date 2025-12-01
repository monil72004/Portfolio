import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        // Use GSAP scrub instead of a custom Lerp loop
        // This is much more efficient as it syncs with the GSAP ticker
        gsap.to(containerRef.current, {
          y: () => window.innerHeight * 0.5, // Parallax movement down
          rotation: 5,
          scale: 1.2,
          opacity: 0, // Fade out completely
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1 // Smooth scrub
          }
        });
      }
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 z-[-1] pointer-events-none w-full h-full flex items-center justify-center overflow-hidden mix-blend-overlay">
       <div 
         ref={containerRef} 
         className="febatrone-mega absolute top-1/2 left-1/2 origin-center will-change-transform opacity-10"
         style={{ transform: 'translate3d(-50%, -50%, 0)' }}
       >
         FEBATRONE
       </div>
    </div>
  )
}

export default ScrollTriggerLogo;