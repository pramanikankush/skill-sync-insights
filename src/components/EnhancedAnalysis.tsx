
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, AlertTriangle, DollarSign, BarChart, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface EnhancedAnalysisProps {
  resumeText: string;
  jobSkills: string[];
  industry: string;
}

export default function EnhancedAnalysis({ resumeText, jobSkills, industry }: EnhancedAnalysisProps) {
  // Mock data for demonstration - in a real app, this would come from an API or analysis algorithm
  const atsScore = calculateAtsScore(resumeText, jobSkills);
  const formatSuggestions = getFormatSuggestions(resumeText);
  const salaryInsights = getSalaryInsights(jobSkills, industry);
  const industrySkills = getIndustrySkills(industry);
  const experienceLevel = assessExperienceLevel(resumeText, jobSkills);
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ATS Compatibility Check */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            ATS Compatibility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Compatibility Score</span>
                <span className="text-sm font-medium">{atsScore}%</span>
              </div>
              <Progress value={atsScore} className="h-2" />
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Recommendations</h4>
              <ul className="space-y-2">
                {formatSuggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    {suggestion.type === "positive" ? (
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                    )}
                    <span>{suggestion.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Salary Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Salary Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="p-4 border rounded-lg bg-card">
                <div className="text-muted-foreground text-sm mb-1">Entry Level</div>
                <div className="text-lg font-bold">${salaryInsights.entry.toLocaleString()}</div>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <div className="text-muted-foreground text-sm mb-1">Mid Level</div>
                <div className="text-lg font-bold">${salaryInsights.mid.toLocaleString()}</div>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <div className="text-muted-foreground text-sm mb-1">Senior Level</div>
                <div className="text-lg font-bold">${salaryInsights.senior.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              * Based on your skill profile and current market rates in the {industry} industry
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Industry-Specific Skills & Experience Level */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Experience Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-primary">{experienceLevel.level}</div>
              <div className="text-sm text-center text-muted-foreground">
                {experienceLevel.description}
              </div>
              
              <div className="w-full mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs">Beginner</span>
                  <span className="text-xs">Expert</span>
                </div>
                <div className="relative w-full h-2 bg-muted rounded-full">
                  <div 
                    className="absolute top-0 left-0 h-2 bg-primary rounded-full"
                    style={{ width: `${experienceLevel.percentile}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Industry-Specific Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Top skills for {industry}</h4>
                <div className="flex flex-wrap gap-2">
                  {industrySkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className={
                      jobSkills.includes(skill) 
                        ? "bg-purple-50 dark:bg-purple-900/20" 
                        : "bg-gray-50 dark:bg-gray-800"
                    }>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="text-sm">
                <span className="font-medium">Skill trend:</span> These skills are currently in high demand for the {industry} industry.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper functions to generate mock data
// In a real app, these would be replaced with actual API calls or algorithms

function calculateAtsScore(resumeText: string, jobSkills: string[]): number {
  // This is a simplified mock calculation
  // A real implementation would use NLP and more complex algorithms
  const keywordsPresent = jobSkills.filter(skill => 
    resumeText.toLowerCase().includes(skill.toLowerCase())
  ).length;
  
  return Math.round((keywordsPresent / jobSkills.length) * 100);
}

function getFormatSuggestions(resumeText: string): Array<{type: 'positive' | 'warning', message: string}> {
  // Mock suggestions based on common resume format issues
  const suggestions = [];
  
  // Positive feedback
  suggestions.push({
    type: 'positive',
    message: 'Good use of action verbs in your experience descriptions.'
  });
  
  // Length check (simplified)
  if (resumeText.length < 2000) {
    suggestions.push({
      type: 'warning',
      message: 'Your resume seems concise. Consider adding more details to your experiences.'
    });
  } else {
    suggestions.push({
      type: 'positive',
      message: 'Resume length is appropriate for effective ATS scanning.'
    });
  }
  
  // Check for dates (simplified)
  if (!resumeText.match(/\b(19|20)\d{2}\b/g)) {
    suggestions.push({
      type: 'warning',
      message: 'Include clear date ranges for each position to improve ATS parsing.'
    });
  }
  
  // Check for contact information (simplified)
  if (!resumeText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/)) {
    suggestions.push({
      type: 'warning',
      message: 'Ensure your contact information is clearly visible at the top of your resume.'
    });
  }
  
  return suggestions;
}

function getSalaryInsights(jobSkills: string[], industry: string): {entry: number, mid: number, senior: number} {
  // Mock salary data based on industry and number of skills
  // In a real app, this would come from a salary database or API
  
  let baseSalary;
  
  switch (industry.toLowerCase()) {
    case 'technology':
      baseSalary = { entry: 65000, mid: 95000, senior: 135000 };
      break;
    case 'finance':
      baseSalary = { entry: 70000, mid: 105000, senior: 150000 };
      break;
    case 'healthcare':
      baseSalary = { entry: 60000, mid: 85000, senior: 120000 };
      break;
    case 'marketing':
      baseSalary = { entry: 55000, mid: 80000, senior: 110000 };
      break;
    default:
      baseSalary = { entry: 50000, mid: 75000, senior: 100000 };
  }
  
  // Adjust based on number of in-demand skills (simplified)
  const skillFactor = Math.min(jobSkills.length / 5, 1.5);
  
  return {
    entry: Math.round(baseSalary.entry * skillFactor),
    mid: Math.round(baseSalary.mid * skillFactor),
    senior: Math.round(baseSalary.senior * skillFactor)
  };
}

function getIndustrySkills(industry: string): string[] {
  // Mock industry-specific skills
  // In a real app, this would come from an API or database
  
  switch (industry.toLowerCase()) {
    case 'technology':
      return ['JavaScript', 'Python', 'AWS', 'React', 'Docker', 'Kubernetes', 'CI/CD'];
    case 'finance':
      return ['Financial Analysis', 'Excel', 'SQL', 'Risk Assessment', 'Bloomberg Terminal', 'Accounting'];
    case 'healthcare':
      return ['EMR Systems', 'HIPAA', 'Clinical Documentation', 'Patient Care', 'Medical Terminology'];
    case 'marketing':
      return ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media Management', 'CRM', 'Adobe Creative Suite'];
    default:
      return ['Communication', 'Project Management', 'Microsoft Office', 'Problem Solving', 'Team Collaboration'];
  }
}

function assessExperienceLevel(resumeText: string, jobSkills: string[]): {level: string, percentile: number, description: string} {
  // This is a simplified mock assessment
  // A real implementation would use NLP and more complex algorithms
  
  // Check for years of experience (simplified)
  const yearsMatch = resumeText.match(/(\d+)[\s-]*(years?|yrs?)/gi);
  let yearsOfExperience = 0;
  
  if (yearsMatch) {
    // Extract the highest number of years mentioned
    const years = yearsMatch.map(match => {
      const num = parseInt(match.match(/\d+/)[0]);
      return num;
    });
    yearsOfExperience = Math.max(...years);
  }
  
  // Calculate skill coverage
  const skillCoverage = jobSkills.filter(skill => 
    resumeText.toLowerCase().includes(skill.toLowerCase())
  ).length / jobSkills.length;
  
  // Combined score (simplified)
  const combinedScore = Math.min((yearsOfExperience * 10 + skillCoverage * 50), 100);
  
  // Determine level
  if (combinedScore >= 80) {
    return {
      level: "Senior",
      percentile: 85,
      description: "Your profile indicates senior-level expertise with substantial experience and a strong skill match."
    };
  } else if (combinedScore >= 50) {
    return {
      level: "Mid-Level",
      percentile: 60,
      description: "You have a good foundation with relevant experience and skills for mid-level positions."
    };
  } else {
    return {
      level: "Entry-Level",
      percentile: 30,
      description: "Your profile suggests entry-level experience. Focus on building more relevant skills."
    };
  }
}
