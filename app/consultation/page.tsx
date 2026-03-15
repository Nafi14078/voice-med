"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Mic, MicOff, PhoneOff, Globe, Volume2, Settings, History, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Groq from "groq-sdk";

// Initialize Groq
const groq = new Groq({ 
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
  dangerouslyAllowBrowser: true 
});

function ConsultationContent() {
  const searchParams = useSearchParams();
  const doctorName = searchParams.get("name") || "General Physician";
  const doctorImage = searchParams.get("image") || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop";

  const [hasStarted, setHasStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState<"EN" | "BN">("EN");
  const [transcript, setTranscript] = useState([
    { 
      role: "assistant", 
      text: `Hi there. I'm your ${doctorName}. I'm here to help you with any health questions or concerns you might have today. How are you feeling?` 
    },
  ]);

  // Refs for Speech and Memory
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const transcriptRef = useRef(transcript); // FIXED: Memory tracker
  const scrollRef = useRef<HTMLDivElement>(null); // FIXED: Scroll tracker

  // Keep the Ref in sync with state
  useEffect(() => {
    transcriptRef.current = transcript;
    // Auto-scroll to bottom whenever transcript updates
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = async (event: any) => {
        const text = event.results[0][0].transcript;
        // Use functional update to ensure we don't lose previous messages
        handleAIProcess(text);
      };

      recognitionRef.current.onend = () => setIsRecording(false);
    }
    synthRef.current = window.speechSynthesis;
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === "EN" ? "en-US" : "bn-BD";
    }
  }, [language]);

  const handleAIProcess = async (userText: string) => {
    // 1. Get current history from Ref and add new user message
    const currentHistory = [...transcriptRef.current, { role: "user", text: userText }];
    setTranscript(currentHistory);

    try {
      // 2. Prepare full history for Groq
      const messages = [
        {
          role: "system",
          content: `You are ${doctorName}, a professional AI Medical Assistant. 
          The patient is speaking in ${language === "EN" ? "English" : "Bangla"}. 
          Respond ONLY in ${language === "EN" ? "English" : "Bangla"}. 
          Keep your response concise (max 2 sentences). 
          Remember the patient's previous symptoms provided in this chat.`
        },
        ...currentHistory.map(msg => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.text,
        }))
      ];

      const chatCompletion = await groq.chat.completions.create({
        messages: messages as any,
        model: "llama-3.3-70b-versatile",
        temperature: 0.5, // Lower temperature for more consistent medical memory
        max_tokens: 250,
      });

      const aiResponse = chatCompletion.choices[0]?.message?.content || "";

      // 3. Update UI and Speak
      setTranscript(prev => [...prev, { role: "assistant", text: aiResponse }]);
      speak(aiResponse);
      
    } catch (error) {
      console.error("Groq Error:", error);
      const errorMsg = language === "EN" 
        ? "I encountered a connection error. Please try again." 
        : "দুঃখিত, সংযোগ ত্রুটি হয়েছে। আবার চেষ্টা করুন।";
      
      setTranscript(prev => [...prev, { role: "assistant", text: errorMsg }]);
    }
  };

  const speak = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "EN" ? "en-US" : "bn-BD";
    synthRef.current.speak(utterance);
  };

  const toggleMic = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleStartCall = () => {
    setHasStarted(true);
    speak(transcript[0].text);
  };

  // Inside ConsultationContent() in consultation/page.tsx

