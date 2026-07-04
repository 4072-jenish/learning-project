import type { FC } from "react";
import { useEffect, useState } from "react";
import { Check, Edit, FileText, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import type { IBlog } from "@/types";
import { useBlog } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate, getInitials } from "@/lib/utils";
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

  const blogs: IBlog[] = search.trim() ? searchedBlogs : normalBlogs;

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

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        {showAddButton && (
          <Button onClick={handleAdd} className="w-full gap-2 sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Blog
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <span className="text-sm text-muted-foreground">
            {loading ? "Loading…" : `${blogs.length} blog${blogs.length === 1 ? "" : "s"}`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-16">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : blogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <FileText className="h-8 w-8 opacity-40" />
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
                  <TableRow key={blog.id} className="hover:bg-muted/30">
                    <TableCell className="text-muted-foreground">
                      #{blog.id}
                    </TableCell>
                    <TableCell className="max-w-[18rem]">
                      <p className="truncate font-medium">{blog.title}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(blog.author?.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {blog.author?.name || "Unknown"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(blog.createdAt)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={blog.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        {blog.status !== "approved" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-emerald-400"
                            onClick={() => handleApprove(blog.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="hidden sm:inline">Approve</span>
                          </Button>
                        )}

                        {blog.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 text-rose-600 hover:bg-rose-500/10 hover:text-rose-600 dark:text-rose-400"
                            onClick={() => handleReject(blog.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="hidden sm:inline">Reject</span>
                          </Button>
                        )}

                        <Button
                          size="icon-sm"
                          variant="outline"
                          aria-label="Edit blog"
                          onClick={() => handleEdit(blog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon-sm"
                          variant="destructive"
                          aria-label="Delete blog"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) resetForm();
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedBlog ? "Edit Blog" : "Add Blog"}</DialogTitle>
            <DialogDescription>
              {selectedBlog
                ? "Update the blog details below."
                : "Fill in the details to create a new blog post."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Blog title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Blog content"
                className={cn("min-h-32")}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="w-full">
              {selectedBlog ? "Update Blog" : "Create Blog"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogTablePage;
