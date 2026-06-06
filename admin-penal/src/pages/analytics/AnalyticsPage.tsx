import type { JSX } from "react";

const AnalyticsPage = (): JSX.Element => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Insights
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">Analytics Page</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Analytics panels can now be placed inside a responsive container without clipping on small screens.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsPage;