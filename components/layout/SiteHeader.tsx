import Link from "next/link";
import { profile } from "../../data/profile";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="container-page flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="block text-ink no-underline">
          <span className="block font-semibold leading-tight">{profile.name}</span>
          <span className="block text-sm text-muted">{profile.title}</span>
        </Link>
        <nav aria-label="Navigation principale">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
