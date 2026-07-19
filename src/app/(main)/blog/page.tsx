"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import { Clock, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => api.blogs.list(),
  });

  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Blog</h1>
          <p className="text-neutral-600 mt-2">Insights on AI, learning, and career development</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-80 skeleton rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="card overflow-hidden group">
                <div className="relative h-48">
                  <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary">{post.category}</span>
                  <h2 className="font-semibold text-lg mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
