"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database, Terminal } from "@/components/Icons";

const skills = [
  {
    icon: Code2,
    cat: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  },
  {
    icon: Server,
    cat: "Backend",
    items: ["Node.js", "Express", "Python", "REST APIs", "GraphQL"],
  },
  {
    icon: Terminal,
    cat: "Infrastructure",
    items: ["Docker", "Linux", "Nginx", "CI/CD", "AWS"],
  },
  {
    icon: Database,
    cat: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
];

export default function StackGrid() {
  return (
    <div className="pt-4 pb-20 w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <p className="text-xs tracking-[0.4em] uppercase mb-2 font-mono text-foreground/45">
          Expertise
        </p>
        <h2 className="font-black uppercase mb-12 font-display text-4xl md:text-5xl tracking-tight">
          Skills &amp; Stack
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-foreground/10"
      >
        {skills.map(({ icon: Icon, cat, items }) => (
          <div
            key={cat}
            className="p-8 border-r border-b border-foreground/10"
          >
            <div className="flex items-center gap-2 mb-5">
              <Icon size={14} className="text-foreground/50" />
              <p className="text-xs tracking-widest uppercase font-mono text-foreground/50">
                {cat}
              </p>
            </div>
            <ul className="space-y-2.5">
              {items.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2.5 text-sm font-mono text-foreground"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#c8ff00]" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
