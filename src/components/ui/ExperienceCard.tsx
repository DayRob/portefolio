"use client";

import { useState, type MouseEvent } from "react";
import type { Experience } from "../../data/experiences";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="card-glass w-full text-left hover:-translate-y-0.5"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
              {experience.title}
            </h3>
            <span className="badge text-xs capitalize">
              {experience.type === "projet-perso"
                ? "Projet perso"
                : experience.type}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {experience.company} • {experience.location}
          </p>
          <p className="text-xs text-slate-500">{experience.period}</p>
          <p className="mt-1 line-clamp-2 text-sm text-slate-300">
            {experience.highlights[0]}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {experience.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-950 px-6 py-6 shadow-soft-lg"
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300 hover:border-brand"
            >
              Fermer
            </button>
            <div className="flex flex-col gap-1 pr-10">
              <h2 className="text-lg font-semibold text-slate-50">
                {experience.title}
              </h2>
              <p className="text-sm text-slate-400">
                {experience.company} • {experience.location}
              </p>
              <p className="text-xs text-slate-500">{experience.period}</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-200">
              {experience.highlights.map((h) => (
                <p key={h} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                  <span>{h}</span>
                </p>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}


