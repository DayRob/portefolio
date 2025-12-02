import type { ExperienceType } from "../../data/experiences";

type FilterValue = "all" | ExperienceType;

interface TagFilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

const OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "alternance", label: "Alternance" },
  { value: "stage", label: "Stage" },
  { value: "projet-perso", label: "Projets perso" }
];

export function TagFilter({ value, onChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`badge ${
              active ? "tag-filter-active" : "badge-ghost hover:border-brand"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
