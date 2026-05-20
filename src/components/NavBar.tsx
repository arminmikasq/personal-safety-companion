"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shield, Users, FileText, Settings } from "lucide-react";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/sos", label: "SOS", icon: Shield },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/history", label: "History", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 safe-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={`nav-item ${active ? "active" : ""}`}>
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
