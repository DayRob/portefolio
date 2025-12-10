"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/experiences", label: "Expériences" },
  { href: "/projets", label: "Projets & Labs" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/60 shadow-2xl shadow-slate-950/50'
        : 'bg-slate-950/80 backdrop-blur-xl border-b border-transparent'
    }`}>
      <div className="section-container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-light to-brand-dark shadow-lg shadow-brand/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-brand/40">
            <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand to-brand-dark opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-glow" />
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
              Portefolio
            </span>
            <span className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
              Côme VILLEROY de GALHAU
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-1 text-sm font-medium md:flex">
            {navItems.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href} className={`${mounted ? 'animate-slide-in-up' : ''}`} style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-slate-800/50 hover:text-white group ${
                      isActive ? "text-white bg-slate-800/70" : "text-slate-300"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <>
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand/20 to-accent-purple/20 animate-gradient" />
                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-8 bg-gradient-to-r from-brand to-accent-purple rounded-full" />
                      </>
                    )}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              );
            })}
          </ul>

        </nav>
      </div>

      {/* Ligne de progression du scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand via-accent-purple to-accent-pink">
        <div
          className="h-full bg-gradient-to-r from-brand to-accent-purple transition-all duration-150 ease-out"
          style={{
            width: typeof window !== 'undefined' ? `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` : '0%'
          }}
        />
      </div>
    </header>
  );
}
