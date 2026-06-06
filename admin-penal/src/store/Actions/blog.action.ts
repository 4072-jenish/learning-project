import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

export const fetchAllBlogsAction = createAsyncThunk(
  "blog/fetchAll", async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("admin/blogs");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch blogs");
    }
  }
);

export const fetchBlogAction = createAsyncThunk(
  "blog/fetchOne", async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blog/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch blog");
    }
  }
);

export const createBlogAction = createAsyncThunk(
  "blog/create", async (body: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/blog", body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create blog");
    }
  }
);

export const updateBlogAction = createAsyncThunk(
  "blog/update", async ({ id, body }: { id: string; body: any }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/blog/${id}`, body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update blog");
    }
  }
);

export const deleteBlogAction = createAsyncThunk(
  "blog/delete", async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/blog/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete blog");
    }
  }
);

export const approveBlogAction = createAsyncThunk(
  "blog/approve", async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.patch( `/admin/blogs/${id}/approve` );
      return response.data;
    } catch (error: any) {
      return rejectWithValue( error.response?.data?.message || "Failed to approve blog" );
    }
  }
);

export const rejectBlogAction = createAsyncThunk(
  "blog/reject", async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.patch( `/admin/blogs/${id}/reject` );
      return response.data;
    } catch (error: any) {
      return rejectWithValue( error.response?.data?.message || "Failed to reject blog" );
    } 
  }
);

export const approvedBlogsAction = createAsyncThunk(
  "blogs/approved", async (_, { rejectWithValue }) => {
    try {
      const response = await api.get( `/admin/approved/blogs` );
      return response.data;
    } catch (error: any) {
      return rejectWithValue( error.response?.data?.message || "Failed to reject blog" );
    } 
  }
);

export const rejectedBlogsAction = createAsyncThunk(
  "blogs/rejected", async (_, { rejectWithValue }) => {
    try {
      const response = await api.get( `/admin/rejected/blogs` );
      return response.data;
    } catch (error: any) {
      return rejectWithValue( error.response?.data?.message || "Failed to reject blog" );
    } 
  }
);

export const pendingBlogsAction = createAsyncThunk(
  "blogs/pending", async (_, { rejectWithValue }) => {
    try {
      const response = await api.get( `/admin/pending/blogs` );
      return response.data;
    } catch (error: any) {
      return rejectWithValue( error.response?.data?.message || "Failed to reject blog" );
    } 
  }
);

export const searchBlogsAction = createAsyncThunk(
  "blogs/search", async (title: string, { rejectWithValue }) => {
    try {
      const response = await api.get( `/admin/blogs/search?title=${title}` );
      return response.data;
    } catch (error: any) {
      return rejectWithValue( error.response?.data?.message || "Failed to reject blog" );
    }
  }
);