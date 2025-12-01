
import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  // 1. Personal Details
  personalInfo: {
    name: "MONIL GANDHI",
    alias: "Febatrone",
    role: "Computer Engineering Student | Cybersecurity Enthusiast",
    location: "Vadodara, Gujarat, India",
    email: "monilgandhi11@gmail.com",
    github: "github.com/monil72004",
    linkedin: "linkedin.com/in/monilgandhi0",
    summary: "Tech-driven Computer Engineering student with hands-on experience in Python, Blockchain, and ERP systems. Passionate about cybersecurity and networking, with practical knowledge of Ethical hacking and Wireshark. Actively pursuing top certifications like Network+. Known for leading events, solving real-world problems, and building secure digital solutions with a team-first mindset."
  },

  // 2. Hero Section Highlights (The 4 colored boxes)
  highlights: {
    education: "B.Tech",
    projectTech: "Blockchain",
    focusArea: "Security",
    locationCity: "Vadodara"
  },

  // 3. Skills
  skills: [
    {
      category: "Languages & Tools",
      items: ["Python", "C", "HTML", "CSS", "SQL", "Oracle DB", "VS Code"]
    },
    {
      category: "Operating Systems",
      items: ["Linux (Ubuntu/Kali)", "Windows"]
    },
    {
      category: "Cybersecurity & Networking",
      items: ["Network Security", "Ethical Hacking (Basics)", "Wireshark"]
    },
    {
      category: "Other Skills",
      items: ["Odoo Framework", "Problem Solving", "Teamwork", "Analytical Thinking", "MS Office"]
    }
  ],

  // 4. Education History
  education: [
    {
      degree: "Bachelor's in Computer Science",
      institution: "Parul University",
      year: "2024 - 2027",
      status: "In Progress",
      type: "Degree"
    },
    {
      degree: "Diploma in Blockchain Technology",
      institution: "Parul University",
      year: "2024 - 2025",
      status: "Completed",
      type: "Diploma"
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Parul University",
      year: "2021 - 2024",
      status: "Completed",
      type: "Diploma"
    },
    {
      degree: "SSC Board",
      institution: "Vidyut Board Vidyalaya",
      year: "2020 - 2021",
      status: "Completed",
      type: "School"
    }
  ],

  // 5. Projects
  projects: [
    {
      title: "Healthcare Management System using Blockchain",
      tech: ["Ethereum", "Solidity", "Blockchain"],
      description: [
        "Built a secure, decentralized medical records system using Ethereum and Solidity.",
        "Implemented smart contracts for automated patient consent and access control.",
        "Enhanced data privacy, transparency, and interoperability in healthcare systems."
      ]
    }
  ],

  // 6. Work Experience
  experience: [
    {
      company: "Konsultoo Software Consulting PVT. LTD",
      role: "Software Intern", 
      duration: "April 2023 - June 2023",
      details: [
        "Worked on the 'Santna Leather Care' project using the Odoo framework.",
        "Gained hands-on experience in Python development and ERP integration.",
        "Developed modules integrating CRM, e-commerce, accounting, and project management."
      ]
    }
  ],

  // 7. Certifications
  certifications: [
    "Introduction to Cybersecurity",
    "Investment Risk Management",
    "Automate Cybersecurity Tasks with Python (Ongoing)",
    "CompTIA Network+ (Ongoing)"
  ],

  // 8. Awards & Achievements
  awards: [
    "Worked in student committee Startup Meet Ecosystem 2022",
    "Student Ambassador",
    "Institute Innovation Club – Organized and completed over 30 events",
    "Lead Coordinator in Vadodara Startup Festival"
  ]
};
