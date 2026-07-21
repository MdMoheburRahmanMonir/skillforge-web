import Link from "next/link";
import { GraduationCap, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="border-b border-neutral-200 bg-white">
        <div className="container-main flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-neutral-900">
            <GraduationCap className="w-7 h-7 text-primary" />
            SkillForge<span className="text-secondary">AI</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center section-padding">
        <div className="text-center max-w-lg mx-auto">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-neutral-900 mb-2">404</h1>
          <p className="text-xl font-semibold text-neutral-800 mb-2">Page not found</p>
          <p className="text-neutral-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="btn-primary">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
            <Link href="/explore" className="btn-outline">
              <GraduationCap className="w-4 h-4" /> Explore Courses
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-neutral-200 bg-white py-6">
        <div className="container-main text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} SkillForge AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
