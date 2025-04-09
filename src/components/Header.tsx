
import { ThemeToggle } from "./ThemeToggle";
import { Brain } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">
            Resume Skill Gap Analyzer
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
