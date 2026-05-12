"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Fade and slide up the container on scroll
      gsap.fromTo(textContainerRef.current, 
        { yPercent: 50, opacity: 0 },
        { 
          yPercent: 0, 
          opacity: 1,
          ease: "easeOut",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "center bottom",
            scrub: true,
          }
        }
      );

      // Continuous Marquee loop (Left to Right)
      // Animating from -50% to 0% creates an infinite left-to-right glide
      gsap.fromTo(textRef.current, 
        { xPercent: -50 },
        { 
          xPercent: 0,
          ease: "none",
          duration: 40,
          repeat: -1,
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-background pt-32 pb-10 px-6 border-t border-border relative z-20 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-24 md:mb-32 gap-16 md:gap-10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6">
              <Image src="/logo.svg" alt="PixelForge Logo" width={180} height={50} className="dark:invert-0 invert object-contain" />
            </div>
            <p className="text-foreground/50 text-lg font-light">Design is thinking made visual.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto items-center sm:items-start justify-center md:justify-end gap-12 sm:gap-16 text-foreground/60">
            <div className="flex flex-col gap-4 text-xs tracking-[0.15em] uppercase font-semibold text-center sm:text-left">
              <a href="#" className="hover:text-lavender-start transition-colors">Instagram</a>
              <a href="#" className="hover:text-lavender-start transition-colors">Twitter</a>
              <a href="#" className="hover:text-lavender-start transition-colors">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-4 text-xs tracking-[0.15em] uppercase font-semibold text-center sm:text-left">
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width Marquee Container (Moved outside container to avoid w-[100vw]) */}
      <div ref={textContainerRef} className="w-full relative mb-10 flex overflow-hidden">
        <div ref={textRef} className="flex whitespace-nowrap">
          {/* Render exactly 4 items so that -50% shifts by exactly 2 items for a seamless loop */}
          {[...Array(4)].map((_, i) => (
            <h1 key={i} className="font-serif text-[18vw] leading-[0.8] text-foreground/[0.03] tracking-tighter select-none pr-[8vw]">
              PIXELFORGE
            </h1>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto">
        
        <div className="text-center text-foreground/30 text-xs tracking-widest uppercase mt-10">
          &copy; {new Date().getFullYear()} PixelForge Education. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
