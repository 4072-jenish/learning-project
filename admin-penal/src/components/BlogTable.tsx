import type { FC } from "react";
import { useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { IBlog } from "@/types";
import { useBlog } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

  const normalBlogs: IBlog[] = (type === "all"
      ? allBlogs
      : type === "pending"
        ? pendingBlogs
        : type === "approved"
          ? approvedBlogs
          : rejectedBlogs) ?? [];

  const blogs: IBlog[] = search.trim()
    ? searchedBlogs
    : normalBlogs;

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
          <h3 className="text-2xl font-bold sm:text-3xl">{title}</h3>
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

      <div className="overflow-hidden rounded-xl border bg-card">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading blogs...
                </TableCell>
              </TableRow>
            ) : blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No blogs found
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog: IBlog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.id}</TableCell>
                  <TableCell className="max-w-[14rem] whitespace-normal break-words">
                    {blog.title}
                  </TableCell>
                  <TableCell>{blog.author?.name || "-"}</TableCell>
                  <TableCell>
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "-"}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{blog.status}</Badge>

                      {blog.status !== "approved" && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(blog.id)}
                        >
                          Approve
                        </Button>
                      )}

                      {blog.status !== "rejected" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(blog.id)}
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
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
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Blog title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <Textarea
              placeholder="Blog content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />

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