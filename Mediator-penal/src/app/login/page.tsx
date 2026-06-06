"use client";

import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import PublicRoute from "@/components/PublicRoute";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {

  const {
    register,
    handleSubmit,
  } = useForm<LoginFormData>();


  async function onSubmit(data: LoginFormData) {

    try {

      const res = await api.post("/auth/login", data);

      console.log(res.data.user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);

      alert("Login failed");
    }
  }

  return (
    <PublicRoute>
      <div className="flex justify-center items-center min-h-screen">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border p-8 rounded-xl w-[400px] space-y-5"
        >

          <h1 className="text-3xl font-bold">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border p-3 rounded-lg w-full"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="border p-3 rounded-lg w-full"
          />

          <button
            type="submit"
            className="bg-black text-white w-full p-3 rounded-lg"
          >
            Login
          </button>

        </form>
      </div>
    </PublicRoute>
  );
}