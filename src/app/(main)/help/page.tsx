import Link from "next/link";
import { HelpCircle, MessageSquare, BookOpen, Shield } from "lucide-react";

const helpTopics = [
  { icon: BookOpen, title: "Getting Started", desc: "Create an account, browse courses, and enroll in your first class.", link: "/explore" },
  { icon: MessageSquare, title: "AI Features", desc: "Learn how to use the AI Chat Assistant, Content Generator, and Smart Recommendations.", link: "/ai/chat" },
  { icon: HelpCircle, title: "Account & Billing", desc: "Manage your profile, update interests, and view enrollment history.", link: "/contact" },
  { icon: Shield, title: "Privacy & Security", desc: "Understand how we protect your data and secure your account.", link: "/privacy" },
];

export default function HelpPage() {
  return (
    <div className="section-padding">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Help & Support</h1>
          <p className="text-neutral-600 mt-2">Find answers and get the help you need</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {helpTopics.map((topic) => (
            <Link key={topic.title} href={topic.link} className="card p-6 hover:border-primary/30 group">
              <topic.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2 group-hover:text-primary">{topic.title}</h3>
              <p className="text-sm text-neutral-600">{topic.desc}</p>
            </Link>
          ))}
        </div>

        <div className="card p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
          <p className="text-neutral-600 mb-4">Our support team is available Monday through Friday, 9 AM - 6 PM PST.</p>
          <Link href="/contact" className="btn-primary">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
