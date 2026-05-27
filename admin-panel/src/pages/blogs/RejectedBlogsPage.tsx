import type { FC } from "react";
import { useBlog } from "@/hooks/useBlog";
import BlogTablePage from "@/components/BlogTable";

const RejectedBlogsPage: FC = () => {
  const { fetchRejectedBlogs } = useBlog();

  return (
    <BlogTablePage
      title="Rejected Blogs"
      type = "rejected"
      description="Manage rejected blog posts"
      fetchBlogs={fetchRejectedBlogs}
    />
  );
};

export default RejectedBlogsPage;