
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
