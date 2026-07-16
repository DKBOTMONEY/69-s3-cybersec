"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import StackGrid from "@/components/StackGrid";
import ReleaseList from "@/components/ReleaseList";
import AddReleaseModal from "@/components/AddReleaseModal";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/lib/types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);

  const handleAddProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#060d1f] overflow-x-hidden">
      {/* Dark Hero Section */}
      <Hero />

      {/* Wave Divider */}
      <div style={{ background: "#E4E3DB", lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 140"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            d="M0,40 C200,120 400,0 600,60 C800,120 1000,10 1200,70 C1320,100 1400,50 1440,40 L1440,140 L0,140 Z"
            fill="#f4efe6"
          />
        </svg>
      </div>

      {/* Light Cream Container */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 pb-20 space-y-20">
        <StackGrid />
        <ReleaseList projects={projects} />
        <AddReleaseModal onAddProject={handleAddProject} />
        <About />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
