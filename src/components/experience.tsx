"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      id: "work",
      title: "Work Experience",
      icon: <Briefcase className="h-5 w-5" />,
      items: [
        {
          title: "Senior Frontend Developer",
          company: "Tech Innovations Inc.",
          period: "2021 - Present",
          description:
            "Lead the frontend development team in building modern web applications using React and Next.js. Implemented design systems and improved performance by 40%.",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        },
        {
          title: "Web Developer",
          company: "Digital Solutions Ltd.",
          period: "2018 - 2021",
          description:
            "Developed responsive websites and web applications for various clients. Collaborated with designers to implement pixel-perfect UI. Optimized existing codebases.",
          skills: ["JavaScript", "React", "CSS3", "Node.js"],
        },
        {
          title: "Junior Developer",
          company: "WebCraft Agency",
          period: "2016 - 2018",
          description:
            "Built and maintained websites for small to medium businesses. Assisted senior developers with larger projects and learned modern development practices.",
          skills: ["HTML5", "CSS3", "JavaScript", "WordPress"],
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      icon: <GraduationCap className="h-5 w-5" />,
      items: [
        {
          title: "Master's in Computer Science",
          company: "Tech University",
          period: "2014 - 2016",
          description:
            "Specialized in Web Technologies and Human-Computer Interaction. Graduated with honors and completed a thesis on optimizing web application performance.",
          skills: ["Algorithms", "Web Technologies", "UI/UX Research"],
        },
        {
          title: "Bachelor's in Software Engineering",
          company: "State University",
          period: "2010 - 2014",
          description:
            "Fundamental education in software development principles, data structures, and programming languages. Participated in various hackathons and coding competitions.",
          skills: ["Java", "Python", "Data Structures", "Software Design"],
        },
        {
          title: "Web Development Bootcamp",
          company: "Code Academy",
          period: "Summer 2013",
          description:
            "Intensive 12-week program focused on modern web development technologies and practices. Built several full-stack applications as part of the curriculum.",
          skills: ["JavaScript", "HTML/CSS", "Node.js", "MongoDB"],
        },
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Experience & Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and educational background that have shaped my skills and expertise.
          </p>
        </div>

        <Tabs defaultValue="work" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-8 w-[400px] max-w-full mx-auto">
            {experiences.map((exp) => (
              <TabsTrigger
                key={exp.id}
                value={exp.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {exp.icon}
                {exp.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {experiences.map((exp) => (
            <TabsContent key={exp.id} value={exp.id} className="space-y-8">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {exp.items.map((item, index) => (
                  <div key={index} className="relative flex items-start md:justify-center">
                    <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border bg-background shadow">
                      {index === 0 ? (
                        <span className="w-3 h-3 bg-primary rounded-full"></span>
                      ) : (
                        <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                      )}
                    </div>

                    <Card
                      className={`w-full md:w-[calc(50%-2.5rem)] ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"} relative`}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center gap-2">
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {item.period}
                          </Badge>
                        </div>
                        <CardDescription className="text-base font-medium">{item.company}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
