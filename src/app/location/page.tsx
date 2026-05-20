"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Copy, CheckCircle } from "lucide-react";
import NavBar from "@/components/NavBar";
import { useStore } from "@/store/app";

export default function LocationPage() {
  const { contacts, locationSharing, setLocationSharing, locationDuration, setLocationDuration } = useStore();
  const [copied, setCopied] = useState(false);
  const mockLink = "https://safety.app/share/sarah-chen-abc123";

  const copyLink = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <main className="min-h-dvh bg-surface pb-24">
      <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-gray-900">Live Location</h1>
          <p className="text-xs text-gray-500 mt-0.5">Share your real-time position</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-5 space-y-4">
        <div className="card bg-location-blue-light border border-location-blue/20 overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-location-blue/5 to-location-blue/10 rounded-lg flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:"linear-gradient(rgba(66,165,245,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(66,165,245,0.1) 1px, transparent 1px)", backgroundSize:"30px 30px"}} />
            <div className="text-center z-10">
              <div className="w-12 h-12 rounded-full bg-location-blue flex items-center justify-center mx-auto mb-2 shadow-lg shadow-location-blue/30">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-900">Market St & 5th St</div>
              <div className="text-xs text-gray-500">San Francisco, CA</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="text-xs text-gray-500 mb-2">SHARE DURATION</div>
          <div className="flex gap-2">
            {[15, 30, 60].map((d) => (
              <button key={d} onClick={() => setLocationDuration(d)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${locationDuration === d ? "bg-location-blue text-white" : "bg-gray-100 text-gray-600"}`}>
                {d} min
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="text-xs text-gray-500 mb-2">SHARE LINK</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 truncate font-mono">{mockLink}</div>
            <button onClick={copyLink} className="p-2 rounded-lg bg-location-blue-light text-location-blue">
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="text-xs text-gray-500 mb-3">SHARING WITH</div>
          {contacts.map((c) => (
            <div key={c.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
              <div className="w-8 h-8 rounded-full bg-location-blue-light flex items-center justify-center text-xs font-semibold text-location-blue">{c.name[0]}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{c.name}</div>
                <div className="text-xs text-gray-400">{c.relationship}</div>
              </div>
              {locationSharing && <span className="badge badge-safe">Viewing</span>}
            </div>
          ))}
        </div>

        {!locationSharing ? (
          <button onClick={() => setLocationSharing(true)} className="btn-primary w-full py-3.5 text-base">
            <MapPin className="w-5 h-5" /> Start Sharing Location
          </button>
        ) : (
          <div className="space-y-3">
            <div className="card bg-safe-green-light border border-safe-green/20 text-center py-4">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <CheckCircle className="w-8 h-8 text-safe-green mx-auto mb-2" />
              </motion.div>
              <div className="text-sm font-semibold text-gray-900">Location Sharing Active</div>
              <div className="text-xs text-gray-500">For {locationDuration} minutes</div>
            </div>
            <button onClick={() => setLocationSharing(false)} className="btn-ghost w-full py-3 text-sm text-safety-red border-safety-red/20">
              Stop Sharing
            </button>
          </div>
        )}
      </div>
      <NavBar />
    </main>
  );
}
