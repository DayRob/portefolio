"use client";

import { experiences } from "../../data/experiences";
import { education } from "../../data/education";
import { TimelineItem } from "../../components/ui/Timeline";
import { ExperienceCard } from "../../components/ui/ExperienceCard";
import { TagFilter } from "../../components/ui/TagFilter";
import { useState } from "react";
import type { ExperienceType } from "../../data/experiences";

type FilterValue = "all" | ExperienceType;

export default function ExperiencesPage() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered =
    filter === "all"
      ? experiences
      : experiences.filter((e) => e.type === filter);

  return (
    <div className="space-y-10 lg:space-y-12">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">
          Parcours
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Expériences & formation
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Un parcours construit autour de la cybersécurité, entre alternance,
          stages et projets personnels pour mettre en pratique la théorie.
        </p>
      </header>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.8fr)]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
              Expériences professionnelles
            </h2>
            <TagFilter
              value={filter}
              onChange={(v) => setFilter(v as FilterValue)}
            />
          </div>
          <ul className="space-y-4">
            {filtered.map((exp) => (
              <li key={exp.id}>
                <ExperienceCard experience={exp} />
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
            Formation
          </h2>
          <ul className="space-y-2">
            {education.map((edu) => (
              <TimelineItem
                key={edu.id}
                title={edu.title}
                subtitle={`${edu.school} • ${edu.level}`}
                period={edu.period}
                location={edu.location}
              />
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
