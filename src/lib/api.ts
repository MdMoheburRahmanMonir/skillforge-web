import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return Cookies.get("token");
}

console.log('cookies equal', getToken());

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { data: tokenData } = await authClient.token();
  const token = tokenData?.token;
  console.log('the token is', token);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const api = {
  auth: {
    me: () => request<{ user: User }>("/auth/me"),
    updateInterests: (interests: string[]) =>
      request<{ user: User }>("/auth/interests", { method: "PUT", body: JSON.stringify({ interests }) }),
  },
  courses: {
    list: (params: Record<string, string>) => {
      const qs = new URLSearchParams(params).toString();
      return request<PaginatedCourses>(`/api/v1/courses?${qs}`);
    },
    get: (id: string) => request<{ success: boolean; data: Course }>(`/api/v1/courses/${id}`),
    create: (body: Partial<Course>) => request<{ course: Course }>("/api/v1/courses", { method: "POST", body: JSON.stringify(body) }),
    delete: (id: string) => request<{ message: string; success: boolean }>(`/api/v1/courses/${id}`, { method: "DELETE" }),
    my: (id: string) => request<{ success: boolean; data: Course[] }>(`/api/v1/courses/my/${id}`),
    categories: () => request<{ categories: string[] }>("/api/v1/courses/categories"),
    stats: () => request<StatsData>("/api/v1/courses/stats"),
  },
  ai: {
    chat: (message: string, conversationId?: string) =>
      request<{ reply: string; conversationId: string; followUps: string[] }>("/ai/chat", {
        method: "POST",
        body: JSON.stringify({ message, conversationId }),
      }),
    generate: (body: { topic: string; type: string; tone: string; length: string; keywords?: string[] }) =>
      request<{ content: string }>("/ai/generate", { method: "POST", body: JSON.stringify(body) }),
    recommendations: (params: Record<string, string>) => {
      const qs = new URLSearchParams(params).toString();
      return request<{ recommendations: Course[]; aiInsight: string }>(`/ai/recommendations?${qs}`);
    },
    classify: (title: string, description: string) =>
      request<{ category: string; level: string; tags: string[] }>("/ai/classify", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      }),
  },
  blogs: {
    list: () => request<{ posts: BlogPost[] }>("/api/v1/blogs"),
    get: (slug: string) => request<{ post: BlogPost }>(`/api/v1/blogs/${slug}`),
    contact: (body: { name: string; email: string; subject: string; message: string; userId: string; userName: string; userEmail: string }) =>
      request<{ message: string, success: boolean }>("/api/v1/blogs/contact", { method: "POST", body: JSON.stringify(body) }),
  },
};

import type { User, Course, Review, BlogPost, PaginatedCourses } from "./types";
import { authClient } from "./auth-client";

export interface StatsData {
  totalCourses: number;
  totalCategories: number;
  averageRating: string;
  totalStudents: number;
  monthlyEnrollments: { month: string; enrollments: number }[];
  categories: string[];
}

export function setAuthToken(token: string) {
  Cookies.set("token", token, { expires: 7 });
}

export function clearAuthToken() {
  Cookies.remove("token");
}

export function getAuthToken() {
  return getToken();
}

export async function streamChat(
  message: string,
  conversationId: string | undefined,
  onChunk: (text: string) => void,
  onDone: (conversationId: string) => void
) {
  const { data: tokenData } = await authClient.token();
  const token = tokenData?.token;
  const res = await fetch(`${API_URL}/ai/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ message, conversationId }),
  });

  const reader = res.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value);
    const lines = text.split("\n").filter((l) => l.startsWith("data: "));
    for (const line of lines) {
      const data = JSON.parse(line.replace("data: ", ""));
      if (data.text) onChunk(data.text);
      if (data.done) onDone(data.conversationId);
    }
  }
}
