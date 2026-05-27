import { createSlice } from "@reduxjs/toolkit";
import { fetchAnalyticsAction } from "../Actions/dashboard.action";

interface DashboardState {
  analytics: {
    totalUsers: number;
    totalBlogs: number;
    pendingBlogs: number;
    approvedBlogs: number;
    rejectedBlogs: number;
    dailyBlogs: {
      date: string;
      blogs: string | number;
    }[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  analytics: {
    totalUsers: 0,
    totalBlogs: 0,
    pendingBlogs: 0,
    approvedBlogs: 0,
    rejectedBlogs: 0,
    dailyBlogs: [],
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalyticsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;