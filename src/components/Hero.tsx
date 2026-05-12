"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import Marquee from "./Marquee";

const SVGIcon = () => (
  <svg viewBox="0 0 83 83" className="w-full h-full overflow-visible">
    <path fill="none" stroke="currentColor" strokeWidth="0.2" d="m69.3 69.2h13v13h-13z"/>
    <path fill="none" stroke="currentColor" strokeWidth="0.2" fillRule="evenodd" d="m82.2 10.2h-32.3l22.2 23.4v10.2h-26.2v38.4h-11.2v-48.6l-23.4 18.4v30.2h-11.1v-82.1h82zm-46.7 3.7c-0.3-2.9-3.2-3.7-6.4-3.7h-17.8v28.5l19.2-15.1c2.4-1.8 5.4-5.5 5-9.7zm10.3 7.9c-1.8 3.8-5 7-9 10.1l-2.1 1.6h22.3z"/>
  </svg>
);

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D transforms
  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);
  const translateX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const translateY = useTransform(smoothY, [-1, 1], [-30, 30]);

  // Mask for mouse interaction
  const maskX = useTransform(smoothX, [-1, 1], [0, 100]);
  const maskY = useTransform(smoothY, [-1, 1], [0, 100]);
  const maskImage = useMotionTemplate`radial-gradient(circle at ${maskX}% ${maskY}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)`;

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground pt-20">
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-100 transition-opacity duration-500">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-accent dark:bg-[#3b0764] rounded-full blur-[150px] opacity-20 dark:opacity-20"
          animate={{ x: [0, 30, -10, 0], y: [0, -20, 30, 0], scale: [1, 1.05, 0.95, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-lavender-end dark:bg-[#1e1b4b] rounded-full blur-[150px] opacity-10 dark:opacity-30"
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-lavender-start dark:bg-[#2e1065] rounded-full blur-[150px] opacity-10 dark:opacity-15"
          animate={{ x: [0, 20, -20, 0], y: [0, 20, -20, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />


        {/* Central darkening/lightening to ensure text remains crisp */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,245,255,0)_0%,rgba(248,245,255,0.85)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(3,0,8,0)_0%,rgba(3,0,8,0.85)_100%)]" />

        {/* Deep Grayscale Film Grain */}
        <div 
          className="absolute inset-[-50%] mix-blend-soft-light opacity-[0.25] dark:opacity-[0.2] pointer-events-none" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22matrix%22 values=%221 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0 0%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-6xl -mt-16">
        
        {/* Floating 3D Icon (The Forge) */}
        {isMounted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            {isMobile ? (
              <motion.div
                style={{ transformPerspective: 1200 }}
                animate={{
                  rotateY: [0, 360],
                  rotateX: [15, -15, 15],
                }}
                transition={{
                  rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative w-[70vw] max-w-[500px] aspect-square"
              >
                {/* Subtle pulsing light for mobile */}
                <motion.div 
                  className="absolute inset-0 w-full h-full text-lavender-start dark:text-[#d8b4fe] mix-blend-multiply dark:mix-blend-screen"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(138,43,226,0.5))' }}
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <SVGIcon />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  x: translateX,
                  y: translateY,
                  transformPerspective: 1200,
                }}
                className="relative w-[70vw] max-w-[500px] md:max-w-[700px] aspect-square"
              >
                {/* Interactive Glowing Edges */}
                <motion.div 
                  className="absolute inset-0 w-full h-full text-lavender-start dark:text-[#d8b4fe] mix-blend-multiply dark:mix-blend-screen opacity-40"
                  style={{ 
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                    filter: 'drop-shadow(0 0 10px rgba(138,43,226,0.6))'
                  }}
                >
                  <SVGIcon />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-6xl flex-1 justify-center py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-8 mt-0"
        >
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-foreground/50 font-sans border border-foreground/10 px-6 py-2 rounded-full backdrop-blur-md bg-foreground/5">
            Your first session is on us
          </p>
        </motion.div>

        {/* Massive Overlapping Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[18vw] sm:text-[15vw] md:text-[11rem] lg:text-[13rem] leading-[0.8] tracking-tighter text-foreground uppercase flex flex-col items-center w-full my-4 drop-shadow-2xl"
        >
          <span className="block">Graphic</span>
          <span className="block">Design</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lavender-start via-accent to-lavender-start dark:from-[#b388ff] dark:via-[#d8b4fe] dark:to-[#8a2be2] pr-[0.1em]">
            Masterclass
          </span>
        </motion.h1>

        {/* Bottom Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 mb-8"
        >
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80 max-w-lg mx-auto leading-loose font-sans md:whitespace-nowrap">
            6 Months. Live Sessions. A portfolio that speaks before you do.
          </p>
        </motion.div>

        {/* Outline Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-16 md:mb-32"
        >
          <a href="#enrollment" className="inline-block px-10 py-4 bg-transparent border border-white/40 text-white text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-[#030008] hover:border-white transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(138,43,226,0.1)] hover:shadow-[0_0_30px_rgba(138,43,226,0.4)] backdrop-blur-md">
            Enroll Now
          </a>
        </motion.div>

      </div>
      
      {/* Looping Banner */}
      <div className="w-full mt-auto relative z-20">
        <Marquee />
      </div>
    </section>
  );
}
