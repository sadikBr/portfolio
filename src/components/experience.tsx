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
          title: "Software Engineer",
          company: "PercallGroup",
          period: "April 2025 - Present",
          description:
            "Working on different projects regarding the customization of the Windchill Software using Java SE.",
          skills: ["Java SE", "Windchill"],
        },
        {
          title: "Technical Support Engineer",
          company: "PercallGroup",
          period: "August 2022 - April 2025",
          description:
            "Providing technical support to PTC cutomers regarding Windchill PDMLink and ProjectLink (Administration and Functionality).",
          skills: ["Windchill", "Debugging", "Java", "Logs"],
        },
        {
          title: "Intern",
          company: "Capgemini Engineering",
          period: "May - August 2022",
          description:
            "Built a fullstack application to calculate CO2 emissions related to company activities.",
          skills: ["React.js", "Javascript", "HTML5", "CSS3", "Nodejs", "Express", "MongoDB", "Climatiq Rest API"],
        },
        {
          title: "Intern",
          company: "AIC Metallurgie",
          period: "April - August 2021",
          description:
            "Propose a real time non destructive control method for welds.",
          skills: ["Welding", "GANTT", "PDCA", "Functional Analysis", "Industry 4.0", "Artificial Inteligence"],
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      icon: <GraduationCap className="h-5 w-5" />,
      items: [
        {
          title: "Engineering in Logistics and Supply Chain",
          company: "National School of Applied Schiences",
          period: "2018 - 2021",
          description:
            "Learned about logistics, supply chain management, and software development.",
          skills: ["Algorithms", "Web Technologies", "Critical Thinking", "Management"],
        },
        {
          title: "Intergrated Preparatory Classes Core Curriculum",
          company: "National School of Applied Schiences",
          period: "2016 - 2018",
          description:
            "Learned the basics of programming languages such as C, C++, Matlab and also the engineering sciences.",
          skills: ["C", "C++", "Matlab", "Data Structures", "Engineering Schiences"],
        },
        {
          title: "Bachelor in Mathematical Sciences (A)",
          company: "Demnate Qualifying High School",
          period: "2015 - 2016",
          description:
            "Accumulated knowledge in mathematics and statistics, developing problem-solving skills and analytical thinking.",
          skills: ["mathematics", "Physics", "Calculus", "Probability"],
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
