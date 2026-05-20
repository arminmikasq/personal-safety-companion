"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Save, MapPin, Clock, AlertTriangle } from "lucide-react";
import NavBar from "@/components/NavBar";
import { useStore } from "@/store/app";

export default function EvidencePage() {
  const { isRecording, setIsRecording, recordingDuration, setRecordingDuration, addHistoryEvent } = useStore();
  const [saved, setSaved] = useState(false);
  const [audioLevel, setAudioLevel] = useState<number[]>(Array(20).fill(2));

  useEffect(() => {
    if (!isRecording) return;
    const timer = setInterval(() => setRecordingDuration(recordingDuration + 1), 1000);
    return () => clearInterval(timer);
  }, [isRecording, recordingDuration, setRecordingDuration]);

  useEffect(() => {
    if (!isRecording) return;
    const timer = setInterval(() => {
      setAudioLevel((prev) => [...prev.slice(1), Math.random() * 20 + 2]);
    }, 150);
    return () => clearInterval(timer);
  }, [isRecording]);

  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = s % 60; return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`; };

  const startRecording = () => { setIsRecording(true); setRecordingDuration(0); setSaved(false); };
  const stopRecording = () => { setIsRecording(false); };

  const saveEvidence = () => {
    setIsRecording(false);
    setSaved(true);
    addHistoryEvent({
      id: `h_${Date.now()}`, type: "evidence", title: "Evidence Recorded",
      description: `Audio recording (${fmt(recordingDuration)}) saved with location metadata.`,
      timestamp: new Date().toISOString(), location: "Market St & 5th St, SF", status: "resolved",
    });
    setRecordingDuration(0);
  };

  return (
    <main className="min-h-dvh bg-surface pb-24">
      <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-gray-900">Evidence Recording</h1>
          <p className="text-xs text-gray-500 mt-0.5">Record audio evidence during emergencies</p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-5 space-y-4">
        {isRecording && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-safety-red-light border border-safety-red/20 rounded-xl px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-safety-red animate-pulse" />
            <span className="text-xs font-semibold text-safety-red">EMERGENCY RECORDING</span>
          </motion.div>
        )}

        <div className="card text-center py-8">
          {isRecording ? (
            <>
              <div className="text-5xl font-bold font-mono text-gray-900 mb-4">{fmt(recordingDuration)}</div>
              <div className="flex items-end justify-center gap-1 h-16 mb-4">
                {audioLevel.map((h, i) => (
                  <motion.div key={i} className="w-2 bg-safety-red rounded-full" animate={{ height: h }} transition={{ duration: 0.15 }} />
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-6">
                <MapPin className="w-3 h-3" /> Market St & 5th St, SF
                <Clock className="w-3 h-3 ml-2" /> {new Date().toLocaleTimeString()}
              </div>
            </>
          ) : saved ? (
            <>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Save className="w-16 h-16 text-safe-green mx-auto mb-3" /></motion.div>
              <div className="text-lg font-bold text-gray-900 mb-1">Evidence Saved</div>
              <div className="text-sm text-gray-500">Recording saved with location & timestamp metadata.</div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-warn-orange-light flex items-center justify-center mx-auto mb-4">
                <Mic className="w-10 h-10 text-warn-orange" />
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">Audio Evidence</div>
              <div className="text-sm text-gray-500">Tap to start recording. Location and time will be attached automatically.</div>
            </>
          )}
        </div>

        {!isRecording && !saved && (
          <button onClick={startRecording} className="btn-sos w-full py-4 text-base rounded-2xl">
            <Mic className="w-5 h-5" /> Start Recording
          </button>
        )}
        {isRecording && (
          <div className="flex gap-3">
            <button onClick={stopRecording} className="btn-ghost flex-1 py-3 text-sm"><Square className="w-4 h-4" /> Stop</button>
            <button onClick={saveEvidence} className="btn-safe flex-1 py-3 text-sm"><Save className="w-4 h-4" /> Save Evidence</button>
          </div>
        )}
        {saved && (
          <button onClick={() => setSaved(false)} className="btn-primary w-full py-3 text-sm">Record Another</button>
        )}

        <div className="card bg-warn-orange-light border border-warn-orange/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-warn-orange mt-0.5 shrink-0" />
            <div className="text-xs text-gray-600">
              <strong>Privacy Note:</strong> Recordings are stored locally on your device. Location and time metadata are attached for evidence purposes.
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </main>
  );
}
