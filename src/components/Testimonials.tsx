"use client";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clients = [
  {
    initials: "RK",
    name: "Rahul Kapoor",
    role: "Creative Director, Ogilvy India",
    quote:
      "Subho's visual instincts are genuinely rare. He doesn't just execute briefs — he elevates them. Every deliverable came back with a level of craft that made our team look twice at our own standards.",
  },
  {
    initials: "PM",
    name: "Priya Mehta",
    role: "Founder, Studio Kora",
    quote:
      "Working with Subho reshaped how I think about brand identity. He asked questions nobody else thought to ask, and the result was a visual language so precise it felt inevitable. Highly recommend.",
  },
  {
    initials: "AV",
    name: "Arjun Verma",
    role: "Marketing Head, Shiprocket",
    quote:
      "The social assets and deck Subho designed became our most-performing campaign material that quarter. He's thoughtful, fast, and the work genuinely converts. Would work with him again without question.",
  },
  {
    initials: "NB",
    name: "Neha Bose",
    role: "Brand Lead, Bewakoof.com",
    quote:
      "Subho brought a level of editorial sensibility to our campaign that our in-house team struggled to match. He translated abstract brand values into visuals that our audience immediately connected with.",
  },
  {
    initials: "SS",
    name: "Siddharth Shah",
    role: "CEO, Velocity Labs",
    quote:
      "We hired Subho for a pitch deck redesign and ended up restructuring our entire brand. His eye for hierarchy and typography is exceptional — the deck helped us close our seed round.",
  },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplicate for seamless loop
  const loopedClients = [...clients, ...clients];

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !trackRef.current) return;
      e.preventDefault();
      const x = e.pageX - trackRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      trackRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const stopDragging = useCallback(() => setIsDragging(false), []);

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector("div")?.offsetWidth ?? 340;
    trackRef.current.scrollBy({ left: dir === "right" ? cardWidth + 24 : -(cardWidth + 24), behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 bg-[#05000a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2e1065] rounded-full blur-[200px] opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto max-w-6xl px-6 mb-12 md:mb-16 flex items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-sans mb-3">
            Social Proof
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight tracking-tight">
            What My Clients<br />
            <span className="italic text-lavender-start font-light">Think of the Work.</span>
          </h2>
        </motion.div>

        {/* Desktop arrows */}
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto cursor-grab active:cursor-grabbing select-none pl-6 md:pl-[max(24px,calc((100vw-72rem)/2+24px))] pr-6 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {loopedClients.map((client, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % clients.length) * 0.08, duration: 0.7 }}
            className="flex-none w-[85vw] md:w-[420px] snap-start bg-white/[0.03] border border-white/[0.07] rounded-3xl p-8 md:p-10 flex flex-col gap-8 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500"
          >
            {/* Quote */}
            <p className="font-serif text-lg md:text-xl text-white/75 leading-relaxed italic flex-1">
              &ldquo;{client.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3b0764] to-[#7e22ce] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(138,43,226,0.3)]">
                <span className="font-serif text-sm text-white/90">{client.initials}</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">{client.name}</h4>
                <p className="text-white/40 text-xs tracking-wide mt-0.5">{client.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile arrows */}
      <div className="flex md:hidden gap-3 justify-center mt-8 px-6">
        <button
          onClick={() => scroll("left")}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
