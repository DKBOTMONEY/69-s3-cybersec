"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown } from "@/components/Icons";
import { Project } from "@/lib/types";

interface ReleaseCardProps {
  project: Project;
  version: string;
}

export default function ReleaseCard({ project, version }: ReleaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="group block p-8 transition-all duration-300 border border-foreground/10 bg-white/55 hover:border-foreground/35 hover:-translate-y-1 relative"
      style={{
        boxShadow: "0 4px 20px -4px rgba(6,13,31,0.02)",
      }}
    >
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-bold uppercase font-display text-2xl md:text-3xl text-foreground leading-tight tracking-tight">
          {project.title}
        </h3>
        <span className="px-2 py-0.5 border border-foreground/10 text-foreground/60 rounded text-[10px] font-bold font-mono tracking-wider">
          {version}
        </span>
      </div>

      <p className="text-xs mb-4 font-mono text-foreground/45 uppercase tracking-wider">
        {project.role || "Developer"}
      </p>

      <p className="text-sm leading-relaxed mb-6 text-foreground/75 font-sans font-light">
        {project.summary}
      </p>

      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-foreground/20 hover:border-foreground bg-transparent text-xs font-semibold text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer font-mono uppercase tracking-wider"
        >
          <span>{isExpanded ? "Less" : "Details"}</span>
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        <div className="flex items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-foreground hover:text-foreground/80 inline-flex items-center gap-1.5 font-mono tracking-wider uppercase border-b border-transparent hover:border-foreground pb-0.5 transition-all"
            >
              <span>Demo</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Expandable Section */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-foreground/10 space-y-4">
              {/* Tech Chips */}
              <div>
                <span className="text-xs font-mono text-foreground/45 block mb-3 uppercase tracking-wider">
                  Stack / Tools:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono bg-[#060d1f] text-[#c8ff00]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Repo Link if exists */}
              {project.repoUrl && (
                <div className="pt-2">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-foreground/50 hover:text-foreground inline-flex items-center gap-1 font-mono tracking-wider uppercase transition-colors"
                  >
                    <span>Repository</span>
                    <span className="font-mono text-xs">↗</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
