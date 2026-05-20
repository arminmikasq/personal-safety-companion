import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Safety Companion",
  description: "Feel safer wherever you go. SOS alerts, live location, safe walk, and more.",
  manifest: "/manifest.json",
  themeColor: "#42A5F5",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        {children}
      </body>
    </html>
  );
}
