"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { verifyPasscode } from "@/app/actions/verify-passcode";

const ERROR_QUOTES = [
  "Nice try, but the creative gods are not amused.",
  "Did your cat walk on the keyboard? Try again.",
  "Access denied. We prefer Helvetica.",
  "That's not the secret handshake.",
  "Close, but no pixel."
];

const GeminiSparkle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemini-gate" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285f4" />
        <stop offset="33%" stopColor="#9b72cb" />
        <stop offset="66%" stopColor="#d96570" />
        <stop offset="100%" stopColor="#fbbc04" />
      </linearGradient>
    </defs>
    <path d="M12 0 C12 6.6 17.4 12 24 12 C17.4 12 12 17.4 12 24 C12 17.4 6.6 12 0 12 C6.6 12 12 6.6 12 0 Z" fill="url(#gemini-gate)" />
  </svg>
);

const LAUNCH_DATE = "2026-05-15T00:00:00+05:30";

export default function Gatekeeper({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const [wasAlreadyUnlocked, setWasAlreadyUnlocked] = useState(false);

  useEffect(() => {
    // Auto-unlock check (Local Time)
    const launchTime = new Date(LAUNCH_DATE).getTime();
    const currentTime = new Date().getTime();
    
    if (currentTime >= launchTime) {
      setIsUnlocked(true);
      setWasAlreadyUnlocked(true);
      return;
    }

    // Check session storage on mount
    const unlocked = sessionStorage.getItem("pixelforge_unlocked") === "true";
    if (unlocked) {
      setWasAlreadyUnlocked(true);
    }
    setIsUnlocked(unlocked);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUnlocking || isVerifying) return;

    setIsVerifying(true);
    try {
      const { ok } = await verifyPasscode(passcode);

      if (ok) {
        setIsUnlocking(true);
        // Wait for the explosive animation to finish before removing gatekeeper
        setTimeout(() => {
          sessionStorage.setItem("pixelforge_unlocked", "true");
          setIsUnlocked(true);
        }, 2000);
      } else {
        setIsShaking(true);
        setErrorIndex(Math.floor(Math.random() * ERROR_QUOTES.length));
        setTimeout(() => setIsShaking(false), 500);
        setPasscode("");
      }
    } catch {
      setIsShaking(true);
      setErrorIndex(Math.floor(Math.random() * ERROR_QUOTES.length));
      setTimeout(() => setIsShaking(false), 500);
      setPasscode("");
    } finally {
      setIsVerifying(false);
    }
  };

  // Prevent hydration mismatch flash
  if (isUnlocked === null) return null;

  return (
    <>
      {/* 
        We render children if unlocked. If transitioning from the unlock animation, 
        we fade children in smoothly. If already unlocked on mount, skip animation entirely
        to prevent any transform/filter CSS containing block bugs.
      */}
      {isUnlocked && wasAlreadyUnlocked && (
        <div id="gatekeeper-content" className="w-full h-full">
          {children}
        </div>
      )}
      
      {isUnlocked && !wasAlreadyUnlocked && (
        // Use opacity-only animation — filter/transform on a wrapper breaks position:fixed children
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          id="gatekeeper-content"
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}

      <AnimatePresence>
        {!isUnlocked && (
          <motion.div 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#030008] flex items-center justify-center overflow-hidden font-sans selection:bg-lavender-start/30"
          >
            {/* Background Ambience */}
            <motion.div 
              animate={isUnlocking ? { scale: 5, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeIn" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender-start/10 rounded-full blur-[150px] pointer-events-none" 
            />
            
            {/* The Wow Factor - Exploding Icon */}
            {isUnlocking && (
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: [0, 2, 50], rotate: 0, opacity: [0, 1, 1] }}
                transition={{ duration: 2, ease: [0.5, 0, 0.2, 1], times: [0, 0.4, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
              >
                <GeminiSparkle className="w-32 h-32 filter drop-shadow-[0_0_40px_rgba(155,114,203,1)]" />
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isUnlocking ? { opacity: 0, scale: 0.9, filter: "blur(10px)" } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-full max-w-md px-6 text-center"
            >
              {/* Floating aesthetic icon above text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{ opacity: { delay: 0.5, duration: 1 }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                className="flex justify-center mb-8"
              >
                <GeminiSparkle className="w-12 h-12 opacity-80 filter drop-shadow-[0_0_15px_rgba(155,114,203,0.5)]" />
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-serif text-5xl md:text-6xl text-white mb-2 tracking-tight drop-shadow-lg">
                  PixelForge
                </h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-semibold mb-12">
                  Coming Soon
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="relative">
                <motion.div
                  animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <input
                    type="text"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Passcode"
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-center text-white placeholder:text-white/20 focus:outline-none focus:border-lavender-start/50 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(138,43,226,0.2)] transition-all backdrop-blur-sm tracking-widest font-mono"
                    autoComplete="off"
                    spellCheck="false"
                    disabled={isUnlocking || isVerifying}
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {errorIndex !== null && !isUnlocking && (
                    <motion.p
                      key={errorIndex}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 mt-4 text-sm text-red-400/80 font-light"
                    >
                      {ERROR_QUOTES[errorIndex]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Decorative Grid Lines */}
            <motion.div 
              animate={isUnlocking ? { opacity: 0 } : { opacity: 0.03 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
                backgroundSize: '100px 100px'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
