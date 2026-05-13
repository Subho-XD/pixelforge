"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactMessage } from "@/app/actions/contact";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const result = await sendContactMessage({ name, email, message });

      if (!result.success) {
        throw new Error(result.error || "Something went wrong.");
      }

      setStatus("success");
      setName(""); setEmail(""); setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#090111] text-white pt-32 pb-24 px-6 relative overflow-hidden flex flex-col justify-center">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold mb-12">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight"
        >
          Got questions?<br />
          <span className="text-white/40 font-light italic">Good. Let&apos;s talk.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-lg md:text-xl font-light mb-16"
          style={{ maxWidth: "52ch" }}
        >
          Skeptical about online design courses? Fair. Drop a message and I&apos;ll tell you exactly why this is different.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-10">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-lavender-start group-hover:bg-lavender-start group-hover:text-white transition-colors flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">WhatsApp / Call</h3>
                <p className="text-xl font-light text-white">+91 90887 91637</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-lavender-start group-hover:bg-lavender-start group-hover:text-white transition-colors flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">Email</h3>
                <a
                  href="mailto:subho@thepixelforge.digital"
                  className="text-xl font-light text-white hover:text-lavender-start transition-colors break-all"
                >
                  subho@thepixelforge.digital
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-lavender-start group-hover:bg-lavender-start group-hover:text-white transition-colors flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">Studio</h3>
                <p className="text-xl font-light text-white">Kolkata, West Bengal<br/>India</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-indigo-900/20 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="font-serif text-2xl text-white mb-6">Send a Note</h3>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 gap-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-lavender-start" />
                  <p className="text-white text-lg font-light">Message sent. I&apos;ll get back to you shortly.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-white/50 text-xs uppercase tracking-widest hover:text-white transition-colors mt-2"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input 
                    required
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start transition-colors"
                  />
                  <input 
                    required
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start transition-colors"
                  />
                  <textarea 
                    required
                    rows={4}
                    placeholder="What's on your mind?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start transition-colors resize-none"
                  />

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-white text-indigo-900 font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-lavender-start hover:text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : "Send Message"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
