
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ResumeInputProps {
  onSubmit: (text: string) => void;
}

export default function ResumeInput({ onSubmit }: ResumeInputProps) {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!resumeText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your resume content before submitting",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    // Simulate processing delay
    setTimeout(() => {
      try {
        onSubmit(resumeText);
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem analyzing your resume. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }, 800);
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
          {loading ? "Processing..." : "Analyze Resume"}
        </Button>
      </CardContent>
    </Card>
  );
}
