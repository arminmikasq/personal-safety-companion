import Link from "next/link";
import { Shield, MapPin, Timer, Camera, Heart, Users, ChevronRight } from "lucide-react";

export default function HomePage() {
  const features = [
    { icon: Shield, title: "SOS Alert", desc: "One-tap emergency alert to trusted contacts", color: "text-safety-red" },
    { icon: MapPin, title: "Live Location", desc: "Share real-time location with loved ones", color: "text-location-blue" },
    { icon: Timer, title: "Safe Walk", desc: "Timer-based walk monitoring with auto-alerts", color: "text-safe-green" },
    { icon: Camera, title: "Evidence", desc: "Record audio evidence during emergencies", color: "text-warn-orange" },
    { icon: Heart, title: "Medical ID", desc: "Critical health info for first responders", color: "text-safety-red" },
    { icon: Users, title: "Trusted Circle", desc: "Manage contacts who receive your alerts", color: "text-location-blue" },
  ];

  return (
    <main className="min-h-dvh bg-white">
      <section className="bg-gradient-to-b from-location-blue-light via-white to-white pt-14 pb-10 px-5">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-location-blue/10 flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-location-blue" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Feel safer<br />wherever you go.
          </h1>
          <p className="text-gray-500 mt-3 text-sm max-w-xs mx-auto">
            A mobile-first safety companion for SOS alerts, live location sharing, safe-walk check-ins, and emergency evidence.
          </p>
          <Link href="/onboarding" className="btn-primary mt-6 inline-flex items-center gap-2 px-8 py-3.5 text-base">
            Start Safety Check <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="max-w-lg mx-auto px-5 py-8">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">Key Features</div>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card">
                <Icon className={`w-6 h-6 ${f.color} mb-2`} />
                <div className="font-semibold text-gray-900 text-sm">{f.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{f.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-lg mx-auto px-5 pb-8">
        <div className="card-elevated bg-safe-green-light border border-safe-green/20 text-center py-6">
          <p className="text-sm text-gray-600 italic">
            &ldquo;Your safety data stays private. You control when location is shared and who receives alerts.&rdquo;
          </p>
        </div>
      </section>

      <section className="max-w-lg mx-auto px-5 pb-24">
        <Link href="/dashboard" className="btn-ghost w-full py-3 text-sm">
          Skip to Dashboard Demo
        </Link>
      </section>
    </main>
  );
}
