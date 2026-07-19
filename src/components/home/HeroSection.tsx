"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Master Skills with AI-Powered Learning",
    subtitle: "Personalized course recommendations, intelligent tutoring, and career guidance — all in one platform.",
    cta: "Explore Courses",
    href: "/explore",
    gradient: "from-blue-50/50 via-slate-50 to-white",
  },
  {
    title: "Build Your Career with Agentic AI",
    subtitle: "Our AI assistant understands your goals and creates custom learning paths tailored to your ambitions.",
    cta: "Try AI Chat",
    href: "/ai/chat",
    gradient: "from-slate-50 via-blue-50/30 to-white",
  },
  {
    title: "Learn from Industry Experts",
    subtitle: "12+ premium courses in Web Dev, Data Science, AI/ML, Cloud, Cybersecurity, and more.",
    cta: "Get Started Free",
    href: "/register",
    gradient: "from-white via-slate-50 to-blue-50/40",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  };

  const slide = slides[current];

  return (
    <section className="relative min-h-[80vh] sm:min-h-[75vh] flex items-center overflow-hidden bg-white text-slate-800">
      {/* 🌌 Light Dynamic Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-1000 ease-in-out`} />
      
      {/* Soft Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
      
      {/* Soft Light Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-blue-400/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-slate-300/20 blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-28">
        <div className="max-w-4xl">
          
          {/* Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs sm:text-sm font-bold tracking-wide mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" /> Agentic AI Learning Platform
          </motion.div>

          {/* Text Sliding Animations */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-3xl">
                {slide.title.split(" ").map((word, i) => 
                  word.toLowerCase().includes("ai") || word.toLowerCase().includes("skills") ? (
                    <span key={i} className="text-blue-600">
                      {word}{" "}
                    </span>
                  ) : `${word} `
                )}
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Light Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link 
              href={slide.href} 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-blue-600 text-white font-bold text-sm sm:text-base rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-600/10"
            >
              {slide.cta} <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-slate-200 bg-white text-slate-700 font-bold text-sm sm:text-base rounded-xl hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] transition-all shadow-sm"
            >
              <Play className="w-4 h-4 text-blue-600 fill-blue-600" /> Learn More
            </Link>
          </motion.div>
        </div>

        {/* Clean Controls Border Line at Bottom */}
        <div className="absolute bottom-0 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 flex items-center justify-between border-t border-slate-100 pt-6">
          
          {/* Light Dot Indicators */}
          <div className="flex gap-2.5 items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-blue-600 w-10" : "bg-slate-200 w-2 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Clean Arrow Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrev} 
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext} 
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all active:scale-95 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}