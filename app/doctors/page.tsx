"use client"
import { useState, Suspense } from "react";
import { Search, Activity, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const allDoctors = [
  { id: 1, name: "General Physician", desc: "Helps with everyday health concerns and common diseases", specialty: "Medicine", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", keywords: ["fever", "cold", "cough", "flu", "pain", "weakness"] },
  { id: 2, name: "Pediatrician", desc: "Expert in children's health, from babies to teens.", specialty: "Pediatrics", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", premium: true, keywords: ["child", "baby", "kid", "growth", "pediatric"] },
  { id: 3, name: "Dermatologist", desc: "Handles skin issues like rashes, acne, or infections.", specialty: "Dermatology", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", premium: true, keywords: ["skin", "rash", "acne", "itching", "hair"] },
  { id: 4, name: "Psychologist", desc: "Supports mental health and emotional well-being.", specialty: "Mental Health", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop", premium: true, keywords: ["stress", "anxiety", "depression", "mental", "sleep"] },
  { id: 5, name: "Nutritionist", desc: "Provides advice on healthy eating and weight related issues", specialty: "Dietary", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop", premium: true, keywords: ["diet", "weight", "food", "nutrition", "calories"] },
  { id: 6, name: "Cardiologist", desc: "Focuses on heart health and blood pressure issues.", specialty: "Cardiology", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", premium: true, keywords: ["heart", "chest", "pressure", "breath", "palpitation"] },
  { id: 7, name: "ENT Specialist", desc: "Handles ear, nose, and throat-related problems.", specialty: "Otolaryngology", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", premium: true, keywords: ["ear", "nose", "throat", "hearing", "sinus"] },
  { id: 8, name: "Orthopedic", desc: "Helps with bone, joint, and muscle pain.", specialty: "Orthopedics", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", premium: true, keywords: ["bone", "joint", "muscle", "back", "fracture", "knee"] },
  { id: 9, name: "Gynecologist", desc: "Cares for women's reproductive and hormonal health.", specialty: "Women's Health", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", premium: true, keywords: ["period", "pregnancy", "women", "hormone", "female"] },
  { id: 10, name: "Dentist", desc: "Handles oral hygiene and dental problems.", specialty: "Dental", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop", premium: true, keywords: ["tooth", "teeth", "gum", "mouth", "dental"] },
  { id: 11, name: "Ophthalmologist", desc: "Specializes in eye care and vision problems.", specialty: "Eye Care", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop", premium: true, keywords: ["eye", "vision", "glasses", "contact", "sight"] },
  { id: 12, name: "Endocrinologist", desc: "Specializes in diabetes, thyroid disorders, and hormonal health.", specialty: "Endocrinology", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop", premium: true, keywords: ["diabetes", "sugar", "insulin", "thyroid", "hormone"] },
];

function DoctorsContent() {
  const searchParams = useSearchParams();
  const symptoms = searchParams.get("symptoms")?.toLowerCase() || "";
  const [searchTerm, setSearchTerm] = useState("");

  const getAiMatchId = () => {
    if (!symptoms) return null;
    let bestMatch = { id: 1, score: 0 };

    allDoctors.forEach(doc => {
      let score = 0;
      doc.keywords?.forEach(key => {
        if (symptoms.includes(key)) score++;
      });
      if (score > bestMatch.score) {
        bestMatch = { id: doc.id, score: score };
      }
    });
    return bestMatch.id;
  };

  const aiMatchId = getAiMatchId();

  const filteredDoctors = allDoctors
    .filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (a.id === aiMatchId ? -1 : b.id === aiMatchId ? 1 : 0));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          AI Specialist Doctors Agent
        </h1>
        
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search doctors by title or specialty..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700"
          />
        </div>

        {symptoms && (
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 w-fit px-4 py-2 rounded-full border border-blue-100 animate-pulse">
            <Sparkles size={16} /> AI is matching doctors for: "{symptoms}"
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="flex flex-col group relative">
            {doc.id === aiMatchId && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                <Sparkles size={10} fill="white" /> AI RECOMMENDED
              </div>
            )}

            <div className={`relative aspect-square overflow-hidden rounded-3xl bg-slate-100 mb-4 ${doc.id === aiMatchId ? 'ring-4 ring-blue-600 ring-offset-2' : ''}`}>
              <img 
                src={doc.image} 
                alt={doc.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {doc.premium && (
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-lg">
                  Premium
                </div>
              )}
            </div>

            <div className="px-1 flex flex-col flex-1">
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">
                  {doc.name}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1 mt-auto">
                  {doc.desc}
                </p>
              </div>
              
              <Link href={`/consultation?name=${encodeURIComponent(doc.name)}&image=${encodeURIComponent(doc.image)}`} className="mt-auto">
                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 ${doc.id === aiMatchId ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-900 text-white hover:bg-blue-600'}`}>
                  Start Consultation {doc.id === aiMatchId && <ArrowRight size={16} />}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-20">
          <Activity className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="text-slate-500">No matching specialists found.</p>
        </div>
      )}
    </div>
  );
}

// Main Page Export wrapping the content in Suspense
export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <DoctorsContent />
      </Suspense>
    </div>
  );
}