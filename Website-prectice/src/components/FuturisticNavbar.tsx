"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ChevronDown, FileCheck, FileX, Clock, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FuturisticNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isBlogsDropdownOpen, setIsBlogsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.blogs-dropdown')) {
        setIsBlogsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  const mainLinks = [
    { href: "/blogs", label: "Home" },
    { href: "/create-blog", label: "Create Blog" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const blogsDropdownLinks = [
    { href: "/blogs/myBlogs", label: "My Blogs", icon: null },
    { href: "/blogs/approvedBlogs", label: "Approved", icon: FileCheck, color: "text-green-600" },
    { href: "/blogs/rejectedBlogs", label: "Rejected", icon: FileX, color: "text-red-600" },
    { href: "/blogs/requestedBlogs", label: "Requested", icon: Clock, color: "text-yellow-600" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-6 h-6 text-purple-600" />
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                FuturisticBlog
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {mainLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Blogs Dropdown */}
            <div className="relative blogs-dropdown">
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBlogsDropdownOpen(!isBlogsDropdownOpen);
                }}
                className="flex items-center gap-1 text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                My Owned Blogs
                <motion.div
                  animate={{ rotate: isBlogsDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isBlogsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/20"
                  >
                    {blogsDropdownLinks.map((link, idx) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsBlogsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 transition-colors"
                        >
                          {link.icon && (
                            <link.icon className={`w-4 h-4 ${link.color || ''}`} />
                          )}
                          <span>{link.label}</span>
                        </Link>
                        {idx < blogsDropdownLinks.length - 1 && (
                          <div className="border-b border-gray-100 mx-4" />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setIsUserDropdownOpen(!isUserDropdownOpen)
                }
                className="
                   w-10
                   h-10
                   rounded-full
                   bg-gradient-to-r
                   from-blue-600
                   to-purple-600
                   flex
                   items-center
                   justify-center
                   text-white
                   shadow-lg
                 "
                >
                <User className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    transition={{ duration: 0.2 }}
                    className="
                       absolute
                       right-0
                       mt-3
                       w-48
                       bg-white/95
                       backdrop-blur-md
                       rounded-xl
                       shadow-xl
                       overflow-hidden
                       border
                       border-white/20
                     "
                    >
                    <button
                      onClick={handleLogout}
                      className="
                         w-full
                         flex
                         items-center
                         gap-3
                         px-4
                         py-3
                         text-red-500
                         hover:bg-red-50
                         transition-colors
                       "
                      >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu with Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md shadow-xl rounded-b-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-5 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Blogs Section with Nested Dropdown */}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <div className="px-5 py-3 text-gray-700 font-medium">
                Blogs
              </div>
              <div className="pl-6 space-y-1">
                {blogsDropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-5 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon && (
                      <link.icon className={`w-4 h-4 ${link.color || ''}`} />
                    )}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}