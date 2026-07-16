"use client";

import React from "react";
import { Github, Linkedin } from "@/components/Icons";
import { PROFILE } from "@/data/projects";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const githubLink = PROFILE.social.find((s) => s.url.includes("github"))?.url || "https://github.com/DKBOTMONEY";
  const linkedinLink = PROFILE.social.find((s) => s.url.includes("linkedin"))?.url || "https://www.linkedin.com/in/pl1999patipan";

  return (
    <footer className="w-full border-t border-foreground/10 py-12 px-6 md:px-16 bg-transparent text-foreground">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-xs tracking-widest uppercase mb-1 font-mono text-foreground/40">
            Let's build something
          </p>
          <p className="font-black uppercase font-display text-3xl md:text-4xl text-foreground">
            Get In Touch
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-wide transition-colors font-mono bg-[#060d1f] text-[#f4efe6] hover:bg-[#0c1a3b]"
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-wide transition-colors font-mono border border-foreground/20 text-foreground hover:border-foreground"
          >
            <Linkedin size={14} /> LinkedIn
          </a>
          <a
            href="mailto:Patipan.nb30@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-wide transition-colors font-mono border border-foreground/20 text-foreground hover:border-foreground"
          >
            Email
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground/30">
        <span>© {currentYear} {PROFILE.name} — Full-Stack Developer</span>
        <span>Built with Next.js &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}
