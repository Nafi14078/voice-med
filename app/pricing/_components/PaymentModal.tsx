"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, Loader2 } from "lucide-react";

export default function PaymentModal({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Simulate network delay for "Processing Payment"
    setTimeout(() => {
      onConfirm();
      setLoading(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="text-blue-600" /> Secure Checkout
          </DialogTitle>
          <DialogDescription>
            Enter your card details to upgrade to Premium Pro.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="card">Card Number</Label>
            <div className="relative">
              <Input id="card" placeholder="4242 4242 4242 4242" className="pl-10 rounded-xl" maxLength={19} />
              <CreditCard className="absolute left-3 top-2.5 text-slate-400" size={18} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" className="rounded-xl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" className="rounded-xl" />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
            <Lock className="text-slate-400 mt-0.5" size={16} />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Your payment is encrypted and processed securely. You will be charged <span className="font-bold text-slate-900">$19.00/month</span>.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={handlePayment} 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-6 rounded-2xl font-bold text-lg shadow-lg shadow-blue-100"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
            ) : (
              "Pay $19.00 Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}