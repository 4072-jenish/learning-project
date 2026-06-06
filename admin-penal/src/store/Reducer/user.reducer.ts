import { createSlice } from "@reduxjs/toolkit";
import {
  approveUserAction,
  deleteUserAction,
  fetchAllUsersAction,
  fetchUserAction,
  rejectUserAction,
  updateUserAction,
} from "../Actions/user.action";

import type { IUser } from "@/types";

interface UserState {
  users: IUser[];
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL USERS
      .addCase(fetchAllUsersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchAllUsersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // SINGLE USER
      .addCase(fetchUserAction.fulfilled, (state, action) => {
        state.user = action.payload.user || action.payload;
      })

      // UPDATE USER
      .addCase(updateUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.loading = false;

        const updatedUser = action.payload.user || action.payload;

        state.user = updatedUser;

        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE USER
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user.id !== Number(action.payload)
        );
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(approveUserAction.fulfilled, (state, action) => {
        const updatedUser = action.payload.user || action.payload;
        state.users = state.users.map((user) => user.id === updatedUser.id
            ? updatedUser
            : user
        );
      })

      .addCase(rejectUserAction.fulfilled, (state, action) => {
        const updatedUser = action.payload.user || action.payload;
        state.users = state.users.map((user) => user.id === updatedUser.id
            ? updatedUser
            : user
        );
      })
  },
});

export const { clearUserError } = userSlice.actions;

export default userSlice.reducer;