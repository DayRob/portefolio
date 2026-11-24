import type { Metadata } from "next";
import { profile } from "../../data/profile";
import { ObfuscatedEmail } from "../../components/ui/ObfuscatedEmail";
import { PageHeader } from "../../components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Accessibilité",
  description:
    "Déclaration d'accessibilité du portfolio de Côme VILLEROY de GALHAU : niveau visé WCAG 2.1 AA, RGAA 4.1."
};

export default function AccessibilityPage() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Informations légales" title="Accessibilité">
        Ce site vise le niveau AA des règles WCAG 2.1, en suivant les critères du
        RGAA 4.1. Ce n'est pas une obligation légale pour un site personnel, mais un
        choix d'exigence.
      </PageHeader>

      <div className="prose-legal">
        <h2>État de conformité</h2>
        <p>
          Le site n'a pas fait l'objet d'un audit RGAA complet par un tiers. Il n'est
          donc pas déclaré conforme. Il est conçu pour respecter les critères du niveau
          AA, et vérifié comme indiqué ci-dessous.{" "}
          <span className="todo">[À CONFIRMER : état à mettre à jour après un audit externe]</span>
        </p>

        <h2>Ce qui est en place</h2>
        <ul>
          <li>Lien d'évitement « Aller au contenu principal » en tête de chaque page.</li>
          <li>Structure sémantique : zones de page, un titre de niveau 1 par page et une hiérarchie de titres continue.</li>
          <li>Navigation complète au clavier, avec un indicateur de focus visible.</li>
          <li>Contrastes d'au moins 4,5:1 pour le texte, en thème clair comme en thème sombre.</li>
          <li>Thème clair ou sombre selon la préférence du système, sans script.</li>
          <li>Aucune animation ; la préférence « réduire les animations » est respectée.</li>
          <li>Textes de lien explicites, avec mention des ouvertures dans un nouvel onglet.</li>
          <li>Pas de formulaire, pas de contenu temporel, pas de média sans alternative.</li>
          <li>Version HTML du CV, équivalente au PDF.</li>
        </ul>

        <h2>Vérifications réalisées</h2>
        <ul>
          <li>Tests automatisés avec axe-core (règles WCAG 2.0 et 2.1, niveaux A et AA) sur toutes les pages, en thème clair et sombre, sur mobile et ordinateur.</li>
          <li>Mesures Lighthouse (accessibilité) sur toutes les pages.</li>
          <li>Contrôle automatisé de la navigation au clavier et du lien d'évitement.</li>
        </ul>
        <p>
          Ces outils ne détectent qu'une partie des problèmes. Des vérifications manuelles
          avec lecteur d'écran restent à faire{" "}
          <span className="todo">[À COMPLÉTER : date et outil de test manuel]</span>.
        </p>

        <h2>Contenus non accessibles connus</h2>
        <ul>
          <li>
            Les CV au format PDF : leur accessibilité n'est pas garantie{" "}
            <span className="todo">[À CONFIRMER : PDF balisé ou non]</span>. La version
            HTML de la page CV fournit les mêmes informations.
          </li>
          <li>
            Le CV en anglais n'est pas encore aligné sur la version française.
          </li>
        </ul>

        <h2>Technologies utilisées</h2>
        <p>HTML, CSS et un peu de JavaScript (navigation et affichage du lien e-mail). Le site reste lisible sans JavaScript.</p>

        <h2>Retour d'information et contact</h2>
        <p>
          Si vous rencontrez un défaut d'accessibilité, ou si vous avez besoin d'une
          information dans un autre format, écrivez à{" "}
          <ObfuscatedEmail user={profile.email.user} domain={profile.email.domain} />.
          Merci de préciser la page concernée et l'outil utilisé. Délai de réponse :{" "}
          <span className="todo">[À CONFIRMER]</span>.
        </p>

        <h2>Voies de recours</h2>
        <p>
          Si votre demande reste sans réponse satisfaisante, vous pouvez saisir le
          Défenseur des droits :{" "}
          <a
            href="https://formulaire.defenseurdesdroits.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            formulaire.defenseurdesdroits.fr{" "}
            <span className="sr-only">(s'ouvre dans un nouvel onglet)</span>
          </a>
          .
        </p>
        <p className="text-sm text-muted">Dernière mise à jour : 1er octobre 2026.</p>
      </div>
    </div>
  );
}
