import { Button } from "@/components/ui/button";
import { HeartPulse, Mic } from "lucide-react";
import { RetroGrid } from "@/components/ui/retro-grid";
import { TypingAnimation } from "@/components/ui/typing-animation";
export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Background Effect */}
      <RetroGrid />

      <div className="z-10 flex flex-col items-center text-center px-6">
        {/* Medical Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-6 animate-fade-in">
          <HeartPulse size={14} />
          <span className="text-xs font-semibold uppercase tracking-wider">Next-Gen Healthcare</span>
        </div>

        {/* Animated Title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white">
          <TypingAnimation>AI Medical Voice Agent</TypingAnimation>
        </h1>

        <p className="mt-4 max-w-xl text-lg text-slate-500 dark:text-slate-400">
          Empowering practitioners with real-time vocal diagnostics and automated patient charting. 
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Button size="lg" className="rounded-full h-12 px-8 gap-2 bg-blue-600 hover:bg-blue-700">
            <Mic size={18} />
            Start Speaking
          </Button>
          <Button size="lg" variant="outline" className="rounded-full h-12 px-8">
            View Patient Records
          </Button>
        </div>
      </div>
    </div>
  );
}