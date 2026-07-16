"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ChevronDown, Code2, Server, Database, Terminal } from "@/components/Icons";
import { PROFILE } from "@/data/projects";
import Marquee from "@/components/Marquee";

const DARK = "#060d1f";
const CREAM = "#f4efe6";
const TOP_BG = "#E4E3DB";

const marqueeSkills = [
  { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "NextJS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "NodeJS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Postgres", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "HTML5", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
];

export default function Hero() {
  const githubLink = PROFILE.social.find((s) => s.url.includes("github"))?.url || "https://github.com/DKBOTMONEY";
  const linkedinLink = PROFILE.social.find((s) => s.url.includes("linkedin"))?.url || "https://www.linkedin.com/in/pl1999patipan";

  return (
    <section
      className="relative flex flex-col min-h-screen justify-between"
      style={{ background: TOP_BG, color: DARK }}
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${DARK} 1px, transparent 1px), linear-gradient(90deg, ${DARK} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vertical Tech Stack Marquee on the top-right */}
      <div className="absolute top-28 right-8 md:right-16 h-[380px] w-24 z-20 hidden md:flex flex-col items-center border-l border-r border-foreground/5 bg-foreground/[0.01]">
        <Marquee speed={49} vertical={true} reverse={true} repeat={4} className="h-full px-2 py-4">
          {marqueeSkills.map((skill, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white/55 border border-foreground/10 text-foreground cursor-pointer"
                style={{ width: "68px", height: "68px", flexShrink: 0 }}
                title={skill.name}
              >
                <img
                  src={skill.iconUrl}
                  alt={skill.name}
                  className="w-8 h-8 flex-shrink-0 object-contain"
                />
                <span className="text-[8px] font-mono mt-1 font-semibold uppercase tracking-wider">{skill.name}</span>
              </div>
            );
          })}
        </Marquee>
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-8 w-full">
        <span
          className="text-xs tracking-[0.4em] uppercase font-mono font-semibold"
          style={{ color: DARK }}
        >
          pl1999patipan
        </span>
        <div className="flex gap-5 items-center">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: `${DARK}66` }}
            onMouseEnter={(e) => (e.currentTarget.style.color = DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.color = `${DARK}66`)}
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: `${DARK}66` }}
            onMouseEnter={(e) => (e.currentTarget.style.color = DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.color = `${DARK}66`)}
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </nav>

      {/* Hero body */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 py-20">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs tracking-[0.5em] uppercase mb-5 font-mono text-foreground/60"
          >
            {PROFILE.focus}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="leading-none font-black uppercase mb-6 font-display"
            style={{
              fontSize: "clamp(5.5rem, 16vw, 14rem)",
              color: DARK,
              letterSpacing: "-0.02em",
            }}
          >
            PATIPAN
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16" style={{ background: DARK }} />
            <span
              className="text-xs tracking-widest uppercase font-mono"
              style={{ color: `${DARK}50` }}
            >
              {PROFILE.name.toUpperCase()}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl max-w-lg leading-relaxed font-sans font-light"
            style={{ color: `${DARK}70` }}
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all font-mono"
              style={{
                background: DARK,
                color: "#E4E3DB",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0c1a3b")}
              onMouseLeave={(e) => (e.currentTarget.style.background = DARK)}
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-wide transition-all font-mono"
              style={{
                border: `1px solid rgba(6, 13, 31, 0.3)`,
                color: DARK,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = DARK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(6, 13, 31, 0.3)`;
              }}
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="relative pb-6 flex justify-center w-full animate-bounce"
        style={{ color: `${DARK}30` }}
      >
        <ChevronDown size={22} />
      </div>
    </section>
  );
}
