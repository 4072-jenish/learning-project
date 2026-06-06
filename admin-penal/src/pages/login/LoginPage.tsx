// src/pages/login/LoginPage.tsx

import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { loginAdmin } from "@/api/auth.api";
import type { ApiErrorResponse, ILoginResponse, LoginFormValues } from "@/types";
import { Dialog } from "@/components/ui/dialog";


const LoginPage: FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormValues>({
      email: "",
      password: "",
    });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response: ILoginResponse = await loginAdmin(formData);

      // store tokens
      localStorage.setItem("token", response.token );
      if (response.user.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(response.user));
      }else{
        <Dialog/>
        console.log("Not authorized !");
      }
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      setError( error.response?.data?.message || "Login failed" );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-muted px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Login to access dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email
              </label>

              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Password
              </label>

              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;