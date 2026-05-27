import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBlogsAction,
  fetchBlogAction,
  createBlogAction,
  updateBlogAction,
  deleteBlogAction,
  approveBlogAction,
  rejectBlogAction,
  pendingBlogsAction,
  approvedBlogsAction,
  rejectedBlogsAction,
  searchBlogsAction,
} from "../Actions/blog.action";

import type { IBlog } from "@/types";

interface BlogState {
  allBlogs: IBlog[];
  pendingBlogs: IBlog[];
  approvedBlogs: IBlog[];
  rejectedBlogs: IBlog[];
  searchedBlogs: IBlog[];
  blog: IBlog | null;
  loading: boolean;
  error: string | null;
  loaded: {
    all: boolean;
    pending: boolean;
    approved: boolean;
    rejected: boolean;
  };
}

const initialState: BlogState = {
  allBlogs: [],
  pendingBlogs: [],
  approvedBlogs: [],
  rejectedBlogs: [],
  searchedBlogs: [],
  blog: null,
  loading: false,
  error: null,
  loaded: {
    all: false,
    pending: false,
    approved: false,
    rejected: false,
  },
};

const ensureLoaded = (state: BlogState) => {
  if (!state.loaded) {
    state.loaded = {
      all: false,
      pending: false,
      approved: false,
      rejected: false,
    };
  }
};

const getBlogsFromPayload = (payload: any): IBlog[] => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.blogs)) return payload.blogs;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.blogs)) return payload.data.blogs;

  return [];
};

const getBlogFromPayload = (payload: any): IBlog => {
  return payload?.blog || payload?.data?.blog || payload?.data || payload;
};

const updateBlogInList = (list: IBlog[], updatedBlog: IBlog) => {
  return list.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog));
};

const removeBlogFromList = (list: IBlog[], id: string | number) => {
  return list.filter((blog) => String(blog.id) !== String(id));
};

const blogSlice = createSlice({
  name: "blog",
  initialState,

  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },

    clearBlogs: (state) => {
      state.allBlogs = [];
      state.pendingBlogs = [];
      state.approvedBlogs = [];
      state.rejectedBlogs = [];

      state.loaded = {
        all: false,
        pending: false,
        approved: false,
        rejected: false,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchAllBlogsAction.pending, (state) => {
        ensureLoaded(state);
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogsAction.fulfilled, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.allBlogs = getBlogsFromPayload(action.payload);
        state.loaded.all = true;
      })
      .addCase(fetchAllBlogsAction.rejected, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH SINGLE
      .addCase(fetchBlogAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogAction.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = getBlogFromPayload(action.payload);
      })
      .addCase(fetchBlogAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE
      .addCase(createBlogAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogAction.fulfilled, (state, action) => {
        state.loading = false;
        const newBlog = getBlogFromPayload(action.payload);

        state.allBlogs.unshift(newBlog);

        if (newBlog.status === "pending") state.pendingBlogs.unshift(newBlog);
        if (newBlog.status === "approved") state.approvedBlogs.unshift(newBlog);
        if (newBlog.status === "rejected") state.rejectedBlogs.unshift(newBlog);
      })
      .addCase(createBlogAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateBlogAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogAction.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBlog = getBlogFromPayload(action.payload);

        state.allBlogs = updateBlogInList(state.allBlogs, updatedBlog);
        state.pendingBlogs = updateBlogInList(state.pendingBlogs, updatedBlog);
        state.approvedBlogs = updateBlogInList(state.approvedBlogs, updatedBlog);
        state.rejectedBlogs = updateBlogInList(state.rejectedBlogs, updatedBlog);

        state.blog = updatedBlog;
      })
      .addCase(updateBlogAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteBlogAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogAction.fulfilled, (state, action) => {
        state.loading = false;

        state.allBlogs = removeBlogFromList(state.allBlogs, action.payload);
        state.pendingBlogs = removeBlogFromList(state.pendingBlogs, action.payload);
        state.approvedBlogs = removeBlogFromList(state.approvedBlogs, action.payload);
        state.rejectedBlogs = removeBlogFromList(state.rejectedBlogs, action.payload);
      })
      .addCase(deleteBlogAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // APPROVE
      .addCase(approveBlogAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveBlogAction.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBlog = getBlogFromPayload(action.payload);

        state.allBlogs = updateBlogInList(state.allBlogs, updatedBlog);
        state.pendingBlogs = removeBlogFromList(state.pendingBlogs, updatedBlog.id);
        state.rejectedBlogs = removeBlogFromList(state.rejectedBlogs, updatedBlog.id);
        state.approvedBlogs = removeBlogFromList(state.approvedBlogs, updatedBlog.id);
        state.approvedBlogs.unshift(updatedBlog);
      })
      .addCase(approveBlogAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // REJECT
      .addCase(rejectBlogAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectBlogAction.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBlog = getBlogFromPayload(action.payload);

        state.allBlogs = updateBlogInList(state.allBlogs, updatedBlog);
        state.pendingBlogs = removeBlogFromList(state.pendingBlogs, updatedBlog.id);
        state.approvedBlogs = removeBlogFromList(state.approvedBlogs, updatedBlog.id);
        state.rejectedBlogs = removeBlogFromList(state.rejectedBlogs, updatedBlog.id);
        state.rejectedBlogs.unshift(updatedBlog);
      })
      .addCase(rejectBlogAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH PENDING
      .addCase(pendingBlogsAction.pending, (state) => {
        ensureLoaded(state);
        state.loading = true;
        state.error = null;
      })
      .addCase(pendingBlogsAction.fulfilled, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.pendingBlogs = getBlogsFromPayload(action.payload);
        state.loaded.pending = true;
      })
      .addCase(pendingBlogsAction.rejected, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH APPROVED
      .addCase(approvedBlogsAction.pending, (state) => {
        ensureLoaded(state);
        state.loading = true;
        state.error = null;
      })
      .addCase(approvedBlogsAction.fulfilled, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.approvedBlogs = getBlogsFromPayload(action.payload);
        state.loaded.approved = true;
      })
      .addCase(approvedBlogsAction.rejected, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH REJECTED
      .addCase(rejectedBlogsAction.pending, (state) => {
        ensureLoaded(state);
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectedBlogsAction.fulfilled, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.rejectedBlogs = getBlogsFromPayload(action.payload);
        state.loaded.rejected = true;
      })
      .addCase(rejectedBlogsAction.rejected, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.error = action.payload as string;
      })
       // SEARCH BLOGS
      .addCase(searchBlogsAction.pending, (state) => {
        ensureLoaded(state);
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBlogsAction.fulfilled, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.searchedBlogs = getBlogsFromPayload(action.payload);
      })
      .addCase(searchBlogsAction.rejected, (state, action) => {
        ensureLoaded(state);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBlogError, clearBlogs } = blogSlice.actions;

export default blogSlice.reducer;