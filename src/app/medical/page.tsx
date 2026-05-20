"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Droplets, AlertTriangle, Pill, Phone, QrCode, Edit3, Save } from "lucide-react";
import NavBar from "@/components/NavBar";
import { useStore } from "@/store/app";

export default function MedicalPage() {
  const { medicalID, updateMedicalID } = useStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(medicalID);
  const [showQR, setShowQR] = useState(false);

  const save = () => { updateMedicalID(form); setEditing(false); };

  return (
    <main className="min-h-dvh bg-surface pb-24">
      <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Medical ID</h1>
            <p className="text-xs text-gray-500 mt-0.5">Critical info for first responders</p>
          </div>
          <button onClick={() => editing ? save() : setEditing(true)} className="p-2 rounded-xl bg-gray-50">
            {editing ? <Save className="w-5 h-5 text-safe-green" /> : <Edit3 className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-5 space-y-4">
        <div className="card bg-safety-red-light border border-safety-red/20 text-center py-6">
          <Heart className="w-10 h-10 text-safety-red mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-900">{medicalID.fullName}</div>
          <div className="text-sm text-gray-600">Age {medicalID.age} · Blood Type {medicalID.bloodType}</div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2"><Droplets className="w-4 h-4 text-safety-red" /><span className="text-xs font-semibold text-gray-400 uppercase">Blood Type</span></div>
          {editing ? <input className="input" value={form.bloodType} onChange={(e) => setForm({...form, bloodType: e.target.value})} /> : <div className="text-2xl font-bold text-safety-red">{medicalID.bloodType}</div>}
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-warn-orange" /><span className="text-xs font-semibold text-gray-400 uppercase">Allergies</span></div>
          <div className="flex flex-wrap gap-2">
            {medicalID.allergies.map((a) => <span key={a} className="badge badge-danger">{a}</span>)}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2"><Heart className="w-4 h-4 text-location-blue" /><span className="text-xs font-semibold text-gray-400 uppercase">Conditions</span></div>
          <div className="flex flex-wrap gap-2">
            {medicalID.conditions.map((c) => <span key={c} className="badge badge-warning">{c}</span>)}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2"><Pill className="w-4 h-4 text-safe-green" /><span className="text-xs font-semibold text-gray-400 uppercase">Medications</span></div>
          <div className="flex flex-wrap gap-2">
            {medicalID.medications.map((m) => <span key={m} className="badge badge-info">{m}</span>)}
          </div>
        </div>

        <div className="card">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Emergency Notes</div>
          <p className="text-sm text-gray-700">{medicalID.emergencyNotes}</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2"><Phone className="w-4 h-4 text-location-blue" /><span className="text-xs font-semibold text-gray-400 uppercase">Emergency Contact</span></div>
          <div className="text-sm font-medium text-gray-900">{medicalID.emergencyContact.name}</div>
          <div className="text-xs text-gray-500">{medicalID.emergencyContact.phone}</div>
        </div>

        <button onClick={() => setShowQR(!showQR)} className="btn-ghost w-full py-3 text-sm">
          <QrCode className="w-4 h-4" /> {showQR ? "Hide" : "Show"} QR Code
        </button>

        {showQR && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card text-center py-6">
            <div className="w-40 h-40 bg-gray-100 rounded-xl mx-auto flex items-center justify-center mb-3">
              <div className="grid grid-cols-8 gap-0.5 w-32 h-32">
                {Array(64).fill(0).map((_, i) => (<div key={i} className={`rounded-sm ${Math.random() > 0.5 ? "bg-gray-900" : "bg-white"}`} />))}
              </div>
            </div>
            <div className="text-xs text-gray-500">Scan for Medical ID info</div>
            <div className="text-[10px] text-gray-400 mt-1">First responders can scan this code</div>
          </motion.div>
        )}
      </div>
      <NavBar />
    </main>
  );
}
