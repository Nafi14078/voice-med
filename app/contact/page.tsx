"use client";

import { useState } from "react";
import { 
  Mail, MessageSquare, MapPin, Phone, 
  Send, Globe, ShieldCheck, Clock,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    // Simulate API call
    setTimeout(() => setPending(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Have questions about our AI diagnostic accuracy or technical integration? 
            Our medical-tech team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Ashfak Azad Nafi" 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="nafi@iut-dhaka.edu" 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnership/Medical Integration</option>
                  <option>Privacy & Security</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help you?"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  required
                />
              </div>

              <Button 
                disabled={pending}
                className="w-full py-7 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              >
                {pending ? "Transmitting..." : "Send Message"}
                {!pending && <Send size={18} className="ml-2" />}
              </Button>
            </form>
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-0" />
          </div>

          {/* Right Column: Info & Terminal */}
          <div className="space-y-8">
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">EMAIL</p>
                  <p className="text-sm font-bold text-slate-900">support@medvoice.ai</p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">RESPONSE TIME</p>
                  <p className="text-sm font-bold text-slate-900">&lt; 2 Hours</p>
                </div>
              </div>
            </div>

            {/* Support Terminal */}
            <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <div className="bg-slate-800/50 px-6 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase tracking-widest">
                  <Terminal size={12} />
                  Support_Console
                </div>
              </div>
              <div className="p-8 font-mono text-xs md:text-sm leading-relaxed space-y-2">
                <div className="text-blue-400">$ fetch --active-agents</div>
                <div className="text-slate-400">{`> Agent #045 (Nafi) Status: ONLINE`}</div>
                <div className="text-slate-400">{`> Global Nodes: Dhaka, NYC, London [CONNECTED]`}</div>
                <div className="text-yellow-400 mt-4">{`[WAITING] Awaiting incoming transmission...`}</div>
                <div className="text-slate-500 mt-2 italic">{"// All conversations are HIPAA encrypted"}</div>
              </div>
            </div>

            {/* Social / Other info */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-200" />
                Data Privacy Guarantee
              </h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                We do not share your medical symptoms or voice recordings with third parties. 
                Your data is used solely to connect you with the right specialist.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}