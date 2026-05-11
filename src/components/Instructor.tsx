"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export default function Instructor() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Background text scroll parallax
      gsap.to(textRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="instructor" 
      className="pt-24 pb-0 md:pt-40 md:pb-0 px-6 bg-[#030008] relative flex items-end justify-center min-h-[100vh]"
    >
      
      {/* Static Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Massive Background Typography */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.12]">
          <h2 className="text-[18vw] font-serif font-black text-white leading-[0.8] tracking-tighter text-center drop-shadow-2xl">
            MASTER<br/>CLASS
          </h2>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between relative gap-10 md:gap-0 h-full">
          
          {/* Left Text Content */}
          <div className="w-full md:w-1/3 z-20 text-center md:text-left pb-16 md:pb-40">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                <div className="w-16 h-[1px] bg-lavender-start" />
                <span className="text-lavender-start uppercase tracking-[0.3em] text-sm font-semibold">Meet Your Guide</span>
              </div>
              <h3 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-tight drop-shadow-lg">
                <span className="italic text-lavender-start font-light">Subho</span><br/>Ghorui
              </h3>
              <p className="text-white/60 text-xl font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                A globally recognized design leader with 5+ years of industry experience working with international clients. I bring uncompromising aesthetic standards to my live sessions.
              </p>
            </motion.div>
          </div>

          {/* Center Image (Transparent PNG, Scaled up, Bottom anchored) */}
          <div className="hidden md:flex w-full md:w-1/3 relative justify-center items-end z-30 h-[45vh] md:h-[90vh]">
            <motion.div 
              className="absolute bottom-0 w-[110%] sm:w-[120%] md:w-[160%] max-w-[800px] h-full z-30 pointer-events-none"
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image 
                src="/instructor-star.png" 
                alt="Instructor" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain object-bottom" 
                priority
              />
            </motion.div>
          </div>

          {/* Right Floating Stats Cards */}
          <div className="w-full md:w-1/3 z-20 flex flex-col gap-8 items-center md:items-end pb-24 md:pb-40">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 w-full max-w-[320px]"
            >
              <div className="flex flex-col">
                <span className="font-serif text-7xl text-white mb-3">5<span className="text-5xl text-white/40">+</span></span>
                <span className="text-sm uppercase tracking-[0.2em] text-white/50 font-medium">Years Experience</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 w-full max-w-[320px] md:mr-10"
            >
              <div className="flex flex-col">
                <span className="font-serif text-7xl text-white mb-3">15<span className="text-5xl text-white/40">+</span></span>
                <span className="text-sm uppercase tracking-[0.2em] text-white/50 font-medium">Global Clients</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
