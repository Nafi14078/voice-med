"use client";

import { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "../dashboard/_components/Sidebar";
import PaymentModal from "./_components/PaymentModal"; // Ensure this path matches your file structure

const plans = [
  {
    name: "Free Tier",
    price: "0",
    description: "Perfect for trying out MedVoice AI",
    features: [
      "10 AI Consultations",
      "Basic Medical Reports",
      "Standard Response Speed",
      "Email Support",
    ],
    buttonText: "Current Plan",
    premium: false,
  },
  {
    name: "Premium Pro",
    price: "19",
    description: "Unlimited health support for you and your family",
    features: [
      "Unlimited AI Consultations",
      "Detailed PDF Medical Reports",
      "Priority AI Processing (Faster)",
      "24/7 Premium Support",
      "Advanced Disease Analysis",
    ],
    buttonText: "Upgrade to Pro",
    premium: true,
  },
];

export default function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This opens the payment modal when they click "Upgrade to Pro"
  const handleUpgradeClick = () => {
    setIsModalOpen(true);
  };

  // This is called AFTER the user "pays" inside the PaymentModal
  const handleFinalConfirm = async () => {
    try {
      const res = await fetch("/api/upgrade", { method: "POST" });
      if (res.ok) {
        setIsModalOpen(false);
        alert("Subscription Successful! Welcome to Pro.");
        window.location.href = "/dashboard";
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Assuming user starts as free tier on this page */}
      <Sidebar isPremium={false} />

      <main className="flex-1 mt-10 pt-20 ml-64 p-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Choose the plan that fits your health needs. Upgrade or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative p-8 rounded-[3rem] border transition-all duration-300 bg-white ${
                plan.premium 
                ? "border-blue-600 shadow-2xl shadow-blue-100 scale-105" 
                : "border-slate-100 shadow-sm"
              }`}
            >
              {plan.premium && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Sparkles size={12} /> MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">${plan.price}</span>
                <span className="text-slate-400 font-medium">/month</span>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${plan.premium ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}`}>
                      <Check size={14} />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Updated Button logic: Premium triggers Modal, Free is disabled */}
              <Button 
                onClick={plan.premium ? handleUpgradeClick : undefined}
                className={`w-full py-7 rounded-2xl font-bold text-lg transition-all ${
                  plan.premium 
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200" 
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
                disabled={!plan.premium}
              >
                {plan.buttonText} {plan.premium && <ArrowRight className="ml-2" size={20} />}
              </Button>
            </div>
          ))}
        </div>
        
        <p className="mt-12 text-slate-400 text-sm">
          Secure payment processing by Stripe. Use card <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-bold">4242...</code> for testing.
        </p>
      </main>

      {/* The Payment Card Popup */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleFinalConfirm} 
      />
    </div>
  );
}