"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Zap } from "lucide-react";

export default function HomePage() {
  return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-5 relative overflow-hidden">
        {/* Animated orb */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full filter blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="inline-block mb-6">
            <Sparkles className="w-16 h-16 text-blue-500" />
          </motion.div>
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Blog App
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 max-w-2xl text-lg mb-8"
        >
          Fullstack blog platform built using NestJS, TypeORM, PostgreSQL, Next.js, Redux Toolkit, and Cloudinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-5"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/blogs" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl overflow-hidden flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              <span>Explore Blogs</span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" initial={{ x: "100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/create-blog" className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-all flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Create Blog
            </Link>
          </motion.div>
        </motion.div>
      </div>
  );
}