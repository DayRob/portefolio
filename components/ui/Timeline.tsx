import type { Key, ReactNode } from "react";

interface TimelineItemProps {
  key?: Key;
  title: string;
  subtitle?: string;
  period: string;
  location?: string;
  rightSlot?: ReactNode;
  children?: ReactNode;
}

export function TimelineItem({
  title,
  subtitle,
  period,
  location,
  rightSlot,
  children
}: TimelineItemProps) {
  return (
    <li className="relative pb-10 last:pb-0">
      <div className="timeline-line" aria-hidden="true" />
      <div className="timeline-item">
        <div className="flex min-w-[7rem] flex-col items-start gap-2 sm:items-end sm:pr-10">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
            {period}
          </span>
          {location && (
            <span className="text-xs text-slate-500 sm:text-right">
              {location}
            </span>
          )}
        </div>
        <div className="relative flex-1 pl-10 sm:pl-12">
          <div className="timeline-point" aria-hidden="true" />
          <div className="card-glass">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-slate-400 sm:text-sm">
                    {subtitle}
                  </p>
                )}
              </div>
              {rightSlot && <div className="mt-3 sm:mt-0">{rightSlot}</div>}
            </div>
            {children && (
              <div className="mt-3 text-sm text-slate-300">{children}</div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
