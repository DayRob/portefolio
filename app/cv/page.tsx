import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { cvFiles } from "../../data/cv";
import { profile } from "../../data/profile";
import { experiences } from "../../data/experiences";
import { education } from "../../data/education";
import { skillGroups } from "../../data/skills";
import { hobbies } from "../../data/hobbies";
import { Marked } from "../../components/ui/Marked";
import { PageHeader } from "../../components/ui/PageHeader";

export const metadata: Metadata = {
  title: "CV",
  description:
    "CV de Côme VILLEROY de GALHAU, ingénieur cybersécurité : téléchargement PDF (français et anglais) et version HTML équivalente."
};

// Détection au build : un CV n'est proposé que si le fichier existe dans public/cv/.
function isAvailable(file: string) {
  return fs.existsSync(path.join(process.cwd(), "public", "cv", file));
}

export default function CvPage() {
  const files = cvFiles.map((f) => ({ ...f, available: isAvailable(f.file) }));

  return (
    <div className="space-y-12">
      <PageHeader eyebrow="CV" title="Curriculum vitae">
        Le CV est disponible en PDF. La version HTML ci-dessous contient les mêmes
        informations et reste lisible avec un lecteur d'écran.
      </PageHeader>

      <section aria-labelledby="titre-telechargement" className="space-y-4">
        <h2 id="titre-telechargement">Télécharger</h2>
        <ul className="space-y-3">
          {files.map((f) => (
            <li key={f.lang} lang={f.lang}>
              {f.available ? (
                <a href={`/cv/${f.file}`} className="btn-primary" download>
                  {f.label}
                </a>
              ) : f.lang === "fr" ? (
                <p className="text-muted">
                  CV français : bientôt disponible{" "}
                  <span className="todo">[À COMPLÉTER : déposer public/cv/cv-fr.pdf]</span>
                </p>
              ) : (
                <p className="text-muted">
                  English CV: to be aligned with the French version{" "}
                  <span className="todo">[À CONFIRMER]</span>
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titre-cv-html" className="space-y-8">
        <h2 id="titre-cv-html">Version HTML (français)</h2>

        <div className="space-y-2">
          <h3>Profil</h3>
          <p className="max-w-prose">{profile.lead}</p>
          <p className="max-w-prose text-muted">{profile.secondary}</p>
        </div>

        <div className="space-y-4">
          <h3>Expériences</h3>
          <ol className="space-y-5">
            {experiences.map((exp) => (
              <li key={exp.id}>
                <p className="font-semibold">
                  <Marked text={exp.company} />, <Marked text={exp.role} />
                </p>
                <p className="text-sm text-muted">
                  <Marked text={`${exp.period} · ${exp.location}`} />
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {exp.highlights.map((h) => (
                    <li key={h}>
                      <Marked text={h} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h3>Formation</h3>
          <ol className="space-y-3">
            {education.map((edu) => (
              <li key={edu.id}>
                <p className="font-semibold">{edu.title}</p>
                <p className="text-sm text-muted">
                  {edu.school}
                  {edu.location ? `, ${edu.location}` : ""} ·{" "}
                  <Marked text={edu.period} />
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <h3>Compétences</h3>
          <dl className="space-y-3">
            {skillGroups.map((g) => (
              <div key={g.id}>
                <dt className="font-semibold">{g.label}</dt>
                <dd className="text-muted">
                  <Marked text={g.items.join(", ")} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-2">
          <h3>Divers</h3>
          <p className="text-muted">
            Permis B (depuis 2022) <span className="todo">[À CONFIRMER]</span>.
            Centres d'intérêt : {hobbies.map((h) => h.label).join(", ")}.
          </p>
        </div>
      </section>
    </div>
  );
}
