
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, AlertTriangle, DollarSign, BarChart, FileText, Brain } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { AIResponse } from "@/lib/ai-service";
import { extractSkills, compareSkills, getIndustrySkills, getSalaryInsights, assessExperienceLevel } from "@/lib/mock-data";

interface EnhancedAnalysisProps {
  resumeText: string;
  jobSkills: string[];
  industry: string;
}

export default function EnhancedAnalysis({ resumeText, jobSkills, industry }: EnhancedAnalysisProps) {
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  
  // Load AI analysis results from localStorage
  useEffect(() => {
    const savedResult = localStorage.getItem('aiAnalysisResult');
    if (savedResult) {
      try {
        setAiResult(JSON.parse(savedResult));
      } catch (e) {
        console.error("Error parsing AI analysis result", e);
      }
    }
  }, []);
  
  // Fallback to mock data if AI result isn't available
  const atsScore = aiResult?.atsScore || calculateAtsScore(resumeText, jobSkills);
  const formatSuggestions = aiResult?.suggestions || getFormatSuggestions(resumeText);
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
            {aiResult && (
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                <Brain className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            )}
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
              <h4 className="text-sm font-medium mb-2">AI Recommendations</h4>
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

// Helper functions for fallback

function calculateAtsScore(resumeText: string, jobSkills: string[]): number {
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
  
  // Length check
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
  
  // Check for dates
  if (!resumeText.match(/\b(19|20)\d{2}\b/g)) {
    suggestions.push({
      type: 'warning',
      message: 'Include clear date ranges for each position to improve ATS parsing.'
    });
  }
  
  // Check for contact information
  if (!resumeText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/)) {
    suggestions.push({
      type: 'warning',
      message: 'Ensure your contact information is clearly visible at the top of your resume.'
    });
  }
  
  return suggestions;
}
