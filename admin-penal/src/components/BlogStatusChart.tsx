"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PieChart as PieIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  approved: number;
  pending: number;
  rejected: number;
  loading?: boolean;
}

const COLORS = {
  approved: "var(--success)",
  pending: "var(--warning)",
  rejected: "var(--danger)",
};

export default function BlogStatusChart({
  approved,
  pending,
  rejected,
  loading,
}: Props) {
  const data = [
    { name: "Approved", value: approved, key: "approved" as const },
    { name: "Pending", value: pending, key: "pending" as const },
    { name: "Rejected", value: rejected, key: "rejected" as const },
  ];

  const total = approved + pending + rejected;

  return (
    <div className="h-full rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <PieIcon className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold">Blog Status</h2>
          <p className="text-xs text-muted-foreground">
            Distribution by moderation state
          </p>
        </div>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : total === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
          <PieIcon className="mb-2 h-8 w-8 opacity-40" />
          <p className="text-sm">No blogs to display</p>
        </div>
      ) : (
        <>
          <div className="relative h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  stroke="none"
                >
                  {data.map((entry) => (
                    <Cell key={entry.key} fill={COLORS[entry.key]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "1px solid var(--border)",
                    background: "var(--popover)",
                    color: "var(--popover-foreground)",
                    fontSize: "0.8rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{total}</span>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {data.map((entry) => (
              <div
                key={entry.key}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: COLORS[entry.key] }}
                  />
                  {entry.name}
                </span>
                <span className="font-medium">{entry.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
