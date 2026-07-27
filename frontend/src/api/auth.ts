import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "./client";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

// Only non-sensitive profile fields ever reach the client — the JWT itself stays in an
// httpOnly cookie the backend sets, and is never present in a JSON response body.
interface LoginResponse {
  user: AuthUser;
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { email: string; password: string }) =>
      apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiFetch<null>("/auth/logout", { method: "POST" }),
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
    },
  });
}

// Session check — since the auth cookie is httpOnly, this is the only way the frontend can
// know whether a valid session exists (ProtectedRoute relies on this, not localStorage).
export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => apiFetch<{ id: string; email: string; role: string }>("/auth/me"),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
