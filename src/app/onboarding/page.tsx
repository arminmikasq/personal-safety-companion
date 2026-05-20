"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MapPin, Heart, ChevronRight, Check } from "lucide-react";

const steps = [
  { icon: Users, title: "Add Trusted Contacts", desc: "Choose people who will receive your emergency alerts.", color: "text-location-blue", bg: "bg-location-blue-light" },
  { icon: MapPin, title: "Enable Location", desc: "Allow location access so we can share your position during emergencies.", color: "text-safe-green", bg: "bg-safe-green-light" },
  { icon: Heart, title: "Set Emergency Profile", desc: "Add your medical info for first responders.", color: "text-safety-red", bg: "bg-safety-red-light" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const s = steps[step];
  const Icon = s.icon;

  return (
    <main className="min-h-dvh bg-white flex flex-col">
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i <= step ? "w-8 bg-location-blue" : "w-4 bg-gray-200"}`} />
          ))}
        </div>
        <button onClick={() => router.push("/dashboard")} className="text-sm text-gray-400">Skip</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="text-center">
            <div className={`w-20 h-20 rounded-3xl ${s.bg} flex items-center justify-center mx-auto mb-6`}>
              <Icon className={`w-10 h-10 ${s.color}`} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h2>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">{s.desc}</p>

            {step === 0 && (
              <div className="mt-6 space-y-2">
                {["Mom", "David Park", "Emma Wilson"].map((n) => (
                  <div key={n} className="card flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-location-blue-light flex items-center justify-center text-sm font-semibold text-location-blue">{n[0]}</div>
                      <span className="text-sm font-medium text-gray-900">{n}</span>
                    </div>
                    <Check className="w-5 h-5 text-safe-green" />
                  </div>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="mt-6">
                <div className="card bg-safe-green-light border border-safe-green/20 text-center py-6">
                  <MapPin className="w-8 h-8 text-safe-green mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Location Access Granted</div>
                  <div className="text-xs text-gray-500 mt-1">Used only during safety sessions</div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="mt-6 space-y-2 text-left">
                {["Name: Sarah Chen", "Blood Type: O+", "Allergies: Penicillin, Peanuts"].map((f) => (
                  <div key={f} className="card text-sm text-gray-700">{f}</div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-5 pb-24">
        <button onClick={() => step < 2 ? setStep(step + 1) : router.push("/dashboard")} className="btn-primary w-full py-3.5 text-base">
          {step < 2 ? <><span>Continue</span><ChevronRight className="w-5 h-5" /></> : "Get Started"}
        </button>
      </div>
    </main>
  );
}
