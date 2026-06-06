"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import BlogCard from "@/components/blogCard";
import { fetchRejcetedBlogs } from "@/store/features/blog/blogApi";
import { motion } from "framer-motion";
import PrivateRoute from "@/components/PrivateRoute";
import ownData from "@/utils/ownData";

export default function RejectedBlogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(fetchRejcetedBlogs());
  }, [dispatch]);
  const myBlogs = blogs.filter(ownData);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <div className="w-16 h-16 border-4 border-purple-500 border-b-transparent rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: "reverse" }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-xl p-8 text-center">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Blogs
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {myBlogs.map((blog, idx) => (
              <motion.div key={blog.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}