import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useAppDispatch } from "./useAppDispatch";
import {
  approveUserAction,
    deleteUserAction,
  fetchAllUsersAction,
  fetchUserAction,
  rejectUserAction,
  updateUserAction,
} from "@/store/Actions/user.action";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);

  return {
    ...user,

    fetchAllUsers: () => dispatch(fetchAllUsersAction()),

    fetchUser: (id: string) => dispatch(fetchUserAction(id)),

    updateUser: (id: string, body: any) => dispatch(updateUserAction({ id, body })),

    deleteUser: (id: string) => dispatch(deleteUserAction(id)),

    approveUser: (id: string) => dispatch(approveUserAction(id)),

    rejectUser: (id: string) => dispatch(rejectUserAction(id)),
  };
};
