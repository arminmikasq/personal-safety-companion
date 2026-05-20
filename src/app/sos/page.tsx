"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, Phone, CheckCircle, AlertTriangle } from "lucide-react";
import { useStore } from "@/store/app";

const COUNTDOWN = 5;

export default function SOSPage() {
  const router = useRouter();
  const { contacts, setSosActive, sosCountdown, setSosCountdown, addHistoryEvent } = useStore();

  const [phase, setPhase] = useState<"idle" | "countdown" | "sent">("idle");

  const startSOS = useCallback(() => {
    setPhase("countdown");
    setSosCountdown(COUNTDOWN);
    setSosActive(true);
  }, [setSosCountdown, setSosActive]);

  const cancelSOS = useCallback(() => {
    setPhase("idle");
    setSosActive(false);
    setSosCountdown(0);
  }, [setSosActive, setSosCountdown]);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (sosCountdown <= 0) {
      setPhase("sent");
      addHistoryEvent({
        id: `h_${Date.now()}`, type: "sos", title: "SOS Alert Sent",
        description: "Emergency alert sent to " + contacts.map((c) => c.name).join(", "),
        timestamp: new Date().toISOString(), location: "Market St & 5th St, San Francisco", status: "alerted",
      });
      return;
    }
    const timer = setTimeout(() => setSosCountdown(sosCountdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, sosCountdown, setSosCountdown, contacts, addHistoryEvent]);

  return (
    <main className="min-h-dvh bg-white flex flex-col">
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center px-5">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Emergency SOS</h1>
              <p className="text-gray-500 text-sm max-w-xs">Press the button below to send an emergency alert to your trusted contacts.</p>
            </div>
            <button onClick={startSOS} className="w-48 h-48 rounded-full bg-safety-red flex items-center justify-center shadow-lg shadow-safety-red/20 hover:bg-red-700 active:scale-95 transition-all">
              <div className="text-center">
                <Shield className="w-12 h-12 text-white mx-auto mb-1" />
                <div className="text-white font-bold text-xl">SOS</div>
              </div>
            </button>
            <p className="text-xs text-gray-400 mt-6 max-w-xs text-center">Hold for 5 seconds or tap to start countdown. Your contacts will receive your location.</p>
            <button onClick={() => router.back()} className="btn-ghost mt-8 px-6 py-2.5 text-sm">Cancel</button>
          </motion.div>
        )}

        {phase === "countdown" && (
          <motion.div key="countdown" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex-1 flex flex-col items-center justify-center px-5 bg-safety-red-light">
            <div className="text-center mb-8">
              <AlertTriangle className="w-10 h-10 text-safety-red mx-auto mb-3" />
              <h1 className="text-2xl font-bold text-safety-red mb-2">Sending SOS Alert</h1>
              <p className="text-gray-600 text-sm">Alert will be sent to {contacts.length} contacts</p>
            </div>
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#FFEBEE" strokeWidth="6" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E53935" strokeWidth="6" strokeDasharray="251" strokeDashoffset={251 - (251 * (COUNTDOWN - sosCountdown)) / COUNTDOWN} strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-safety-red">{sosCountdown}</span>
              </div>
            </div>
            <button onClick={cancelSOS} className="mt-8 btn-ghost px-8 py-3 text-sm border-safety-red/30 text-safety-red hover:bg-safety-red-light">
              <X className="w-4 h-4" /> Cancel Alert
            </button>
          </motion.div>
        )}

        {phase === "sent" && (
          <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center px-5">
            <CheckCircle className="w-16 h-16 text-safe-green mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Alert Sent!</h1>
            <p className="text-gray-500 text-sm text-center max-w-xs mb-6">Your trusted contacts have been notified with your location.</p>
            <div className="card w-full max-w-xs mb-6">
              <div className="text-xs text-gray-400 mb-2">MESSAGE SENT</div>
              <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                &ldquo;I need help. This is my current location: Market St & 5th St, San Francisco. Please contact me or emergency services.&rdquo;
              </div>
            </div>
            <div className="card w-full max-w-xs mb-6">
              <div className="text-xs text-gray-400 mb-2">CONTACTS NOTIFIED</div>
              {contacts.map((c) => (
                <div key={c.id} className="flex items-center gap-2 py-1.5">
                  <CheckCircle className="w-4 h-4 text-safe-green" />
                  <span className="text-sm text-gray-700">{c.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">{c.phone}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 w-full max-w-xs">
              <a href="tel:911" className="btn-sos flex-1 py-3 text-sm rounded-xl"><Phone className="w-4 h-4" /> Call 911</a>
              <button onClick={() => router.push("/dashboard")} className="btn-safe flex-1 py-3 text-sm rounded-xl">I&apos;m Safe</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
