const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api/v1";

interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

interface ApiError {
  success: false;
  message: string;
  errors: Array<{ field?: string; code: string; message: string }>;
}

export class ApiRequestError extends Error {
  status: number;
  errors: ApiError["errors"];

  constructor(status: number, body: ApiError) {
    super(body.message);
    this.status = status;
    this.errors = body.errors;
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  // Auth token lives in an httpOnly cookie set by the backend — never read/attached from JS.
  // credentials: "include" is what makes the browser send that cookie cross-origin to the API.
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const body = await res.json();

  if (!res.ok || body.success === false) {
    throw new ApiRequestError(res.status, body as ApiError);
  }

  return (body as ApiSuccess<T>).data;
}
