"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";

interface AddReleaseModalProps {
  onAddProject: (project: Project) => void;
}

export default function AddReleaseModal({ onAddProject }: AddReleaseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [role, setRole] = useState("");
  const [tech, setTech] = useState("");
  const [url, setUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  
  // To store generated snippet for user copy-paste
  const [generatedSnippet, setGeneratedSnippet] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary) return;

    const techArray = tech
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newProject: Project = {
      title,
      summary,
      role: role || undefined,
      tech: techArray,
      url: url || undefined,
      repoUrl: repoUrl || undefined,
    };

    onAddProject(newProject);

    // Format the generated TypeScript snippet
    const snippet = `  {
    title: "${title}",
    summary: "${summary}",${role ? `\n    role: "${role}",` : ""}
    tech: ${JSON.stringify(techArray)},${url ? `\n    url: "${url}",` : ""}${repoUrl ? `\n    repoUrl: "${repoUrl}",` : ""}
  },`;

    setGeneratedSnippet(snippet);
    
    // Clear inputs
    setTitle("");
    setSummary("");
    setRole("");
    setTech("");
    setUrl("");
    setRepoUrl("");
  };

  return (
    <div className="flex justify-center py-8">
      <button
        onClick={() => {
          setIsOpen(true);
          setGeneratedSnippet(null);
        }}
        className="px-6 py-3 bg-[#060d1f] hover:bg-[#0c1a3b] text-[#f4efe6] rounded-none text-xs font-semibold font-mono tracking-wider transition-all duration-200 cursor-pointer uppercase"
      >
        + Draft New Project
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#060d1f]/45 backdrop-blur-[4px]"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-[#f4efe6] border border-foreground/10 rounded-none max-w-lg w-full shadow-[0_12px_40px_-8px_rgba(6,13,31,0.15)] p-8 overflow-hidden z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-foreground/40 hover:text-foreground font-mono text-xs cursor-pointer"
              >
                [Esc]
              </button>

              {!generatedSnippet ? (
                <>
                  <h3 className="text-2xl font-bold font-display uppercase text-foreground mb-1.5">
                    Draft New Project
                  </h3>
                  <p className="text-xs text-foreground/50 mb-6 font-mono uppercase tracking-wider">
                    This adds a preview card and outputs the code to save.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1.5 font-mono">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Cloud Sync Engine"
                        className="w-full px-3.5 py-2.5 border border-foreground/10 bg-white/35 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-foreground text-xs rounded-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1.5 font-mono">
                          Role / Timeline
                        </label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="e.g., Solo Project · 2 weeks"
                          className="w-full px-3.5 py-2.5 border border-foreground/10 bg-white/35 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-foreground text-xs rounded-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1.5 font-mono">
                          Technologies (Comma separated)
                        </label>
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) => setTech(e.target.value)}
                          placeholder="React, Next.js, Node.js"
                          className="w-full px-3.5 py-2.5 border border-foreground/10 bg-white/35 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-foreground text-xs rounded-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1.5 font-mono">
                        Summary *
                      </label>
                      <textarea
                        required
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Briefly describe what this version introduces..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 border border-foreground/10 bg-white/35 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-foreground text-xs rounded-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1.5 font-mono">
                          Live URL
                        </label>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://example.com"
                          className="w-full px-3.5 py-2.5 border border-foreground/10 bg-white/35 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-foreground text-xs rounded-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1.5 font-mono">
                          Repository URL
                        </label>
                        <input
                          type="url"
                          value={repoUrl}
                          onChange={(e) => setRepoUrl(e.target.value)}
                          placeholder="https://github.com/..."
                          className="w-full px-3.5 py-2.5 border border-foreground/10 bg-white/35 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground text-foreground text-xs rounded-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-foreground/10">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-5 py-3 border border-foreground/20 hover:bg-foreground/5 text-foreground/75 rounded-none font-semibold text-xs cursor-pointer font-mono uppercase transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#060d1f] hover:bg-[#0c1a3b] text-[#f4efe6] rounded-none font-semibold text-xs cursor-pointer font-mono uppercase transition-all"
                      >
                        Publish Draft
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#060d1f] text-[#c8ff00] flex items-center justify-center text-sm mb-4 font-bold font-mono rounded-none">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold font-display uppercase text-foreground">
                    Draft Added to Preview!
                  </h3>
                  <p className="text-xs text-foreground/60 leading-relaxed font-sans">
                    Your release was dynamically added to the list. To save it permanently, copy the code below and paste it into your <code className="px-1.5 py-0.5 bg-white/50 border border-foreground/10 rounded-none text-[11px] font-mono">data/projects.ts</code> file.
                  </p>

                  <div className="relative bg-white/30 border border-foreground/10 rounded-none p-4 font-mono text-[11px] text-foreground/80 max-h-40 overflow-y-auto">
                    <pre>{generatedSnippet}</pre>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedSnippet || "");
                      }}
                      className="px-5 py-3 border border-foreground/20 hover:bg-foreground/5 text-foreground/80 rounded-none font-semibold text-xs cursor-pointer font-mono uppercase transition-all"
                    >
                      Copy Snippet
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-3 bg-[#060d1f] hover:bg-[#0c1a3b] text-[#f4efe6] rounded-none font-semibold text-xs cursor-pointer font-mono uppercase transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
