"use client";
import { useState } from "react";
import { Clock, MapPin, Bell, Shield, Trash2, Info, ChevronRight } from "lucide-react";
import NavBar from "@/components/NavBar";

export default function SettingsPage() {
  const [countdown, setCountdown] = useState(5);
  const [autoRecord, setAutoRecord] = useState(true);
  const [shareDuration, setShareDuration] = useState(30);
  const [notifications, setNotifications] = useState(true);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)} className={`w-11 h-6 rounded-full transition-colors relative ${value ? "bg-location-blue" : "bg-gray-200"}`}>
      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform absolute top-0.5 ${value ? "translate-x-5.5 left-0.5" : "left-0.5"}`} />
    </button>
  );

  return (
    <main className="min-h-dvh bg-surface pb-24">
      <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-gray-900">Settings</h1>
          <p className="text-xs text-gray-500 mt-0.5">Customize your safety preferences</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-5 space-y-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-3"><Clock className="w-4 h-4 text-location-blue" /><span className="text-xs font-semibold text-gray-400 uppercase">Emergency</span></div>
          <div className="flex items-center justify-between py-2">
            <div><div className="text-sm font-medium text-gray-900">SOS Countdown</div><div className="text-xs text-gray-500">Seconds before alert is sent</div></div>
            <div className="flex gap-1.5">{[3, 5, 10].map((s) => (<button key={s} onClick={() => setCountdown(s)} className={`w-10 h-8 rounded-lg text-xs font-medium ${countdown === s ? "bg-location-blue text-white" : "bg-gray-100 text-gray-600"}`}>{s}s</button>))}</div>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-gray-50">
            <div><div className="text-sm font-medium text-gray-900">Auto-Record on SOS</div><div className="text-xs text-gray-500">Start recording when SOS triggers</div></div>
            <Toggle value={autoRecord} onChange={setAutoRecord} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-3"><MapPin className="w-4 h-4 text-safe-green" /><span className="text-xs font-semibold text-gray-400 uppercase">Location</span></div>
          <div className="flex items-center justify-between py-2">
            <div><div className="text-sm font-medium text-gray-900">Default Share Duration</div><div className="text-xs text-gray-500">How long to share location by default</div></div>
            <div className="flex gap-1.5">{[15, 30, 60].map((d) => (<button key={d} onClick={() => setShareDuration(d)} className={`px-3 h-8 rounded-lg text-xs font-medium ${shareDuration === d ? "bg-location-blue text-white" : "bg-gray-100 text-gray-600"}`}>{d}m</button>))}</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-3"><Bell className="w-4 h-4 text-warn-orange" /><span className="text-xs font-semibold text-gray-400 uppercase">Notifications</span></div>
          <div className="flex items-center justify-between py-2">
            <div><div className="text-sm font-medium text-gray-900">Push Notifications</div><div className="text-xs text-gray-500">Receive safety alerts and reminders</div></div>
            <Toggle value={notifications} onChange={setNotifications} />
          </div>
        </div>

        <div className="card bg-location-blue-light border border-location-blue/20">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-location-blue mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">Privacy</div>
              <div className="text-xs text-gray-600">Your safety data stays private. Location is only shared during active safety sessions. You control who receives alerts and when.</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-3"><Info className="w-4 h-4 text-gray-400" /><span className="text-xs font-semibold text-gray-400 uppercase">About</span></div>
          <div className="space-y-2">
            {["App Version: 1.0.0 MVP", "Built for Xiaomi Hackathon", "Made with care for your safety"].map((t) => (
              <div key={t} className="text-xs text-gray-500">{t}</div>
            ))}
          </div>
        </div>

        <button className="card w-full flex items-center justify-between text-left hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2"><Trash2 className="w-4 h-4 text-safety-red" /><span className="text-sm font-medium text-safety-red">Delete All Data</span></div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <NavBar />
    </main>
  );
}
