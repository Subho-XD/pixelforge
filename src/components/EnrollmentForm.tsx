"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { enrollStudent } from "@/app/actions/enroll";

const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

// Particle burst config
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  angle: (360 / 28) * i,
  distance: 80 + Math.random() * 120,
  size: 4 + Math.random() * 6,
  color: i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#d8b4fe" : "#7e22ce",
  delay: Math.random() * 0.15,
  shape: i % 4 === 0 ? "square" : "circle",
}));

function ParticleBurst() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-[2.5rem]">
      {PARTICLES.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <motion.div
            key={p.id}
            className={p.shape === "square" ? "rounded-sm" : "rounded-full"}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: [1, 1, 0],
              x: [0, tx * 0.6, tx],
              y: [0, ty * 0.6, ty],
              scale: [1, 1.4, 0.3],
              rotate: [0, p.angle * 2],
            }}
            transition={{
              duration: 0.9,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
    </div>
  );
}

export default function EnrollmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expLevel, setExpLevel] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      experienceLevel: expLevel,
      motivation: (form.elements.namedItem("motivation") as HTMLTextAreaElement).value,
      timestamp: new Date().toISOString(),
    };

    try {
      const result = await enrollStudent(data);
      if (!result.success) throw new Error(result.error || "Something went wrong.");

      // Trigger particle burst first, then show success state
      setShowParticles(true);
      setTimeout(() => {
        setIsSuccess(true);
        setShowParticles(false);
      }, 700);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enrollment" className="pt-32 pb-16 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender-start/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card-bg border border-border rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(138,43,226,0.05)]"
        >
          {/* Spotlight hover effect */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.5rem] transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(138,43,226,0.08), transparent 70%)`,
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lavender-start/5 to-transparent pointer-events-none" />

          {/* Particle burst — fires immediately after successful submit */}
          <AnimatePresence>{showParticles && <ParticleBurst />}</AnimatePresence>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="text-center mb-12">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-foreground/40 font-sans mb-4">
                    Twenty seats per cohort
                  </p>
                  <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-4 tracking-tight drop-shadow-md">
                    Reserve Your Seat.
                  </h2>
                  <p className="text-foreground/60 text-lg mx-auto" style={{ maxWidth: "52ch" }}>
                    One free introductory session, no credit card. Or reach us on WhatsApp:{" "}
                    <span className="text-lavender-start font-medium whitespace-nowrap">90887 91637</span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-foreground/50 text-xs uppercase tracking-widest font-semibold ml-1">Full Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        className="w-full bg-background/40 border border-border rounded-2xl px-5 py-4 text-foreground placeholder-foreground/20 focus:outline-none focus:border-lavender-start focus:ring-1 focus:ring-lavender-start/50 transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-foreground/50 text-xs uppercase tracking-widest font-semibold ml-1">Phone Number</label>
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        pattern="[0-9+\s\-()]{7,15}"
                        title="Enter a valid phone number"
                        className="w-full bg-background/40 border border-border rounded-2xl px-5 py-4 text-foreground placeholder-foreground/20 focus:outline-none focus:border-lavender-start focus:ring-1 focus:ring-lavender-start/50 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-foreground/50 text-xs uppercase tracking-widest font-semibold ml-1">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-background/40 border border-border rounded-2xl px-5 py-4 text-foreground placeholder-foreground/20 focus:outline-none focus:border-lavender-start focus:ring-1 focus:ring-lavender-start/50 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-foreground/50 text-xs uppercase tracking-widest font-semibold ml-1">Where are you now?</label>
                    <div className="flex flex-wrap gap-3">
                      {experienceLevels.map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setExpLevel(level)}
                          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                            expLevel === level
                              ? "bg-lavender-start/20 border-lavender-start text-foreground shadow-[0_0_20px_rgba(138,43,226,0.3)]"
                              : "bg-background/40 border-border text-foreground/60 hover:border-foreground/30 hover:text-foreground"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-foreground/50 text-xs uppercase tracking-widest font-semibold ml-1">What do you want to build?</label>
                    <textarea
                      required
                      name="motivation"
                      rows={4}
                      placeholder="A brand? A career? A portfolio that opens doors? Tell us."
                      className="w-full bg-background/40 border border-border rounded-2xl px-5 py-4 text-foreground placeholder-foreground/20 focus:outline-none focus:border-lavender-start focus:ring-1 focus:ring-lavender-start/50 transition-all shadow-inner resize-none"
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Disabled hint */}
                  <AnimatePresence>
                    {!expLevel && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-foreground/30 text-xs tracking-widest uppercase"
                      >
                        ↑ Select your experience level to continue
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting || !expLevel}
                    type="submit"
                    className="w-full relative group overflow-hidden bg-foreground text-background py-5 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-4 shadow-[0_0_40px_rgba(var(--foreground-rgb),0.2)] hover:shadow-[0_0_60px_rgba(138,43,226,0.6)]"
                  >
                    <div className="absolute inset-0 bg-lavender-start opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-500">
                      {isSubmitting ? (
                        <>Processing <Loader2 className="w-5 h-5 animate-spin" /></>
                      ) : (
                        <>Reserve My Seat <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </span>
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center justify-center text-center py-20"
              >
                {/* Glowing ring pulse */}
                <div className="relative mb-10">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-lavender-start/30"
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-lavender-start/20"
                    animate={{ scale: [1, 3.5], opacity: [0.4, 0] }}
                    transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: "spring", bounce: 0.55 }}
                    className="w-24 h-24 bg-gradient-to-tr from-lavender-start to-lavender-end rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(138,43,226,0.6)] relative z-10"
                  >
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </motion.div>
                </div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-serif text-5xl text-foreground mb-4"
                >
                  You&apos;re in.
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="text-foreground/60 text-lg mx-auto mb-10"
                  style={{ maxWidth: "44ch" }}
                >
                  Seat reserved. I&apos;ll reach out within 48 hours to confirm your spot and share the details.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => { setIsSuccess(false); setExpLevel(""); }}
                  className="px-8 py-3 rounded-full border border-border text-foreground/80 hover:bg-foreground hover:text-background transition-all font-semibold uppercase tracking-widest text-sm"
                >
                  Return
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
