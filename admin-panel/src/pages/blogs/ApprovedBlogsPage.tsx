import BlogTablePage from "@/components/BlogTable";
import { useBlog } from "@/hooks/useBlog";

const ApprovedBlogsPage = () => {
      const { fetchApprovedBlogs } = useBlog();
  return (
    <BlogTablePage
      title="Approved Blogs"
      type="approved"
      description="Manage published blogs"
      fetchBlogs={fetchApprovedBlogs}
    />
  );
};

export default ApprovedBlogsPage;