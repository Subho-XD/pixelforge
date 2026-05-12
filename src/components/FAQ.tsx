"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do I need prior design experience?",
    answer: "No. You need a computer and a willingness to commit. We start from first principles — how to see, how to think, then how to execute. Prior experience just means you will progress faster."
  },
  {
    question: "Is this a recorded course?",
    answer: "No. Live sessions, real feedback, real critique. If you wanted to watch videos alone, YouTube is free. PixelForge is for people who want to actually improve."
  },
  {
    question: "How long does the course run?",
    answer: "Six months core curriculum. If you want to go deeper on advanced topics — motion, brand systems, editorial — we can extend. No rush to finish; the goal is mastery."
  },
  {
    question: "Will I have a portfolio at the end?",
    answer: "Yes. You will have a body of real work — not student exercises, but projects built to professional standards that you can show to clients or employers from day one."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-7xl text-foreground mb-16 text-center tracking-tight"
        >
          Questions?
        </motion.h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              key={i} 
              className="group bg-card-bg rounded-3xl overflow-hidden border border-border hover:border-lavender-start/30 transition-colors duration-500"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between font-serif text-2xl md:text-3xl text-foreground p-8 outline-none text-left"
              >
                {faq.question}
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-lavender-start/10">
                  {openIndex === i ? <Minus className="w-4 h-4 text-foreground" /> : <Plus className="w-4 h-4 text-foreground" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-8 pb-8 pt-0">
                      <p className="text-foreground/60 font-light text-lg md:text-xl leading-relaxed pl-4 border-l-2 border-lavender-start/30">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
