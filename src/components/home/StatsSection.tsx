"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, BookOpen, Star, Layers } from "lucide-react";

export default function StatsSection() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.courses.stats(),
  });

  const stats = [
    { icon: BookOpen, label: "Courses", value: data?.totalCourses || "12+", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Users, label: "Students", value: data?.totalStudents?.toLocaleString() || "12,500+", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: Star, label: "Avg Rating", value: data?.averageRating || "4.8", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: Layers, label: "Categories", value: data?.totalCategories || "8", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <section className="py-20 bg-slate-50/50 text-slate-800 border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
            Impact & Metrics
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Platform Statistics
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
            Real-time data showing our growth and global student engagement.
          </p>
        </div>

        {/* Grid Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {stats.map((s) => (
            <div 
              key={s.label} 
              className="text-center p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{s.value}</div>
              <div className="text-slate-400 font-semibold text-xs sm:text-sm mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart Container Card */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-2">
            <div>
              <h3 className="font-bold text-lg text-slate-900 tracking-tight">Monthly Enrollments</h3>
              <p className="text-xs text-slate-400 font-medium">Overview of monthly active student sign-ups</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" /> New Students
            </div>
          </div>

          {/* Recharts BarChart in Light Mode */}
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={data?.monthlyEnrollments || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#94a3b8" 
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  dx={-5}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    background: "#ffffff", 
                    border: "1px solid #e2e8f0", 
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)"
                  }} 
                  labelStyle={{ fontWeight: 700, color: '#1e293b', fontSize: '13px' }}
                  itemStyle={{ fontWeight: 600, color: '#2563eb', fontSize: '13px' }}
                />
                <Bar 
                  dataKey="enrollments" 
                  fill="#2563eb" // Pure Hyper Blue fill
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}