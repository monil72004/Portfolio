
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Shield, 
  Cpu, 
  Code,
  Server,
  Terminal as TerminalIcon,
  MoreVertical,
  X,
  Zap,
  Globe,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  School,
  FileText
} from 'lucide-react';
import { RESUME_DATA } from './constants';
import Section from './components/Section';
import CyberBackground from './components/CyberBackground';
import TypingEffect from './components/TypingEffect';
import ScrollTriggerLogo from './components/ScrollTriggerLogo';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Tilt Card Component for Projects
const TiltCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    // Disable tilt on mobile/touch devices via simplistic check or rely on hover media queries in CSS
    // For now, we perform the logic but it won't trigger on touch drag usually
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

// Helper for dynamic education icons
const getEducationIcon = (type: string) => {
  switch (type) {
    case 'Degree': return GraduationCap;
    case 'Diploma': return Award;
    case 'School': return School;
    case 'Course': return BookOpen;
    default: return FileText;
  }
};

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // OPTIMIZATION: Only track if we are scrolled past a threshold, not every pixel
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { personalInfo, highlights, skills, experience, education, projects, certifications, awards } = RESUME_DATA;
  
  const contactRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const navLogoRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLHeadingElement>(null);

  // Navigation Items matching section titles
  const navItems = ['About', 'Experience', 'Skills', 'Projects', 'Education'];

  // Gmail direct link
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`;

  useEffect(() => {
    const handleScroll = () => {
      // Optimization: Only update state if value changes across threshold
      const scrolled = window.scrollY > 20;
      setIsScrolled(prev => {
        if (prev !== scrolled) return scrolled;
        return prev;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when nav is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isNavOpen]);

  // GSAP Animation for Contact Cards & Background
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Contact Cards Entrance
      const contactCards = gsap.utils.toArray('.contact-card-item');
      
      contactCards.forEach((item: any, i) => {
         // Entrance Animation
         gsap.from(item, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "back.out(1.7)",
            // Removed ScrollTrigger to ensure visibility on load
         });

         // Highlight Effect on Scroll (Same as Section cards)
         ScrollTrigger.create({
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleClass: "highlight-active",
         });
      });

      // 2. Parallax for Background Lights (Scrub effect)
      if (bgRef.current) {
        gsap.to(".ambient-orb-1", {
          y: 400,
          scrollTrigger: {
            trigger: "#root-container",
            start: "top top",
            end: "bottom top",
            scrub: 1.5
          }
        });
        gsap.to(".ambient-orb-2", {
          y: -200,
          scrollTrigger: {
            trigger: "#root-container",
            start: "top top",
            end: "bottom top",
            scrub: 2
          }
        });
      }

      // 3. Scale Up NAV LOGO on Scroll
      if (navLogoRef.current) {
        gsap.to(navLogoRef.current, {
          scale: 1.5, // Grow to 150%
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: "#root-container",
            start: "top top",
            end: "300px top",
            scrub: 1, 
          }
        });
      }

    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    setIsNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Modern browsers respect scroll-margin-top defined in CSS on the element
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const FebatroneLogo = ({ size = "text-xl", className = "" }: { size?: string, className?: string }) => (
    <div className={`febatrone-wrapper ${size} ${className}`} data-text="Febatrone">
      <span className="febatrone-text">Febatrone</span>
    </div>
  );

  return (
    <div className="min-h-screen font-sans selection:bg-feba-orange selection:text-white bg-transparent text-gray-200 relative overflow-hidden" id="root-container">
      
      {/* 1. Ambient Light Layer with Parallax */}
      <div ref={bgRef} className="fixed inset-0 pointer-events-none z-[-2] overflow-hidden opacity-80">
        {/* Top Right Cyan/Purple Glow */}
        <div className="ambient-orb-1 absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyber-purple/15 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen"></div>
        {/* Bottom Left Orange Glow */}
        <div className="ambient-orb-2 absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-feba-orange/15 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen"></div>
        {/* Center Top White Glow for spotlight effect */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[250px] md:h-[500px] bg-white/10 rounded-full blur-[100px] md:blur-[150px]"></div>
      </div>

      {/* 2. Scroll Trigger Logo (The Giant Parallax Logo) */}
      <ScrollTriggerLogo />

      {/* 3. Grid & Star Visualizer - Optimized: No props needed */}
      <CyberBackground />

      {/* 4. Navigation */}
      {/* Increased Z-Index to 60 to sit above scanlines (z-50) */}
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl py-3 md:py-4 shadow-lg' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div 
             ref={navLogoRef}
             className="flex items-center gap-3 cursor-pointer group origin-left" 
             onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
             <div className="relative">
                <span className="absolute inset-0 rounded-full bg-feba-green animate-ping opacity-20"></span>
                <span className="block w-2 h-2 bg-feba-green rounded-full shadow-[0_0_10px_#00ff41]"></span>
             </div>
             <span className="font-mono text-white font-bold tracking-widest text-sm md:text-lg drop-shadow-md whitespace-nowrap group-hover:text-feba-green transition-colors">MONIL GANDHI</span>
          </div>
          
          {/* Desktop Nav - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center space-x-8 font-mono text-base font-semibold tracking-widest">
            {navItems.map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-gray-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all uppercase relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-feba-orange transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Menu Button - 3 Dots (MoreVertical) */}
          <button 
            className="text-white hover:text-feba-orange transition-colors p-2 z-[70] relative"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Menu"
          >
             {/* Use MoreVertical for '3 dots' effect, hides when menu is open */}
            {!isNavOpen && <MoreVertical size={28} />}
          </button>
        </div>
      </nav>

      {/* Navigation Drawer - MOVED OUTSIDE NAV to avoid fixed positioning context issues */}
      <div className={`fixed inset-0 z-[80] pointer-events-none`}>
          {/* Backdrop - Fade In */}
          <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsNavOpen(false)}
          ></div>
          
          {/* Content Drawer - Slide In from Right */}
          <div 
            className={`absolute top-0 right-0 w-full md:w-[400px] h-full bg-[#050505]/95 backdrop-blur-3xl transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) pointer-events-auto ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-50">
                <button 
                  onClick={() => setIsNavOpen(false)} 
                  className="text-gray-400 hover:text-feba-pink transition-colors p-2"
                >
                  <X size={32} />
                </button>
            </div>

            <div className="flex flex-col h-full justify-center items-center space-y-8 p-6">
                <div className="mb-8 transform transition-transform hover:scale-105">
                  <FebatroneLogo size="text-4xl" />
                </div>
                {navItems.map((item, idx) => (
                  <button 
                      key={item}
                      onClick={() => scrollTo(item.toLowerCase())}
                      className={`text-2xl font-mono font-bold text-gray-300 hover:text-feba-orange transition-all uppercase tracking-widest transform ${
                        isNavOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${100 + (idx * 50)}ms`, transitionDuration: '0.4s' }}
                  >
                      {item}
                  </button>
                ))}
                
                {/* Footer Info in Drawer */}
                <div className={`absolute bottom-12 flex gap-8 text-gray-500 transition-opacity duration-500 delay-300 ${isNavOpen ? 'opacity-100' : 'opacity-0'}`}>
                  <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer"><Github size={24} /></a>
                  <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer"><Linkedin size={24} /></a>
                  <a href={gmailUrl} target="_blank" rel="noreferrer"><Mail size={24} /></a>
                </div>
            </div>
          </div>
      </div>

      {/* Hero Section */}
      {/* Center alignment and reduced margins */}
      <header className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-4 md:py-8 mb-0">
        <div className="max-w-7xl w-full flex flex-col items-center text-center z-10 flex-1 justify-center">
          
          <div className="animate-fade-in-up mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform active:scale-95 cursor-pointer hover:bg-white/10 group">
              <span className="w-1.5 h-1.5 rounded-full bg-feba-green animate-pulse group-hover:shadow-[0_0_8px_#00ff41]"></span>
              <span className="font-mono text-gray-300 text-[10px] md:text-xs tracking-[0.2em] uppercase group-hover:text-white">
                System Online
              </span>
            </div>
          </div>
          
          {/* Main Visual Block */}
          <div className="relative mb-2 flex flex-col items-center w-full relative z-0">
             {/* The Alias (Brand) - Continuous Glitch */}
            <h1 className="text-[13vw] md:text-[8rem] leading-[0.9] font-black font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-feba-yellow via-feba-orange to-feba-pink animate-glitch drop-shadow-[0_0_50px_rgba(249,115,22,0.6)] select-none opacity-90 w-full cursor-pointer transition-transform duration-100">
              FEBATRONE
            </h1>
            
            {/* The Real Name (Identity) */}
            <div className="mt-[-1vw] md:-mt-4 relative z-10 w-full px-4">
               <div className="flex items-center justify-center gap-4 md:gap-8">
                  <span className="hidden md:block h-px w-24 bg-gradient-to-r from-transparent to-white/70"></span>
                  <div className="relative group w-auto mx-auto inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-feba-yellow to-feba-pink opacity-30 blur-lg group-hover:opacity-60 transition-opacity duration-500"></div>
                    <h2 
                      ref={identityRef}
                      className="relative text-[5vw] md:text-4xl font-bold text-white tracking-widest font-display bg-white/5 backdrop-blur-md px-[4vw] py-[1.5vw] md:px-8 md:py-3 border-x border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] whitespace-nowrap origin-center"
                    >
                      [ {personalInfo.name} ]
                    </h2>
                  </div>
                  <span className="hidden md:block h-px w-24 bg-gradient-to-l from-transparent to-white/70"></span>
               </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mb-4 max-w-5xl mx-auto w-full px-2">
            {/* Role Text */}
            <div className="text-cyber-cyan text-xs sm:text-sm md:text-xl lg:text-2xl font-mono text-center drop-shadow-sm whitespace-nowrap w-full overflow-x-visible">
              <TypingEffect text={`> ${personalInfo.role}`} speed={30} delay={500} />
            </div>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl md:max-w-2xl font-medium px-4">
              Building secure digital infrastructures and exploring the frontiers of cybersecurity.
            </p>
          </div>

          {/* Contact Details Grid - Compact */}
          <div ref={contactRef} className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3 justify-center mt-2 mb-4 md:mb-6 w-full max-w-5xl px-4 relative z-[100] pointer-events-auto">
            <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="contact-card-item relative group cyber-card px-4 py-2.5 md:px-6 md:py-3 rounded-lg flex items-center justify-center gap-3 border border-feba-green/50 text-feba-green hover:bg-feba-green/10 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] w-full sm:w-auto cursor-pointer">
              <div className="p-1.5 bg-feba-green/10 rounded-full group-hover:bg-feba-green group-hover:text-black transition-colors">
                <Github size={18} />
              </div>
              <span className="font-mono font-bold tracking-wider text-sm md:text-base">GitHub</span>
            </a>
            
            <a href={gmailUrl} target="_blank" rel="noreferrer" className="contact-card-item relative group cyber-card px-4 py-2.5 md:px-6 md:py-3 rounded-lg flex items-center justify-center gap-3 border border-feba-pink/50 text-feba-pink hover:bg-feba-pink/10 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] w-full sm:w-auto cursor-pointer">
              <div className="p-1.5 bg-feba-pink/10 rounded-full group-hover:bg-feba-pink group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <span className="font-mono font-bold tracking-wider text-sm md:text-base truncate max-w-[200px] md:max-w-none">{personalInfo.email}</span>
            </a>

            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="contact-card-item relative group cyber-card px-4 py-2.5 md:px-6 md:py-3 rounded-lg flex items-center justify-center gap-3 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] w-full sm:w-auto cursor-pointer">
              <div className="p-1.5 bg-white/5 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                <Linkedin size={18} />
              </div>
              <span className="font-mono font-bold tracking-wider text-sm md:text-base">LinkedIn</span>
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center border-t border-white/10 pt-6 px-4 w-full max-w-6xl">
             {[
               { 
                 label: "Education", 
                 value: highlights.education, 
                 text: "text-feba-yellow",
                 border: "border-feba-yellow/30",
                 bg: "bg-feba-yellow/5",
                 hoverBorder: "group-hover:border-feba-yellow",
                 hoverBg: "group-hover:bg-feba-yellow/10"
               },
               { 
                 label: "Projects", 
                 value: highlights.projectTech, 
                 text: "text-feba-green",
                 border: "border-feba-green/30",
                 bg: "bg-feba-green/5",
                 hoverBorder: "group-hover:border-feba-green",
                 hoverBg: "group-hover:bg-feba-green/10"
               },
               { 
                 label: "Focus", 
                 value: highlights.focusArea, 
                 text: "text-feba-pink",
                 border: "border-feba-pink/30",
                 bg: "bg-feba-pink/5",
                 hoverBorder: "group-hover:border-feba-pink",
                 hoverBg: "group-hover:bg-feba-pink/10"
               },
               { 
                 label: "Location", 
                 value: highlights.locationCity, 
                 text: "text-cyber-cyan",
                 border: "border-cyber-cyan/30",
                 bg: "bg-cyber-cyan/5",
                 hoverBorder: "group-hover:border-cyber-cyan",
                 hoverBg: "group-hover:bg-cyber-cyan/10"
               }
             ].map((stat, i) => (
               <div key={i} className={`flex flex-col gap-1 group cursor-default p-4 rounded-xl transition-all duration-300 border backdrop-blur-sm ${stat.border} ${stat.bg} ${stat.hoverBorder} ${stat.hoverBg} hover:scale-105 hover:shadow-lg`}>
                 <span className={`text-xl md:text-2xl font-bold font-display transition-colors drop-shadow-sm ${stat.text}`}>{stat.value}</span>
                 <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-mono group-hover:text-gray-200 transition-colors">{stat.label}</span>
               </div>
             ))}
          </div>

        </div>
      </header>

      {/* About Section */}
      <Section id="about" title="ABOUT">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="cyber-card p-5 md:p-8 rounded-2xl relative group stagger-item hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-tr-2xl"></div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Globe className="text-feba-orange" size={24} /> Professional Summary
              </h3>
              <p className="text-gray-200 leading-relaxed text-base md:text-lg font-light text-justify">
                {personalInfo.summary}
              </p>
              
              <div className="mt-6 flex flex-col md:flex-row flex-wrap gap-4 font-mono text-sm">
                 <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                    <MapPin size={18} className="text-feba-pink" /> {personalInfo.location}
                 </div>
                 <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                    <Mail size={18} className="text-feba-pink" /> {personalInfo.email}
                 </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {awards.map((award, i) => (
                 <div key={i} className="cyber-card p-4 md:p-5 rounded-xl flex items-start gap-3 hover:bg-white/10 transition-all duration-300 group stagger-item border-l-2 border-transparent hover:border-feba-yellow hover:-translate-y-1">
                   <div className="mt-1 text-feba-yellow drop-shadow-md group-hover:scale-110 transition-transform"><Zap size={20} /></div>
                   <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors">{award}</span>
                 </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 space-y-4">
            <div className="cyber-card p-5 md:p-8 rounded-2xl h-full relative overflow-hidden flex flex-col stagger-item hover:shadow-lg transition-all">
              <div className="absolute -top-12 -right-12 p-4 opacity-5 text-white transition-opacity group-hover:opacity-10">
                <Shield size={200} />
              </div>
              <h3 className="font-mono text-feba-pink mb-4 flex items-center gap-3 text-sm tracking-widest uppercase border-b border-white/10 pb-4">
                <Shield size={20} /> Certifications
              </h3>
              <ul className="space-y-4 relative z-10 flex-1">
                {certifications.map((cert, i) => (
                  <li key={i} className="text-base text-gray-200 flex items-start gap-4 group cursor-default">
                    <div className="w-2 h-2 mt-2 bg-feba-pink/50 rounded-full group-hover:bg-feba-pink group-hover:shadow-[0_0_10px_rgba(236,72,153,0.8)] transition-all group-hover:scale-125"></div>
                    <span className="group-hover:text-white transition-colors font-medium leading-relaxed">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="EXPERIENCE">
        <div className="relative border-l-2 border-white/10 ml-2 md:ml-6 space-y-6">
          {experience.map((exp, idx) => (
            <div key={idx} className="relative pl-4 md:pl-16 group">
              {/* Dot position corrected for new padding */}
              <div className="absolute -left-[9px] top-6 w-4 h-4 bg-black border-2 border-gray-500 rounded-full group-hover:border-feba-orange group-hover:bg-feba-orange transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.4)] z-10 group-hover:scale-125"></div>
              
              <div className="cyber-card p-5 md:p-8 rounded-2xl group-hover:border-feba-orange/50 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all stagger-item w-full group-hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-3">
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-feba-orange transition-colors">{exp.role}</h3>
                    <h4 className="text-lg md:text-xl text-gray-300 mt-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-feba-orange transition-colors"></span>
                      {exp.company}
                    </h4>
                  </div>
                  <span className="font-mono text-xs md:text-sm font-bold bg-white/10 border border-white/10 px-4 py-2 rounded text-white self-start whitespace-nowrap mt-2 md:mt-0 group-hover:bg-white/20 transition-colors">
                    {exp.duration}
                  </span>
                </div>
                
                <ul className="space-y-3">
                  {exp.details.map((detail, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3 group/item text-sm md:text-lg">
                      <span className="text-feba-orange/70 mt-1.5 text-xs md:text-sm group-hover/item:text-feba-orange transition-colors">➜</span>
                      <span className="leading-relaxed group-hover/item:text-white transition-colors">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="SKILLS">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, idx) => {
            const themes = [
              { border: 'border-t-feba-yellow', shadow: 'hover:shadow-[0_0_30px_rgba(252,211,77,0.15)]', bgHover: 'group-hover:bg-feba-yellow/20', textHover: 'group-hover:text-feba-yellow', pillHover: 'hover:bg-feba-yellow/20 hover:text-feba-yellow hover:border-feba-yellow/50' },
              { border: 'border-t-feba-green', shadow: 'hover:shadow-[0_0_30px_rgba(0,255,65,0.15)]', bgHover: 'group-hover:bg-feba-green/20', textHover: 'group-hover:text-feba-green', pillHover: 'hover:bg-feba-green/20 hover:text-feba-green hover:border-feba-green/50' },
              { border: 'border-t-feba-pink', shadow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]', bgHover: 'group-hover:bg-feba-pink/20', textHover: 'group-hover:text-feba-pink', pillHover: 'hover:bg-feba-pink/20 hover:text-feba-pink hover:border-feba-pink/50' },
              { border: 'border-t-cyber-cyan', shadow: 'hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]', bgHover: 'group-hover:bg-cyber-cyan/20', textHover: 'group-hover:text-cyber-cyan', pillHover: 'hover:bg-cyber-cyan/20 hover:text-cyber-cyan hover:border-cyber-cyan/50' }
            ];
            const theme = themes[idx % themes.length];
            return (
              <div key={idx} className={`cyber-card p-5 md:p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 group stagger-item border-t-2 ${theme.border} ${theme.shadow}`}>
                <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-gray-400 group-hover:text-white transition-all shadow-inner border border-white/5 ${theme.bgHover} ${theme.textHover}`}>
                  {idx === 0 ? <Code size={24} /> : 
                   idx === 1 ? <TerminalIcon size={24} /> :
                   idx === 2 ? <Shield size={24} /> : <Server size={24} />}
                </div>
                <h3 className="font-bold text-lg md:text-xl text-white mb-4 font-display tracking-wide border-b border-white/10 pb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className={`px-3 py-1.5 text-xs md:text-sm font-medium border border-white/10 rounded-md bg-white/5 text-gray-300 transition-all cursor-default hover:scale-105 hover:shadow-lg ${theme.pillHover}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="PROJECTS">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((proj, idx) => (
            <TiltCard key={idx} className="h-full stagger-item">
              <div className="group cyber-card p-1 rounded-2xl h-full cursor-pointer">
                <div className="bg-black/60 rounded-xl p-5 md:p-8 h-full flex flex-col relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-feba-pink/10 rounded-full blur-3xl group-hover:bg-feba-pink/20 transition-all duration-500"></div>

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="p-3 bg-white/10 rounded-lg border border-white/10 group-hover:border-feba-cyan/50 transition-colors shadow-lg group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                      <Cpu className="text-gray-200 group-hover:text-white" size={28} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-feba-yellow group-hover:to-feba-orange transition-all mb-4 relative z-10 drop-shadow-sm leading-tight">
                    {proj.title}
                  </h3>
                  
                  <div className="space-y-3 mb-8 relative z-10">
                    {proj.description.map((desc, i) => (
                      <p key={i} className="text-gray-300 text-sm md:text-base leading-relaxed flex items-start gap-3">
                        <span className="text-feba-green/70 mt-1">›</span> {desc}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10 relative z-10 mt-auto">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono font-semibold text-feba-pink bg-feba-pink/10 px-3 py-1.5 rounded border border-feba-pink/20 group-hover:bg-feba-pink/20 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>
      
      {/* Education Section */}
      <Section id="education" title="EDUCATION">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {education.map((edu, idx) => {
              const isOngoing = edu.status.toLowerCase().includes("progress");
              const Icon = getEducationIcon(edu.type);
              
              return (
                 <div key={idx} className="stagger-item">
                    <div className={`cyber-card h-full rounded-2xl relative overflow-hidden group hover:border-${isOngoing ? 'feba-yellow' : 'feba-green'}/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                       <div className={`h-1.5 w-full bg-gradient-to-r ${isOngoing ? 'from-feba-yellow/20 via-feba-yellow to-feba-yellow/20' : 'from-feba-green/20 via-feba-green to-feba-green/20'}`}></div>
                       
                       <div className="p-5 md:p-8 flex flex-col h-full relative z-10">
                          <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300 group-hover:scale-110">
                             <Icon size={80} />
                          </div>
                          
                          <div className="flex justify-between items-start mb-6">
                             <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-gray-500 mb-1 tracking-widest">MODULE_ID: 0{idx + 1}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 border border-white/10 w-fit ${isOngoing ? 'text-feba-yellow' : 'text-feba-green'} group-hover:bg-white/10 transition-colors`}>
                                   {edu.status.toUpperCase()}
                                </span>
                             </div>
                             <div className="flex gap-0.5 h-6 opacity-30 group-hover:opacity-50 transition-opacity">
                                {Array.from({length: 8}).map((_, barIdx) => (
                                   <div key={barIdx} className={`w-${barIdx % 2 === 0 ? '0.5' : '1'} bg-white h-full`}></div>
                                ))}
                             </div>
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                             {edu.degree}
                          </h3>
                          <p className="text-gray-300 font-medium text-base mb-4 flex items-center gap-2">
                             <span className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-white transition-colors"></span>
                             {edu.institution}
                          </p>
                          
                          <div className="mt-auto">
                             <div className="flex justify-between items-end mb-2">
                                <span className="font-mono text-xs text-gray-400 flex items-center gap-1.5 group-hover:text-gray-300 transition-colors">
                                   <Calendar size={12} /> {edu.year}
                                </span>
                                <span className={`font-mono text-xs font-bold ${isOngoing ? 'text-feba-yellow' : 'text-feba-green'}`}>
                                   {isOngoing ? '45%' : '100%'}
                                </span>
                             </div>
                             
                             <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div 
                                   className={`h-full rounded-full transition-all duration-300 ${isOngoing ? 'bg-feba-yellow w-[45%] animate-pulse' : 'bg-feba-green w-full group-hover:shadow-[0_0_20px_#00ff41]'}`}
                                   style={{ 
                                      boxShadow: isOngoing ? '0 0 10px rgba(252, 211, 77, 0.5)' : '0 0 15px rgba(0, 255, 65, 0.6)' 
                                   }}
                                ></div>
                             </div>
                          </div>
                       </div>
                       
                       <div className="absolute bottom-0 right-0 p-4 opacity-20 group-hover:opacity-50 transition-opacity">
                          <div className={`w-8 h-8 border-b-2 border-r-2 ${isOngoing ? 'border-feba-yellow' : 'border-feba-green'}`}></div>
                       </div>
                    </div>
                 </div>
              );
            })}
        </div>
      </Section>

      {/* Footer */}
      <footer className="flex flex-col justify-center items-center relative overflow-hidden bg-black/90 backdrop-blur-xl border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="mb-6 transform hover:scale-110 transition-transform duration-500 cursor-pointer text-center" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <FebatroneLogo size="text-4xl md:text-6xl" />
            <p className="text-xs md:text-xs font-mono text-gray-500 mt-2 tracking-[0.4em] uppercase">Monil Gandhi Portfolio</p>
          </div>
          
          <div className="flex gap-8 mb-6">
             <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors hover:scale-125 duration-300"><Github size={24} className="md:w-7 md:h-7" /></a>
             <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#0077b5] transition-colors hover:scale-125 duration-300"><Linkedin size={24} className="md:w-7 md:h-7" /></a>
             <a href={gmailUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-feba-orange transition-colors hover:scale-125 duration-300"><Mail size={24} className="md:w-7 md:h-7" /></a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest text-center">
            <span>© {new Date().getFullYear()} Monil Gandhi</span>
            <span className="hidden md:inline w-1 h-1 bg-gray-700 rounded-full"></span>
            <span>Status: Operational</span>
            <span className="hidden md:inline w-1 h-1 bg-gray-700 rounded-full"></span>
            <span>Loc: Vadodara, IN</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
