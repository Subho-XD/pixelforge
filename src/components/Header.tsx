"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    // Determine if scrolled past top
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#curriculum", label: "Curriculum" },
    { href: "#instructor", label: "Instructor" },
  ];

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 text-white ${
          isScrolled || isMobileMenuOpen ? 'bg-background/95 backdrop-blur-lg border-b border-white/5' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Link href="/" className="relative z-[60] flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Image src="/logo.svg" alt="PixelForge Logo" width={140} height={40} className="object-contain" />
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center justify-center flex-none text-sm font-medium tracking-widest uppercase text-white/80">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
            ))}
          </nav>
          
          <div className="flex-1 flex justify-end items-center gap-4">
            <a href="#enrollment" className="hidden md:flex items-center gap-2 bg-white text-indigo-900 px-6 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-lavender-start hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Enroll Now <ArrowRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden relative z-[60] p-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[40] bg-[#030008]/95 flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    href={link.href} 
                    className="font-serif text-4xl text-white hover:text-lavender-start transition-colors"
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
                transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <a href="#enrollment" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-lavender-start hover:text-white transition-all">
                  Enroll Now <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
