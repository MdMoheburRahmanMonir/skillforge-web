"use client";

import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const levels = ["all", "Beginner", "Intermediate", "Advanced"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title", label: "A-Z" },
];

function ExploreContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [level, setLevel] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.courses.categories(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["courses", search, category, level, minPrice, maxPrice, minRating, sort, page],
    queryFn: () =>
      api.courses.list({
        search,
        category: category === "all" ? "" : category,
        level: level === "all" ? "" : level,
        minPrice,
        maxPrice,
        minRating,
        sort,
        page: String(page),
        limit: "12",
      }),
  });

  const categories = ["all", ...(categoriesData?.categories || [])];

  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Explore Courses</h1>
          <p className="text-neutral-600">Discover {data?.total || "12+"} courses across multiple domains</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search courses by title, skill, or keyword..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="input-field pl-12 text-lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="space-y-6">
            <div className="card p-5">
              <h3 className="font-semibold mb-4">Category</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="category" checked={category === cat}
                      onChange={() => { setCategory(cat); setPage(1); }}
                      className="accent-primary" />
                    {cat === "all" ? "All Categories" : cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold mb-4">Level</h3>
              <div className="space-y-2">
                {levels.map((l) => (
                  <label key={l} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="level" checked={level === l}
                      onChange={() => { setLevel(l); setPage(1); }}
                      className="accent-primary" />
                    {l === "all" ? "All Levels" : l}
                  </label>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold mb-4">Price Range</h3>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" value={minPrice} onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                  className="input-field text-sm" />
                <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                  className="input-field text-sm" />
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold mb-4">Min Rating</h3>
              <select value={minRating} onChange={(e) => { setMinRating(e.target.value); setPage(1); }} className="input-field text-sm">
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-600">{data?.total || 0} courses found</p>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field w-auto text-sm py-2">
                {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)
                : data?.courses.map((course) => <CourseCard key={course._id} course={course} />)}
            </div>

            {!isLoading && data?.courses.length === 0 && (
              <div className="text-center py-20 text-neutral-500">No courses match your filters. Try adjusting your search.</div>
            )}

            {data && data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg border border-neutral-200 disabled:opacity-40 hover:bg-neutral-100">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-neutral-600">Page {page} of {data.totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages}
                  className="p-2 rounded-lg border border-neutral-200 disabled:opacity-40 hover:bg-neutral-100">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
