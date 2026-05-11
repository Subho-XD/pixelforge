import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#030008] text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Decorative ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/20 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto max-w-3xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="font-serif text-5xl md:text-6xl text-white mb-8 tracking-tight">Terms & Conditions</h1>
        
        <div className="space-y-8 text-white/70 font-light leading-relaxed text-lg">
          <p>
            Last updated: May 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">1. Acceptance of Terms</h2>
            <p>
              By accessing and enrolling in the PixelForge Masterclass, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">2. Course Enrollment & Payment</h2>
            <p>
              Enrollment in the PixelForge Masterclass is subject to availability and approval. We reserve the right to refuse service to anyone. Payments are non-refundable after the first 7 days of the course starting, as digital materials are provided immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">3. Intellectual Property</h2>
            <p>
              All course materials, including videos, project files, curriculum documents, and design assets, are the exclusive intellectual property of PixelForge. You may not distribute, reproduce, or resell any part of the course materials without explicit written permission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">4. Code of Conduct</h2>
            <p>
              Students are expected to maintain a professional and respectful demeanor during live sessions and within community channels. Harassment, discrimination, or disruptive behavior will result in immediate removal from the course without a refund.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">5. Disclaimer of Warranties</h2>
            <p>
              PixelForge does not guarantee employment, client acquisition, or specific income results upon completion of the masterclass. The success of the student is entirely dependent on their individual effort, portfolio quality, and market conditions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
