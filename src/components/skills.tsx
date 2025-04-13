"use client";

import { useState } from "react";
import { Code, Palette, Database, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

  const skillCategories = [
    {
      id: "frontend",
      name: "Frontend",
      icon: <Code className="h-5 w-5" />,
      skills: [
        { name: "HTML5/CSS3", level: 95 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "React.js", level: 92 },
        { name: "Next.js", level: 88 },
        { name: "Tailwind CSS", level: 90 },
        { name: "TypeScript", level: 85 },
      ],
    },
    {
      id: "design",
      name: "Design",
      icon: <Palette className="h-5 w-5" />,
      skills: [
        { name: "UI/UX Design", level: 80 },
        { name: "Figma", level: 85 },
        { name: "Adobe XD", level: 75 },
        { name: "Responsive Design", level: 90 },
        { name: "Design Systems", level: 82 },
        { name: "Animation", level: 78 },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      icon: <Database className="h-5 w-5" />,
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 82 },
        { name: "MongoDB", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "RESTful APIs", level: 88 },
        { name: "GraphQL", level: 78 },
      ],
    },
    {
      id: "tools",
      name: "Tools",
      icon: <Settings className="h-5 w-5" />,
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "Webpack", level: 80 },
        { name: "Docker", level: 75 },
        { name: "CI/CD", level: 78 },
        { name: "Jest", level: 82 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">My Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've acquired a diverse set of skills throughout my journey as a developer. Here's a comprehensive overview
            of my technical expertise.
          </p>
        </div>

        <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
          <TabsList className="w-full h-auto grid grid-cols-2 md:grid-cols-4 mb-8">
            {skillCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category.icon}
                    {category.name} Skills
                  </CardTitle>
                  <CardDescription>
                    My expertise and experience in {category.name.toLowerCase()} development
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full bg-primary transition-all duration-1000 ease-out rounded-full",
                              activeTab === category.id ? "w-[var(--skill-level)]" : "w-0",
                            )}
                            style={{ "--skill-level": `${skill.level}%` } as React.CSSProperties}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
