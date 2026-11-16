import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard, type Project } from "./project-card";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { site } from "@/lib/site";

import LandingPageImage from "@/assets/landing-page-project.png";
import PortfolioImage from "@/assets/portfolio-project.png";
import ResumeBuilderImage from "@/assets/resume-builder-project.png";
import QuranImage from "@/assets/quran-project.png";

const projects: Project[] = [
  {
    title: "Quran Reader",
    description:
      "Read and listen to the Quran with tafsir and translation, track your daily reading and memorization, and recite to your study circle over live video.",
    image: QuranImage,
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Better Auth", "Web Push"],
    demoUrl: "https://quran.brahimsadik.com",
    repoUrl: "https://github.com/sadikBr/quran",
    featured: true,
  },
  {
    title: "Professional Resume Builder",
    description:
      "Create a professional resume in minutes. Fill in your details, see a real-time preview, and export to PDF.",
    image: ResumeBuilderImage,
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://resume-builder.brahimsadik.com",
    repoUrl: "https://github.com/sadikBr/resume-builder",
    featured: true,
  },
  {
    title: "Landing Page",
    description: "An interactive 3D landing page for my personal website.",
    image: LandingPageImage,
    tags: ["Three.js", "TypeScript", "HTML5", "CSS3"],
    demoUrl: "https://www.brahimsadik.com",
    repoUrl: "https://github.com/sadikBr/landing-page",
    featured: false,
  },
  {
    title: "Portfolio Website",
    description: "This site — everything about me, my experience, and a way to get in touch.",
    image: PortfolioImage,
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://portfolio.brahimsadik.com",
    repoUrl: "https://github.com/sadikBr/portfolio",
    featured: false,
  },
];

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 md:py-32 bg-muted/40">
      <div className="container">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Things I've built"
          description="A selection of recent work. Every project is open source — take a look at the code."
        />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 100} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href={site.github} target="_blank" rel="noopener noreferrer">
              <Github /> See more on GitHub
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
