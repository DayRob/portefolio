import Link from "next/link";
import { profile } from "../../data/profile";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="container-page flex flex-col gap-6 py-8 text-sm text-muted md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-ink">{profile.name}</p>
          <p>
            © {new Date().getFullYear()}, tous droits réservés. Aucun cookie de suivi, aucune
            mesure d'audience.
          </p>
        </div>
        <nav aria-label="Informations légales">
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <li>
              <Link href="/mentions-legales/">Mentions légales</Link>
            </li>
            <li>
              <Link href="/confidentialite/">Politique de confidentialité</Link>
            </li>
            <li>
              <Link href="/accessibilite/">Accessibilité</Link>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Profil LinkedIn <span className="sr-only">(s'ouvre dans un nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
