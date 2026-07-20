"use client";

import { useState } from "react";
import { Mail, Send, Sparkles, ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-main relative">
        <div className="relative bg-gradient-to-br from-primary via-indigo-600 to-indigo-800 rounded-3xl p-8 md:p-14 text-center text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-shadow duration-500 group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)] rounded-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] rounded-3xl pointer-events-none" />
          <div className="absolute top-[-20%] right-[-10%] w-72 h-72 rounded-full bg-indigo-400/20 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

          <div className="relative">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
              <Mail className="w-7 h-7" />
            </div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest mb-3 block">Newsletter</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Stay Ahead with AI Learning Insights</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto text-lg">Get weekly updates on new courses, AI features, and career tips delivered to your inbox.</p>
            {submitted ? (
              <div className="animate-fade-in-up">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-secondary font-semibold text-xl">Thank you for subscribing!</p>
                <p className="text-white/60 text-sm mt-1">Stay tuned for exciting updates.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className={`flex-1 flex items-center gap-2 bg-white px-4 rounded-xl transition-all duration-200 ${focused ? "ring-2 ring-secondary shadow-lg shadow-secondary/20" : ""}`}>
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    className="flex-1 py-3 bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none text-sm" />
                </div>
                <button type="submit" className="btn-secondary whitespace-nowrap group/btn">
                  <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" /> Subscribe <ArrowRight className="w-4 h-4 -ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
