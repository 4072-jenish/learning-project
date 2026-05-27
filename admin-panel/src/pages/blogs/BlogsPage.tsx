import type { FC } from "react";
import { useBlog } from "@/hooks/useBlog";
import BlogTablePage from "@/components/BlogTable";

const BlogsPage: FC = () => {
  const { fetchAllBlogs } = useBlog();

  return (
    <BlogTablePage
      title="All Blogs"
      description="Manage all blog posts"
      type="all"
      fetchBlogs={fetchAllBlogs}
      showAddButton
    />
  );
};

export default BlogsPage;