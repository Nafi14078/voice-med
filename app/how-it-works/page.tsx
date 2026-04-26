"use client";

import { 
  ClipboardList, BrainCircuit, PhoneCall, 
  Mic2, FileCheck, ArrowRight, ShieldCheck, 
  CheckCircle2, Terminal, Sparkles
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
            Our automated pipeline manages the transition from your initial symptoms to a professional consultation and permanent medical record.
          </p>
        </div>

        {/* Updated Tutorial Steps */}
        <div className="grid gap-8 mb-20">
          
          {/* Step 1: Form Submission */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                01
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <ClipboardList size={24} /> Submit Patient Details
                </h3>
                <p className="text-slate-600 mb-4">
                  Begin by filling out the intake form with your symptoms and medical history. This structured data provides the context needed for clinical triage.
                </p>
                <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-mono text-slate-500">
                  Status: <span className="text-emerald-600 font-bold">Form Data Received</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: AI Analysis */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                02
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <BrainCircuit size={24} /> AI Analysis & Matching
                </h3>
                <p className="text-slate-600 mb-4">
                  Our Neural Engine processes the form data to identify clinical entities and calculates the best match among our specialized medical agents.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100">VECTOR MAPPING</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-lg border border-purple-100">MATCH: NEUROLOGIST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Establishing Call */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                03
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <PhoneCall size={24} /> Connection Initiation
                </h3>
                <p className="text-slate-600 mb-4">
                  Once the specialist is identified, the system automatically initiates a secure VoIP bridge to connect you with the AI doctor.
                </p>
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-dashed border-emerald-200 text-emerald-700 font-bold text-sm">
                  Status: Initiating Secure Call... [CONNECTED]
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Voice Consultation */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                04
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Mic2 size={24} /> Voice Consultation
                </h3>
                <p className="text-slate-600 mb-4">
                  Conduct a natural voice conversation. The AI listens to your vocal cues and provides clinical guidance in real-time.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-500">Audio Stream: 44.1kHz Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Dashboard Archiving */}
          <div className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                05
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <FileCheck size={24} /> Automated Report Saving
                </h3>
                <p className="text-slate-600 mb-4">
                  After the call terminates, the AI compiles a full medical report and permanently archives it in your secure Dashboard.
                </p>
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm">
                  <CheckCircle2 size={16} /> Saved to Database (PostgreSQL)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SYSTEM LOGIC TERMINAL --- */}
        <div className="mb-20">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="bg-slate-800/50 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                <Terminal size={14} />
                medvoice_pipeline.sh
              </div>
            </div>
            
            <div className="p-8 font-mono text-sm leading-relaxed">
              <div className="text-blue-400 mb-2 font-bold">ashfak@nafi:~/medvoice$ ./start_journey.sh</div>
              <div className="text-slate-400">{`> Parsing Intake Form... [OK]`}</div>
              <div className="text-slate-400">{`> Executing Neural Matcher... [OK]`}</div>
              <div className="text-emerald-400">{`[AI] Best Specialty: Neurologist (Confidence: 0.98)`}</div>
              <div className="text-yellow-400 mt-4">{`[CALLING] Initializing VoIP Handshake...`}</div>
              <div className="text-blue-300">{`[VOICE] Consultation Stream Active: Session_ID_9942`}</div>
              <div className="text-slate-400 mt-4">{`> Post-Call Processing...`}</div>
              <div className="text-slate-400">{`> Compiling clinical_report.pdf...`}</div>
              <div className="text-emerald-500 font-bold animate-pulse">{`> STATUS: Report saved to Dashboard.`}</div>
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