// src/api/auth.api.ts
import type { ILoginResponse, LoginFormValues } from "@/types";
import api from "./axios";


export const loginAdmin = async ( data: LoginFormValues ): Promise<ILoginResponse> => {
  const response = await api.post( "/auth/login", data );
  return response.data;
};

export const signUpAdmin = async ( data: LoginFormValues ): Promise<ILoginResponse> => {
  const response = await api.post( "/auth/register", data );
  return response.data;
};