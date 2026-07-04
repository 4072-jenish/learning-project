"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DailyBlog {
  date: string;
  blogs: string | number;
}

interface Props {
  data: DailyBlog[];
  loading?: boolean;
}

export default function DailyBlogsChart({ data, loading }: Props) {
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    blogs: Number(item.blogs),
  }));

  return (
    <div className="h-full rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <TrendingUp className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold">Daily Blog Growth</h2>
          <p className="text-xs text-muted-foreground">
            New blog posts published over time
          </p>
        </div>
      </div>

      <div className="h-80">
        {loading ? (
          <Skeleton className="h-full w-full rounded-xl" />
        ) : chartData.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
            <TrendingUp className="mb-2 h-8 w-8 opacity-40" />
            <p className="text-sm">No data available yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="blogGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid var(--border)",
                  background: "var(--popover)",
                  color: "var(--popover-foreground)",
                  fontSize: "0.8rem",
                }}
              />
              <Area
                type="monotone"
                dataKey="blogs"
                stroke="var(--chart-1)"
                strokeWidth={2.5}
                fill="url(#blogGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
