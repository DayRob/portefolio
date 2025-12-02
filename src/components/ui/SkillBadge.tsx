import type { ReactNode } from "react";

interface SkillBadgeProps {
  children: ReactNode;
}

export function SkillBadge({ children }: SkillBadgeProps) {
  return <span className="badge badge-ghost">{children}</span>;
}
