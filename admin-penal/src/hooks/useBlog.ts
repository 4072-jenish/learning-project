import { useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useAppDispatch } from "./useAppDispatch";
import {
  fetchAllBlogsAction,
  fetchBlogAction,
  createBlogAction,
  updateBlogAction,
  deleteBlogAction,
  approveBlogAction,
  rejectBlogAction,
  approvedBlogsAction,
  rejectedBlogsAction,
  pendingBlogsAction,
  searchBlogsAction,
} from "@/store/Actions/blog.action";

export const useBlog = () => {
  const dispatch = useAppDispatch();
  const blog = useSelector((state: RootState) => state.blog);
  const fetchAllBlogs = useCallback(
    () => dispatch(fetchAllBlogsAction()),
    [dispatch]
  );

  const fetchBlog = useCallback(
    (id: string) => dispatch(fetchBlogAction(id)),
    [dispatch]
  );

  const createBlog = useCallback(
    (body: any) => dispatch(createBlogAction(body)),
    [dispatch]
  );

  const updateBlog = useCallback(
    (id: string, body: any) => dispatch(updateBlogAction({ id, body })),
    [dispatch]
  );

  const deleteBlog = useCallback(
    (id: string) => dispatch(deleteBlogAction(id)),
    [dispatch]
  );

  const approveBlog = useCallback(
    (id: string) => dispatch(approveBlogAction(id)),
    [dispatch]
  );

  const rejectBlog = useCallback(
    (id: string) => dispatch(rejectBlogAction(id)),
    [dispatch]
  );

  const fetchApprovedBlogs = useCallback(
    () => dispatch(approvedBlogsAction()),
    [dispatch]
  );

  const fetchRejectedBlogs = useCallback(
    () => dispatch(rejectedBlogsAction()),
    [dispatch]
  );

  const fetchPendingBlogs = useCallback(
    () => dispatch(pendingBlogsAction()),
    [dispatch]
  );

  const searchBlogsByTitle = useCallback(
    (title: string) => dispatch(searchBlogsAction(title)),
    [dispatch]
  )

  return {
    ...blog,
    fetchAllBlogs,
    fetchBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    approveBlog,
    rejectBlog,
    fetchApprovedBlogs,
    fetchRejectedBlogs,
    fetchPendingBlogs,
    searchBlogsByTitle,
  };
};