import { projects } from "../../data/projects";
import { SkillBadge } from "../../components/ui/SkillBadge";

export default function ProjectsPage() {
  return (
    <div className="space-y-10 lg:space-y-12">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">
          Projets & laboratoires
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Projets personnels & labs de cybersécurité
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Une sélection de projets techniques pour expérimenter, apprendre et
          consolider des compétences en cybersécurité, virtualisation et
          création digitale.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="card-glass h-full">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-slate-50">
                {project.title}
              </h2>
              <SkillBadge>
                {project.type === "infra"
                  ? "Infrastructure"
                  : project.type === "ctf"
                  ? "CTF / Plateformes"
                  : "Création"}
              </SkillBadge>
            </div>
            <p className="mt-2 text-sm text-slate-300">{project.description}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {project.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
