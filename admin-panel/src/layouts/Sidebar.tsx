import { useState, type FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All-Blogs",
    path: "/blogs",
    icon: FileText,
  },
  {
    title: "Requested-Blogs",
    path: "/pendingBlogs",
    icon: FileText,
  },
  {
    title: "Approved-Blogs",
    path: "/approvedBlogs",
    icon: FileText,
  },
  {
    title: "Rejected-Blogs",
    path: "/rejectedBlogs",
    icon: FileText,
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
];

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navigation = (
    <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-muted",
                isActive
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="border-t p-4">
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
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
            <div className="flex h-full flex-col bg-background">
              <div className="border-b px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Admin Panel
                </p>
                <h3 className="mt-2 text-lg font-bold">Blog Management</h3>
              </div>

              {navigation}
              {footer}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden h-screen w-72 shrink-0 flex-col border-r bg-background lg:flex">
        <div className="border-b px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Admin Panel
          </p>
          <h3 className="mt-2 text-lg font-bold">Blog Management</h3>
        </div>

        {navigation}
        {footer}
      </aside>
    </>
  );
};

export default Sidebar;