import type { FC, ReactNode } from "react";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      <main className="min-w-0 flex-1 px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:py-6 lg:pt-6">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;