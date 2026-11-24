import type { Metadata } from "next";
import { skillGroups } from "../../data/skills";
import { ChipList } from "../../components/ui/Chip";
import { PageHeader } from "../../components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Compétences",
  description:
    "Compétences de Côme VILLEROY de GALHAU par domaine : reconnaissance et scan de vulnérabilités, infrastructure sécurisée, veille, développement, analyse de risque."
};

export default function SkillsPage() {
  return (
    <div className="space-y-12">
      <PageHeader eyebrow="Compétences" title="Compétences par domaine">
        Les outils que j'ai réellement utilisés, regroupés par domaine. L'analyse
        de risque vient en complément du socle technique.
      </PageHeader>

      <ul className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <li key={group.id}>
            <section className="card h-full space-y-3" aria-labelledby={`skill-${group.id}`}>
              <h2 id={`skill-${group.id}`} className="text-lg">
                {group.label}
              </h2>
              {group.summary ? <p className="text-muted">{group.summary}</p> : null}
              <ChipList items={group.items} label={group.label} />
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}
