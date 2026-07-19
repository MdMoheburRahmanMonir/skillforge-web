"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="bg-gradient-to-r from-primary to-indigo-700 rounded-3xl p-8 md:p-14 text-center text-white">
          <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-3">Stay Ahead with AI Learning Insights</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Get weekly updates on new courses, AI features, and career tips delivered to your inbox.</p>
          {submitted ? (
            <p className="text-secondary font-medium text-lg">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-secondary" />
              <button type="submit" className="btn-secondary whitespace-nowrap">
                <Send className="w-4 h-4" /> Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
