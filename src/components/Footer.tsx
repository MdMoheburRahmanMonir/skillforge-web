import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

const footerLinks = {
  Platform: [
    { href: "/explore", label: "Explore Courses" },
    { href: "/ai/recommendations", label: "AI Recommendations" },
    { href: "/ai/chat", label: "AI Chat Assistant" },
    { href: "/ai/generate", label: "AI Content Generator" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/help", label: "Help & Support" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/privacy#terms", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="container-main section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <GraduationCap className="w-7 h-7 text-secondary" />
              SkillForge<span className="text-secondary">AI</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              AI-powered learning platform helping professionals master in-demand skills with personalized recommendations and intelligent tutoring.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary transition-colors"><IoLogoGithub className="w-5 h-5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary transition-colors"><BsTwitterX className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary transition-colors"><IoLogoLinkedin className="w-5 h-5" /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 rounded-lg hover:bg-primary transition-colors"><FaYoutube className="w-5 h-5" /></a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-neutral-400 hover:text-secondary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-secondary" /> support@skillforge.ai</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-secondary" /> +1 (555) 123-4567</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-secondary mt-0.5" /> 123 Innovation Drive, San Francisco, CA 94105</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} SkillForge AI. All rights reserved.</p>
          <p>Built with Next.js, Express, MongoDB & AI</p>
        </div>
      </div>
    </footer>
  );
}
