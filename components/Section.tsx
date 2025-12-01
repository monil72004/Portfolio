import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation (Slide In)
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, 
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8, // Faster duration
            ease: "power2.out", // Simpler ease
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%", // Trigger slightly later so it doesn't pop in too early
              toggleActions: "play reverse play reverse"
            }
          }
        );
        
        // Line animation
        gsap.fromTo(titleRef.current.querySelector('.title-line'),
          { width: "0%" },
          {
            width: "100%",
            duration: 1,
            ease: "power2.inOut",
            delay: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            }
          }
        );
      }

      // Content Stagger Entrance
      const items = gsap.utils.toArray('.stagger-item') as HTMLElement[];
      if (items.length > 0) {
        gsap.fromTo(items,
          { y: 30, opacity: 0 }, // Reduced distance
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out", 
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 90%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }

      // 3. Highlight Effect (Card Glow)
      const cards = gsap.utils.toArray(sectionRef.current?.querySelectorAll('.cyber-card'));
      cards.forEach((card: any) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 70%", 
          end: "bottom 30%", 
          toggleClass: "highlight-active",
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      // Added scroll-mt-24 (mobile) and scroll-mt-32 (desktop) to handle fixed header offset
      className={`scroll-mt-24 md:scroll-mt-32 w-full flex flex-col py-6 md:py-14 px-4 md:px-12 relative overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {title && (
          <div ref={titleRef} className="flex items-center mb-4 md:mb-10 relative">
            <span className="font-mono text-feba-orange mr-4 md:mr-6 opacity-80 text-sm md:text-lg">0x</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white relative inline-block tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {title}
              <span className="title-line absolute -bottom-2 md:-bottom-4 left-0 h-1 bg-gradient-to-r from-feba-yellow to-feba-pink"></span>
            </h2>
          </div>
        )}
        
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;