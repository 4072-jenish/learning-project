"use client";

import { useEffect } from "react";
import type { JSX } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { FileText, CheckCircle, Clock, XCircle } from "lucide-react";

import type { RootState } from "@/store";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchAnalyticsAction } from "@/store/Actions/dashboard.action";
import DailyBlogsChart from "@/components/DailyBlogsChart";
import BlogStatusChart from "@/components/BlogStatusChart";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const AnalyticsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { analytics, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchAnalyticsAction());
  }, [dispatch]);

  const approvalRate =
    analytics.totalBlogs > 0
      ? Math.round((analytics.approvedBlogs / analytics.totalBlogs) * 100)
      : 0;

  const stats = [
    {
      label: "Total Blogs",
      value: analytics.totalBlogs,
      icon: FileText,
      className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
      label: "Approved",
      value: analytics.approvedBlogs,
      icon: CheckCircle,
      className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Pending",
      value: analytics.pendingBlogs,
      icon: Clock,
      className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      label: "Rejected",
      value: analytics.rejectedBlogs,
      icon: XCircle,
      className: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
  ];

  const barData = [
    { name: "Approved", value: analytics.approvedBlogs, fill: "var(--success)" },
    { name: "Pending", value: analytics.pendingBlogs, fill: "var(--warning)" },
    { name: "Rejected", value: analytics.rejectedBlogs, fill: "var(--danger)" },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Track content performance and moderation trends.
          </p>
        </div>
        <div className="rounded-xl border bg-card px-4 py-3 shadow-sm">
          <p className="text-xs text-muted-foreground">Approval rate</p>
          <p className="text-2xl font-bold text-primary">{approvalRate}%</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))
          : stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm"
                >
                  <div className={cn("rounded-xl p-3", stat.className)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              );
            })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DailyBlogsChart data={analytics.dailyBlogs || []} loading={loading} />
        </div>
        <BlogStatusChart
          approved={analytics.approvedBlogs}
          pending={analytics.pendingBlogs}
          rejected={analytics.rejectedBlogs}
          loading={loading}
        />
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold">Blogs by Status</h2>
        <div className="h-72">
          {loading ? (
            <Skeleton className="h-full w-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                />
                <XAxis
                  dataKey="name"
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
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    borderRadius: "0.75rem",
                    border: "1px solid var(--border)",
                    background: "var(--popover)",
                    color: "var(--popover-foreground)",
                    fontSize: "0.8rem",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={72}>
                  {barData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
