const testimonials = [
  { name: "John Davidson", role: "Full Stack Developer", avatar: "JD", text: "SkillForge AI recommended the perfect learning path for my career switch. The AI chat assistant helped me every step of the way.", rating: 5 },
  { name: "Maria Santos", role: "Data Scientist", avatar: "MS", text: "The personalized recommendations are spot-on. I completed 3 courses and landed my dream job within 4 months.", rating: 5 },
  { name: "Ahmed Khan", role: "Cloud Architect", avatar: "AK", text: "Best investment in my career. The AI content generator helped me create study materials that accelerated my AWS certification prep.", rating: 5 },
  { name: "Priya Sharma", role: "AI Engineer", avatar: "PS", text: "The Generative AI course is world-class. SkillForge's agentic AI features made learning complex topics feel effortless.", rating: 5 },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container-main">
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2">What Learners Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-accent text-lg">★</span>
                ))}
              </div>
              <p className="text-neutral-600 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">{t.avatar}</div>
                <div>
                  <div className="font-semibold text-neutral-900">{t.name}</div>
                  <div className="text-sm text-neutral-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
