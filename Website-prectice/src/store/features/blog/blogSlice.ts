import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog } from "@/types/blog";

interface BlogState {
  blogs: Blog[];
  approvedBlogs: Blog[];
  rejectedBlogs: Blog[];
  pendingBlogs: Blog[];
  blog: Blog | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  approvedBlogs: [],
  rejectedBlogs: [],
  pendingBlogs: [],
  blog: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.blogs = action.payload;
    },

    setBlog: (state, action: PayloadAction<Blog | null>) => {
      state.blog = action.payload;
    },

    setApprovedBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.approvedBlogs = action.payload;
    },
    setRejectedBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.rejectedBlogs = action.payload;
    },
    setPendingBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.pendingBlogs = action.payload;
    },

    updateBlogInState: (state, action: PayloadAction<Blog>) => {
      const updatedBlog = action.payload;
      state.blog = action.payload;

      state.blogs = state.blogs.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
      state.approvedBlogs = state.approvedBlogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );

      state.rejectedBlogs = state.rejectedBlogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );

      state.pendingBlogs = state.pendingBlogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setLoading, 
  setBlogs, 
  setApprovedBlogs,
  setPendingBlogs,
  setRejectedBlogs,
  setBlog, 
  updateBlogInState, 
  setError 
} = blogSlice.actions;

export default blogSlice.reducer;