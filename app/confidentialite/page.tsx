import type { Metadata } from "next";
import { profile } from "../../data/profile";
import { ObfuscatedEmail } from "../../components/ui/ObfuscatedEmail";
import { PageHeader } from "../../components/ui/PageHeader";
import { Marked } from "../../components/ui/Marked";

const treatments = [
  {
    name: "Journaux techniques du serveur",
    data: "Adresse IP, date et heure, page demandée, type de navigateur.",
    purpose: "Sécurité et bon fonctionnement du site. Intérêt légitime (art. 6.1.f du RGPD).",
    retention: "[À COMPLÉTER : durée de rétention des journaux nginx]"
  },
  {
    name: "Contrôle d'accès Cloudflare",
    data: "Cookie technique d'authentification, adresse IP, identifiant de session.",
    purpose:
      "Réserver l'accès au site à des personnes autorisées pendant la phase privée. Cookie strictement nécessaire, exempté de consentement. Intérêt légitime (art. 6.1.f).",
    retention: "[À CONFIRMER : durée de session configurée dans Cloudflare Access]"
  },
  {
    name: "Échanges par e-mail",
    data: "Votre adresse e-mail, votre nom et le contenu de votre message.",
    purpose:
      "Répondre à votre message, notamment pour une proposition d'emploi. Intérêt légitime (art. 6.1.f) ou mesures précontractuelles (art. 6.1.b).",
    retention:
      "Le temps nécessaire à l'échange, puis [À CONFIRMER : durée maximale, par exemple 2 ans]."
  }
];

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité (RGPD) du portfolio de Côme VILLEROY de GALHAU : données traitées, finalités, durées et droits."
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Informations légales" title="Politique de confidentialité">
        Ce site collecte le strict minimum. Voici quelles données sont traitées, pourquoi,
        pendant combien de temps et comment exercer vos droits (RGPD, règlement UE
        2016/679, et loi Informatique et Libertés).
      </PageHeader>

      <div className="prose-legal">
        <h2>1. Responsable du traitement</h2>
        <p>
          {profile.name}, éditeur du site (voir les mentions légales). Contact :{" "}
          <ObfuscatedEmail user={profile.email.user} domain={profile.email.domain} />.
        </p>

        <h2>2. Ce que ce site ne fait pas</h2>
        <ul>
          <li>Aucun cookie de suivi, publicitaire ou de mesure d'audience.</li>
          <li>Aucun outil d'analyse (pas de Google Analytics, pas de pixel).</li>
          <li>Aucun formulaire de collecte de données sur le site.</li>
          <li>
            Aucune ressource chargée depuis un service tiers : les polices sont
            hébergées sur le site et il n'y a aucun contenu intégré externe.
          </li>
        </ul>

        <h2>3. Données traitées</h2>
        <ul className="mt-3 !max-w-none !list-none space-y-4 !pl-0">
          {treatments.map((t) => (
            <li key={t.name} className="card">
              <h3 className="!mt-0 text-base">{t.name}</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="font-semibold">Données</dt>
                  <dd>{t.data}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Finalité et base légale</dt>
                  <dd>{t.purpose}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Durée de conservation</dt>
                  <dd>
                    <Marked text={t.retention} />
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <h2>4. Destinataires</h2>
        <ul>
          <li>L'éditeur du site, seul destinataire des données.</li>
          <li>
            Cloudflare, Inc., prestataire technique de protection et de contrôle d'accès,
            qui peut traiter des données hors de l'Union européenne. Ces transferts
            reposent sur les garanties prévues par le RGPD{" "}
            <span className="todo">[À CONFIRMER : mécanisme de transfert indiqué par Cloudflare]</span>.
          </li>
          <li>
            Le fournisseur de messagerie de l'éditeur, pour les e-mails que vous
            envoyez <span className="todo">[À CONFIRMER : fournisseur]</span>.
          </li>
        </ul>
        <p>Vos données ne sont ni vendues ni cédées à des fins commerciales.</p>

        <h2>5. Vos droits</h2>
        <p>
          Vous disposez des droits d'accès, de rectification, d'effacement, de
          limitation et d'opposition. Vous pouvez aussi définir des directives sur le
          sort de vos données après votre décès. Pour les exercer, écrivez à{" "}
          <ObfuscatedEmail user={profile.email.user} domain={profile.email.domain} />.
          Une pièce justificative d'identité peut être demandée en cas de doute.
        </p>

        <h2>6. Réclamation</h2>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la
          CNIL : Commission nationale de l'informatique et des libertés, 3 place de
          Fontenoy, TSA 80715, 75334 Paris Cedex 07. Plaintes en ligne :{" "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">
            cnil.fr/fr/plaintes <span className="sr-only">(s'ouvre dans un nouvel onglet)</span>
          </a>
          .
        </p>

        <h2>7. Sécurité</h2>
        <p>
          Le site est statique : il ne comporte ni base de données ni code exécuté côté
          serveur. Les échanges sont chiffrés (HTTPS) et protégés par des en-têtes de
          sécurité (politique de sécurité du contenu, HSTS).
        </p>

        <h2>8. Modifications</h2>
        <p>
          Cette politique peut évoluer, par exemple si une mesure d'audience sans
          cookie était ajoutée. La date de mise à jour figure ci-dessous.
        </p>
        <p className="text-sm text-muted">Dernière mise à jour : 1er octobre 2026.</p>
      </div>
    </div>
  );
}
