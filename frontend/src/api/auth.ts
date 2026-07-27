import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "./client";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: AuthUser;
}

export function useLogin() {
  return useMutation({
    mutationFn: (input: { email: string; password: string }) =>
      apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
    },
  });
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem("auth_user");
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}
