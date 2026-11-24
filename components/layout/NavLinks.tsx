"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Accueil" },
  { href: "/experiences/", label: "Expériences" },
  { href: "/projets/", label: "Projets" },
  { href: "/competences/", label: "Compétences" },
  { href: "/cv/", label: "CV" },
  { href: "/contact/", label: "Contact" }
];

export function NavLinks() {
  const pathname = usePathname() ?? "/";
  return (
    <ul className="-mx-3 flex flex-wrap gap-x-1 gap-y-1">
      {items.map((item) => {
        const current =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className="nav-link"
              aria-current={current ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
