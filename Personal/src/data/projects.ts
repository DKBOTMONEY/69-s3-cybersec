import type { Profile, Project } from "@/lib/types";

export const PROFILE: Profile = {
  name: "Patipan PL. (Bank)",
  role: "Full-Stack Developer",
  tagline: "I thrive on turning complex ideas into clean, efficient, and production-ready code.",
  about: "I’m a Full-Stack Developer with a deep passion for web application development and infrastructure management. I thrive on turning complex ideas into clean, efficient, and production-ready code.",
  yearsExperience: "2+ years",
  focus: "Web apps · Infrastructure",
  resumeUrl: "/resume.pdf",
  social: [
    { label: "linkedin.com/in/pl1999patipan", url: "https://www.linkedin.com/in/pl1999patipan" },
    { label: "github.com/DKBOTMONEY", url: "https://github.com/DKBOTMONEY" },
  ],
};

export const STACK: string[] = [
  "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS", "Framer Motion", "Vercel"
];

export const PROJECTS: Project[] = [
  {
    title: "Hundee Group Web App",
    summary: "Modern web application platform optimized for fast loading and responsive user experience.",
    role: "Full-Stack Developer",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    url: "https://hundee-group001.vercel.app/",
    repoUrl: "https://github.com/DKBOTMONEY",
  },
]
