
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainAnalyzer from "@/components/MainAnalyzer";
import { Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const Index = () => {
  const analyzerRef = useRef<HTMLDivElement>(null);

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 max-w-5xl relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm dark:text-purple-300 mb-2">
              <div className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI-Powered Skill Analysis</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
              Bridge Your Skill Gaps, <br className="hidden md:inline" />
              <span className="text-primary">Land Your Dream Job</span>
            </h1>
            
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400 animate-fade-in">
              Upload your resume, paste a job description, and instantly discover which skills you need to showcase or develop.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 animate-fade-in">
              <Button onClick={scrollToAnalyzer} size="lg" className="gap-2">
                Start Analyzing
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 hidden md:flex justify-center">
            <Button variant="ghost" size="icon" onClick={scrollToAnalyzer} className="rounded-full animate-bounce">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card animate-scale-in">
              <div className="p-2 rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Resume Analysis</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Extract key skills from your resume using advanced NLP techniques.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card animate-scale-in">
              <div className="p-2 rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Skill Gap Detection</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Instantly identify missing skills that could make you a stronger candidate.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card animate-scale-in">
              <div className="p-2 rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Learning Resources</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get personalized course and resource recommendations to build missing skills.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Analyzer Section */}
      <section ref={analyzerRef} className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Analyze Your Skills</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-[700px]">
              Find out how your skills match up against job requirements and discover opportunities to improve.
            </p>
          </div>
          
          <MainAnalyzer />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
