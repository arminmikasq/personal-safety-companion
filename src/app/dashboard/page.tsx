"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, MapPin, Timer, Camera, Share2, Clock, ChevronRight, Bell } from "lucide-react";
import NavBar from "@/components/NavBar";
import { useStore } from "@/store/app";

export default function DashboardPage() {
  const router = useRouter();
  const { user, contacts, safeWalkActive } = useStore();
  const [time, setTime] = useState("");

  useEffect(() => { setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })); }, []);

  const quickActions = [
    { icon: Timer, label: "Safe Walk", desc: "Start monitored walk", color: "bg-safe-green-light text-safe-green", href: "/safe-walk" },
    { icon: Share2, label: "Share Location", desc: "Send live position", color: "bg-location-blue-light text-location-blue", href: "/location" },
    { icon: Camera, label: "Record", desc: "Capture evidence", color: "bg-warn-orange-light text-warn-orange", href: "/evidence" },
    { icon: Clock, label: "Check In", desc: "Confirm you\'re safe", color: "bg-gray-100 text-gray-600", action: "checkin" },
  ];

  return (
    <main className="min-h-dvh bg-surface pb-24">
      <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Good evening</div>
            <div className="text-lg font-bold text-gray-900">{user.name}</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl bg-gray-50"><Bell className="w-5 h-5 text-gray-600" /></button>
            <div className="w-10 h-10 rounded-full bg-location-blue flex items-center justify-center text-white font-semibold text-sm">{user.avatar}</div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-5 space-y-4">
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="card-elevated text-center bg-safe-green-light border border-safe-green/20">
          <div className="w-12 h-12 rounded-full bg-safe-green/10 flex items-center justify-center mx-auto mb-2">
            <Shield className="w-6 h-6 text-safe-green" />
          </div>
          <div className="text-lg font-bold text-safe-green">You&apos;re Safe</div>
          <div className="text-xs text-gray-500 mt-1">Last updated: {time}</div>
        </motion.div>

        <div className="card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-location-blue-light flex items-center justify-center">
            <MapPin className="w-5 h-5 text-location-blue" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500">Current Location</div>
            <div className="text-sm font-medium text-gray-900">{user.currentLocation.address}</div>
          </div>
        </div>

        <button onClick={() => router.push("/sos")} className="btn-sos w-full py-4 text-lg rounded-2xl animate-pulse-sos">
          <Shield className="w-6 h-6" /> SOS Emergency
        </button>

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Actions</div>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.label} onClick={() => a.href ? router.push(a.href) : alert("Checked in! You\'re safe.")} className={`card text-left hover:shadow-md transition-shadow`}>
                <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-gray-900 text-sm">{a.label}</div>
                <div className="text-xs text-gray-500">{a.desc}</div>
              </button>
            );
          })}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Trusted Contacts</div>
            <button onClick={() => router.push("/contacts")} className="text-xs text-location-blue font-medium">View All</button>
          </div>
          <div className="flex items-center gap-3">
            {contacts.slice(0, 3).map((c) => (
              <div key={c.id} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-location-blue-light flex items-center justify-center text-xs font-semibold text-location-blue">{c.name[0]}</div>
                <span className="text-[10px] text-gray-500">{c.name.split(" ")[0]}</span>
              </div>
            ))}
            <button onClick={() => router.push("/contacts")} className="w-10 h-10 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">+</span>
            </button>
          </div>
        </div>

        {safeWalkActive && (
          <button onClick={() => router.push("/safe-walk")} className="card w-full bg-safe-green-light border border-safe-green/20 flex items-center gap-3 text-left">
            <Timer className="w-5 h-5 text-safe-green" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">Safe Walk Active</div>
              <div className="text-xs text-gray-500">Tap to view details</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      <NavBar />
    </main>
  );
}
