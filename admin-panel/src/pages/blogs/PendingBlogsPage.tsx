import type { FC } from "react";
import { useBlog } from "@/hooks/useBlog";
import BlogTablePage from "@/components/BlogTable";

const PendingBlogsPage: FC = () => {
  const { fetchPendingBlogs } = useBlog();

  return (
    <BlogTablePage
      title="Requested Blogs"
      type="pending"
      description="Review pending blog requests"
      fetchBlogs={fetchPendingBlogs}
    />
  );
};

export default PendingBlogsPage;