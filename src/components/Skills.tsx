"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { 
  Type, 
  Paintbrush, 
  Fingerprint, 
  LayoutTemplate, 
  Share2, 
  Briefcase, 
  Wand2, 
  Cpu,
  Heart,
  MessageCircle,
  ArrowRight
} from "lucide-react";

// --- Abstract Background Components ---
const TypographyBg = () => (
  <div className="absolute -bottom-10 -right-4 text-[240px] font-serif font-black text-white/[0.03] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out rotate-[15deg]">
    Aa
  </div>
);

const ColorTheoryBg = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex items-center justify-center pointer-events-none">
    {/* A spinning monochromatic purple color wheel */}
    <div className="relative w-40 h-40 transform scale-50 group-hover:scale-125 transition-transform duration-[1.5s] ease-out">
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#2e1065,#581c87,#7e22ce,#a855f7,#d8b4fe,#a855f7,#7e22ce,#581c87,#2e1065)] animate-[spin_10s_linear_infinite]" />
      {/* Hollow center */}
      <div className="absolute inset-[15%] bg-[#0a0515] rounded-full border border-white/5" />
    </div>
  </div>
);

const BrandingBg = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:rotate-[45deg] scale-50 group-hover:scale-150">
    <div className="w-48 h-48 border border-white/5 rounded-full absolute" />
    <div className="w-32 h-32 border border-white/10 rounded-full absolute" />
    <div className="w-16 h-16 border border-white/20 rounded-full absolute bg-white/5 backdrop-blur-md" />
  </div>
);

const PosterDesignBg = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 flex items-center justify-center pointer-events-none">
    {/* A4 proportioned poster wireframe (e.g. 1:1.414 aspect ratio) */}
    <div className="relative w-[120px] h-[170px] border border-white/20 bg-white/[0.02] overflow-hidden flex flex-col p-3 gap-2.5 transform translate-y-10 group-hover:translate-y-0 group-hover:rotate-[-4deg] transition-transform duration-700 shadow-2xl backdrop-blur-sm">
      {/* Hero Image Block */}
      <div className="w-full h-[40%] bg-purple-500/20 border border-purple-400/20 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-100 flex items-center justify-center">
        <div className="w-5 h-5 border border-purple-400/40 rounded-full" />
      </div>
      {/* Headline */}
      <div className="w-3/4 h-2.5 bg-purple-300/30 transform -translate-x-10 group-hover:translate-x-0 transition-transform duration-700 delay-200" />
      {/* Subhead / Text blocks */}
      <div className="space-y-1.5 mt-auto">
        <div className="w-full h-1 bg-purple-300/10 transform -translate-x-10 group-hover:translate-x-0 transition-transform duration-700 delay-300" />
        <div className="w-5/6 h-1 bg-purple-300/10 transform -translate-x-10 group-hover:translate-x-0 transition-transform duration-700 delay-400" />
        <div className="w-4/6 h-1 bg-purple-300/10 transform -translate-x-10 group-hover:translate-x-0 transition-transform duration-700 delay-500" />
      </div>
    </div>
  </div>
);

const SocialMediaBg = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none overflow-hidden">
    {/* Wireframe Phone UI */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[400px] border border-white/5 rounded-[40px] opacity-20 transform scale-150 rotate-12" />
    
    {/* Floating icons */}
    <div className="absolute top-[20%] right-[15%] text-purple-400/40 transform scale-50 group-hover:scale-100 group-hover:-translate-y-6 transition-all duration-[1.5s]">
      <Heart fill="currentColor" className="w-20 h-20 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
    </div>
    <div className="absolute bottom-[20%] left-[15%] text-indigo-400/40 transform scale-50 group-hover:scale-100 group-hover:translate-y-6 transition-all duration-[1.5s] delay-100">
      <MessageCircle fill="currentColor" className="w-16 h-16 drop-shadow-[0_0_20px_rgba(129,140,248,0.5)]" />
    </div>
  </div>
);

