"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

export default function EnrollmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expLevel, setExpLevel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <section className="pt-32 pb-16 px-6 bg-background relative overflow-hidden">
      {/* Decorative ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender-start/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-indigo-900/30 border border-white/10 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(138,43,226,0.05)]"
        >
          {/* Subtle inner gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-lavender-start/5 to-transparent pointer-events-none" />
          
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
                  <h2 className="font-serif text-5xl md:text-6xl text-white mb-4 tracking-tight drop-shadow-md">
                    Secure Your Spot
                  </h2>
                  <p className="text-white/60 text-lg">
                    Only 20 seats available for the upcoming masterclass cohort. <br />
                    Or enquire on WhatsApp: <span className="text-lavender-start font-medium">90887 91637</span>
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-white/50 text-xs uppercase tracking-widest font-semibold ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Jane Doe"
                        className="w-full bg-background/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start focus:ring-1 focus:ring-lavender-start/50 transition-all shadow-inner" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-white/50 text-xs uppercase tracking-widest font-semibold ml-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-background/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start focus:ring-1 focus:ring-lavender-start/50 transition-all shadow-inner" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-semibold ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full bg-background/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start focus:ring-1 focus:ring-lavender-start/50 transition-all shadow-inner" 
                    />
                  </div>

                  {/* Experience Level Pill Selector */}
                  <div className="space-y-3">
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-semibold ml-1">Experience Level</label>
                    <div className="flex flex-wrap gap-3">
                      {experienceLevels.map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setExpLevel(level)}
                          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                            expLevel === level 
                              ? "bg-lavender-start/20 border-lavender-start text-white shadow-[0_0_20px_rgba(138,43,226,0.3)]" 
                              : "bg-background/40 border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-white/50 text-xs uppercase tracking-widest font-semibold ml-1">Why do you want to learn design?</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell us a bit about your goals..."
                      className="w-full bg-background/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start focus:ring-1 focus:ring-lavender-start/50 transition-all shadow-inner resize-none" 
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting || !expLevel}
                    type="submit" 
                    className="w-full relative group overflow-hidden bg-white text-indigo-900 py-5 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(138,43,226,0.6)]"
                  >
                    <div className="absolute inset-0 bg-lavender-start opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-500">
                      {isSubmitting ? (
                        <>Processing <Loader2 className="w-5 h-5 animate-spin" /></>
                      ) : (
                        <>Apply for Enrollment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </span>
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative z-10 flex flex-col items-center justify-center text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="w-24 h-24 bg-gradient-to-tr from-lavender-start to-lavender-end rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(138,43,226,0.5)]"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="font-serif text-5xl text-white mb-4">Application Received.</h3>
                <p className="text-white/60 text-lg max-w-md mx-auto mb-10">
                  Thank you for applying. I will review your application and contact you within 48 hours to confirm your spot.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-8 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white hover:text-indigo-900 transition-all font-semibold uppercase tracking-widest text-sm"
                >
                  Return
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
