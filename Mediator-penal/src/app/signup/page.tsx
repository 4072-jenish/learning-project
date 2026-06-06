"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { api } from "@/lib/axios";
import PublicRoute from "@/components/PublicRoute";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export default function SignupPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupForm>();


  async function onSubmit(
    data: SignupForm
  ) {

    try {

      setLoading(true);

      const res =
        await api.post(
          "/auth/signup",
          data
        );

      console.log(res.data);

      alert(
        "Signup successful"
      );

      reset();

      router.push("/login");

    } catch (error) {

      console.log(error);

      alert(
        "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  }


  return (
    <PublicRoute>
      <div className="flex justify-center items-center min-h-screen px-5">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md border p-8 rounded-2xl space-y-5"
        >

          <h1 className="text-4xl font-bold text-center">
            Signup
          </h1>
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required:
                  "Name is required",
              })}
              className="w-full border p-3 rounded-lg"
            />

            {errors.name && (
              <p className="text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required:
                  "Email is required",
              })}
              className="w-full border p-3 rounded-lg"
            />

            {errors.email && (
              <p className="text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required:
                  "Password is required",

                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters",
                },
              })}
              className="w-full border p-3 rounded-lg"
            />

            {errors.password && (
              <p className="text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full py-3 rounded-lg"
          >
            {loading
              ? "Creating account..."
              : "Signup"}
          </button>
        </form>
      </div>
    </PublicRoute>
  );
}