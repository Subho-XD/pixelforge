"use client";
import { motion } from "framer-motion";

export default function GlobalAmbience() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-lavender-start/5 rounded-full blur-[150px] mix-blend-screen"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-indigo-900/20 rounded-full blur-[150px] mix-blend-screen"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -100, 0],
          scale: [1, 0.9, 1.3, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
