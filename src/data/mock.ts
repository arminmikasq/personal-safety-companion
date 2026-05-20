export interface TrustedContact {
  id: string; name: string; phone: string; relationship: string; priority: "high" | "medium" | "low"; lastNotifiedAt: string | null;
}

export interface SafetySession {
  id: string; type: "safe_walk" | "sos" | "location_share" | "check_in"; status: "active" | "completed" | "alert_sent"; startedAt: string; endedAt: string | null; destination?: string; eta?: string; contactsNotified: string[];
}

export interface IncidentEvent {
  id: string; type: "sos" | "safe_walk" | "location_share" | "evidence" | "check_in"; title: string; description: string; timestamp: string; location: string; status: "resolved" | "active" | "alerted";
}

export interface MedicalID {
  fullName: string; age: number; bloodType: string; allergies: string[]; conditions: string[]; medications: string[]; emergencyNotes: string; emergencyContact: { name: string; phone: string };
}

export const mockUser = { id: "u1", name: "Sarah Chen", avatar: "SC", phone: "+1-555-0123", safetyStatus: "safe" as const, currentLocation: { lat: 37.7749, lng: -122.4194, address: "Market St & 5th St, San Francisco" } };

export const mockContacts: TrustedContact[] = [
  { id: "c1", name: "Mom", phone: "+1-555-0100", relationship: "Family", priority: "high", lastNotifiedAt: null },
  { id: "c2", name: "David Park", phone: "+1-555-0200", relationship: "Partner", priority: "high", lastNotifiedAt: "2026-05-19T22:30:00" },
  { id: "c3", name: "Emma Wilson", phone: "+1-555-0300", relationship: "Friend", priority: "medium", lastNotifiedAt: null },
];

export const mockSessions: SafetySession[] = [
  { id: "s1", type: "safe_walk", status: "completed", startedAt: "2026-05-19T21:00:00", endedAt: "2026-05-19T21:25:00", destination: "Home", eta: "25 min", contactsNotified: ["c1","c2"] },
  { id: "s2", type: "location_share", status: "completed", startedAt: "2026-05-18T18:00:00", endedAt: "2026-05-18T18:30:00", contactsNotified: ["c3"] },
];

export const mockHistory: IncidentEvent[] = [
  { id: "h1", type: "safe_walk", title: "Safe Walk Completed", description: "Walked from Market St to Home. Arrived safely.", timestamp: "2026-05-19T21:25:00", location: "Market St to Home", status: "resolved" },
  { id: "h2", type: "location_share", title: "Location Shared", description: "Shared live location for 30 min with Emma.", timestamp: "2026-05-18T18:00:00", location: "Downtown SF", status: "resolved" },
  { id: "h3", type: "check_in", title: "Check-In", description: "Checked in after arriving at airport.", timestamp: "2026-05-17T14:30:00", location: "SFO Airport", status: "resolved" },
  { id: "h4", type: "sos", title: "SOS Alert Triggered", description: "Accidentally triggered SOS. Cancelled within countdown.", timestamp: "2026-05-15T23:10:00", location: "Oakland BART Station", status: "resolved" },
];

export const mockMedicalID: MedicalID = {
  fullName: "Sarah Chen", age: 28, bloodType: "O+", allergies: ["Penicillin", "Peanuts"], conditions: ["Asthma"], medications: ["Albuterol inhaler"], emergencyNotes: "Carries inhaler at all times. Severe peanut allergy — use EpiPen if needed.", emergencyContact: { name: "Mom (Linda Chen)", phone: "+1-555-0100" },
};