const PortfolioBg = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 flex items-center justify-center pointer-events-none perspective-[1000px]">
    {/* Fan out cards */}
    <div className="absolute w-40 h-24 border border-white/10 bg-indigo-600/10 backdrop-blur-md rounded-xl transform transition-transform duration-700 ease-out translate-y-[20px] group-hover:translate-x-[-60px] group-hover:-rotate-[15deg] group-hover:translate-y-[10px]" />
    <div className="absolute w-40 h-24 border border-white/10 bg-purple-600/10 backdrop-blur-md rounded-xl transform z-10 scale-95 group-hover:scale-100 transition-transform duration-700 ease-out" />
    <div className="absolute w-40 h-24 border border-white/10 bg-fuchsia-600/10 backdrop-blur-md rounded-xl transform transition-transform duration-700 ease-out translate-y-[20px] group-hover:translate-x-[60px] group-hover:rotate-[15deg] group-hover:translate-y-[10px]" />
  </div>
);

const ManipulationBg = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 flex items-center justify-center pointer-events-none overflow-hidden">
    {/* Purple Glitch / Split Effect */}
    <div className="w-32 h-32 rounded-full absolute transform mix-blend-screen shadow-[0_0_40px_rgba(168,85,247,0.3)] border border-purple-500/20 group-hover:-translate-x-6 group-hover:-translate-y-2 transition-transform duration-[1.5s] ease-out" />
    <div className="w-32 h-32 rounded-full bg-white/5 absolute transform backdrop-blur-sm border border-white/10 z-10 scale-90 group-hover:scale-100 transition-transform duration-[1.5s] ease-out" />
    <div className="w-32 h-32 rounded-full absolute transform mix-blend-screen shadow-[0_0_40px_rgba(99,102,241,0.3)] border border-indigo-500/20 group-hover:translate-x-6 group-hover:translate-y-2 transition-transform duration-[1.5s] ease-out" />
  </div>
);

const GeminiSparkle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemini" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285f4" />
        <stop offset="33%" stopColor="#9b72cb" />
        <stop offset="66%" stopColor="#d96570" />
        <stop offset="100%" stopColor="#fbbc04" />
      </linearGradient>
    </defs>
    <path d="M12 0 C12 6.6 17.4 12 24 12 C17.4 12 12 17.4 12 24 C12 17.4 6.6 12 0 12 C6.6 12 12 6.6 12 0 Z" fill="url(#gemini)" />
  </svg>
);

const AIBg = () => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 flex items-center justify-center pointer-events-none">
    {/* Ambient Glow */}
    <div className="absolute w-40 h-40 bg-purple-500/20 blur-[50px] group-hover:scale-150 transition-transform duration-[2s]" />
    
    {/* Main Sparkle */}
    <div className="transform group-hover:rotate-180 transition-transform duration-[3s] ease-in-out group-hover:scale-125 z-10">
      <GeminiSparkle className="w-32 h-32 opacity-80 filter drop-shadow-[0_0_15px_rgba(155,114,203,0.5)]" />
    </div>
    
    {/* Secondary small sparkle */}
    <div className="absolute transform scale-0 -translate-y-4 translate-x-4 group-hover:scale-50 group-hover:rotate-[-90deg] group-hover:-translate-y-16 group-hover:translate-x-16 transition-all duration-[2s] ease-in-out">
      <GeminiSparkle className="w-20 h-20 opacity-60" />
    </div>
  </div>
);

