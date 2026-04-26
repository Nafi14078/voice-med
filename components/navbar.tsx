"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartPulse, User, LayoutDashboard } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Doctors", href: "/doctors" },
  { name: "How It Works", href: "/how-it-works" },
  //{ name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-[#1e293b]">
          <div className="bg-[#3b82f6] p-1 rounded-lg">
            <HeartPulse className="text-white" size={24} />
          </div>
          <span>VoiceMed</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-[15px] font-medium text-slate-600 hover:text-blue-600 relative group transition-colors">
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="group relative overflow-hidden rounded-full border-blue-600 text-blue-600 px-8 py-2 hover:text-white transition-all">
                <span className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  <User size={16} /> Login
                </span>
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button variant="outline" className="group relative overflow-hidden rounded-full bg-blue-600 text-white px-6 py-2 transition-all border-none" render={<Link href="/dashboard" />}>
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                Dashboard <div className="bg-white/20 p-1 rounded-full"><User size={14} /></div>
              </span>
            </Button>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}