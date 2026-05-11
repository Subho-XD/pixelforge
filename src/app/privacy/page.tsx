import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#030008] text-white pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-3xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="font-serif text-5xl md:text-6xl text-white mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 text-white/70 font-light leading-relaxed text-lg">
          <p>
            Last updated: May 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">1. Information We Collect</h2>
            <p>
              When you enroll in our masterclass or contact us, we collect personal information such as your name, email address, phone number, and any other details you provide in your application.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">2. How We Use Your Information</h2>
            <p>
              We use the collected information to process your enrollment, communicate course updates, provide technical support, and improve our curriculum. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is entirely secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">4. Third-Party Services</h2>
            <p>
              We may use third-party tools (such as payment processors and email services) to facilitate our services. These providers have their own privacy policies governing the data they collect.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-serif">5. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, please contact us directly using the information provided on our Contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
