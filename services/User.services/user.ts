import { API } from "../base";
import type { UserRole } from "@/lib/auth";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

type RawUserResponse = {
  message?: string;
  user?: {
    id?: number;
    username?: string;
    name?: string;
    email?: string;
    role?: string;
  };
  data?: {
    message?: string;
    token?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id?: number;
      username?: string;
      name?: string;
      email?: string;
      role?: string;
    };
  };
};

export type UserAuthResult = {
  message?: string;
  id?: number;
  email?: string;
  username?: string;
  role: UserRole;
};

export type SendOtpPayload = {
  email: string;
};

export type VerifyOtpPayload = {
  email: string;
  code: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  code: string;
  newPassword: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

const resolveRole = (role?: string): UserRole => (role === "ADMIN" ? "ADMIN" : "USER");

const toUserAuthResult = (response: RawUserResponse): UserAuthResult => {
  const user = response.user || response.data?.user;

  return {
    ...(response.message ? { message: response.message } : {}),
    ...(typeof user?.id === "number" ? { id: user.id } : {}),
    ...(user?.email ? { email: user.email } : {}),
    ...(user?.username || user?.name ? { username: user.username || user.name || "" } : {}),
    role: resolveRole(user?.role),
  };
};

export const loginUser = async (payload: LoginPayload): Promise<UserAuthResult> => {
  const { data } = await API.post<RawUserResponse>("/users/login", payload);
  return toUserAuthResult(data);
};

export const registerUser = async (payload: RegisterPayload): Promise<UserAuthResult> => {
  const requestBody = {
    name: payload.username,
    email: payload.email,
    password: payload.password,
  };
  const { data } = await API.post<RawUserResponse>("/users/signup", requestBody);
  return {
    ...toUserAuthResult(data),
    ...(payload.username ? { username: payload.username } : {}),
    ...(payload.email ? { email: payload.email } : {}),
  };
};

export const refreshAccessToken = async () => {
  const { data } = await API.post<{ message?: string }>("/users/refresh-token");
  return data;
};

export const logoutUser = async () => {
  const { data } = await API.post<{ message?: string }>("/users/logout");
  return data;
};

export const sendOtp = async (payload: SendOtpPayload) => {
  const { data } = await API.post<{ message?: string }>("/users/send-otp", payload);
  return data;
};

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const { data } = await API.post<{ message?: string }>("/users/verify-otp", payload);
  return data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { data } = await API.post<{ message?: string }>("/users/forgot-password", payload);
  return data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await API.post<{ message?: string }>("/users/reset-password", payload);
  return data;
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const { data } = await API.post<{ message?: string }>("/users/change-password", payload);
  return data;
};
