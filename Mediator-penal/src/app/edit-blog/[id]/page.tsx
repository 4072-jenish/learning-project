"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import PrivateRoute from "@/components/PrivateRoute";

interface EditBlogForm {
  title: string;
  content: string;
}

interface Blog {
  title: string;
  content: string;
  imageUrl?: string;
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditBlogPage({ params }: Props) {

  const [loading, setLoading] = useState(true);

  const [blog, setBlog] = useState<Blog | null>(null);

  const [image, setImage] =  useState<File | null>(null);


  const {
    register,
    handleSubmit,
    reset,
  } = useForm<EditBlogForm>();


  // FETCH BLOG
  useEffect(() => {

    async function fetchBlog() {

      try {

        const resolvedParams =
          await params;

        const res = await api.get(
          `/blog/${resolvedParams.id}`
        );

        setBlog(res.data.blog);

        reset({
          title: res.data.blog.title,
          content: res.data.blog.content,
        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchBlog();

  }, [params, reset]);


  // UPDATE BLOG
  async function onSubmit(data: EditBlogForm) {
    try {
      const resolvedParams = await params;
      let imageUrl = blog?.imageUrl || "";

      if (image) {
        const formData = new FormData();

        formData.append("image", image);
        formData.append("oldImageUrl", blog?.imageUrl || "");

        const uploadRes = await api.post(
          "/upload/update",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      const updatedBlog = {
        title: data.title,
        content: data.content,
        imageUrl,
      };

      await api.patch(`/blog/${resolvedParams.id}`, updatedBlog);

      alert("Blog updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update blog");
    }
  }
  
  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }


  return (
    <PrivateRoute>
      <div className="flex justify-center py-10">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl border p-8 rounded-2xl space-y-5"
        >

          <h1 className="text-4xl font-bold">
            Edit Blog
          </h1>

          {blog?.imageUrl && (

            <img
              src={blog.imageUrl}
              alt="Blog"
              className="w-full h-64 object-cover rounded-xl"
            />
          )}
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full border p-3 rounded-lg"
          />
          <textarea
            placeholder="Content"
            rows={10}
            {...register("content")}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              if (e.target.files?.[0]) {

                setImage(
                  e.target.files[0]
                );
              }
            }}
            className="w-full"
          />


          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Update Blog
          </button>

        </form>

      </div>
    </PrivateRoute>
  );
}