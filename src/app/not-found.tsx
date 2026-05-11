import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030008] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      {/* Decorative ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl">
        <h1 className="font-serif text-8xl md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-lavender-start to-lavender-end mb-4 tracking-tighter drop-shadow-2xl">
          404
        </h1>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-lg mx-auto">
          The page you are looking for has been moved, deleted, or possibly never existed. Let's get you back on track.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 bg-white text-indigo-900 px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-lavender-start hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(138,43,226,0.4)]"
        >
          <ArrowLeft className="w-5 h-5" /> Return Home
        </Link>
      </div>

      {/* Abstract Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/5 rounded-full" />
        <div className="absolute bottom-20 right-20 w-64 h-64 border border-lavender-start/10 rounded-full" />
      </div>
    </main>
  );
}
