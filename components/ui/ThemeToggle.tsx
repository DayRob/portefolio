"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const current = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      type="button"
      aria-label="Basculer le thème clair/sombre"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 shadow-md transition hover:border-brand hover:text-brand"
    >
      {current === "dark" ? (
        <span className="text-lg">☾</span>
      ) : (
        <span className="text-lg">☼</span>
      )}
    </button>
  );
}
