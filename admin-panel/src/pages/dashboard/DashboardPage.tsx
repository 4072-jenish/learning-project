"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Users, FileText, Clock, CheckCircle, XCircle } from "lucide-react";

import type { RootState } from "@/store";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchAnalyticsAction } from "@/store/Actions/dashboard.action";
import AnalyticsCard from "@/components/AnalyticsCard";
import DailyBlogsChart from "@/components/DailyBlogsChart";

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const { analytics, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchAnalyticsAction());
  }, [dispatch]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your admin panel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <AnalyticsCard
          title="Total Users"
          value={analytics.totalUsers}
          icon={Users}
          render="/users"
        />

        <AnalyticsCard
          title="Total Blogs"
          value={analytics.totalBlogs}
          icon={FileText}
          render="/blogs"
        />

        <AnalyticsCard
          title="Pending Blogs"
          value={analytics.pendingBlogs}
          icon={Clock}
          render="/pendingBlogs"
        />

        <AnalyticsCard
          title="Approved Blogs"
          value={analytics.approvedBlogs}
          icon={CheckCircle}
          render="/approvedBlogs"
        />

        <AnalyticsCard
          title="Rejected Blogs"
          value={analytics.rejectedBlogs}
          icon={XCircle}
          render="/rejectedBlogs"
        />
      </div>

      <DailyBlogsChart data={analytics.dailyBlogs || []} />
    </div>
  );
};

export default DashboardPage;