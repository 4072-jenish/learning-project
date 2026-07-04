import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "violet" | "blue" | "amber" | "green" | "rose";

const accentStyles: Record<Accent, string> = {
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  blue: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  render: string;
  accent?: Accent;
}

const AnalyticsCard = ({
  title,
  value,
  icon: Icon,
  render,
  accent = "violet",
}: Props) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`${render}`)}
      className="group relative overflow-hidden rounded-2xl border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight">
            {value?.toLocaleString?.() ?? value}
          </h3>
        </div>

        <div className={cn("rounded-xl p-3", accentStyles[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
        View details
        <ArrowUpRight className="h-3.5 w-3.5" />
      </div>
    </button>
  );
};

export default AnalyticsCard;
