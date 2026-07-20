"use client";

import { Brain, MessageSquare, FileText, Target, Shield, Zap } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Smart Recommendations", desc: "Personalized course suggestions based on your interests, skill level, and career goals." },
  { icon: MessageSquare, title: "AI Chat Assistant", desc: "24/7 intelligent tutoring with conversation memory and streaming responses." },
  { icon: FileText, title: "AI Content Generator", desc: "Generate blog posts, study guides, and learning materials with custom prompts." },
  { icon: Target, title: "Personalized Learning Paths", desc: "Structured roadmaps that adapt as you progress through courses and skills." },
  { icon: Shield, title: "Industry-Verified Content", desc: "Courses reviewed by experts with real-world projects and certifications." },
  { icon: Zap, title: "Auto Classification", desc: "AI automatically tags and categorizes your course content for better discovery." },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="text-center mb-14">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Why SkillForge</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2">Powered by Agentic AI</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">Experience the future of learning with AI that understands, recommends, and guides your educational journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card p-6 hover:border-primary/30 group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <f.icon className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <h3 className="font-semibold text-lg text-neutral-900 mb-2">{f.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
