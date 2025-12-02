import Link from "next/link";
import { profile } from "../data/profile";
import { education } from "../data/education";
import { experiences } from "../data/experiences";
import { skillCategories } from "../data/skills";
import { hobbies } from "../data/hobbies";
import { SkillBadge } from "../components/ui/SkillBadge";

export default function HomePage() {
  const latestExperiences = experiences.slice(0, 3);

  return (
    <div className="space-y-12 lg:space-y-16">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-slate-900/60 px-3 py-1 text-xs text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            Disponible pour alternance et projets cybersécurité
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">
              {profile.location}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-brand">
              {profile.title}
            </p>
          </div>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            {profile.shortBio}
          </p>
          <p className="max-w-2xl text-sm text-slate-400">
            {profile.secondaryBio}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/experiences" className="btn-primary">
              Voir mon parcours
            </Link>
            <Link href="/projets" className="btn-outline">
              Explorer mes projets & labs
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <Link
              href={`mailto:${profile.email}`}
              className="underline-offset-2 hover:text-slate-100 hover:underline"
            >
              {profile.email}
            </Link>
            <span>•</span>
            <span>{profile.phone}</span>
            <span>•</span>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:text-slate-100 hover:underline"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <div className="card-glass relative overflow-hidden">
          <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-brand/30 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),transparent_60%)]" />
          <div className="relative space-y-4">
            <p className="text-sm font-medium text-slate-300">
              Focus sur la cybersécurité :
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                • Tests d’intrusion, analyse de vulnérabilités et renforcement
                des systèmes.
              </li>
              <li>
                • Mise en place de labs Proxmox pour expérimenter dans des
                environnements isolés.
              </li>
              <li>
                • Culture GRC, investigation d’incidents et threat intelligence.
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Compétences clés
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {skillCategories[0]?.skills.slice(0, 3).map((s) => (
                  <SkillBadge key={s.name}>{s.name}</SkillBadge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="formation" className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Formation
          </h2>
          <Link
            href="/experiences"
            className="text-xs text-slate-400 underline-offset-2 hover:text-slate-100 hover:underline"
          >
            Voir la timeline complète
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {education.map((edu) => (
            <div key={edu.id} className="card-glass">
              <p className="text-xs text-slate-400">{edu.period}</p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                {edu.title}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {edu.school} • {edu.location}
              </p>
              <p className="mt-2 text-xs text-slate-500">{edu.level}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="experiences" className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Expériences récentes
          </h2>
          <Link href="/experiences" className="btn-outline text-xs px-4 py-1.5">
            Voir toutes les expériences
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestExperiences.map((exp) => (
            <div key={exp.id} className="card-glass">
              <p className="text-xs text-slate-400">{exp.period}</p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                {exp.role}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {exp.company} • {exp.location}
              </p>
              <ul className="mt-2 space-y-1 text-xs text-slate-300">
                {exp.highlights.slice(0, 2).map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="projets" className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Projets & labs
          </h2>
          <Link href="/projets" className="btn-outline text-xs px-4 py-1.5">
            Découvrir les projets
          </Link>
        </div>
        <p className="max-w-2xl text-sm text-slate-300">
          Infrastructure Proxmox, plateformes CTF (Root Me, TryHackMe) et
          projets créatifs : un mélange de technique et de création pour rester
          curieux et opérationnel.
        </p>
      </section>

      <section id="a-propos" className="space-y-3 border-t border-slate-800/60 pt-6">
        <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
          À propos & centres d’intérêt
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 text-sm text-slate-300">
            <p>
              Je construis progressivement un profil d’ingénieur cybersécurité
              capable de comprendre les enjeux métiers, d’identifier les
              risques et de proposer des solutions pragmatiques.
            </p>
            <p>
              J’apprécie particulièrement les environnements où l’on peut
              combiner technique, pédagogie et accompagnement des équipes.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Hobbies
            </p>
            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby) => (
                <SkillBadge key={hobby.id}>{hobby.label}</SkillBadge>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
