import { useState, type FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FileClock,
  FileCheck2,
  FileX2,
  Users,
  BarChart3,
  LogOut,
  Menu,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

interface MenuItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { title: "Analytics", path: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Content",
    items: [
      { title: "All Blogs", path: "/blogs", icon: FileText },
      { title: "Requested", path: "/pendingBlogs", icon: FileClock },
      { title: "Approved", path: "/approvedBlogs", icon: FileCheck2 },
      { title: "Rejected", path: "/rejectedBlogs", icon: FileX2 },
    ],
  },
  {
    label: "Management",
    items: [{ title: "Users", path: "/users", icon: Users }],
  },
];

const getStoredAdmin = (): { name?: string; email?: string } => {
  try {
    const raw = localStorage.getItem("admin");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const admin = getStoredAdmin();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/");
  };

  const brand = (
    <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
        <ShieldCheck className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <h3 className="text-base font-semibold text-sidebar-foreground">
          Admin Panel
        </h3>
        <p className="text-xs text-muted-foreground">Blog Management</p>
      </div>
    </div>
  );

  const navigation = (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
      {menuGroups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
            {group.label}
          </p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary/10 text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cn(
                          "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary transition-all",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.title}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  const footer = (
    <div className="border-t border-sidebar-border p-3">
      <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
        <Avatar size="sm">
          <AvatarFallback className="bg-sidebar-primary/15 text-sidebar-primary">
            {getInitials(admin.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-medium text-sidebar-foreground">
            {admin.name || "Administrator"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {admin.email || "admin@panel.com"}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:bg-destructive/10 hover:text-destructive"
        onClick={() => {
          handleLogout();
          setOpen(false);
        }}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );

  return (
    <>
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-50 shadow-sm"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
              {brand}
              {navigation}
              {footer}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:flex">
        {brand}
        {navigation}
        {footer}
      </aside>
    </>
  );
};

export default Sidebar;
