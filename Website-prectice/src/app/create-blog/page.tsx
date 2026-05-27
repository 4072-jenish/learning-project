"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createBlog } from "@/store/features/blog/blogApi";
import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";
import PrivateRoute from "@/components/PrivateRoute";

interface CreateBlogForm {
  title: string;
  content: string;
}

export default function CreateBlogPage() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateBlogForm>();

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CreateBlogForm) => {
    try {
      setLoading(true);
      await dispatch(createBlog({ title: data.title, content: data.content, image }));
      alert("Blog created successfully");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen flex items-center justify-center py-20 px-5">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-2xl p-8 space-y-6">
            <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Blog</h1>

            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
                <button type="button" onClick={() => { setImage(null); setPreview(""); }} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm">Remove</button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-500">Click to upload image</span>
                <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
              </label>
            )}

            <input type="text" placeholder="Blog Title" {...register("title", { required: "Title is required" })} className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

            <textarea placeholder="Blog Content" rows={10} {...register("content", { required: "Content is required" })} className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none" />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating...</> : "Create Blog"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </PrivateRoute>
  );
}