const endCall = async () => {
  setIsRecording(false);

  try {
    // 1. Use Groq to generate a structured report from the conversation
    const reportResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a medical scribe. Analyze the conversation transcript and provide a summary in JSON format. 
          Keys: "title" (Short medical title), "summary" (Brief overview), "disease" (Likely condition), 
          "symptoms" (List symptoms found), "medication" (Suggested medicines/treatment), 
          "advice" (Doctor's advice), "urgency" (Low/Medium/High).`
        },
        {
          role: "user",
          content: JSON.stringify(transcript)
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const reportData = JSON.parse(reportResponse.choices[0].message.content || "{}");

    // 2. Send the AI-generated report to our new API route
    const response = await fetch("/api/save-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    });

    if (response.ok) {
      // 3. Navigate back to dashboard to see the updated stats and report
      window.location.href = "/dashboard";
    }
  } catch (error) {
    console.error("Report Generation Error:", error);
    setHasStarted(false); // Fallback to hide overlay
  }
};

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col relative">
      {!hasStarted && (
        <div className="absolute inset-0 z-[100] bg-slate-50/90 backdrop-blur-xl flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-6">
            <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse" />
            <img src={doctorImage} alt={doctorName} className="w-full h-full rounded-full object-cover border-4 border-white shadow-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{doctorName}</h2>
          <p className="text-slate-500 mb-8">AI Medical Voice Agent</p>
          <Button onClick={handleStartCall} className="bg-slate-900 hover:bg-blue-600 text-white px-10 py-7 rounded-2xl text-lg font-bold shadow-xl transition-all hover:scale-105 flex gap-3">
            <Play fill="currentColor" size={20} /> Start Call
          </Button>
        </div>
      )}

      <header className="px-8 py-4 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">M</div>
          <div>
            <h2 className="font-bold text-slate-900 leading-none">MedVoice AI</h2>
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Live Connection</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full text-slate-400"><History size={20}/></Button>
          <Button variant="ghost" size="icon" className="rounded-full text-slate-400"><Settings size={20}/></Button>
          <div className="h-8 w-[1px] bg-slate-200 mx-2" />
          <button onClick={() => setLanguage(language === "EN" ? "BN" : "EN")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors uppercase">
            <Globe size={14} /> {language === "EN" ? "English" : "বাংলা"}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 flex flex-col lg:flex-row gap-12 items-center justify-center">
        <div className="lg:w-1/3 flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            {isRecording && (
              <>
                <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" />
                <div className="absolute -inset-4 rounded-full bg-blue-400/10 animate-pulse" />
              </>
            )}
            <div className={`relative w-64 h-64 rounded-full border-4 ${isRecording ? 'border-blue-500 shadow-2xl shadow-blue-200' : 'border-white shadow-xl'} overflow-hidden transition-all duration-500`}>
              <img src={doctorImage} alt={doctorName} className="w-full h-full object-cover" />
            </div>
            {isRecording && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg animate-bounce">
                <Volume2 size={24} />
              </div>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900">{doctorName}</h3>
            <p className="text-slate-500 font-medium">AI Medical Voice Agent</p>
          </div>
          <div className="flex items-end gap-1.5 h-10">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`w-2 bg-blue-500/20 rounded-full transition-all duration-300 ${isRecording ? 'animate-wave' : 'h-2'}`}
                style={{ animationDelay: `${i * 0.1}s`, height: isRecording ? '100%' : '20%', backgroundColor: isRecording ? '#3b82f6' : '#e2e8f0' }} />
            ))}
          </div>
        </div>

        <div className="flex-1 w-full bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col overflow-hidden h-[600px]">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Transcript</span>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Connected</span>
            </div>
          </div>

          {/* ADDED scrollRef here to keep messages in view */}
          <div ref={scrollRef} className="flex-1 p-10 overflow-y-auto space-y-8 scrollbar-hide scroll-smooth">
            {transcript.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <span className="text-[10px] font-bold text-slate-300 uppercase mb-3 tracking-widest px-2">
                  {msg.role === "assistant" ? doctorName : "Patient (You)"}
                </span>
                <p className={`max-w-[85%] text-[16px] leading-relaxed px-7 py-4 rounded-[2rem] shadow-sm ${
                  msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100"}`}>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-10 bg-white border-t border-slate-50 flex justify-center items-center gap-8">
            <Button 
              onClick={toggleMic}
              className={`w-15 h-15 rounded-full shadow-2xl transition-all duration-300 ${isRecording ? "bg-blue-600 scale-110" : "bg-red-500 text-slate-400"}`}
            >
              {isRecording ? <Mic size={32} /> : <MicOff size={32} />}
            </Button>
            
            <Button variant="outline" className="h-16 px-10 rounded-2xl border-slate-200 text-slate-600 font-bold flex gap-3 shadow-sm" onClick={endCall}>
              <PhoneOff size={20} className="text-red-500" /> End Consultation
            </Button>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes wave { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
        .animate-wave { animation: wave 1s ease-in-out infinite; transform-origin: bottom; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

export default function VoiceConsultation() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ConsultationContent />
    </Suspense>
  );
}