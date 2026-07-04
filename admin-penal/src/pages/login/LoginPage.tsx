// src/pages/login/LoginPage.tsx

import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAdmin } from "@/api/auth.api";
import type { ApiErrorResponse, ILoginResponse, LoginFormValues } from "@/types";

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response: ILoginResponse = await loginAdmin(formData);

      if (response.user.role === "admin") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("admin", JSON.stringify(response.user));
        navigate("/dashboard");
      } else {
        setError("You are not authorized to access the admin panel.");
      }
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>

        <div className="relative">
          <h2 className="max-w-sm text-3xl font-bold leading-tight text-primary-foreground">
            Manage your blog platform with ease.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/80">
            Review submissions, moderate content, and keep track of your
            community — all from one place.
          </p>
        </div>

        <p className="relative text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} Blog Management
        </p>
      </div>

      <div className="flex items-center justify-center bg-muted/30 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm lg:hidden">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to access your admin dashboard
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
