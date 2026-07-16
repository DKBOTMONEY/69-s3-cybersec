"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="pt-4 pb-20 w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="border-b border-foreground/10 pb-6 mb-12"
      >
        <p className="text-xs tracking-[0.4em] uppercase mb-2 font-mono text-foreground/45">
          Connect
        </p>
        <h2 className="font-black uppercase font-display text-4xl md:text-5xl tracking-tight">
          Get In Touch
        </h2>
      </motion.div>

      {/* Form Container */}
      <div className="max-w-xl mx-auto bg-white/55 border border-foreground/10 p-8">
        <h4 className="text-2xl font-bold font-display uppercase text-foreground mb-2">
          Send a Message
        </h4>
        <p className="text-xs text-foreground/50 mb-6 font-mono leading-relaxed">
          Feel free to reach out for collaboration, contracts, or just a quick chat at <a href="mailto:Patipan.nb30@gmail.com" className="underline hover:text-foreground">Patipan.nb30@gmail.com</a>.
        </p>

        <form onSubmit={handleSendMessage} className="space-y-6 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1.5 font-mono">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Jane Doe"
                className="w-full px-3.5 py-2.5 border border-foreground/10 bg-white/35 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-foreground text-xs rounded-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1.5 font-mono">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., jane@example.com"
                className="w-full px-3.5 py-2.5 border border-foreground/10 bg-white/35 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-foreground text-xs rounded-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1.5 font-mono">
              Message
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={4}
              className="w-full px-3.5 py-2.5 border border-foreground/10 bg-white/35 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-foreground text-xs rounded-none transition-all"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-mono text-[#3b5e39] font-semibold"
                  >
                    ✓ Sent successfully.
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-mono text-rose-700/80 font-semibold"
                  >
                    ⚠ Error sending. Try again.
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-6 py-3 bg-[#060d1f] hover:bg-[#0c1a3b] disabled:bg-[#060d1f]/40 text-[#f4efe6] rounded-none font-semibold text-xs font-mono tracking-wider transition-all duration-200 shadow-sm cursor-pointer uppercase"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
