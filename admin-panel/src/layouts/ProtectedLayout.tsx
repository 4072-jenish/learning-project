import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
  const tokenFromRedux = useSelector( (state: RootState) => state.auth.token );
  const tokenFromStorage = localStorage.getItem("token");
  const isAuthenticated = Boolean(tokenFromRedux || tokenFromStorage);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedLayout;