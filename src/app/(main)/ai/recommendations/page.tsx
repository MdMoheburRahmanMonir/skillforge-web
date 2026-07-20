"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProtectedRoute from "@/components/ProtectedRoute";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";
import { api } from "@/lib/api";
import { Sparkles, RefreshCw } from "lucide-react";

const interestOptions = [
  "Web Development", "Data Science", "AI/ML", "Cloud Computing",
  "Cybersecurity", "UI/UX Design", "Mobile Development", "DevOps",
];

function Recommendations() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [budget, setBudget] = useState("");

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["recommendations", selectedInterests, category, level, budget],
    queryFn: () => api.ai.recommendations({
      interests: selectedInterests.join(","),
      category: category === "all" ? "" : category,
      level: level === "all" ? "" : level,
      budget,
    }),
  });

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-900">AI Smart Recommendations</h1>
          <p className="text-neutral-600 mt-2">Personalized course suggestions powered by agentic AI</p>
        </div>

        <div className="card p-6 mb-8">
          <h3 className="font-semibold mb-4">Your Interests</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {interestOptions.map((interest) => (
              <button key={interest} onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedInterests.includes(interest) ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}>
                {interest}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field text-sm">
              <option value="all">All Categories</option>
              {interestOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="input-field text-sm">
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <input type="number" placeholder="Max budget ($)" value={budget} onChange={(e) => setBudget(e.target.value)} className="input-field text-sm" />
          </div>

          <button onClick={() => refetch()} disabled={isFetching} className="btn-primary text-sm">
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh Recommendations
          </button>
        </div>

        {data?.aiInsight && (
          <div className="card p-6 mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">AI Insight</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{data.aiInsight}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
            : data?.recommendations.map((course) => <CourseCard key={course._id} course={course} />)}
        </div>
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  return <ProtectedRoute><Recommendations /></ProtectedRoute>;
}
