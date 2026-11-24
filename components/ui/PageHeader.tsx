import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="space-y-3 border-b border-line pb-8">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children ? <div className="lead text-muted">{children}</div> : null}
    </header>
  );
}
