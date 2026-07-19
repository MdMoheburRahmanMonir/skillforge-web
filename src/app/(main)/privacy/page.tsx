import { Shield, Scale, FileText, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-indigo-800 text-white section-padding">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy & Terms</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            How we protect your data and govern the use of SkillForge AI.
          </p>
        </div>
      </section>

      <section id="privacy" className="section-padding">
        <div className="container-main max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold text-neutral-900">Privacy Policy</h2>
          </div>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Your privacy is important to us. This Privacy Policy explains how SkillForge AI collects, uses, and protects your personal information when you use our platform.
          </p>
          <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">Information We Collect</h3>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We collect information you provide directly, such as your name, email address, and profile details when you create an account. We also collect usage data including courses you view, AI interactions, and learning progress to personalize your experience.
          </p>
          <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">How We Use Your Information</h3>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Your data is used to deliver personalized learning recommendations, improve our AI features, communicate with you about your account, and ensure platform security. We never sell your personal data to third parties.
          </p>
          <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">Data Security</h3>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We implement industry-standard encryption and security measures to protect your information. All data transmitted between your browser and our servers is encrypted using TLS.
          </p>
          <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">Contact Us</h3>
          <p className="text-neutral-600 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at support@skillforge.ai.
          </p>
        </div>
      </section>

      <section id="terms" className="section-padding bg-white">
        <div className="container-main max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold text-neutral-900">Terms of Service</h2>
          </div>
          <p className="text-neutral-600 leading-relaxed mb-4">
            By using SkillForge AI, you agree to these Terms of Service. Please read them carefully before accessing or using our platform.
          </p>
          <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">Account Responsibilities</h3>
          <p className="text-neutral-600 leading-relaxed mb-4">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
          </p>
          <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">Acceptable Use</h3>
          <p className="text-neutral-600 leading-relaxed mb-4">
            You agree to use SkillForge AI only for lawful purposes and in accordance with these terms. You may not misuse the platform, attempt to disrupt services, or engage in any activity that compromises platform integrity.
          </p>
          <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">Intellectual Property</h3>
          <p className="text-neutral-600 leading-relaxed mb-4">
            All content, courses, AI features, and materials on SkillForge AI are owned by or licensed to us. You may not reproduce, distribute, or create derivative works without our explicit permission.
          </p>
          <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">Limitation of Liability</h3>
          <p className="text-neutral-600 leading-relaxed">
            SkillForge AI is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of the platform, to the fullest extent permitted by law.
          </p>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-main max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-10">Your Rights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: FileText, title: "Access", desc: "Request a copy of the personal data we hold about you." },
              { icon: Lock, title: "Control", desc: "Update, export, or delete your account data at any time." },
              { icon: Shield, title: "Security", desc: "Your data is encrypted and protected with industry standards." },
              { icon: Scale, title: "Transparency", desc: "We clearly explain how your data is collected and used." },
            ].map((item) => (
              <div key={item.title} className="card p-6 text-center">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
