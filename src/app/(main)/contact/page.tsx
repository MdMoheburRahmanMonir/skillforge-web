"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function ContactPage() {
  const { data: session } = authClient.useSession();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", userId: session?.user?.id || "" , userName: session?.user?.name || "", userEmail: session?.user?.email || "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.blogs.contact(form);
      setStatus(result.message);
      if( result.success){
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "", userId: session?.user?.id || "" , userName: session?.user?.name || "", userEmail: session?.user?.email || "" });
        setStatus('Message sent successfully!');
      } 
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Contact Us</h1>
          <p className="text-neutral-600 mt-2">We&apos;d love to hear from you. Reach out anytime.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "support@skillforge.ai" },
              { icon: Phone, label: "Phone", value: "+88 01887 344542" },
              { icon: MapPin, label: "Address", value: "Sylhet, Bangladesh" },
            ].map((item) => (
              <div key={item.label} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-neutral-500">{item.label}</div>
                  <div className="font-medium text-neutral-900">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 card p-8">
            {status && <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 text-sm rounded-xl">{status}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input required value={session?.user?.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input required type="email" value={session?.user?.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary">
                <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
