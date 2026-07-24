import type { FC } from "react";
import { useEffect, useState } from "react";
import { Check, Edit, FileText, Plus, Trash2, X, Search, Filter, ChevronDown, Eye } from "lucide-react";
import { toast } from "sonner";
import type { IBlog } from "@/types";
import { useBlog } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { avatarGradient, cn, formatDate, getInitials } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchBar from "./SearchBar";

type BlogPageType = "all" | "pending" | "approved" | "rejected";

interface BlogTablePageProps {
  title: string;
  description: string;
  fetchBlogs: () => void;
  type: BlogPageType;
  showAddButton?: boolean;
}

const BlogTablePage: FC<BlogTablePageProps> = ({
  title,
  description,
  fetchBlogs,
  type,
  showAddButton = false,
}) => {
  const {
    allBlogs = [],
    pendingBlogs = [],
    approvedBlogs = [],
    rejectedBlogs = [],
    searchedBlogs = [],
    loading,
    createBlog,
    updateBlog,
    deleteBlog,
    approveBlog,
    rejectBlog,
    searchBlogsByTitle,
  } = useBlog();

  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      fetchBlogs();
      return;
    }
    searchBlogsByTitle(debouncedSearch);
  }, [debouncedSearch, fetchBlogs, searchBlogsByTitle]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const normalBlogs: IBlog[] =
    (type === "all"
      ? allBlogs
      : type === "pending"
        ? pendingBlogs
        : type === "approved"
          ? approvedBlogs
          : rejectedBlogs) ?? [];

  let blogs: IBlog[] = search.trim() ? searchedBlogs : normalBlogs;

  // Apply status filter
  if (filterStatus !== "all" && !search.trim()) {
    blogs = blogs.filter((blog) => blog.status === filterStatus);
  }

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs, type]);

  const resetForm = () => {
    setSelectedBlog(null);
    setFormData({ title: "", content: "" });
  };

  const handleAdd = () => {
    resetForm();
    setOpen(true);
  };

  const handleEdit = (blog: IBlog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || "",
      content: blog.content || "",
    });
    setOpen(true);
  };

  const refreshAfterStatusChange = async () => {
    fetchBlogs();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedBlog) {
      await updateBlog(String(selectedBlog.id), formData);
      toast.success("Blog updated successfully");
    } else {
      await createBlog(formData);
      toast.success("Blog created successfully");
    }

    resetForm();
    setOpen(false);
    fetchBlogs();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    await deleteBlog(String(id));
    toast.success("Blog deleted successfully");
    fetchBlogs();
  };

  const handleApprove = async (id: number) => {
    await approveBlog(String(id));
    toast.success("Blog approved successfully");
    refreshAfterStatusChange();
  };

  const handleReject = async (id: number) => {
    await rejectBlog(String(id));
    toast.error("Blog rejected");
    refreshAfterStatusChange();
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30";
      case "rejected":
        return "bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        {showAddButton && (
          <Button 
            onClick={handleAdd} 
            className="w-full gap-2 sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/20 transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
            Add Blog
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{allBlogs.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-600 dark:text-yellow-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingBlogs.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm border-green-200 dark:border-green-800">
          <p className="text-sm text-green-600 dark:text-green-400">Approved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{approvedBlogs.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">Rejected</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{rejectedBlogs.length}</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <SearchBar value={search} onChange={setSearch} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 border-gray-200 hover:border-red-300 hover:bg-red-50 dark:border-gray-700 dark:hover:border-red-800 dark:hover:bg-red-900/20"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={cn("h-3 w-3 transition-transform", showFilters && "rotate-180")} />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {loading ? "Loading…" : `${blogs.length} blog${blogs.length === 1 ? "" : "s"}`}
          </span>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 border-b p-4 bg-gray-50 dark:bg-gray-900/50">
            <Button
              size="sm"
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              className={cn(
                filterStatus === "all" && "bg-gradient-to-r from-red-600 to-yellow-600 text-white hover:from-red-700 hover:to-yellow-700"
              )}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("pending")}
              className={cn(
                filterStatus === "pending" && "bg-yellow-500 text-white hover:bg-yellow-600"
              )}
            >
              Pending
            </Button>
            <Button
              size="sm"
              variant={filterStatus === "approved" ? "default" : "outline"}
              onClick={() => setFilterStatus("approved")}
              className={cn(
                filterStatus === "approved" && "bg-green-500 text-white hover:bg-green-600"
              )}
            >
              Approved
            </Button>
            <Button
              size="sm"
              variant={filterStatus === "rejected" ? "default" : "outline"}
              onClick={() => setFilterStatus("rejected")}
              className={cn(
                filterStatus === "rejected" && "bg-red-500 text-white hover:bg-red-600"
              )}
            >
              Rejected
            </Button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-gradient-to-r from-red-50 to-yellow-50 hover:bg-gradient-to-r hover:from-red-100 hover:to-yellow-100 dark:from-red-950/20 dark:to-yellow-950/20 dark:hover:from-red-950/30 dark:hover:to-yellow-950/30">
                <TableHead className="w-16 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  ID
                </TableHead>
                <TableHead className="py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Title
                </TableHead>
                <TableHead className="py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Author
                </TableHead>
                <TableHead className="py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Created
                </TableHead>
                <TableHead className="py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Status
                </TableHead>
                <TableHead className="py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <TableCell key={j} className="py-4">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : blogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-red-100 to-yellow-100 dark:from-red-900/20 dark:to-yellow-900/20">
                        <FileText className="h-6 w-6 text-red-500 dark:text-red-400" />
                      </div>
                      <p className="text-sm font-medium">No blogs found</p>
                      <p className="text-xs">
                        {search.trim()
                          ? "Try a different search term."
                          : "Blogs will appear here once created."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                blogs.map((blog: IBlog) => (
                  <TableRow
                    key={blog.id}
                    className="group border-b border-border/60 transition-all duration-200 hover:bg-red-50/50 hover:shadow-sm dark:hover:bg-red-950/10"
                  >
                    <TableCell className="py-4">
                      <span className="inline-flex items-center rounded-md bg-gradient-to-r from-red-100 to-yellow-100 px-2.5 py-0.5 font-mono text-xs font-medium text-gray-700 dark:from-red-900/30 dark:to-yellow-900/30 dark:text-gray-300">
                        #{blog.id}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[20rem] py-4">
                      <p className="truncate font-semibold text-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {blog.title}
                      </p>
                      {blog.content && (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {blog.content}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white shadow-sm ring-2 ring-white dark:ring-gray-800",
                            avatarGradient(blog.author?.name)
                          )}
                        >
                          {getInitials(blog.author?.name)}
                        </span>
                        <span className="text-sm font-medium">
                          {blog.author?.name || "Unknown"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-sm text-muted-foreground">
                      {formatDate(blog.createdAt)}
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                        getStatusColor(blog.status)
                      )}>
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <div className="flex flex-wrap items-center justify-end gap-1.5 opacity-90 transition-opacity group-hover:opacity-100">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                          aria-label="View blog"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {blog.status !== "approved" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 gap-1 px-2 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300"
                            onClick={() => handleApprove(blog.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="hidden sm:inline text-xs">Approve</span>
                          </Button>
                        )}

                        {blog.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 gap-1 px-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-900/20 dark:hover:text-rose-300"
                            onClick={() => handleReject(blog.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="hidden sm:inline text-xs">Reject</span>
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700 dark:border-gray-700 dark:hover:border-yellow-600 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-400"
                          aria-label="Edit blog"
                          onClick={() => handleEdit(blog)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-200 hover:border-red-400 hover:bg-red-50 hover:text-red-700 dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                          aria-label="Delete blog"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t p-4 bg-gray-50/50 dark:bg-gray-900/30">
          <p className="text-xs text-muted-foreground">
            Showing {blogs.length} of {normalBlogs.length} entries
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1 border-gray-200 dark:border-gray-700">
              Previous
            </Button>
            <Button size="sm" className="h-8 gap-1 bg-gradient-to-r from-red-600 to-yellow-600 text-white hover:from-red-700 hover:to-yellow-700">
              1
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1 border-gray-200 dark:border-gray-700">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) resetForm();
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
              {selectedBlog ? "Edit Blog" : "Add Blog"}
            </DialogTitle>
            <DialogDescription>
              {selectedBlog
                ? "Update the blog details below."
                : "Fill in the details to create a new blog post."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <Input
                placeholder="Enter blog title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="border-gray-200 focus:border-red-400 focus:ring-red-400 dark:border-gray-700 dark:focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <Textarea
                placeholder="Write your blog content here..."
                className={cn(
                  "min-h-32 border-gray-200 focus:border-red-400 focus:ring-red-400 dark:border-gray-700 dark:focus:border-red-500"
                )}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white shadow-lg shadow-red-600/20 transition-all duration-300"
            >
              {selectedBlog ? "Update Blog" : "Create Blog"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogTablePage;