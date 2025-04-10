
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, BookOpen, Download, AlertCircle } from "lucide-react";
import { getResourcesForSkill } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillAnalysisResultsProps {
  matchedSkills: string[];
  missingSkills: string[];
  onReset: () => void;
  similarSkills?: {jobSkill: string, resumeSkill: string}[];
}

export default function SkillAnalysisResults({ 
  matchedSkills, 
  missingSkills,
  onReset,
  similarSkills = []
}: SkillAnalysisResultsProps) {
  const matchPercentage = matchedSkills.length > 0 || missingSkills.length > 0 ? 
    Math.round((matchedSkills.length / (matchedSkills.length + missingSkills.length)) * 100) : 0;
  
  const { toast } = useToast();
  
  const generatePDF = () => {
    // In a real app, we would generate and download a PDF here
    toast({
      title: "PDF Generation",
      description: "PDF report would be generated and downloaded in a real app",
      duration: 3000,
    });
  };

  // Check if a skill is in the similar skills list
  const isSimilarSkill = (skill: string) => {
    return similarSkills.some(item => item.jobSkill === skill);
  };

  // Get the resume skill that was similar to a job skill
  const getSimilarResumeSkill = (jobSkill: string) => {
    const similar = similarSkills.find(item => item.jobSkill === jobSkill);
    return similar ? similar.resumeSkill : null;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center justify-between">
            <span>Skill Analysis Results</span>
            <Badge variant={matchPercentage > 70 ? "default" : "destructive"} className="text-md">
              {matchPercentage}% Match
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-medium">Matched Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((skill) => (
                    <TooltipProvider key={skill}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="outline" 
                            className={isSimilarSkill(skill) 
                              ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800" 
                              : "bg-green-50 dark:bg-green-900/20"
                            }
                          >
                            {skill}
                            {isSimilarSkill(skill) && (
                              <AlertCircle className="h-3 w-3 ml-1 text-yellow-500" />
                            )}
                          </Badge>
                        </TooltipTrigger>
                        {isSimilarSkill(skill) && (
                          <TooltipContent>
                            <p>Similar to your skill: {getSimilarResumeSkill(skill)}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  ))
                ) : (
                  <p className="text-muted-foreground">No matched skills found</p>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-medium">Missing Skills</h3>
                <span className="text-sm text-muted-foreground ml-2">
                  ({missingSkills.length} skills needed for this role)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills.length > 0 ? (
                  missingSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-red-50 dark:bg-red-900/20">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No missing skills found</p>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onReset}
              >
                Start Over
              </Button>
              <Button 
                type="button"
                onClick={generatePDF} 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {missingSkills.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Learning Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {missingSkills.map((skill) => (
                <div key={skill} className="skill-card rounded-lg border p-4">
                  <h3 className="text-md font-medium mb-2">{skill}</h3>
                  <ul className="space-y-2">
                    {getResourcesForSkill(skill).map((resource, index) => (
                      <li key={index}>
                        <a 
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <span>{resource.name}</span>
                          <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                            <path d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3H6.5C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497V2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
