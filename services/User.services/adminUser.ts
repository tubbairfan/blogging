import { API } from "../base";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateAdminUserPayload = {
  name?: string;
  email?: string;
};

type RawAdminUser = {
  id: number;
  name?: string;
  email?: string;
  role?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const toAdminUser = (user: RawAdminUser): AdminUser => ({
  id: user.id,
  name: user.name ?? "",
  email: user.email ?? "",
  role: user.role ?? "USER",
  isVerified: Boolean(user.isVerified),
  ...(user.createdAt ? { createdAt: user.createdAt } : {}),
  ...(user.updatedAt ? { updatedAt: user.updatedAt } : {}),
});

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const { data } = await API.get<RawAdminUser[]>("/admin");
  return (Array.isArray(data) ? data : []).map(toAdminUser);
};

export const updateAdminUser = async (id: number, payload: UpdateAdminUserPayload): Promise<AdminUser> => {
  const { data } = await API.put<{ updatedUser?: RawAdminUser }>(`/admin/${id}`, payload);
  return toAdminUser(data.updatedUser ?? { id, ...payload });
};

export const deleteAdminUser = async (id: number) => {
  const { data } = await API.delete<{ message?: string }>(`/admin/${id}`);
  return data;
};
