export type Role = "admin" | "user";

export type UserStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  isDeleted: boolean;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  message: string;
  user: IUser;
  token: string;
  admin: IUser;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ApiErrorResponse {
  message: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IBlog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: IUser;
  status: string;
}