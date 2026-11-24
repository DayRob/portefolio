import Link from "next/link";
import { profile, keyTools } from "../data/profile";
import { experiences } from "../data/experiences";
import { projects } from "../data/projects";
import { hobbies } from "../data/hobbies";
import { Marked } from "../components/ui/Marked";

const pillars = [
  {
    title: "Reconnaissance et surface d'attaque",
    text: "Cartographie passive de la surface d'attaque avec recon-ng, crt.sh, Aquatone et Microsoft Defender EASM, puis scan actif de vulnérabilités avec OpenVAS."
  },
  {
    title: "Infrastructure sécurisée",
    text: "Homelab Proxmox pour concevoir et héberger mes services. Audit et durcissement de SSH et TLS lors d'un stage."
  },
  {
    title: "Risque métier (complémentaire)",
    text: "Analyse de risque EBIOS RM de l'ANSSI et accompagnement à l'homologation, pour relier un constat technique à son enjeu."
  }
];

export default function HomePage() {
  const featured = experiences.slice(0, 2);
  return (
    <div className="space-y-20">
      <section aria-labelledby="titre-accueil" className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-start">
        <div className="space-y-6">
          <p className="eyebrow">{profile.location}</p>
          <h1 id="titre-accueil">
            {profile.name}
            <span className="mt-2 block text-xl font-normal text-muted sm:text-2xl">
              {profile.title}
            </span>
          </h1>
          <p className="lead">{profile.lead}</p>
          <p className="max-w-prose text-muted">{profile.secondary}</p>
          <p className="flex flex-wrap gap-3 pt-2">
            <Link href="/projets/" className="btn-primary">
              Voir mes projets
            </Link>
            <Link href="/cv/" className="btn-secondary">
              Consulter mon CV
            </Link>
            <Link href="/contact/" className="btn-secondary">
              Me contacter
            </Link>
          </p>
        </div>

        <aside className="card space-y-4" aria-labelledby="fiche">
          <h2 id="fiche" className="text-base">
            En bref
          </h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="eyebrow">Recherche</dt>
              <dd>{profile.target}</dd>
            </div>
            <div>
              <dt className="eyebrow">Formation</dt>
              <dd>CPE Lyon, Informatique et Cybersécurité</dd>
            </div>
            <div>
              <dt className="eyebrow">Disponibilité</dt>
              <dd>
                <Marked text="[À CONFIRMER]" />
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Outils</dt>
              <dd>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {keyTools.map((tool) => (
                    <li key={tool} className="chip">
                      {tool}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section aria-labelledby="titre-axes" className="space-y-6">
        <h2 id="titre-axes">Ce sur quoi je m'appuie</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.title} className="card space-y-2">
              <h3>{p.title}</h3>
              <p className="text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
        <p>
          <Link href="/competences/">Voir toutes les compétences par domaine</Link>
        </p>
      </section>

      <section aria-labelledby="titre-parcours" className="space-y-6">
        <h2 id="titre-parcours">Parcours récent</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {featured.map((exp) => (
            <li key={exp.id} className="card space-y-2">
              <h3>
                <Marked text={exp.company} />
              </h3>
              <p className="text-sm text-muted">
                <Marked text={`${exp.role} · ${exp.period}`} />
              </p>
              <p>
                <Marked text={exp.highlights[0]} />
              </p>
            </li>
          ))}
        </ul>
        <p>
          <Link href="/experiences/">Voir toutes les expériences</Link>
        </p>
      </section>

      <section aria-labelledby="titre-projets" className="space-y-6">
        <h2 id="titre-projets">Projets personnels</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id} className="card space-y-1">
              <h3>{project.title}</h3>
              <p className="text-sm text-muted">
                <Marked text={project.status} />
              </p>
            </li>
          ))}
        </ul>
        <p>
          <Link href="/projets/">Voir le détail des projets</Link>
        </p>
      </section>

      <section aria-labelledby="titre-interets" className="space-y-4">
        <h2 id="titre-interets">Centres d'intérêt</h2>
        <ul className="flex flex-wrap gap-2">
          {hobbies.map((h) => (
            <li key={h.id} className="chip">
              {h.label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
