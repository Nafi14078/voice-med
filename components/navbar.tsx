import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <HeartPulse className="text-blue-600" size={24} />
          <span>MedVoice</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* If the user is NOT logged in */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost">Log In</Button>
            </SignInButton>
            
            <Button className="bg-blue-600 text-white rounded-full px-6" render={<Link href="/sign-up" />}>
              Get Started
            </Button>
          </SignedOut>

          {/* If the user IS logged in */}
          <SignedIn>
            <Link href="/dashboard" className="text-sm font-medium mr-2">
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}