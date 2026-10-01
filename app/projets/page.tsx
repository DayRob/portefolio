import type { Metadata } from "next";
import { projects } from "../../data/projects";
import { Marked } from "../../components/ui/Marked";
import { ChipList } from "../../components/ui/Chip";
import { PageHeader } from "../../components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Homelab Proxmox, projet de veille culture cyber, QG Discord d'agents IA et entraînement sur Root Me et TryHackMe."
};

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <PageHeader eyebrow="Projets" title="Projets personnels">
        Pour chaque projet : le contexte, les outils, ce que j'ai fait et ce que
        j'en retiens.
      </PageHeader>

      <ul className="space-y-8">
        {projects.map((project) => (
          <li key={project.id}>
            <article className="card space-y-5" aria-labelledby={`projet-${project.id}`}>
              <header className="space-y-1">
                <h2 id={`projet-${project.id}`} className="text-xl">
                  {project.title}
                </h2>
                <p className="text-sm text-muted">
                  Statut : <Marked text={project.status} />
                </p>
              </header>

              <div className="space-y-1">
                <h3 className="text-base">
                  Contexte
                </h3>
                <p className="max-w-prose">
                  <Marked text={project.context} />
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base">
                  Outils
                </h3>
                <ChipList items={project.tools} label={`Outils : ${project.title}`} />
              </div>

              <div className="space-y-2">
                <h3 className="text-base">
                  Ce que j'ai fait
                </h3>
                <ul className="list-disc space-y-1 pl-5">
                  {project.done.map((d) => (
                    <li key={d}>
                      <Marked text={d} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base">
                  Ce que j'en retiens
                </h3>
                <ul className="list-disc space-y-1 pl-5">
                  {project.learned.map((l) => (
                    <li key={l}>
                      <Marked text={l} />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
