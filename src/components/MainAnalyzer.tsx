
import { useState } from "react";
import ResumeInput from "./ResumeInput";
import JobDescriptionInput from "./JobDescriptionInput";
import SkillAnalysisResults from "./SkillAnalysisResults";
import { extractSkills, compareSkills } from "@/lib/mock-data";
import { useToast } from "@/components/ui/use-toast";

enum AnalyzerStep {
  RESUME_INPUT,
  JOB_INPUT,
  RESULTS
}

export default function MainAnalyzer() {
  const [currentStep, setCurrentStep] = useState<AnalyzerStep>(AnalyzerStep.RESUME_INPUT);
  const [resumeSkills, setResumeSkills] = useState<string[]>([]);
  const [jobSkills, setJobSkills] = useState<string[]>([]);
  const [matchedSkills, setMatchedSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  
  const { toast } = useToast();

  const handleResumeSubmit = (text: string) => {
    const extractedSkills = extractSkills(text);
    setResumeSkills(extractedSkills);
    
    toast({
      title: "Resume analyzed!",
      description: `Found ${extractedSkills.length} skills in your resume.`,
      duration: 3000,
    });
    
    setCurrentStep(AnalyzerStep.JOB_INPUT);
  };

  const handleJobSkillsSubmit = (skills: string[]) => {
    setJobSkills(skills);
    
    const { matched, missing } = compareSkills(resumeSkills, skills);
    setMatchedSkills(matched);
    setMissingSkills(missing);
    
    toast({
      title: "Analysis complete!",
      description: `You match ${matched.length} skills out of ${skills.length} required skills.`,
      duration: 3000,
    });
    
    setCurrentStep(AnalyzerStep.RESULTS);
  };

  const resetAnalyzer = () => {
    setCurrentStep(AnalyzerStep.RESUME_INPUT);
    setResumeSkills([]);
    setJobSkills([]);
    setMatchedSkills([]);
    setMissingSkills([]);
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
        <SkillAnalysisResults 
          matchedSkills={matchedSkills}
          missingSkills={missingSkills}
          onReset={resetAnalyzer}
        />
      )}
    </div>
  );
}
