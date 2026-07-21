"use client";

import { Suspense, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";

const levels = ["all", "Beginner", "Intermediate", "Advanced"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title", label: "A-Z" },
];
const PER_PAGE = 8;

function ExploreContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [level, setLevel] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.courses.categories(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["courses", search, category, level, minPrice, maxPrice, minRating, sort],
    queryFn: () =>
      api.courses.list({
        search,
        category: category === "all" ? "" : category,
        level: level === "all" ? "" : level,
        minPrice,
        maxPrice,
        minRating,
        sort,
        page: "1",
        limit: "50",
      }),
  });

  const categories = ["all", ...(categoriesData?.categories || [])];

  const allCourses = data?.courses || [];
  const totalPages = Math.ceil(allCourses.length / PER_PAGE);
  const paginatedCourses = allCourses.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const activeFilterCount = [category !== "all", level !== "all", minPrice || maxPrice, minRating].filter(Boolean).length;

  const clearFilters = () => {
    setCategory("all");
    setLevel("all");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setPage(0);
  };

  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Explore Courses</h1>
          <p className="text-neutral-600">Discover {data?.total || "12+"} courses across multiple domains</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="  &nbsp;&nbsp; Search courses by title, skill, or keyword..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="input-field pl-12 text-lg"
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${showFilters ? "bg-primary text-white border-primary" : "bg-white text-neutral-700 border-neutral-200 hover:border-primary/30"}`}>
            <SlidersHorizontal className="w-4 h-4" /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          <div className="flex-1 flex flex-wrap items-center gap-2">
            {category !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {category} <X className="w-3 h-3 cursor-pointer" onClick={() => { setCategory("all"); setPage(0); }} />
              </span>
            )}
            {level !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {level} <X className="w-3 h-3 cursor-pointer" onClick={() => { setLevel("all"); setPage(0); }} />
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                ${minPrice || "0"} - ${maxPrice || "∞"} <X className="w-3 h-3 cursor-pointer" onClick={() => { setMinPrice(""); setMaxPrice(""); setPage(0); }} />
              </span>
            )}
            {activeFilterCount > 1 && (
              <button onClick={clearFilters} className="text-xs text-neutral-500 hover:text-primary underline ml-1">Clear all</button>
            )}
          </div>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field w-auto text-sm py-2">
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {showFilters && (
          <div className="card p-6 mb-6 animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-sm text-neutral-900 mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => { setCategory(cat); setPage(0); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${category === cat ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>
                      {cat === "all" ? "All" : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-neutral-900 mb-3">Level</h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map((l) => (
                    <button key={l} onClick={() => { setLevel(l); setPage(0); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${level === l ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>
                      {l === "all" ? "All Levels" : l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-neutral-900 mb-3">Price Range</h3>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={minPrice}
                    onChange={(e) => { setMinPrice(e.target.value); setPage(0); }} className="input-field text-sm w-full" />
                  <input type="number" placeholder="Max" value={maxPrice}
                    onChange={(e) => { setMaxPrice(e.target.value); setPage(0); }} className="input-field text-sm w-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-neutral-600">
            Showing {paginatedCourses.length > 0 ? page * PER_PAGE + 1 : 0}-{Math.min((page + 1) * PER_PAGE, allCourses.length)} of {allCourses.length} courses
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <CourseCardSkeleton key={i} />)
            : paginatedCourses.map((course) => <CourseCard key={course._id} course={course} />)}
        </div>

        {!isLoading && paginatedCourses.length === 0 && (
          <div className="text-center py-20 text-neutral-500">No courses match your filters. Try adjusting your search.</div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 disabled:opacity-40 hover:bg-neutral-100 hover:border-primary/30 transition-all disabled:cursor-not-allowed">
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${page === i ? "bg-primary text-white shadow-sm" : "text-neutral-600 hover:bg-neutral-100"}`}>
                  {i + 1}
                </button>
              ))}
            </div>
            <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 disabled:opacity-40 hover:bg-neutral-100 hover:border-primary/30 transition-all disabled:cursor-not-allowed">
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <CourseCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
