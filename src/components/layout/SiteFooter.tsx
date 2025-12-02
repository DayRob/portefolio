import Link from "next/link";
import { profile } from "../../data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950/90">
      <div className="section-container flex flex-col gap-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Tous droits réservés.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`mailto:${profile.email}`}
            className="hover:text-slate-100"
          >
            {profile.email}
          </Link>
          <span className="hidden text-slate-600 md:inline">•</span>
          <span>{profile.phone}</span>
          <span className="hidden text-slate-600 md:inline">•</span>
          <Link
            href={profile.linkedin}
            className="hover:text-slate-100"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
