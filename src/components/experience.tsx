"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const experiences = [
  {
    id: "work",
    title: "Work",
    Icon: Briefcase,
    items: [
      {
        title: "Software Engineer",
        company: "PercallGroup",
        period: "Apr 2025 — Present",
        description: "Working on various projects customizing the Windchill PLM software using Java SE.",
        skills: ["Java SE", "Windchill"],
      },
      {
        title: "Technical Support Engineer",
        company: "PercallGroup",
        period: "Aug 2022 — Apr 2025",
        description:
          "Provided technical support to PTC customers on Windchill PDMLink and ProjectLink (administration and functionality).",
        skills: ["Windchill", "Debugging", "Java", "Logs"],
      },
      {
        title: "Intern",
        company: "Capgemini Engineering",
        period: "May — Aug 2022",
        description: "Built a full-stack application to calculate CO₂ emissions related to company activities.",
        skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Node.js", "Express", "MongoDB", "Climatiq REST API"],
      },
      {
        title: "Intern",
        company: "AIC Metallurgie",
        period: "Apr — Aug 2021",
        description: "Proposed a real-time, non-destructive inspection method for welds.",
        skills: ["Welding", "GANTT", "PDCA", "Functional Analysis", "Industry 4.0", "Artificial Intelligence"],
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    Icon: GraduationCap,
    items: [
      {
        title: "Engineering in Logistics and Supply Chain",
        company: "National School of Applied Sciences",
        period: "2018 — 2021",
        description: "Studied logistics, supply chain management, and software development.",
        skills: ["Algorithms", "Web Technologies", "Critical Thinking", "Management"],
      },
      {
        title: "Integrated Preparatory Classes",
        company: "National School of Applied Sciences",
        period: "2016 — 2018",
        description: "Learned programming fundamentals in C, C++ and Matlab, alongside the engineering sciences.",
        skills: ["C", "C++", "Matlab", "Data Structures", "Engineering Sciences"],
      },
      {
        title: "Baccalaureate in Mathematical Sciences (A)",
        company: "Demnate Qualifying High School",
        period: "2015 — 2016",
        description:
          "Built a strong foundation in mathematics and statistics, developing problem-solving and analytical thinking.",
        skills: ["Mathematics", "Physics", "Calculus", "Probability"],
      },
    ],
  },
] as const;

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 md:py-32">
      <div className="container">
        <SectionHeading
          id="experience-title"
          eyebrow="Journey"
          title="Experience & education"
          description="The professional path and education that shaped my skills and expertise."
        />

        <Tabs defaultValue="work" className="mx-auto w-full max-w-4xl">
          <TabsList className="mx-auto mb-12 grid h-auto w-full max-w-sm grid-cols-2 rounded-full p-1.5">
            {experiences.map(({ id, title, Icon }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="gap-2 rounded-full py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent"
              >
                <Icon className="size-4" />
                {title}
              </TabsTrigger>
            ))}
          </TabsList>

          {experiences.map((exp) => (
            <TabsContent key={exp.id} value={exp.id}>
              <ol className="relative space-y-10 before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-border before:to-transparent md:before:left-1/2">
                {exp.items.map((item, index) => {
                  const left = index % 2 === 0;
                  return (
                    <li key={`${item.company}-${item.period}`} className="relative flex md:justify-center">
                      <div className="absolute left-5 top-6 z-10 -translate-x-1/2 md:left-1/2">
                        <span
                          className={cn(
                            "grid size-4 place-items-center rounded-full border-2 border-background ring-4 ring-background",
                            index === 0 ? "bg-primary shadow-[0_0_0_6px] shadow-primary/20" : "bg-muted-foreground/50",
                          )}
                        />
                      </div>

                      <Reveal
                        delay={index * 80}
                        className={cn(
                          "ml-12 w-full md:ml-0 md:w-[calc(50%-2.5rem)]",
                          left ? "md:mr-auto" : "md:ml-auto",
                        )}
                      >
                        <article className="glow-card rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/5">
                          <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-xs text-primary">
                            <Calendar className="size-3.5" /> {item.period}
                          </p>
                          <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                          <p className="text-sm font-medium text-muted-foreground">{item.company}</p>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {item.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="font-normal">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </article>
                      </Reveal>
                    </li>
                  );
                })}
              </ol>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
