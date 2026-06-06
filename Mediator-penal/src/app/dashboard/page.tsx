"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import PrivateRoute from "@/components/PrivateRoute";
import BlogCard from "@/components/blogCard";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBlogs } from "@/store/features/blog/blogApi";
import ownData from "@/utils/ownData";



export default function DashboardPage() {

  const dispatch =
    useDispatch<AppDispatch>();


  const {
    blogs,
    loading,
    error,
  } = useSelector(
    (state: RootState) => state.blog
  );


  useEffect(() => {

    dispatch(fetchBlogs());

  }, [dispatch]);

  const myBlogs  = blogs.filter(ownData);
  

  return (

    <PrivateRoute>

      <div className="min-h-screen py-20 px-5">

        <div className="max-w-7xl mx-auto">


          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: -40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-12"
          >

            <h1 className="
              text-5xl
              font-bold
              bg-gradient-to-r
              from-blue-600
              via-purple-600
              to-pink-600
              bg-clip-text
              text-transparent
              mb-4
            ">
              Dashboard
            </h1>

            <p className="text-gray-700 text-lg">
              Manage your blogs here.
            </p>

          </motion.div>


          {/* LOADING */}
          {loading && (

            <div className="
              flex
              justify-center
              items-center
              py-20
            ">

              <div className="
                w-14
                h-14
                border-4
                border-purple-500
                border-t-transparent
                rounded-full
                animate-spin
              " />

            </div>
          )}


          {/* ERROR */}
          {error && (

            <div className="
              glass-card
              p-6
              rounded-2xl
              text-center
            ">
              <p className="text-red-500">
                {error}
              </p>

            </div>
          )}


          {/* BLOGS */}
          {!loading &&
            !error && (

              <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
              items-start
            ">

                {myBlogs.length > 0 ? (

                  myBlogs.map((blog, idx) => (

                    <motion.div
                      key={blog.id}
                      initial={{
                        opacity: 0,
                        y: 40,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: idx * 0.08,
                      }}
                    >

                      <BlogCard
                        blog={blog}
                        showActions
                      />

                    </motion.div>
                  ))

                ) : (

                  <div className="
                  col-span-full
                  text-center
                  py-20
                ">

                    <h2 className="
                    text-3xl
                    font-bold
                    text-gray-700
                    mb-3
                  ">
                      No Blogs Found
                    </h2>

                    <p className="text-gray-500">
                      Start creating your first blog 🚀
                    </p>

                  </div>
                )}

              </div>
            )}

        </div>

      </div>

    </PrivateRoute>
  );
}