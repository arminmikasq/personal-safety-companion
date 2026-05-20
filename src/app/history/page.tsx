"use client";
import { motion } from "framer-motion";
import { Shield, MapPin, Camera, Clock, Timer, CheckCircle } from "lucide-react";
import NavBar from "@/components/NavBar";
import { useStore } from "@/store/app";

const icons: Record<string, typeof Shield> = { sos: Shield, safe_walk: Timer, location_share: MapPin, evidence: Camera, check_in: Clock };
const colors: Record<string, string> = { sos: "bg-safety-red-light text-safety-red", safe_walk: "bg-safe-green-light text-safe-green", location_share: "bg-location-blue-light text-location-blue", evidence: "bg-warn-orange-light text-warn-orange", check_in: "bg-gray-100 text-gray-600" };
const statusBadge: Record<string, { cls: string; label: string }> = { resolved: { cls: "badge-safe", label: "Resolved" }, active: { cls: "badge-info", label: "Active" }, alerted: { cls: "badge-danger", label: "Alert Sent" } };

export default function HistoryPage() {
  const { history } = useStore();

  return (
    <main className="min-h-dvh bg-surface pb-24">
      <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-gray-900">Safety History</h1>
          <p className="text-xs text-gray-500 mt-0.5">Timeline of your safety events</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-5">
        {history.length === 0 ? (
          <div className="card text-center py-12">
            <CheckCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <div className="text-sm font-medium text-gray-900">No events yet</div>
            <div className="text-xs text-gray-500 mt-1">Your safety activities will appear here.</div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100" />
            <div className="space-y-4">
              {history.map((e, i) => {
                const Icon = icons[e.type] || Shield;
                const color = colors[e.type] || "bg-gray-100 text-gray-600";
                const badge = statusBadge[e.status];
                return (
                  <motion.div key={e.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="relative pl-12">
                    <div className={`absolute left-2.5 w-5 h-5 rounded-full ${color} flex items-center justify-center`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="card">
                      <div className="flex items-start justify-between mb-1">
                        <div className="font-semibold text-gray-900 text-sm">{e.title}</div>
                        <span className={`badge ${badge.cls}`}>{badge.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{e.description}</p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(e.timestamp).toLocaleString()}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <NavBar />
    </main>
  );
}
