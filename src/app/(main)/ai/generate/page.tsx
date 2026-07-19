"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/api";
import { FileText, RefreshCw, Copy, Check } from "lucide-react";

function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("blog article");
  const [tone, setTone] = useState("professional and engaging");
  const [length, setLength] = useState("medium");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const result = await api.ai.generate({
        topic,
        type,
        tone,
        length,
        keywords: keywords ? keywords.split(",").map((k) => k.trim()) : [],
      });
      setContent(result.content);
    } catch {
      setContent("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="section-padding">
      <div className="container-main max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-900">AI Content Generator</h1>
          <p className="text-neutral-600 mt-2">Generate high-quality educational content with custom prompts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Topic *</label>
              <input value={topic} onChange={(e) => setTopic(e.target.value)} className="input-field" placeholder="e.g. Introduction to Machine Learning" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
                <option>blog article</option>
                <option>study guide</option>
                <option>course description</option>
                <option>social media post</option>
                <option>documentation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="input-field">
                <option>professional and engaging</option>
                <option>casual and friendly</option>
                <option>academic and formal</option>
                <option>motivational and inspiring</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Output Length</label>
              <div className="flex gap-2">
                {["short", "medium", "long"].map((l) => (
                  <button key={l} onClick={() => setLength(l)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize ${length === l ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Keywords (comma separated)</label>
              <input value={keywords} onChange={(e) => setKeywords(e.target.value)} className="input-field" placeholder="AI, learning, career" />
            </div>
            <button onClick={generate} disabled={loading || !topic.trim()} className="btn-primary w-full">
              <FileText className="w-4 h-4" /> {loading ? "Generating..." : "Generate Content"}
            </button>
          </div>

          <div className="card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Generated Content</h3>
              {content && (
                <div className="flex gap-2">
                  <button onClick={generate} disabled={loading} className="p-2 text-neutral-500 hover:text-primary rounded-lg" title="Regenerate">
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  </button>
                  <button onClick={copyContent} className="p-2 text-neutral-500 hover:text-primary rounded-lg" title="Copy">
                    {copied ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap min-h-[400px]">
              {content || (
                <div className="flex items-center justify-center h-full text-neutral-400">
                  Generated content will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return <ProtectedRoute><ContentGenerator /></ProtectedRoute>;
}