// --- Skills Data ---
const skills = [
  { icon: <Type className="w-8 h-8" />, title: "Typography", desc: "Mastering type pairing, alignment, and emotional hierarchy.", size: "md:col-span-2 md:row-span-1", bg: <TypographyBg /> },
  { icon: <Paintbrush className="w-8 h-8" />, title: "Color Theory", desc: "Creating emotion and balance through advanced palettes.", size: "md:col-span-1 md:row-span-1", bg: <ColorTheoryBg /> },
  { icon: <Fingerprint className="w-8 h-8" />, title: "Branding", desc: "Building cohesive visual identities that resonate.", size: "md:col-span-1 md:row-span-2", bg: <BrandingBg /> },
  { icon: <LayoutTemplate className="w-8 h-8" />, title: "Poster Design", desc: "High-impact layout structures and focal points.", size: "md:col-span-1 md:row-span-1", bg: <PosterDesignBg /> },
  { icon: <Share2 className="w-8 h-8" />, title: "Social Media", desc: "Thumb-stopping digital assets optimized for conversion.", size: "md:col-span-2 md:row-span-1", bg: <SocialMediaBg /> },
  { icon: <Briefcase className="w-8 h-8" />, title: "Portfolio Creation", desc: "Presenting work professionally to win top-tier clients.", size: "md:col-span-2 md:row-span-1", bg: <PortfolioBg /> },
  { icon: <Wand2 className="w-8 h-8" />, title: "Manipulation", desc: "Surreal compositing and lighting in Photoshop.", size: "md:col-span-1 md:row-span-1", bg: <ManipulationBg /> },
  { icon: <Cpu className="w-8 h-8" />, title: "AI Workflow", desc: "Speeding up ideation and rendering with AI models.", size: "md:col-span-1 md:row-span-1", bg: <AIBg /> },
];

export default function Skills() {
  return (
    <section className="py-32 px-6 bg-[#030008] relative z-20 overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2e1065] rounded-full blur-[200px] opacity-20 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-20 md:mb-32 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-2xl"
          >
            Core Competencies
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-sm tracking-[0.2em] uppercase max-w-2xl mx-auto font-sans mb-6 md:mb-0"
          >
            The skills that define a professional designer
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:hidden flex items-center justify-center gap-2 text-lavender-start/70 text-xs tracking-widest uppercase font-semibold animate-pulse"
          >
            Swipe to explore <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 md:grid-cols-4 md:auto-rows-[280px] gap-4 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {skills.map((skill, index) => (
            <InteractiveCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractiveCard({ skill, index }: { skill: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configurations for extremely smooth 3D tilt
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);
  
  // Mouse position for spotlight mask
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates (-0.5 to 0.5) for tilt
    const relativeX = (e.clientX - rect.left - width / 2) / width;
    const relativeY = (e.clientY - rect.top - height / 2) / height;
    x.set(relativeX);
    y.set(relativeY);

    // Absolute coordinates inside card for spotlight
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    // Smoothly push spotlight out of frame on leave
    mouseX.set(-1000); 
    mouseY.set(-1000);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`relative flex-none w-[85vw] h-[350px] md:w-auto md:h-auto snap-center rounded-3xl overflow-hidden group ${skill.size} bg-[#0a0515]/80 border border-white/5 backdrop-blur-md cursor-none`}
    >
      {/* 1. Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent z-0" />
      
      {/* 2. Abstract Code-Art Background */}
      {skill.bg}
      
      {/* 3. Volumetric Spotlight Background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(138,43,226,0.15), transparent 40%)`
        }}
      />
      
      {/* 4. Crisp Border Spotlight Overlay */}
      <motion.div 
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
        style={{
          background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.4), transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px" // Creates the inner border glow effect
        }}
      />
      
      {/* 5. Main Content Layer with 3D Depth */}
      <div 
        className="relative z-20 h-full p-8 flex flex-col justify-end transform transition-transform duration-500" 
        style={{ transform: "translateZ(30px)" }} // Pushes content off the background when tilted
      >
        
        {/* Animated Icon */}
        <div className="text-white/30 mb-auto group-hover:text-white group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-500 origin-left">
          {skill.icon}
        </div>
        
        {/* Kinetic Text */}
        <div className="transform transition-all duration-500 group-hover:translate-y-[-8px]">
          <h3 className="font-serif text-3xl md:text-4xl text-white/80 group-hover:text-white mb-2 tracking-tight transition-colors duration-300">
            {skill.title}
          </h3>
          
          <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 mt-4">
            <p className="text-white/60 text-sm font-light leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
              {skill.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
