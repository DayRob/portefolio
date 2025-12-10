"use client";

import { experiences } from "../../data/experiences";
import { education } from "../../data/education";
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
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="card-glass p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand/20 to-accent-purple/20 flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-50">{edu.title}</h3>
                      <p className="text-xs text-slate-400">{edu.school} • {edu.level}</p>
                      <p className="text-xs text-slate-500 mt-1">{edu.location}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-400 bg-slate-800/60 px-4 py-2 rounded-full whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
