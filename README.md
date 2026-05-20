# 🛡️ Personal Safety Companion

> **Feel safer wherever you go.**

A mobile-first safety PWA that helps users stay safe during daily activities, travel, commuting, late-night walks, and emergencies.

## 🚀 Live Demo

| | |
|---|---|
| **App** | https://personal-safety-companion-reyfcvkinmaul-uxs-projects.vercel.app |
| **Repo** | https://github.com/adikkmuda/personal-safety-companion |

## 🎮 Features

- **SOS Emergency Alert** — One-tap alert with 5-second countdown, sends location to trusted contacts
- **Safe Walk** — Timer-based walk monitoring with auto-alert if you don't check in
- **Live Location Sharing** — Share real-time position for 15/30/60 minutes
- **Evidence Recording** — Record audio with auto-attached location & timestamp metadata
- **Medical ID** — Blood type, allergies, conditions, medications — QR code for first responders
- **Trusted Contacts** — Manage emergency contacts with priority levels
- **Safety History** — Timeline of all safety events and incidents
- **PWA Ready** — Installable on any device

## 🏗️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (state management)
- Lucide React (icons)
- qrcode.react

## 📱 Pages

| Route | Description |
|---|---|
| `/` | Landing page with features overview |
| `/onboarding` | 3-step setup: contacts, location, medical profile |
| `/dashboard` | Home — SOS button, safety status, quick actions |
| `/sos` | Emergency SOS with countdown + alert sent confirmation |
| `/safe-walk` | Timer-based walk monitoring |
| `/location` | Live location sharing with mock map |
| `/evidence` | Audio recording with metadata |
| `/contacts` | Trusted contacts management |
| `/medical` | Medical ID with QR code |
| `/history` | Safety event timeline |
| `/settings` | Emergency, location, notification preferences |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🔮 Future Integrations

- Twilio/WhatsApp API for real SMS/call alerts
- Firebase Cloud Messaging for push notifications
- Supabase/Firebase for user database & auth
- Capacitor/React Native native wrapper
- Real-time location sharing via WebSockets
- Wearable device trigger support (Apple Watch, Mi Band)
- Fall detection via accelerometer
- Offline emergency mode
- Emergency service integration (911, local dispatch)
- AI-powered threat detection

## 🔒 Privacy

Your safety data stays private. Location is only shared during active safety sessions. You control who receives alerts and when.
