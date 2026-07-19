import { Target, Users, Award, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-indigo-800 text-white section-padding">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SkillForge AI</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">Empowering professionals worldwide with AI-driven personalized learning experiences.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-neutral-600 leading-relaxed mb-6">
            SkillForge AI was founded with a simple belief: everyone deserves access to personalized, high-quality education powered by artificial intelligence. We combine expert-crafted courses with agentic AI features to create learning experiences that adapt to each individual&apos;s goals, pace, and preferences.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Our platform serves over 12,500 learners across 8 technology domains, from web development to generative AI engineering. With features like intelligent tutoring, smart recommendations, and AI content generation, we&apos;re redefining what online education can be.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: "Personalization", desc: "AI-driven learning paths tailored to every learner's unique goals." },
              { icon: Users, title: "Community", desc: "A supportive network of learners, mentors, and industry experts." },
              { icon: Award, title: "Excellence", desc: "Industry-verified courses with real-world projects and certifications." },
              { icon: Lightbulb, title: "Innovation", desc: "Cutting-edge AI features that make learning smarter and faster." },
            ].map((v) => (
              <div key={v.title} className="card p-6 text-center">
                <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
