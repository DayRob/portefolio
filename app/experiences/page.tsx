import type { Metadata } from "next";
import { experiences } from "../../data/experiences";
import { education } from "../../data/education";
import { Marked } from "../../components/ui/Marked";
import { ChipList } from "../../components/ui/Chip";
import { PageHeader } from "../../components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Expériences",
  description:
    "Alternance chez CGI (ex-Apside), stages chez Villeroy & Boch, HarfangLab et Eternilab, et formation de Côme VILLEROY de GALHAU."
};

export default function ExperiencesPage() {
  return (
    <div className="space-y-12">
      <PageHeader eyebrow="Parcours" title="Expériences et formation">
        Une alternance et plusieurs stages en cybersécurité, de la reconnaissance
        et du scan de vulnérabilités à l'investigation d'incidents.
      </PageHeader>

      <section aria-labelledby="titre-exp" className="space-y-6">
        <h2 id="titre-exp">Expériences professionnelles</h2>
        <ol className="space-y-6">
          {experiences.map((exp) => (
            <li key={exp.id}>
              <article className="card space-y-4" aria-labelledby={`exp-${exp.id}`}>
                <header className="space-y-1">
                  <p className="eyebrow">{exp.kind}</p>
                  <h3 id={`exp-${exp.id}`}>
                    <Marked text={exp.company} />
                  </h3>
                  <p className="text-muted">
                    <Marked text={exp.role} />
                  </p>
                  <p className="text-sm text-muted">
                    <Marked text={`${exp.period} · ${exp.location}`} />
                  </p>
                  {exp.note ? <p className="text-sm text-muted">{exp.note}</p> : null}
                </header>
                <ul className="list-disc space-y-2 pl-5">
                  {exp.highlights.map((h) => (
                    <li key={h}>
                      <Marked text={h} />
                    </li>
                  ))}
                </ul>
                <ChipList items={exp.tools} label={`Outils et thèmes : ${exp.company}`} />
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="titre-formation" className="space-y-6">
        <h2 id="titre-formation">Formation</h2>
        <ol className="space-y-4">
          {education.map((edu) => (
            <li key={edu.id} className="card">
              <h3 className="text-base">{edu.title}</h3>
              <p className="text-muted">
                {edu.school}
                {edu.location ? `, ${edu.location}` : ""}
              </p>
              <p className="text-sm text-muted">
                <Marked text={edu.period} />
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
