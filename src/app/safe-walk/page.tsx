"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, MapPin, CheckCircle, AlertTriangle, Users, X } from "lucide-react";
import { useStore } from "@/store/app";

export default function SafeWalkPage() {
  const router = useRouter();
  const { contacts, setSafeWalkActive, setSafeWalkEta, addHistoryEvent } = useStore();
  const [phase, setPhase] = useState<"setup" | "active" | "arrived" | "alert">("setup");
  const [destination, setDestination] = useState("Home");
  const [etaMinutes, setEtaMinutes] = useState(25);
  const [remaining, setRemaining] = useState(0);


  const startWalk = useCallback(() => {
    setSafeWalkActive(true);
    setSafeWalkEta(etaMinutes);
    setRemaining(etaMinutes * 60);
    setPhase("active");
  }, [etaMinutes, setSafeWalkActive, setSafeWalkEta]);

  useEffect(() => {
    if (phase !== "active" || remaining <= 0) return;
    const timer = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, remaining]);

  useEffect(() => {
    if (remaining <= 0 && phase === "active") {
      setPhase("alert");
      addHistoryEvent({
        id: `h_${Date.now()}`, type: "safe_walk", title: "Safe Walk — Timer Expired",
        description: "Auto-alert sent to contacts. Destination: " + destination,
        timestamp: new Date().toISOString(), location: "En route to " + destination, status: "alerted",
      });
    }
  }, [remaining, phase, destination, addHistoryEvent]);

  const markSafe = () => {
    setPhase("arrived");
    setSafeWalkActive(false);
    setSafeWalkEta(null);
    addHistoryEvent({
      id: `h_${Date.now()}`, type: "safe_walk", title: "Safe Walk Completed",
      description: "Arrived safely at " + destination,
      timestamp: new Date().toISOString(), location: destination, status: "resolved",
    });
  };

  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = s % 60; return `${m}:${sec.toString().padStart(2, "0")}`; };

  return (
    <main className="min-h-dvh bg-surface">
      <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-gray-900">Safe Walk</h1>
          <p className="text-xs text-gray-500 mt-0.5">Share your journey with trusted contacts</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-5">
        <AnimatePresence mode="wait">
          {phase === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="card bg-location-blue-light border border-location-blue/20 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-location-blue shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">From</div>
                  <div className="text-sm font-medium text-gray-900">Market St & 5th St, SF</div>
                </div>
              </div>

              <div className="card">
                <label className="text-xs text-gray-500 mb-1 block">Destination</label>
                <input className="input" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where are you going?" />
              </div>

              <div className="card">
                <label className="text-xs text-gray-500 mb-2 block">Expected Arrival</label>
                <div className="flex gap-2">
                  {[15, 25, 45, 60].map((t) => (
                    <button key={t} onClick={() => setEtaMinutes(t)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${etaMinutes === t ? "bg-location-blue text-white" : "bg-gray-100 text-gray-600"}`}>
                      {t}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Contacts will be notified</span>
                </div>
                <div className="flex gap-2">
                  {contacts.map((c) => (
                    <div key={c.id} className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5">
                      <div className="w-6 h-6 rounded-full bg-location-blue-light flex items-center justify-center text-[10px] font-semibold text-location-blue">{c.name[0]}</div>
                      <span className="text-xs text-gray-700">{c.name.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={startWalk} className="btn-safe w-full py-3.5 text-base">
                <Timer className="w-5 h-5" /> Start Safe Walk
              </button>

              <p className="text-xs text-gray-400 text-center">If you don&apos;t check in on time, we&apos;ll automatically alert your contacts.</p>
            </motion.div>
          )}

          {phase === "active" && (
            <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="card bg-location-blue-light border border-location-blue/20 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-location-blue/10 flex items-center justify-center mx-auto mb-3">
                  <Timer className="w-8 h-8 text-location-blue" />
                </div>
                <div className="text-4xl font-bold text-location-blue font-mono">{fmt(remaining)}</div>
                <div className="text-sm text-gray-600 mt-1">Walking to {destination}</div>
                <div className="text-xs text-gray-400 mt-1">Auto-alert if timer expires</div>
              </div>

              <div className="card flex items-center gap-3">
                <MapPin className="w-5 h-5 text-safe-green" />
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Current Route</div>
                  <div className="text-sm font-medium text-gray-900">Market St → {destination}</div>
                </div>
                <span className="badge badge-safe">On Track</span>
              </div>

              <div className="flex items-center gap-2 px-1">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-safe-green rounded-full" initial={{ width: "0%" }} animate={{ width: `${((etaMinutes * 60 - remaining) / (etaMinutes * 60)) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500">{Math.round(((etaMinutes * 60 - remaining) / (etaMinutes * 60)) * 100)}%</span>
              </div>

              <button onClick={markSafe} className="btn-safe w-full py-4 text-lg rounded-2xl">
                <CheckCircle className="w-6 h-6" /> I&apos;m Safe — Arrived
              </button>

              <button onClick={() => { setSafeWalkActive(false); setSafeWalkEta(null); setPhase("setup"); setRemaining(0); }} className="btn-ghost w-full py-2.5 text-sm text-gray-500">
                <X className="w-4 h-4" /> Cancel Walk
              </button>
            </motion.div>
          )}

          {phase === "arrived" && (
            <motion.div key="arrived" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center pt-20">
              <CheckCircle className="w-20 h-20 text-safe-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re Safe!</h2>
              <p className="text-gray-500 text-sm mb-6">Arrived at {destination} successfully.</p>
              <button onClick={() => router.push("/dashboard")} className="btn-primary px-8 py-3 text-sm">Back to Dashboard</button>
            </motion.div>
          )}

          {phase === "alert" && (
            <motion.div key="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center pt-12">
              <AlertTriangle className="w-16 h-16 text-warn-orange mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Timer Expired!</h2>
              <p className="text-gray-500 text-sm mb-4">Auto-alert sent to your trusted contacts.</p>
              <div className="card mb-4 text-left">
                <div className="text-xs text-gray-400 mb-2">ALERT MESSAGE SENT</div>
                <div className="text-sm text-gray-700 bg-warn-orange-light rounded-lg p-3">
                  &ldquo;Sarah hasn&apos;t arrived at {destination}. Last known location: Market St & 5th St, SF. Please check on her.&rdquo;
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={markSafe} className="btn-safe flex-1 py-3 text-sm rounded-xl">I&apos;m OK Now</button>
                <button onClick={() => router.push("/sos")} className="btn-sos flex-1 py-3 text-sm rounded-xl">Full SOS</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
