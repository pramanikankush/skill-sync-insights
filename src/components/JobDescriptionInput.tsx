
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { extractSkills } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobDescriptionInputProps {
  onSubmit: (skills: string[], industry?: string) => void;
}

export default function JobDescriptionInput({ onSubmit }: JobDescriptionInputProps) {
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [industry, setIndustry] = useState("Technology");
  
  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Marketing",
    "Education", 
    "Manufacturing",
    "Retail",
    "Other"
  ];

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !customSkills.includes(customSkill.trim())) {
      setCustomSkills([...customSkills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Extract skills from job description text
    let skills: string[] = [];
    if (jobDescriptionText.trim()) {
      skills = extractSkills(jobDescriptionText);
    }
    
    // Combine with any custom skills
    const allSkills = [...new Set([...skills, ...customSkills])];
    
    // Simulate processing delay
    setTimeout(() => {
      onSubmit(allSkills, industry);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Step 2: Enter job description and industry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="industry">Select industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      
        <div>
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here..."
            className="min-h-[150px]"
            value={jobDescriptionText}
            onChange={(e) => setJobDescriptionText(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="customSkill">Add specific skills (optional)</Label>
          <div className="flex gap-2">
            <Input
              id="customSkill"
              placeholder="e.g., React, Python, Project Management"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
            />
            <Button 
              variant="outline" 
              onClick={handleAddCustomSkill}
              type="button"
            >
              Add
            </Button>
          </div>
          
          {customSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {customSkills.map((skill) => (
                <div 
                  key={skill} 
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  {skill}
                  <button 
                    onClick={() => setCustomSkills(customSkills.filter(s => s !== skill))}
                    className="text-secondary-foreground opacity-70 hover:opacity-100 ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={(!jobDescriptionText.trim() && customSkills.length === 0) || loading} 
          className="w-full"
        >
          {loading ? "Processing..." : "Analyze Job Requirements"}
        </Button>
      </CardContent>
    </Card>
  );
}
