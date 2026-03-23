"use client"
import { LayoutDashboard, Mic, History, Settings, Sparkles, ArrowRight, Crown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
  { name: "New Consultation", icon: <Mic size={20} />, href: "/dashboard/consult" },
  { name: "Medical History", icon: <History size={20} />, href: "/dashboard/history" },
  { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings" },
];

export default function Sidebar({ isPremium = false }: { isPremium?: boolean }) {
  const path = usePathname();

  return (
    <div className="w-70 h-screen bg-white border-r border-slate-100 flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-2 font-bold text-xl text-blue-600 mb-2 px-2 mt-25">
        Ai Medical Assistant
      </div>

      <div className="px-2 mb-8">
        {isPremium ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold uppercase shadow-sm">
            <Crown size={10} fill="currentColor" /> Premium
          </div>
        ) : (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase">
            Free Tier
          </div>
        )}
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              path === item.href 
                ? "bg-blue-50 text-blue-600" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      {/* UPGRADE CARD: Only shows if NOT premium */}
      {!isPremium && (
        <div className="mt-auto pt-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-5 text-white relative overflow-hidden shadow-lg shadow-blue-200">
            {/* Background Decorative Sparkle */}
            <Sparkles className="absolute -right-2 -top-2 text-white/20 w-16 h-16" />
            
            <div className="relative z-10">
              <h4 className="font-bold text-sm mb-1">Upgrade to Pro</h4>
              <p className="text-[10px] text-blue-100 mb-4 leading-relaxed">
                Get unlimited consultations and priority medical AI support.
              </p>
              
              <Link href="/pricing">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none rounded-xl h-9 text-[11px] font-bold flex gap-2">
                  Upgrade Now <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}