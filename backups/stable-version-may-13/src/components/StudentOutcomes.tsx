"use client";
import { motion } from "framer-motion";

export default function StudentOutcomes() {
  return (
    <section className="py-32 px-6 bg-lavender-start/[0.03] relative overflow-hidden">
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-5xl md:text-7xl text-foreground mb-6 tracking-tight">Built by Alumni</h2>
          <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto font-light mb-20">
            A glimpse into the portfolios of those who took the leap before you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 0.98, transition: { duration: 0.4 } }}
              className="group relative aspect-[4/3] bg-card-bg rounded-[2rem] overflow-hidden border border-border cursor-pointer shadow-lg hover:shadow-[0_20px_50px_rgba(138,43,226,0.15)] hover:border-lavender-start/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10" />
              
              <div className="absolute bottom-10 left-10 text-left z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1]">
                <h3 className="font-serif text-3xl text-foreground drop-shadow-md">Case Study {i}</h3>
                <p className="text-lavender-start text-xs tracking-[0.2em] uppercase font-semibold mt-3">View Project</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center text-foreground/5 font-serif text-3xl group-hover:scale-110 transition-transform duration-700">
                Showcase {i}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
