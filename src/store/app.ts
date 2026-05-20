import { create } from "zustand";
import { mockContacts, mockHistory, mockMedicalID, mockUser, type TrustedContact, type IncidentEvent, type MedicalID } from "@/data/mock";

type AppState = {
  user: typeof mockUser;
  contacts: TrustedContact[];
  history: IncidentEvent[];
  medicalID: MedicalID;
  sosActive: boolean;
  sosCountdown: number;
  safeWalkActive: boolean;
  safeWalkEta: number | null;
  locationSharing: boolean;
  locationDuration: number;
  isRecording: boolean;
  recordingDuration: number;
  onboardingStep: number;
  onboardingComplete: boolean;

  setSosActive: (v: boolean) => void;
  setSosCountdown: (v: number) => void;
  setSafeWalkActive: (v: boolean) => void;
  setSafeWalkEta: (v: number | null) => void;
  setLocationSharing: (v: boolean) => void;
  setLocationDuration: (v: number) => void;
  setIsRecording: (v: boolean) => void;
  setRecordingDuration: (v: number) => void;
  setOnboardingStep: (v: number) => void;
  setOnboardingComplete: (v: boolean) => void;
  addContact: (c: TrustedContact) => void;
  removeContact: (id: string) => void;
  addHistoryEvent: (e: IncidentEvent) => void;
  updateMedicalID: (m: Partial<MedicalID>) => void;
};

export const useStore = create<AppState>((set) => ({
  user: mockUser, contacts: mockContacts, history: mockHistory, medicalID: mockMedicalID,
  sosActive: false, sosCountdown: 0, safeWalkActive: false, safeWalkEta: null,
  locationSharing: false, locationDuration: 30, isRecording: false, recordingDuration: 0,
  onboardingStep: 0, onboardingComplete: false,

  setSosActive: (v) => set({ sosActive: v }),
  setSosCountdown: (v) => set({ sosCountdown: v }),
  setSafeWalkActive: (v) => set({ safeWalkActive: v }),
  setSafeWalkEta: (v) => set({ safeWalkEta: v }),
  setLocationSharing: (v) => set({ locationSharing: v }),
  setLocationDuration: (v) => set({ locationDuration: v }),
  setIsRecording: (v) => set({ isRecording: v }),
  setRecordingDuration: (v) => set({ recordingDuration: v }),
  setOnboardingStep: (v) => set({ onboardingStep: v }),
  setOnboardingComplete: (v) => set({ onboardingComplete: v }),
  addContact: (c) => set((s) => ({ contacts: [...s.contacts, c] })),
  removeContact: (id) => set((s) => ({ contacts: s.contacts.filter((c) => c.id !== id) })),
  addHistoryEvent: (e) => set((s) => ({ history: [e, ...s.history] })),
  updateMedicalID: (m) => set((s) => ({ medicalID: { ...s.medicalID, ...m } })),
}));
