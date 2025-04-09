
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResumeInputProps {
  onSubmit: (text: string) => void;
}

export default function ResumeInput({ onSubmit }: ResumeInputProps) {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!resumeText.trim()) return;
    
    setLoading(true);
    // Simulate processing delay
    setTimeout(() => {
      onSubmit(resumeText);
      setLoading(false);
    }, 1000);
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
        />
        <Button 
          onClick={handleSubmit} 
          disabled={!resumeText.trim() || loading} 
          className="w-full"
        >
          {loading ? "Processing..." : "Analyze Resume"}
        </Button>
      </CardContent>
    </Card>
  );
}
