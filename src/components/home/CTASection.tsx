import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-main text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Ready to Transform Your Career?</h2>
        <p className="text-neutral-600 mb-8 max-w-xl mx-auto">Join 12,500+ learners using AI-powered education to master in-demand skills and advance their careers.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/register" className="btn-primary text-lg px-8 py-4">
            Start Learning Free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/explore" className="btn-outline text-lg px-8 py-4">Browse Courses</Link>
        </div>
      </div>
    </section>
  );
}
