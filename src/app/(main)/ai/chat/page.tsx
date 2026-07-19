"use client";

import { useState, useRef, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { streamChat } from "@/lib/api";
import type { ChatMessage } from "@/lib/types";
import { Send, Bot, User } from "lucide-react";

function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! I'm SkillForge AI, your learning advisor. Ask me about courses, career paths, or platform features!" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>();
  const [followUps, setFollowUps] = useState(["Recommend courses for beginners", "What's the best AI learning path?", "How do I use the content generator?"]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    let assistantMsg = "";
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      await streamChat(text, conversationId, (chunk) => {
        assistantMsg += chunk;
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = { role: "assistant", content: assistantMsg };
          return updated;
        });
      }, (id) => {
        setConversationId(id);
        setFollowUps(["Tell me more", "Recommend similar courses", "What's next in my learning path?"]);
      });
    } catch {
      setMessages((m) => {
        const updated = [...m];
        updated[updated.length - 1] = { role: "assistant", content: "Sorry, I encountered an error. Please try again." };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">AI Chat Assistant</h1>
          <p className="text-neutral-600 mt-2">Your intelligent learning advisor with conversation memory</p>
        </div>

        <div className="card flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary text-white" : "bg-secondary text-white"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-white" : "bg-neutral-100 text-neutral-800"}`}>
                  {msg.content}
                  {loading && i === messages.length - 1 && msg.role === "assistant" && !msg.content && (
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-neutral-400 rounded-full typing-dot" />
                      <span className="w-2 h-2 bg-neutral-400 rounded-full typing-dot" />
                      <span className="w-2 h-2 bg-neutral-400 rounded-full typing-dot" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {followUps.length > 0 && !loading && (
            <div className="px-6 pb-2 flex flex-wrap gap-2">
              {followUps.map((f) => (
                <button key={f} onClick={() => sendMessage(f)} className="px-3 py-1.5 text-xs bg-neutral-100 hover:bg-primary/10 hover:text-primary rounded-full transition-colors">
                  {f}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-4 border-t border-neutral-200 flex gap-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about courses, careers, or learning paths..."
              className="input-field flex-1" disabled={loading} />
            <button type="submit" disabled={loading || !input.trim()} className="btn-primary px-4">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return <ProtectedRoute><ChatAssistant /></ProtectedRoute>;
}
