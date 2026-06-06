import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  const auth = useSelector( (state: RootState) => state.auth );
  const isAuthenticated = auth.isAuthenticated || !!auth.token || !!localStorage.getItem("token");

  if (isAuthenticated) {
    return ( <Navigate to="/dashboard" replace /> );
  }

  return <>{children}</>;
};

export default PublicLayout;