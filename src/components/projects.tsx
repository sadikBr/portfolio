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

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "design", label: "UI/UX Design" },
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-featured online store with product listings, cart functionality, and secure checkout process.",
      image: "/placeholder.svg?height=600&width=800",
      category: "web",
      tags: ["Next.js", "Tailwind CSS", "Stripe", "Prisma"],
      demoUrl: "https://example.com/demo",
      repoUrl: "https://github.com/username/project",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A productivity application for managing tasks, projects, and team collaboration with real-time updates.",
      image: "/placeholder.svg?height=600&width=800",
      category: "web",
      tags: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
      demoUrl: "https://example.com/demo",
      repoUrl: "https://github.com/username/project",
      featured: true,
    },
    {
      id: 3,
      title: "Fitness Tracker Mobile App",
      description:
        "A mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
      image: "/placeholder.svg?height=600&width=800",
      category: "mobile",
      tags: ["React Native", "Redux", "Firebase", "Health API"],
      demoUrl: "https://example.com/demo",
      repoUrl: "https://github.com/username/project",
      featured: false,
    },
    {
      id: 4,
      title: "Financial Dashboard",
      description: "An interactive dashboard for visualizing financial data with customizable charts and reports.",
      image: "/placeholder.svg?height=600&width=800",
      category: "web",
      tags: ["React", "D3.js", "Node.js", "MongoDB"],
      demoUrl: "https://example.com/demo",
      repoUrl: "https://github.com/username/project",
      featured: true,
    },
    {
      id: 5,
      title: "Travel Companion App",
      description:
        "A travel planning application with itinerary management, location discovery, and travel recommendations.",
      image: "/placeholder.svg?height=600&width=800",
      category: "mobile",
      tags: ["Flutter", "Google Maps API", "Firebase"],
      demoUrl: "https://example.com/demo",
      repoUrl: "https://github.com/username/project",
      featured: false,
    },
    {
      id: 6,
      title: "E-learning Platform UI Design",
      description:
        "A comprehensive UI/UX design for an online learning platform with a focus on accessibility and user engagement.",
      image: "/placeholder.svg?height=600&width=800",
      category: "design",
      tags: ["Figma", "Adobe XD", "UI/UX", "Prototyping"],
      demoUrl: "https://example.com/demo",
      repoUrl: "https://github.com/username/project",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of my recent work across web development, mobile applications, and UI/UX design.
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
                      className="overflow-hidden group border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={800}
                          height={600}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="px-6 pb-6 pt-0">
                        <Button
                          variant="ghost"
                          className="p-0 h-auto font-semibold text-primary hover:text-primary/80 hover:bg-transparent group"
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
            <Link href="https://github.com" className="flex items-center gap-2">
              View All Projects <Github className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

