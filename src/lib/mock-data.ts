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

// Improved skill extraction with better pattern matching and normalization
export function extractSkills(text: string): string[] {
  // Create a comprehensive set of skills to check against
  const allPossibleSkills = new Set<string>();
  
  // Add all skills from job roles with standardized casing
  jobRoles.forEach(role => {
    role.skills.forEach(skill => {
      allPossibleSkills.add(skill);
    });
  });
  
  // Add additional common tech and soft skills for better coverage
  const additionalSkills = [
    "Agile", "Scrum", "Kanban", "JIRA", "Confluence", "Slack", "Microsoft Office",
    "Excel", "PowerPoint", "Word", "Google Workspace", "Figma", "Sketch", "Adobe XD",
    "Photoshop", "Illustrator", "InDesign", "Analytics", "SEO", "Marketing",
    "Sales", "Customer Service", "Project Management", "Team Leadership",
    "Communication", "Time Management", "Problem Solving", "Critical Thinking",
    "Collaboration", "Research", "Data Analysis", "Reporting", "Documentation",
    "Technical Writing", "Public Speaking", "Negotiation", "Conflict Resolution",
    "Budget Management", "Strategic Planning", "Risk Management", "Quality Assurance",
    "Testing", "Debugging", "UX/UI Design", "Responsive Design", "Mobile Development"
  ];
  
  additionalSkills.forEach(skill => allPossibleSkills.add(skill));
  
  const normalizedText = text.toLowerCase();
  const skills: string[] = [];
  const processedSkills = new Set<string>(); // To avoid duplicates
  
  // First pass: Check for exact matches
  allPossibleSkills.forEach(skill => {
    // Create word boundary regex to match whole words only
    const skillRegex = new RegExp(`\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    
    if (skillRegex.test(normalizedText)) {
      if (!processedSkills.has(skill.toLowerCase())) {
        skills.push(skill);
        processedSkills.add(skill.toLowerCase());
      }
    }
  });
  
  // Second pass: Check for partial matches in complex phrases
  // Like "experienced in Java programming" should match "Java"
  allPossibleSkills.forEach(skill => {
    if (skill.length > 3) { // Only consider skills with more than 3 characters to avoid false positives
      const partialMatches = [
        `expertise in ${skill.toLowerCase()}`,
        `experienced with ${skill.toLowerCase()}`,
        `proficient in ${skill.toLowerCase()}`,
        `knowledge of ${skill.toLowerCase()}`,
        `skilled in ${skill.toLowerCase()}`,
        `familiar with ${skill.toLowerCase()}`,
        `worked with ${skill.toLowerCase()}`,
        `${skill.toLowerCase()} development`,
        `${skill.toLowerCase()} programming`,
        `${skill.toLowerCase()} skills`
      ];
      
      for (const pattern of partialMatches) {
        if (normalizedText.includes(pattern)) {
          if (!processedSkills.has(skill.toLowerCase())) {
            skills.push(skill);
            processedSkills.add(skill.toLowerCase());
            break; // Found a match, no need to check other patterns
          }
        }
      }
    }
  });
  
  return skills;
}

// Enhanced comparison function with more nuanced matching
export function compareSkills(resumeSkills: string[], jobSkills: string[]) {
  const matched: string[] = [];
  const missing: string[] = [];
  const similar: {jobSkill: string, resumeSkill: string}[] = []; // For tracking close matches
  
  // Helper function to check if two skills are similar
  const areSimilarSkills = (skill1: string, skill2: string): boolean => {
    skill1 = skill1.toLowerCase();
    skill2 = skill2.toLowerCase();
    
    // Direct Variations (e.g., "React" and "ReactJS")
    if (skill1.includes(skill2) || skill2.includes(skill1)) {
      return true;
    }
    
    // Common variations
    const variations: {[key: string]: string[]} = {
      "javascript": ["js", "es6", "ecmascript"],
      "typescript": ["ts"],
      "react": ["reactjs", "react.js"],
      "node.js": ["nodejs", "node"],
      "angular": ["angularjs", "angular2+"],
      "vue": ["vuejs", "vue.js"],
      "python": ["py"],
      "microsoft sql server": ["mssql", "sql server"],
      "postgresql": ["postgres"],
      "amazon web services": ["aws"],
      "google cloud platform": ["gcp"],
      "continuous integration/continuous deployment": ["ci/cd", "cicd"],
      "ux/ui": ["user experience", "user interface", "ux", "ui"]
    };
    
    // Check known variations
    for (const [base, aliases] of Object.entries(variations)) {
      if (skill1 === base || aliases.includes(skill1)) {
        if (skill2 === base || aliases.includes(skill2)) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  // First, find exact matches
  jobSkills.forEach(jobSkill => {
    const exactMatch = resumeSkills.find(
      resumeSkill => resumeSkill.toLowerCase() === jobSkill.toLowerCase()
    );
    
    if (exactMatch) {
      matched.push(jobSkill);
    } else {
      // Look for similar skills if no exact match
      const similarSkill = resumeSkills.find(
        resumeSkill => areSimilarSkills(resumeSkill, jobSkill)
      );
      
      if (similarSkill) {
        similar.push({jobSkill, resumeSkill: similarSkill});
        matched.push(jobSkill); // Count it as a match, but track it as similar for potential UI feedback
      } else {
        missing.push(jobSkill);
      }
    }
  });
  
  return { matched, missing, similar };
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
