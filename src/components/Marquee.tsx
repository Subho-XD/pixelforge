"use client";
import { motion } from "framer-motion";

const marqueeItems = [
  "FIRST CLASS IS FREE",
  "LIMITED SPOTS",
  "SECURE YOUR SEAT",
  "FIRST CLASS IS FREE",
  "ENROLL NOW",
  "FIRST CLASS IS FREE",
  "DON'T MISS OUT",
];

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-foreground/5 backdrop-blur-sm border-y border-foreground/10 py-6 md:py-8">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-12 md:gap-20 items-center px-6 md:px-10"
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-12">
              <span className="text-xl md:text-3xl font-serif text-foreground/40 tracking-wider uppercase italic">
                {item}
              </span>
              <div className="w-2 h-2 rounded-full bg-lavender-start" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
