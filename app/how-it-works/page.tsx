"use client";

import { 
  Mic, Search, BrainCircuit, FileText, 
  ArrowRight, ShieldCheck, CheckCircle2,
  Terminal, Sparkles, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TutorialPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-4">
            <Sparkles size={16} />
            <span>SYSTEM DOCUMENTATION v1.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            How MedVoice <span className="text-blue-600">Actually</span> Works
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Our pipeline combines real-time speech processing with clinical entity extraction to provide immediate specialist triage.
          </p>
        </div>

        {/* Tutorial Steps */}
        <div className="grid gap-8 mb-20">
          
          {/* Step 1 */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                01
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Mic size={24} /> Voice-to-Text Mapping
                </h3>
                <p className="text-slate-600 mb-4">
                  When you hold the mic, the system uses a <strong>Whisper-based</strong> speech-to-text engine. It captures natural language—you don't need to know medical terms.
                </p>
                <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-mono text-slate-500 italic">
                  Input: "My stomach has been cramping since breakfast..."
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                02
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <BrainCircuit size={24} /> Symptom Extraction
                </h3>
                <p className="text-slate-600 mb-4">
                  The AI identifies "Keywords" from your speech and compares them against our specialist database using <strong>Vector Embeddings</strong>.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">KEYWORD: STOMACH</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">KEYWORD: CRAMPING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                03
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Activity size={24} /> Specialist Recommendation
                </h3>
                <p className="text-slate-600 mb-4">
                  Based on the score, we filter 12+ specialties (from Cardiologists to Dentists) to find your best match.
                </p>
                <div className="p-4 bg-blue-50/50 rounded-xl border border-dashed border-blue-200 text-blue-700 font-bold text-sm">
                  AI Recommendation: Gastroenterologist (Match: 98%)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SYSTEM LOGIC TERMINAL --- */}
        <div className="mb-20">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {/* Terminal Header */}
            <div className="bg-slate-800/50 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                <Terminal size={14} />
                medvoice_engine_v1.sh
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-8 font-mono text-sm leading-relaxed">
              <div className="text-blue-400 mb-2 font-bold">ashfak@nafi:~/ai-medical-agent$ ./run_analysis.sh</div>
              <div className="text-slate-400">{`> Booting Medical Voice Engine...`}</div>
              <div className="text-slate-400">{`> Connecting to Clerk Auth... [OK]`}</div>
              <div className="text-slate-400">{`> Connecting to Neon Database... [OK]`}</div>
              <div className="text-yellow-400 mt-4">{`[LISTENING] Analyzing voice frequencies...`}</div>
              <div className="text-emerald-400">{`[STT] Transcription: "Persistent heart palpitations after exercise"`}</div>
              <div className="text-blue-300 mt-4">{`[NLP] Entity Identified: { category: "Heart", urgency: "High" }`}</div>
              <div className="text-blue-300">{`[CORE] Mapping to Specialist: Cardiologist`}</div>
              <div className="text-slate-400 mt-4">{`> Generating consultation report...`}</div>
              <div className="text-emerald-500 font-bold animate-pulse">{`> STATUS: Analysis Complete. Specialist Tagged.`}</div>
              <div className="mt-4 text-slate-500">_</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-slate-900 text-white hover:bg-blue-600 px-12 py-8 rounded-2xl text-xl font-bold transition-all shadow-xl">
              Start Your First Session
            </Button>
          </Link>
          <div className="mt-8 flex justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2"><ShieldCheck size={16} /> Encrypted</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} /> HIPAA Compliant</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}