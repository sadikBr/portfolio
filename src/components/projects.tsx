"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import LandingPageImage from "@/assets/landing-page-project.png";
import PortfolioImage from "@/assets/portfolio-project.png";
import ResumeBuilderImage from "@/assets/resume-builder-project.png";

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
  ];

  const projects = [
    {
      id: 1,
      title: "Landing Page",
      description:
        "A landing page for my Website",
      image: LandingPageImage,
      category: "web",
      tags: ["Three.js", "HTML5", "CSS3", "TypeScript"],
      demoUrl: "https://www.brahimsadik.com",
      repoUrl: "https://github.com/sadikBr/landing-page",
      featured: true,
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "My Portfolio Website where you can find all the information about me and you can contact me through it.",
      image: PortfolioImage,
      category: "web",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      demoUrl: "https://portfolio.brahimsadik.com",
      repoUrl: "https://github.com/sadikBr/portfolio",
      featured: true,
    },
    {
      id: 3,
      title: "Professional Resume Builder Application",
      description:
        "An application where you can Create a professional resume in minutes. Fill in your details, see a real-time preview, and export to PDF.",
      image: ResumeBuilderImage,
      category: "web",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      demoUrl: "https://resume-builder.brahimsadik.com",
      repoUrl: "https://github.com/sadikBr/resume-builder",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of my recent work across web development and other categories.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((project) => category.id === "all" || project.category === category.id)
                  .map((project, index) => (
                    <Card
                      key={project.id}
                      className="overflow-hidden group max-h-[420px] border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 py-0"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={2000}
                          height={1300}
                          className="object-cotain h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="default" asChild>
                              <Link
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <ExternalLink className="size-4" /> Demo
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <Github className="size-4" /> Code
                              </Link>
                            </Button>
                          </div>
                        </div>
                        {project.featured && (
                          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">Featured</Badge>
                        )}
                      </div>
                      <CardContent className="px-6 flex flex-col h-full">
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="mt-auto px-6 pb-4 pt-0">
                        <Button
                          variant="ghost"
                          className="px-2 py-1 h-auto font-semibold text-primary hover:text-primary/80 hover:bg-transparent group"
                          asChild
                        >
                          <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            View Project Details
                            <ArrowRight
                              className={cn(
                                "ml-1 size-4 transition-transform duration-300",
                                hoveredIndex === index ? "translate-x-1" : "",
                              )}
                            />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="https://github.com/sadikBr" className="flex items-center gap-2">
              View All Projects <Github className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

