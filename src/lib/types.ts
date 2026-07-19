export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  coverImage?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  reviewCount: number;
  instructor: string;
  courseImage: string;
  images: string;
  location: string;
  tags: string[];
  createdAt: string;
  creatorId?: string | null | undefined;
  creatorImage?: string | number | null | undefined;
  creatorName?: string | null | undefined;
  creatorEmail?: string | number | null | undefined;
}

export interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  courseImage: string;
  category: string;
  readTime: string;
  publishedAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface PaginatedCourses {
  courses: Course[];
  total: number;
  page: number;
  totalPages: number;
}
