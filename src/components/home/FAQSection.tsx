"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How does AI-powered course recommendation work?", a: "Our AI analyzes your interests, skill level, learning history, and career goals to suggest the most relevant courses. It continuously improves as you interact with the platform." },
  { q: "Can I try SkillForge AI for free?", a: "Yes! Create a free account and use our demo login to explore all features. Some courses are free, and premium courses offer a 7-day trial period." },
  { q: "What AI features are included?", a: "SkillForge includes an AI Chat Assistant for tutoring, Smart Recommendations for personalized learning paths, AI Content Generator for study materials, and Auto Classification for course tagging." },
  { q: "Are the courses self-paced?", a: "All courses on SkillForge are self-paced with lifetime access. Learn on your schedule with video lessons, hands-on projects, and AI-powered support." },
  { q: "Do I get a certificate upon completion?", a: "Yes, every completed course comes with a verified digital certificate that you can share on LinkedIn and add to your portfolio." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-medium text-neutral-900 pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
