"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { ArrowLeft, Clock } from "lucide-react";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => api.blogs.get(slug),
    enabled: !!slug,
  });

  if (isLoading) return <div className="section-padding"><div className="container-main h-96 skeleton rounded-2xl" /></div>;
  if (!data) return <div className="section-padding text-center">Post not found</div>;

  const post = data.post;

  return (
    <article className="section-padding">
      <div className="container-main max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1 text-primary text-sm mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <Image src={post.courseImage} alt={post.title} fill className="object-cover" priority />
        </div>
        <span className="text-sm font-medium text-primary">{post.category}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8">
          <span>By {post.author}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
        </div>
        <div className="prose prose-neutral max-w-none">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-neutral-600 leading-relaxed mb-4">{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
