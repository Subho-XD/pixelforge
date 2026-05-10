"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do I need prior design experience?",
    answer: "No. This course is for anyone who has a basic understanding of computers or knows how to use one. We will start from the fundamentals and build up your skills."
  },
  {
    question: "Is this a recorded course?",
    answer: "No. This is not a pre-recorded class. It is a highly interactive series of live sessions and workshops where you'll get real-time guidance and feedback."
  },
  {
    question: "What is the duration of the course?",
    answer: "The core course runs for 6 months. However, if needed, any individual can extend their course to dive deeper and master advanced concepts."
  },
  {
    question: "Will I build a portfolio?",
    answer: "Yes. Throughout the course, you will build real-world projects which you can use in your portfolio to showcase your skills and establish a strong online presence."
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
          className="font-serif text-5xl md:text-7xl text-white mb-16 text-center tracking-tight"
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
              className="group bg-indigo-900/10 rounded-3xl overflow-hidden border border-white/5 hover:border-lavender-start/30 transition-colors duration-500"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between font-serif text-2xl md:text-3xl text-white p-8 outline-none text-left"
              >
                {faq.question}
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-lavender-start/10">
                  {openIndex === i ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
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
                      <p className="text-white/60 font-light text-lg md:text-xl leading-relaxed pl-4 border-l-2 border-lavender-start/30">
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
