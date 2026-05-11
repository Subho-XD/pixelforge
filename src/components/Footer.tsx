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
    <footer ref={footerRef} className="bg-background pt-32 pb-10 px-6 border-t border-white/5 relative z-20 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 gap-10">
          <div>
            <div className="mb-6">
              <Image src="/logo.svg" alt="PixelForge Logo" width={180} height={50} className="object-contain" />
            </div>
            <p className="text-white/50 text-lg font-light">Elevating design pedigree.</p>
          </div>
          <div className="flex gap-16 text-white/60">
            <div className="flex flex-col gap-4 text-xs tracking-[0.15em] uppercase font-semibold">
              <a href="#" className="hover:text-lavender-start transition-colors">Instagram</a>
              <a href="#" className="hover:text-lavender-start transition-colors">Twitter</a>
              <a href="#" className="hover:text-lavender-start transition-colors">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-4 text-xs tracking-[0.15em] uppercase font-semibold">
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
        
        {/* Full-width Marquee Container */}
        <div ref={textContainerRef} className="w-[100vw] relative left-1/2 -translate-x-1/2 mb-10 flex overflow-hidden">
          <div ref={textRef} className="flex whitespace-nowrap">
            {/* Render exactly 4 items so that -50% shifts by exactly 2 items for a seamless loop */}
            {[...Array(4)].map((_, i) => (
              <h1 key={i} className="font-serif text-[18vw] leading-[0.8] text-white/5 tracking-tighter select-none pr-[8vw]">
                PIXELFORGE
              </h1>
            ))}
          </div>
        </div>
        
        <div className="text-center text-white/30 text-xs tracking-widest uppercase mt-10">
          &copy; {new Date().getFullYear()} PixelForge Education. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
