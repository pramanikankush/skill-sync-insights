export interface JobRole {
  id: string;
  title: string;
  skills: string[];
}

export const jobRoles: JobRole[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "REST API",
      "Git",
      "Webpack",
      "Jest",
      "Redux",
      "SCSS/SASS",
      "UI/UX Principles",
      "Performance Optimization"
    ],
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    skills: [
      "Node.js",
      "Python",
      "Java",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "RESTful APIs",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "AWS",
      "Microservices Architecture"
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    skills: [
      "Python",
      "R",
      "SQL",
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Data Visualization",
      "Statistical Analysis",
      "Jupyter",
      "Feature Engineering"
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    skills: [
      "Product Strategy",
      "User Research",
      "Agile Methodologies",
      "Roadmapping",
      "Prioritization",
      "Market Analysis",
      "User Stories",
      "A/B Testing",
      "KPI Definition",
      "Stakeholder Management",
      "Cross-functional Team Leadership",
      "Product Analytics"
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    skills: [
      "Linux Administration",
      "CI/CD Pipelines",
      "Infrastructure as Code",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Ansible",
      "AWS/GCP/Azure",
      "Monitoring Tools",
      "Bash Scripting",
      "Python",
      "Networking",
      "Security Best Practices"
    ],
  },
];

export const learningResources = {
  "JavaScript": [
    { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "JavaScript.info", url: "https://javascript.info/" },
    { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" }
  ],
  "TypeScript": [
    { name: "TypeScript Documentation", url: "https://www.typescriptlang.org/docs/" },
    { name: "TypeScript Deep Dive", url: "https://basarat.gitbook.io/typescript/" }
  ],
  "React": [
    { name: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
    { name: "React Tutorial", url: "https://reactjs.org/tutorial/tutorial.html" },
    { name: "Egghead.io React Courses", url: "https://egghead.io/q/react" }
  ],
  "Python": [
    { name: "Python.org Documentation", url: "https://docs.python.org/3/" },
    { name: "Real Python", url: "https://realpython.com/" },
    { name: "Python Crash Course (Book)", url: "https://nostarch.com/pythoncrashcourse2e" }
  ],
  "Machine Learning": [
    { name: "Coursera Machine Learning", url: "https://www.coursera.org/learn/machine-learning" },
    { name: "Fast.ai", url: "https://www.fast.ai/" },
    { name: "Machine Learning Mastery", url: "https://machinelearningmastery.com/" }
  ],
  "Docker": [
    { name: "Docker Documentation", url: "https://docs.docker.com/" },
    { name: "Docker for Beginners", url: "https://docker-curriculum.com/" }
  ],
  "AWS": [
    { name: "AWS Getting Started", url: "https://aws.amazon.com/getting-started/" },
    { name: "AWS Training", url: "https://aws.amazon.com/training/" }
  ],
  "SQL": [
    { name: "SQL Tutorial", url: "https://www.w3schools.com/sql/" },
    { name: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" }
  ],
  "Git": [
    { name: "Git Documentation", url: "https://git-scm.com/doc" },
    { name: "Learn Git Branching", url: "https://learngitbranching.js.org/" }
  ],
  "Node.js": [
    { name: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
    { name: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" }
  ]
};

// Default resources for skills not specifically listed
export const defaultResources = [
  { name: "Coursera", url: "https://www.coursera.org/" },
  { name: "edX", url: "https://www.edx.org/" },
  { name: "Udemy", url: "https://www.udemy.com/" }
];

export function getResourcesForSkill(skill: string) {
  return learningResources[skill as keyof typeof learningResources] || defaultResources;
}

export function extractSkills(text: string): string[] {
  // This is a very simplified version of skill extraction.
  // In a real-world application, you would use NLP or an AI model.
  const skills: string[] = [];
  
  // Create a set of all skills from all job roles to check against
  const allPossibleSkills = new Set<string>();
  jobRoles.forEach(role => {
    role.skills.forEach(skill => {
      allPossibleSkills.add(skill.toLowerCase());
    });
  });
  
  // Check if any of the known skills appear in the text
  allPossibleSkills.forEach(skill => {
    if (text.toLowerCase().includes(skill.toLowerCase())) {
      // Find the skill with proper capitalization
      const properSkill = Array.from(allPossibleSkills).find(
        s => s.toLowerCase() === skill.toLowerCase()
      );
      if (properSkill) {
        skills.push(properSkill);
      }
    }
  });
  
  return skills;
}

export function compareSkills(resumeSkills: string[], jobSkills: string[]) {
  const matched: string[] = [];
  const missing: string[] = [];
  
  // Check which job skills are in the resume
  jobSkills.forEach(skill => {
    const foundSkill = resumeSkills.find(
      resumeSkill => resumeSkill.toLowerCase() === skill.toLowerCase()
    );
    
    if (foundSkill) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });
  
  return { matched, missing };
}

export function getIndustrySkills(industry: string): string[] {
  // Return a list of skills that are in demand for the given industry
  const industrySkillsMap: Record<string, string[]> = {
    "Technology": ["JavaScript", "React", "Node.js", "AWS", "Docker", "Python", "TypeScript", "Cloud Computing"],
    "Finance": ["SQL", "Data Analysis", "Financial Modeling", "Risk Assessment", "Compliance", "Excel"],
    "Healthcare": ["Electronic Health Records", "HIPAA", "Healthcare IT", "Medical Terminology", "Patient Care"],
    "Marketing": ["SEO", "Content Marketing", "Social Media", "Analytics", "Campaign Management", "CRM"],
    "Education": ["LMS", "Curriculum Development", "Educational Technology", "Assessment", "Classroom Management"],
    "Manufacturing": ["Supply Chain", "Quality Control", "Lean Manufacturing", "Six Sigma", "Inventory Management"],
    // Default for any other industry
    "Default": ["Communication", "Project Management", "Leadership", "Critical Thinking", "Problem Solving"]
  };
  
  return industrySkillsMap[industry] || industrySkillsMap["Default"];
}

export function getSalaryInsights(jobSkills: string[], industry: string): { entry: number; mid: number; senior: number } {
  // Calculate estimated salary ranges based on skills and industry
  // This is a simplified calculation for demo purposes
  
  // Base salary ranges by industry
  const industrySalaryRanges: Record<string, { entry: number; mid: number; senior: number }> = {
    "Technology": { entry: 70000, mid: 100000, senior: 150000 },
    "Finance": { entry: 65000, mid: 95000, senior: 140000 },
    "Healthcare": { entry: 60000, mid: 90000, senior: 135000 },
    "Marketing": { entry: 55000, mid: 85000, senior: 120000 },
    "Education": { entry: 45000, mid: 70000, senior: 100000 },
    "Manufacturing": { entry: 50000, mid: 80000, senior: 110000 },
    // Default for any other industry
    "Default": { entry: 50000, mid: 75000, senior: 105000 }
  };
  
  // Get base salary for the industry
  const baseSalary = industrySalaryRanges[industry] || industrySalaryRanges["Default"];
  
  // Add skill premium: each skill adds a small amount to the salary
  const skillPremium = jobSkills.length * 500;
  
  return {
    entry: Math.round(baseSalary.entry + skillPremium),
    mid: Math.round(baseSalary.mid + skillPremium),
    senior: Math.round(baseSalary.senior + skillPremium)
  };
}

export function assessExperienceLevel(resumeText: string, jobSkills: string[]): { 
  level: string; 
  percentile: number; 
  description: string 
} {
  // Perform a simple analysis of the resume text to estimate experience level
  
  // Calculate keyword match percentage
  const keywordMatches = jobSkills.filter(skill => 
    resumeText.toLowerCase().includes(skill.toLowerCase())
  ).length;
  
  const matchPercentage = (keywordMatches / jobSkills.length) * 100;
  
  // Check for years of experience mentions in the resume
  const yearsRegex = /(\d+)[\s-]*years? (?:of )?experience/gi;
  const yearsMatches = [...resumeText.matchAll(yearsRegex)];
  
  let yearsOfExperience = 0;
  if (yearsMatches.length > 0) {
    // Extract the largest number of years mentioned
    yearsOfExperience = Math.max(...yearsMatches.map(match => parseInt(match[1], 10)));
  }
  
  // Check for senior-level keywords
  const seniorKeywords = ["senior", "lead", "manager", "director", "head of", "chief", "principal"];
  const containsSeniorKeywords = seniorKeywords.some(keyword => 
    resumeText.toLowerCase().includes(keyword.toLowerCase())
  );
  
  // Determine level based on years of experience and keyword matches
  let level: string;
  let percentile: number;
  let description: string;
  
  if (yearsOfExperience >= 8 || (yearsOfExperience >= 5 && containsSeniorKeywords)) {
    level = "Senior Level";
    percentile = 85 + (matchPercentage / 10);
    description = "Your experience suggests senior-level expertise with deep knowledge in your field.";
  } else if (yearsOfExperience >= 3 || (containsSeniorKeywords && matchPercentage > 60)) {
    level = "Mid Level";
    percentile = 50 + (matchPercentage / 5);
    description = "Your profile indicates solid mid-level experience with established skills in your domain.";
  } else {
    level = "Entry Level";
    percentile = 20 + matchPercentage / 3;
    description = "Your profile suggests entry-level experience. Focus on building core skills in your field.";
  }
  
  // Cap the percentile at 99 to avoid unrealistic values
  percentile = Math.min(Math.round(percentile), 99);
  
  return { level, percentile, description };
}
