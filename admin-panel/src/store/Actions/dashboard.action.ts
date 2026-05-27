import api from "@/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAnalyticsAction = createAsyncThunk(
  "dashboard/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/analytics");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch analytics"
      );
    }
  }
);