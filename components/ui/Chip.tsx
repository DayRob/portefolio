import { Marked } from "./Marked";

export function ChipList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <li key={item} className="chip">
          <Marked text={item} />
        </li>
      ))}
    </ul>
  );
}
