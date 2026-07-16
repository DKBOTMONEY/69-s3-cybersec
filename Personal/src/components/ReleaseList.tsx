"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/lib/types";
import ReleaseCard from "./ReleaseCard";

interface ReleaseListProps {
  projects: Project[];
}

export default function ReleaseList({ projects }: ReleaseListProps) {
  return (
    <div className="pt-4 pb-20 w-full space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-foreground/10 pb-6"
      >
        <div>
          <p className="text-xs tracking-[0.4em] uppercase mb-2 font-mono text-foreground/45">
            Portfolio
          </p>
          <h2 className="font-black uppercase font-display text-4xl md:text-5xl tracking-tight">
            Projects
          </h2>
        </div>
        <div className="text-xs font-mono text-foreground/60 bg-white/35 border border-foreground/10 px-3 py-1.5 rounded-lg self-start sm:self-auto font-semibold">
          Total Logs: {projects.length}
        </div>
      </motion.div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const versionNum = projects.length - index;
          const versionStr = `v1.${versionNum}.0`;
          return (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
            >
              <ReleaseCard project={project} version={versionStr} />
            </motion.div>
          );
        })}

        {/* Open-to-work card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="p-8 flex flex-col justify-between min-h-[250px] bg-[#060d1f] border border-[#060d1f] text-[#f4efe6] relative overflow-hidden group"
        >
          <p className="text-xs tracking-widest uppercase mb-4 font-mono text-[#f4efe6]/50">
            Status
          </p>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#c8ff00] animate-pulse" />
              <span className="text-xs font-mono text-[#c8ff00]">
                Available for work
              </span>
            </div>
            <h3 className="font-bold uppercase leading-tight font-display text-2xl">
              Open to new opportunities
            </h3>
            <p className="text-sm mt-3 text-[#f4efe6]/60 leading-relaxed font-sans font-light">
              Full-stack development, infrastructure, remote or on-site.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
