import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/ui/PageHeader";

export const metadata: Metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Erreur 404" title="Page introuvable">
        Cette page n'existe pas ou a été déplacée.
      </PageHeader>
      <p>
        <Link href="/" className="btn-primary">
          Retour à l'accueil
        </Link>
      </p>
    </div>
  );
}
