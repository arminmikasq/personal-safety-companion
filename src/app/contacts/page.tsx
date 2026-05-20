"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Phone, Trash2, Send, X, Star } from "lucide-react";
import NavBar from "@/components/NavBar";
import { useStore } from "@/store/app";

export default function ContactsPage() {
  const { contacts, addContact, removeContact } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [testSent, setTestSent] = useState<string | null>(null);

  const handleAdd = () => {
    if (!name || !phone) return;
    addContact({ id: `c_${Date.now()}`, name, phone, relationship, priority, lastNotifiedAt: null });
    setName(""); setPhone(""); setShowAdd(false);
  };

  const sendTest = (id: string) => { setTestSent(id); setTimeout(() => setTestSent(null), 3000); };

  return (
    <main className="min-h-dvh bg-surface pb-24">
      <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Trusted Contacts</h1>
            <p className="text-xs text-gray-500 mt-0.5">People who receive your emergency alerts</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="w-10 h-10 rounded-xl bg-location-blue flex items-center justify-center text-white">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-5 space-y-3">
        {contacts.map((c) => (
          <motion.div key={c.id} layout className="card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-location-blue-light flex items-center justify-center text-lg font-semibold text-location-blue">{c.name[0]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                  {c.priority === "high" && <Star className="w-3.5 h-3.5 text-warn-orange fill-warn-orange" />}
                </div>
                <div className="text-xs text-gray-500">{c.relationship} · {c.phone}</div>
                {c.lastNotifiedAt && <div className="text-[10px] text-gray-400 mt-0.5">Last notified: {new Date(c.lastNotifiedAt).toLocaleDateString()}</div>}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <a href={`tel:${c.phone}`} className="btn-ghost flex-1 py-2 text-xs"><Phone className="w-3.5 h-3.5" /> Call</a>
              <button onClick={() => sendTest(c.id)} className="btn-primary flex-1 py-2 text-xs">
                {testSent === c.id ? <><Send className="w-3.5 h-3.5" /> Sent!</> : <><Send className="w-3.5 h-3.5" /> Test Alert</>}
              </button>
              <button onClick={() => removeContact(c.id)} className="p-2 rounded-lg bg-safety-red-light text-safety-red"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </motion.div>
        ))}

        {contacts.length === 0 && (
          <div className="card text-center py-8">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <div className="text-sm font-medium text-gray-900">No contacts yet</div>
            <div className="text-xs text-gray-500 mt-1">Add trusted people who should receive your alerts.</div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/30 flex items-end justify-center" onClick={() => setShowAdd(false)}>
            <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }} className="bg-white rounded-t-2xl w-full max-w-lg p-5" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Add Contact</h2>
                <button onClick={() => setShowAdd(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <div className="space-y-3">
                <div><label className="text-xs text-gray-500 mb-1 block">Name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" /></div>
                <div><label className="text-xs text-gray-500 mb-1 block">Phone</label><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1-555-0000" /></div>
                <div><label className="text-xs text-gray-500 mb-1 block">Relationship</label>
                  <div className="flex gap-2">{["Family","Partner","Friend","Colleague"].map((r) => (<button key={r} onClick={() => setRelationship(r)} className={`flex-1 py-2 rounded-lg text-xs font-medium ${relationship === r ? "bg-location-blue text-white" : "bg-gray-100 text-gray-600"}`}>{r}</button>))}</div>
                </div>
                <div><label className="text-xs text-gray-500 mb-1 block">Priority</label>
                  <div className="flex gap-2">{(["high","medium","low"] as const).map((p) => (<button key={p} onClick={() => setPriority(p)} className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize ${priority === p ? "bg-location-blue text-white" : "bg-gray-100 text-gray-600"}`}>{p}</button>))}</div>
                </div>
                <button onClick={handleAdd} className="btn-primary w-full py-3 text-sm mt-2">Add Contact</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <NavBar />
    </main>
  );
}
