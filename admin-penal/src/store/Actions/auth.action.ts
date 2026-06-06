import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import type { LoginFormValues } from "@/types";

export const loginAdminAction = createAsyncThunk(
  "auth/loginAdmin", async (body: LoginFormValues, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const signUpAdminAction = createAsyncThunk(
  "auth/signUpAdmin", async (body: LoginFormValues, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);