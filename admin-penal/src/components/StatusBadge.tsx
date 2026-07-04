import type { FC } from "react";
import { CheckCircle2, Clock, XCircle, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusKind = "approved" | "pending" | "rejected" | "default";

const statusConfig: Record<
  StatusKind,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    className:
      "border-transparent bg-[var(--success-bg)] text-[var(--success)]",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "border-transparent bg-[var(--warning-bg)] text-[var(--warning)]",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "border-transparent bg-[var(--danger-bg)] text-[var(--danger)]",
  },
  default: {
    label: "Unknown",
    icon: CircleDot,
    className: "border-border bg-muted text-muted-foreground",
  },
};

const normalize = (status?: string): StatusKind => {
  const value = (status || "").toLowerCase();
  if (value === "approved") return "approved";
  if (value === "pending" || value === "requested") return "pending";
  if (value === "rejected") return "rejected";
  return "default";
};

interface Props {
  status?: string;
  className?: string;
}

const StatusBadge: FC<Props> = ({ status, className }) => {
  const kind = normalize(status);
  const { icon: Icon, className: styles } = statusConfig[kind];
  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : statusConfig[kind].label;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        styles,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
};

export default StatusBadge;
