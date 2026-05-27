"use client";

import Link from "next/link";
import { api } from "@/lib/axios";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
} from "lucide-react";
import { Blog } from "@/types/blog";

interface Props {
  blog: Blog;
  showActions?: boolean;
}

export default function BlogCard({
  blog,
  showActions = false,
}: Props) {

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/blog/${blog.id}`);
      alert("Blog deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="
        group
        w-full
        h-[480px]
        flex
        flex-col
        bg-white/90
        backdrop-blur-sm
        rounded-2xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
        border
        border-white/20
      "
    >
      {blog.imageUrl && (
        <div
          className="
            relative
            h-56
            flex-shrink-0
            overflow-hidden
          "
        >
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-transparent
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
            "
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1 overflow-hidden">
        <h2
          className="
            text-2xl
            font-bold
            text-gray-800
            line-clamp-2
            hover:text-purple-600
            transition-colors
            min-h-[4rem]
          "
        >
          {blog.title}
        </h2>

        <div
          className="
            flex
            items-center
            gap-4
            text-sm
            text-gray-500
            mt-2
            mb-3
            flex-shrink-0
          "
        >
          <div
            className="
              flex
              items-center
              gap-1
            "
          >
            <User className="w-4 h-4" />
            <span className="truncate max-w-[120px]">
              {blog.author?.name || "Anonymous"}
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-1
              flex-shrink-0
            "
          >
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(blog.createdAt || "").toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <p
            className="
              text-gray-600
              line-clamp-4
              leading-relaxed
            "
          >
            {blog.content?.length > 150
              ? `${blog.content.substring(0, 150)}...`
              : blog.content}
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-3
            pt-4
            mt-auto
            flex-shrink-0
          "
        >
          <Link href={`/blogs/${blog.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex
                items-center
                gap-2
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                text-white
                px-4
                py-2
                rounded-lg
                shadow-md
                hover:shadow-lg
                transition-all
              "
            >
              <Eye className="w-4 h-4" />
              View
            </motion.button>
          </Link>

          {showActions && (
            <>
              <Link href={`/edit-blog/${blog.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    flex
                    items-center
                    gap-2
                    border-2
                    border-yellow-500
                    text-yellow-500
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-yellow-500
                    hover:text-white
                    transition-all
                  "
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="
                  flex
                  items-center
                  gap-2
                  bg-gradient-to-r
                  from-red-500
                  to-red-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  hover:shadow-lg
                  transition-all
                "
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}