"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Code, PenTool, Image as ImageIcon, Briefcase, Cpu, Palette } from "lucide-react";

const phases = [
  {
    id: "01",
    title: "Design Foundations",
    desc: "Core principles: color, typography, layout.",
    icon: <Palette className="w-6 h-6" />,
    details: "We start from the ground up. You will strip away software distractions and focus purely on the core principles of design: hierarchy, balance, contrast, and alignment. Expect rigorous critique.",
  },
  {
    id: "02",
    title: "Adobe Illustrator",
    desc: "Basics to Advanced, Real-world project applications.",
    icon: <PenTool className="w-6 h-6" />,
    details: "Master vector graphics. We will cover everything from basic shapes to advanced illustration techniques. Learn to build scalable, production-ready assets for any medium.",
  },
  {
    id: "03",
    title: "Adobe Photoshop",
    desc: "Basics to Advanced, Practical design workflows.",
    icon: <ImageIcon className="w-6 h-6" />,
    details: "Dive deep into raster manipulation. Learn advanced compositing, retouching, and color grading. We focus on non-destructive workflows used by top industry professionals.",
  },
  {
    id: "04",
    title: "Portfolio Development",
    desc: "Create real projects, Build a strong design portfolio.",
    icon: <Briefcase className="w-6 h-6" />,
    details: "Your portfolio is your product. We dedicate this phase to selecting, refining, and presenting your best work. Learn how to write case studies that get you hired by top agencies.",
  },
  {
    id: "05",
    title: "Bonus: Generative AI",
    desc: "AI for creative workflows.",
    icon: <Cpu className="w-6 h-6" />,
    details: "Learn how to create visuals using modern AI tools and enhance your design workflow with AI-assisted creativity. We'll explore prompting techniques and ethical integration.",
  }
];

export default function Curriculum() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  return (
    <section id="curriculum" className="py-32 px-6 bg-background relative z-20 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight">
              The Curriculum
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl font-light mx-auto">
              A carefully engineered roadmap from blank canvas to industry-ready professional.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          {phases.map((phase, i) => (
            <CurriculumCard 
              key={i} 
              phase={phase} 
              isExpanded={expandedIndex === i} 
              onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumCard({ phase, isExpanded, onToggle, index }: { phase: any, isExpanded: boolean, onToggle: () => void, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div 
        onClick={onToggle}
        className={`cursor-pointer rounded-3xl border transition-all duration-500 overflow-hidden ${
          isExpanded 
            ? "bg-indigo-900/40 border-lavender-start/30 shadow-[0_0_30px_rgba(138,43,226,0.1)]" 
            : "bg-indigo-900/10 border-white/5 hover:border-white/10 hover:bg-indigo-900/20"
        }`}
      >
        {/* Header */}
        <div className="p-6 md:p-10 flex items-start sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-10 flex-col sm:flex-row">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg transition-colors duration-500 ${isExpanded ? "bg-lavender-start/20 text-lavender-start" : "bg-white/5 text-white/40"}`}>
                  {phase.icon}
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-white">{phase.title}</h3>
              </div>
              <p className="text-white/60 text-lg font-light">{phase.desc}</p>
            </div>
          </div>
          
          {/* Toggle Icon */}
          <div className="flex flex-shrink-0 w-12 h-12 rounded-full border border-white/10 items-center justify-center transition-transform duration-500 group-hover:scale-110">
            {isExpanded ? <Minus className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-6 md:px-10 pb-6 md:pb-10 pt-0">
                <div className="w-full h-[1px] bg-white/10 mb-6 md:mb-8" />
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-lavender-start mb-4 font-semibold">Deep Dive</h4>
                    <p className="text-white/80 leading-relaxed font-light text-lg">
                      {phase.details}
                    </p>
                  </div>
                  <div className="flex-1 mt-6 md:mt-0">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-semibold">Key Deliverables</h4>
                    <ul className="flex flex-wrap gap-2 md:gap-3">
                      {["Project Files", "Case Study Asset", "Live Feedback"].map((tag, i) => (
                        <li key={i} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-white/70">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
