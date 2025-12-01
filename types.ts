
export interface Project {
  title: string;
  description: string[];
  tech: string[];
  link?: string; // Optional link for future proofing
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  details: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  status: 'Completed' | 'In Progress'; // Explicit control over progress bar
  type: 'Degree' | 'Diploma' | 'School' | 'Course'; // Explicit control over Icon
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    alias?: string;
    role: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    summary: string;
  };
  highlights: {
    education: string;
    projectTech: string;
    focusArea: string;
    locationCity: string;
  };
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: string[];
  awards: string[];
}
