import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#030008] text-white pt-32 pb-24 px-6 relative overflow-hidden flex flex-col justify-center">
      {/* Decorative ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest font-semibold mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight">Get in Touch.</h1>
        <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mb-16">
          Have questions about the masterclass? Looking for corporate training? Drop a message and we will get back to you shortly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-10">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-lavender-start group-hover:bg-lavender-start group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">WhatsApp / Call</h3>
                <p className="text-xl font-light text-white">+91 90887 91637</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-lavender-start group-hover:bg-lavender-start group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">Email Address</h3>
                <p className="text-xl font-light text-white">hello@pixelforge.studio</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-lavender-start group-hover:bg-lavender-start group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">Studio Location</h3>
                <p className="text-xl font-light text-white">Kolkata, West Bengal<br/>India</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Box */}
          <div className="bg-indigo-900/20 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="font-serif text-2xl text-white mb-6">Send a Quick Note</h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start transition-colors"
              />
              <textarea 
                rows={4}
                placeholder="Your Message" 
                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-lavender-start transition-colors resize-none"
              />
              <button 
                type="button"
                className="w-full bg-white text-indigo-900 font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-lavender-start hover:text-white transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
