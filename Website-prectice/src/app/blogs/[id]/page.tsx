"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    name: string;
  };
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function SingleBlogPage({ params }: Props) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function fetchBlog() {
      try {
        const resolvedParams = await params;
        const res = await api.get( `/blog/${resolvedParams.id}` );
        setBlog(res.data.blog);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();

  }, [params]);


  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-10">
        Blog not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 bg-white rounded-2xl ">

      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-2xl mb-8"
        />
      )}

      <h1 className="text-5xl font-bold mb-5">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-10">
        By {blog.author.name}
      </p>

      <p className="text-lg leading-8">
        {blog.content}
      </p>

      <button 
      onClick={() => router.back()}
      className="bg-black text-white font-bold py-2 px-4 rounded">Back</button>
    </div>
  );
}