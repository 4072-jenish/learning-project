import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

export const fetchAllUsersAction = createAsyncThunk(
  "user/fetchAll", async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const fetchUserAction = createAsyncThunk(
  "user/fetchOne", async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "user/update",  async ( { id, body }: { id: string; body: any }, { rejectWithValue } ) => {
    try {
      const response = await api.patch(`/users/${id}`, body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue( error.response?.data?.message || "Failed to update user"  );
    }
  }
);
export const deleteUserAction = createAsyncThunk(
  "user/delete", async (id: string, { rejectWithValue }) => {
      try {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete user");
      }
  }
);

export const approveUserAction = createAsyncThunk(
    "user/approve", async ( id: string, { rejectWithValue } ) => {
      try {
        const response = await api.patch( `/admin/users/${id}/approve` );
        return response.data;
      } catch (error: any) {
        return rejectWithValue( error.response?.data?.message || "Failed to approve user");
      }
    }
  );

export const rejectUserAction = createAsyncThunk(
    "user/reject", async ( id: string, { rejectWithValue } ) => {
      try {
        const response = await api.patch( `/admin/users/${id}/reject` );
        return response.data;
      } catch (error: any) {
        return rejectWithValue( error.response?.data?.message || "Failed to reject user");
      }
    }
  );