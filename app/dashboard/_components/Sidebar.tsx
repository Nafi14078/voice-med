"use client"
import { LayoutDashboard, Mic, History, Settings, LogOut, Crown } from "lucide-react"; // Added Crown icon
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
  { name: "New Consultation", icon: <Mic size={20} />, href: "/dashboard/consult" },
  { name: "Medical History", icon: <History size={20} />, href: "/dashboard/history" },
  { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings" },
];

// Added isPremium as a prop
export default function Sidebar({ isPremium = false }: { isPremium?: boolean }) {
  const path = usePathname();

  return (
    <div className="pt-20 mt-10 w-64 h-screen bg-white border-r border-slate-100 flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-2 font-bold text-xl text-blue-600 mb-2 px-2">
        Ai Medical Agent
      </div>

      {/* Premium Badge Section */}
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
    </div>
  );
}