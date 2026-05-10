"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function BackgroundWatermark() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Disable complex interaction on mobile for performance
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to range [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth springs for mouse movement
  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    if (!isMobile) {
      smoothX.set(mousePosition.x);
      smoothY.set(mousePosition.y);
    }
  }, [mousePosition, smoothX, smoothY, isMobile]);

  // Parallax translation
  const translateX = useTransform(smoothX, [-1, 1], [40, -40]);
  const translateY = useTransform(smoothY, [-1, 1], [40, -40]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <motion.div
        className="absolute w-[150vw] h-[150vh] -top-[25vh] -left-[25vw] flex items-center justify-center opacity-5 md:opacity-[0.04]"
        style={{
          x: isMobile ? 0 : translateX,
          y: isMobile ? 0 : translateY,
        }}
      >
        <img 
          src="/icon.svg" 
          alt="" 
          className="w-full h-full object-contain -rotate-[15deg] translate-x-[20%] translate-y-[10%]"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
