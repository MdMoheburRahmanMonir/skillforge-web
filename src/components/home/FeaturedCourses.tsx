"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/lib/api";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";
import { ArrowRight } from "lucide-react";

export default function FeaturedCourses() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-courses"],
    queryFn: () => api.courses.list({ sort: "rating", limit: "4" }),
  });

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Top Rated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2">Featured Courses</h2>
          </div>
          <Link href="/explore" className="hidden md:flex items-center gap-1 text-primary font-medium hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
            : data?.courses.map((course) => <CourseCard key={course._id} course={course} />)}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/explore" className="btn-outline">View All Courses</Link>
        </div>
      </div>
    </section>
  );
}
