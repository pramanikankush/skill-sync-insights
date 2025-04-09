
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jobRoles } from "@/lib/mock-data";

interface JobDescriptionInputProps {
  onSubmit: (skills: string[]) => void;
}

export default function JobDescriptionInput({ onSubmit }: JobDescriptionInputProps) {
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("paste");

  const handleCustomSubmit = () => {
    if (!jobDescriptionText.trim()) return;
    
    setLoading(true);
    // Simulate processing delay
    setTimeout(() => {
      // In a real app, we would extract skills from the JD text
      // For now, we'll just send a random set of skills
      const selectedJob = jobRoles[Math.floor(Math.random() * jobRoles.length)];
      onSubmit(selectedJob.skills);
      setLoading(false);
    }, 1000);
  };

  const handleRoleSelect = (value: string) => {
    setSelectedRole(value);
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const selectedJob = jobRoles.find(role => role.id === value);
      if (selectedJob) {
        onSubmit(selectedJob.skills);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Step 2: Provide job details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="paste" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paste">Paste Job Description</TabsTrigger>
            <TabsTrigger value="select">Select Job Role</TabsTrigger>
          </TabsList>
          <TabsContent value="paste" className="space-y-4 pt-4">
            <Textarea
              placeholder="Paste the job description here..."
              className="min-h-[150px]"
              value={jobDescriptionText}
              onChange={(e) => setJobDescriptionText(e.target.value)}
            />
            <Button 
              onClick={handleCustomSubmit} 
              disabled={!jobDescriptionText.trim() || loading}
              className="w-full"
            >
              {loading ? "Processing..." : "Analyze Job Description"}
            </Button>
          </TabsContent>
          <TabsContent value="select" className="space-y-4 pt-4">
            <Select onValueChange={handleRoleSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a job role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Job Roles</SelectLabel>
                  {jobRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
