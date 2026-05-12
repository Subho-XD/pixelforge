"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll(".word");
      
      if (words) {
        gsap.fromTo(words, 
          { opacity: 0.1, y: 40, rotateX: -60, transformPerspective: 800 },
          { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "center center",
              scrub: 1,
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-48 px-6 bg-lavender-start/5 relative z-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div ref={textRef} className="font-serif text-3xl md:text-5xl lg:text-7xl leading-tight text-foreground flex flex-wrap justify-center text-center gap-x-2 md:gap-x-3 gap-y-1 md:gap-y-4">
          {"PixelForge is not a recorded lecture series. It is a live, hands-on design studio — where you build real things, get real critique, and develop the eye that sets professionals apart. Five years. International clients. No fluff.".split(" ").map((word, i) => (
            <span key={i} className="word opacity-20 transition-opacity duration-300">{word}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
