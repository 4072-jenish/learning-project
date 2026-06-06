import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { loginAdminAction, signUpAdminAction } from "@/store/Actions/auth.action";
import { logout, clearAuthError } from "@/store/Reducer/auth.reducer";
import type { LoginFormValues } from "@/types";
import { useAppDispatch } from "./useAppDispatch";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  return {
    ...auth,

    loginAdmin: (body: LoginFormValues) => dispatch(loginAdminAction(body)),

    signUpAdmin: (body: LoginFormValues) => dispatch(signUpAdminAction(body)),

    logout: () => dispatch(logout()),

    clearAuthError: () => dispatch(clearAuthError()),
  };
};