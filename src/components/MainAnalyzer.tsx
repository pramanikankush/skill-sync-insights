
import { useState, useEffect } from "react";
import ResumeInput from "./ResumeInput";
import JobDescriptionInput from "./JobDescriptionInput";
import SkillAnalysisResults from "./SkillAnalysisResults";
import EnhancedAnalysis from "./EnhancedAnalysis";
import { extractSkills, compareSkills } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

enum AnalyzerStep {
  RESUME_INPUT,
  JOB_INPUT,
  RESULTS
}

export default function MainAnalyzer() {
  const [currentStep, setCurrentStep] = useState<AnalyzerStep>(AnalyzerStep.RESUME_INPUT);
  const [resumeText, setResumeText] = useState<string>("");
  const [resumeSkills, setResumeSkills] = useState<string[]>([]);
  const [jobSkills, setJobSkills] = useState<string[]>([]);
  const [matchedSkills, setMatchedSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [industryType, setIndustryType] = useState<string>("Technology");
  
  const { toast } = useToast();

  // Clear AI results when resetting
  useEffect(() => {
    if (currentStep === AnalyzerStep.RESUME_INPUT) {
      localStorage.removeItem('aiAnalysisResult');
    }
  }, [currentStep]);

  const handleResumeSubmit = (text: string) => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter resume content before submitting",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const extractedSkills = extractSkills(text);
      setResumeText(text);
      setResumeSkills(extractedSkills);
      
      toast({
        title: "Resume analyzed!",
        description: `Found ${extractedSkills.length} skills in your resume.`,
        duration: 3000,
      });
      
      setCurrentStep(AnalyzerStep.JOB_INPUT);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleJobSkillsSubmit = (skills: string[], industry?: string) => {
    if (!skills || skills.length === 0) {
      toast({
        title: "Error",
        description: "No skills detected. Please provide job information.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setJobSkills(skills);
      if (industry) {
        setIndustryType(industry);
      }
      
      const { matched, missing } = compareSkills(resumeSkills, skills);
      setMatchedSkills(matched);
      setMissingSkills(missing);
      
      toast({
        title: "Analysis complete!",
        description: `You match ${matched.length} skills out of ${skills.length} required skills.`,
        duration: 3000,
      });
      
      setCurrentStep(AnalyzerStep.RESULTS);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze job skills. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetAnalyzer = () => {
    setCurrentStep(AnalyzerStep.RESUME_INPUT);
    setResumeText("");
    setResumeSkills([]);
    setJobSkills([]);
    setMatchedSkills([]);
    setMissingSkills([]);
    localStorage.removeItem('aiAnalysisResult');
    
    toast({
      title: "Reset complete",
      description: "Start a new analysis",
      duration: 2000,
    });
  };

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      {currentStep === AnalyzerStep.RESUME_INPUT && (
        <ResumeInput onSubmit={handleResumeSubmit} />
      )}

      {currentStep === AnalyzerStep.JOB_INPUT && (
        <JobDescriptionInput onSubmit={handleJobSkillsSubmit} />
      )}

      {currentStep === AnalyzerStep.RESULTS && (
        <>
          <SkillAnalysisResults 
            matchedSkills={matchedSkills}
            missingSkills={missingSkills}
            onReset={resetAnalyzer}
          />
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Enhanced Analysis</h2>
            <EnhancedAnalysis 
              resumeText={resumeText}
              jobSkills={jobSkills}
              industry={industryType}
            />
          </div>
        </>
      )}
    </div>
  );
}
