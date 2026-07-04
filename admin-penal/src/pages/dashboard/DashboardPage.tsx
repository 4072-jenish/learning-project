"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Users, FileText, Clock, CheckCircle, XCircle } from "lucide-react";

import type { RootState } from "@/store";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchAnalyticsAction } from "@/store/Actions/dashboard.action";
import AnalyticsCard from "@/components/AnalyticsCard";
import DailyBlogsChart from "@/components/DailyBlogsChart";
import BlogStatusChart from "@/components/BlogStatusChart";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const { analytics, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchAnalyticsAction());
  }, [dispatch]);

  const cards = [
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: Users,
      render: "/users",
      accent: "violet" as const,
    },
    {
      title: "Total Blogs",
      value: analytics.totalBlogs,
      icon: FileText,
      render: "/blogs",
      accent: "blue" as const,
    },
    {
      title: "Pending Blogs",
      value: analytics.pendingBlogs,
      icon: Clock,
      render: "/pendingBlogs",
      accent: "amber" as const,
    },
    {
      title: "Approved Blogs",
      value: analytics.approvedBlogs,
      icon: CheckCircle,
      render: "/approvedBlogs",
      accent: "green" as const,
    },
    {
      title: "Rejected Blogs",
      value: analytics.rejectedBlogs,
      icon: XCircle,
      render: "/rejectedBlogs",
      accent: "rose" as const,
    },
  ];

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Welcome back — here is what is happening across your blog platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-[132px] rounded-2xl" />
            ))
          : cards.map((card) => (
              <AnalyticsCard key={card.title} {...card} />
            ))}
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
    </div>
  );
};

export default DashboardPage;
