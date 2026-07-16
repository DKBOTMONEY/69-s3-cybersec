export type Project = {
  title: string;
  summary: string;
  role?: string;
  tech: string[];
  url?: string;
  repoUrl?: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  about: string;
  yearsExperience: string;
  focus: string;
  resumeUrl: string;
  social: { label: string; url: string }[];
};
