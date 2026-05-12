"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#curriculum", label: "Curriculum" },
    { href: "#instructor", label: "Instructor" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/95 backdrop-blur-lg border-b border-border text-foreground"
            : "bg-gradient-to-b from-background/90 to-transparent text-foreground"
        }`}
        animate={{ height: isScrolled ? 56 : 80 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Link
              href="/"
              className="relative z-[60] flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                animate={{ scale: isScrolled ? 0.85 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="/logo.svg"
                  alt="PixelForge Logo"
                  width={140}
                  height={40}
                  className="object-contain dark:invert-0 invert"
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center justify-center flex-none text-sm font-medium tracking-widest uppercase opacity-80">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-lavender-start transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1 flex justify-end items-center gap-4">
            <a
              href="#enrollment"
              className="hidden md:flex items-center gap-2 bg-lavender-start text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase hover:brightness-110 transition-all shadow-[0_0_20px_rgba(138,43,226,0.2)]"
            >
              Enroll Now <ArrowRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle — hamburger only; close is inside overlay */}
            <button
              className="md:hidden relative z-[70] p-2.5 rounded-xl border border-border bg-foreground/5 text-foreground hover:bg-foreground/10 transition-all active:scale-95"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay — portal so z-index stacking context is clean */}
      {isMounted &&
        document.body &&
        createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[200] bg-background/97 backdrop-blur-2xl flex flex-col items-center justify-center"
              >
                {/* ── Close Button — always visible, top-right ── */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="absolute top-6 right-6 p-3 rounded-xl border border-border bg-foreground/5 text-foreground hover:bg-foreground/10 active:scale-95 transition-all"
                >
                  <X className="w-7 h-7" />
                </button>

                <nav className="flex flex-col items-center gap-10">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        delay: 0.08 + i * 0.05,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        className="font-serif text-4xl text-foreground hover:text-lavender-start transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: 0.08 + navLinks.length * 0.05,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-8"
                  >
                    <a
                      href="#enrollment"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-lavender-start hover:text-white transition-all shadow-xl"
                    >
                      Enroll Now <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
