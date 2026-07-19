"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Code, Database, Cloud, Shield, Palette, Smartphone, Server, Cpu } from "lucide-react";
import Link from "next/link";

const categoryIcons: Record<string, React.ElementType> = {
  "Web Development": Code,
  "Data Science": Database,
  "AI/ML": Cpu,
  "Cloud Computing": Cloud,
  "Cybersecurity": Shield,
  "UI/UX Design": Palette,
  "Mobile Development": Smartphone,
  "DevOps": Server,
};

export default function CategoriesSection() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.courses.categories(),
  });

  const categories = data?.categories || [
    "Web Development", "Data Science", "AI/ML", "Cloud Computing",
    "Cybersecurity", "UI/UX Design", "Mobile Development", "DevOps",
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Categories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2">Explore by Domain</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Code;
            return (
              <Link key={cat} href={`/explore?category=${encodeURIComponent(cat)}`}
                className="card p-6 text-center hover:border-primary/30 group transition-all hover:-translate-y-1">
                <div className="w-14 h-14 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="font-medium text-neutral-800 text-sm">{cat}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
