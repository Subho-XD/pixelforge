"use client";
import { motion } from "framer-motion";

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
];

// Duplicate enough times for a seamless loop
const looped = [...clients, ...clients, ...clients, ...clients];

function TestimonialCard({
  client,
}: {
  client: (typeof clients)[0];
}) {
  return (
    <div className="flex-none w-[85vw] sm:w-[420px] bg-white/[0.03] border border-white/[0.07] rounded-3xl p-8 md:p-10 flex flex-col gap-6 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500">
      <p className="font-serif text-lg md:text-xl text-white/75 leading-relaxed italic flex-1">
        &ldquo;{client.quote}&rdquo;
      </p>
      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#3b0764] to-[#7e22ce] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(138,43,226,0.3)]">
          <span className="font-serif text-sm text-white/90">{client.initials}</span>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm">{client.name}</h4>
          <p className="text-white/40 text-xs tracking-wide mt-0.5">{client.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#05000a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2e1065] rounded-full blur-[200px] opacity-10 pointer-events-none" />

      {/* Header — constrained and padded */}
      <div className="container mx-auto max-w-6xl px-6 mb-16 text-center">
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
            What My Clients{" "}
            <span className="italic text-lavender-start font-light">Think of the Work.</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee track with edge fade masks */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* Scrolling row — pure CSS animation */}
        <div className="flex gap-6 w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
          {looped.map((client, i) => (
            <TestimonialCard key={i} client={client} />
          ))}
        </div>
      </div>

      {/* Keyframe defined in tailwind arbitrary — fallback inline style */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
