"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ui/ThemeToggle";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/experiences", label: "Expériences" },
  { href: "/projets", label: "Projets & Labs" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-sm font-bold text-slate-950 shadow-lg">
            CV
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-xs font-medium text-slate-400">
              Portefolio
            </span>
            <span className="text-sm font-semibold text-slate-100">
              Côme VILLEROY de GALHAU
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-5 text-sm font-medium text-slate-300 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative transition hover:text-slate-50 ${
                      isActive ? "text-slate-50" : ""
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-brand to-transparent" />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
