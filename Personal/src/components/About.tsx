"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROFILE } from "@/data/projects";

export default function About() {
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
          Profile
        </p>
        <h2 className="font-black uppercase font-display text-5xl md:text-6xl tracking-tight">
          About Me
        </h2>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6 md:border-r md:border-foreground/10 md:pr-8"
        >
          <div>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest block mb-1">
              Development Focus
            </span>
            <span className="text-sm font-semibold text-foreground font-sans uppercase">
              {PROFILE.focus}
            </span>
          </div>

          <div>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest block mb-1">
              Experience
            </span>
            <span className="text-sm font-semibold text-foreground font-sans">
              {PROFILE.yearsExperience} in production code
            </span>
          </div>

          <div>
            <span className="text-xs font-mono text-foreground/50 uppercase tracking-widest block mb-2">
              Status
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-[#060d1f] text-[#c8ff00] px-2.5 py-1 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff00] animate-pulse" />
              Active / Available
            </span>
          </div>
        </motion.div>

        {/* Right Column: Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 space-y-4"
        >
          <h4 className="text-2xl font-bold font-display uppercase text-foreground mb-2">
            About the Engineer
          </h4>
          <p className="text-base text-foreground/80 leading-relaxed font-sans font-light">
            {PROFILE.about}
          </p>
          <p className="text-base text-foreground/80 leading-relaxed font-sans font-light">
            My engineering philosophy centers around writing clean, modular, and type-safe systems that scale. I enjoy bridging the gap between elegant frontend interfaces and robust, automated backend infrastructures.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
