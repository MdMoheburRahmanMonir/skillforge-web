"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Area } from "recharts";
import { TrendingUp, ArrowUpRight } from "lucide-react";

const fallbackData = [
  { month: "Jan", enrollments: 50 },
  { month: "Feb", enrollments: 70 },
  { month: "Mar", enrollments: 30 },
  { month: "Apr", enrollments: 129 },
  { month: "May", enrollments: 200 },
  { month: "Jun", enrollments: 180 },
];

export default function StatsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.courses.stats(),
  });

  const chartData = data?.monthlyEnrollments?.length ? data.monthlyEnrollments : fallbackData;
  const total = chartData.reduce((sum, d) => sum + d.enrollments, 0);
  const growth = chartData.length >= 2
    ? ((chartData[chartData.length - 1].enrollments - chartData[0].enrollments) / chartData[0].enrollments * 100).toFixed(0)
    : "0";

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Growth Metrics</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2">Monthly Enrollments</h2>
          <p className="text-neutral-600 mt-2 max-w-lg mx-auto">Track our platform&apos;s growth through monthly student enrollment data.</p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-neutral-900">{total.toLocaleString()}</span>
                  <span className="flex items-center gap-0.5 text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3.5 h-3.5" /> {growth}%
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-medium">Total enrollments (YTD)</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-lg">
              <span className="w-2.5 h-2.5 bg-primary rounded-full" /> New Students
            </div>
          </div>

          <div className="w-full">
            {isLoading && chartData === fallbackData ? (
              <div className="h-[320px] flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                    }}
                    labelStyle={{ fontWeight: 700, color: "#1e293b", fontSize: "13px" }}
                    itemStyle={{ fontWeight: 600, color: "#4F46E5", fontSize: "13px" }}
                  />
                  <Bar
                    dataKey="enrollments"
                    fill="#4F46E5"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-6">
          {chartData.filter((_, i) => i === 0 || i === Math.floor(chartData.length / 2) || i === chartData.length - 1).map((d) => (
            <div key={d.month} className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 text-center hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{d.month}</p>
              <p className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">{d.enrollments.toLocaleString()}</p>
              <p className="text-xs text-neutral-400">enrollments</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}