"use client";
import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground/90 leading-tight mb-16 italic drop-shadow-md"
        >
          "This masterclass didn't just teach me software; it fundamentally changed how I see design. Within three months, I landed a role at a top-tier agency."
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-20 h-20 bg-card-bg rounded-full mx-auto mb-6 border-2 border-lavender-start/50 overflow-hidden shadow-[0_0_30px_rgba(138,43,226,0.3)] flex items-center justify-center">
            <span className="font-serif text-3xl text-lavender-start/90">SJ</span>
          </div>
          <h4 className="text-foreground font-serif text-3xl mb-2">Sarah Jenkins</h4>
          <p className="text-lavender-start text-xs tracking-[0.2em] uppercase font-semibold text-center">Senior Designer @ Pentagram</p>
        </motion.div>
      </div>
    </section>
  );
}
