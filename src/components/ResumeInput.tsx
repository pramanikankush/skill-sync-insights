
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { analyzeResumeWithAI } from "@/lib/ai-service";

interface ResumeInputProps {
  onSubmit: (text: string) => void;
}

export default function ResumeInput({ onSubmit }: ResumeInputProps) {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your resume content before submitting",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Start AI analysis in the background
      const aiAnalysisPromise = analyzeResumeWithAI(resumeText);
      
      // Notify the user
      toast({
        title: "Processing Resume",
        description: "Analyzing your resume with AI...",
        duration: 3000,
      });
      
      // Process the resume
      onSubmit(resumeText);
      
      // Wait for AI analysis to complete (in background)
      aiAnalysisPromise.then(result => {
        console.log("AI Analysis Result:", result);
        // We'll use this result in EnhancedAnalysis component
        localStorage.setItem('aiAnalysisResult', JSON.stringify(result));
      }).catch(error => {
        console.error("AI Analysis Error:", error);
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem analyzing your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Step 1: Paste your resume content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste the content of your resume or LinkedIn profile here..."
          className="min-h-[200px]"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button 
          onClick={handleSubmit} 
          disabled={!resumeText.trim() || loading} 
          className="w-full"
          type="button"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Analyze Resume"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
