import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  // About Me
  const aboutMeData = {
    aboutMe:
      "I am a software engineer with a passion for building innovative and user-friendly applications. I have a strong background in web development, with expertise in technologies like React.js, Next.js, and Node.js. I am always eager to learn new things and take on new challenges.",
    imageUrl: "/assets/profile.png",
  };

  await db.insert(schema.aboutMe).values(aboutMeData);

  // Skills
  const skillCategories = [
    {
      name: "Programming Languages",
      icon: "Computer",
      order: 1,
      skills: [
        { name: "C", level: "70" },
        { name: "C++", level: "60" },
        { name: "Python", level: "90" },
        { name: "Java SE", level: "80" },
      ],
    },
    {
      name: "Frontend",
      icon: "Code",
      order: 2,
      skills: [
        { name: "HTML5/CSS3", level: "95" },
        { name: "Tailwind CSS", level: "90" },
        { name: "JavaScript (ES6+)", level: "90" },
        { name: "TypeScript", level: "85" },
        { name: "React.js", level: "95" },
        { name: "Vue.js", level: "95" },
        { name: "Next.js", level: "85" },
      ],
    },
    {
      name: "Backend",
      icon: "Database",
      order: 3,
      skills: [
        { name: "Node.js", level: "80" },
        { name: "Deno", level: "75" },
        { name: "Express.js", level: "90" },
        { name: "MongoDB", level: "80" },
        { name: "Oracle", level: "80" },
        { name: "MySQL", level: "80" },
        { name: "PostgreSQL", level: "75" },
        { name: "RESTful APIs", level: "95" },
      ],
    },
    {
      name: "Operating Systems & Tools",
      icon: "Settings",
      order: 4,
      skills: [
        { name: "Windows", level: "80" },
        { name: "Linux", level: "85" },
        { name: "Git/GitHub", level: "90" },
        { name: "VS Code", level: "95" },
        { name: "Neovim", level: "90" },
      ],
    },
  ];

  for (const category of skillCategories) {
    const insertedCategory = await db
      .insert(schema.skillCategory)
      .values({
        name: category.name,
        icon: category.icon,
        order: category.order,
      })
      .returning();

    for (const skill of category.skills) {
      await db.insert(schema.skill).values({
        ...skill,
        categoryID: insertedCategory[0].id,
      });
    }
  }

  // Experience
  const experienceCategories = [
    {
      name: "Work Experience",
      icon: "Briefcase",
      order: 1,
      experiences: [
        {
          title: "Software Engineer",
          company: "PercallGroup",
          period: "April 2025 - Present",
          description:
            "Working on different projects regarding the customization of the Windchill Software using Java SE.",
          skills: "Java SE,Windchill",
          order: 1,
        },
        {
          title: "Technical Support Engineer",
          company: "PercallGroup",
          period: "August 2022 - April 2025",
          description:
            "Providing technical support to PTC cutomers regarding Windchill PDMLink and ProjectLink (Administration and Functionality).",
          skills: "Windchill,Debugging,Java,Logs",
          order: 2,
        },
        {
          title: "Intern",
          company: "Capgemini Engineering",
          period: "May - August 2022",
          description:
            "Built a fullstack application to calculate CO2 emissions related to company activities.",
          skills:
            "React.js,Javascript,HTML5,CSS3,Nodejs,Express,MongoDB,Climatiq Rest API",
          order: 3,
        },
        {
          title: "Intern",
          company: "AIC Metallurgie",
          period: "April - August 2021",
          description:
            "Propose a real time non destructive control method for welds.",
          skills:
            "Welding,GANTT,PDCA,Functional Analysis,Industry 4.0,Artificial Inteligence",
          order: 4,
        },
      ],
    },
    {
      name: "Education",
      icon: "GraduationCap",
      order: 2,
      experiences: [
        {
          title: "Engineering in Logistics and Supply Chain",
          company: "National School of Applied Schiences",
          period: "2018 - 2021",
          description:
            "Learned about logistics, supply chain management, and software development.",
          skills: "Algorithms,Web Technologies,Critical Thinking,Management",
          order: 1,
        },
        {
          title: "Intergrated Preparatory Classes Core Curriculum",
          company: "National School of Applied Schiences",
          period: "2016 - 2018",
          description:
            "Learned the basics of programming languages such as C, C++, Matlab and also the engineering sciences.",
          skills: "C,C++,Matlab,Data Structures,Engineering Schiences",
          order: 2,
        },
        {
          title: "Bachelor in Mathematical Sciences (A)",
          company: "Demnate Qualifying High School",
          period: "2015 - 2016",
          description:
            "Accumulated knowledge in mathematics and statistics, developing problem-solving skills and analytical thinking.",
          skills: "mathematics,Physics,Calculus,Probability",
          order: 3,
        },
      ],
    },
  ];

  for (const category of experienceCategories) {
    const insertedCategory = await db
      .insert(schema.experienceCategory)
      .values({
        name: category.name,
        icon: category.icon,
        order: category.order,
      })
      .returning();

    for (const experience of category.experiences) {
      await db.insert(schema.experience).values({
        ...experience,
        experienceCategoryID: insertedCategory[0].id,
      });
    }
  }

  // Projects
  const projectCategories = [
    {
      name: "Web Development",
      order: 1,
      projects: [
        {
          title: "Landing Page",
          description: "A landing page for my Website",
          imageURL: "/assets/landing-page-project.png",
          tags: "Three.js,HTML5,CSS3,TypeScript",
          demoURL: "https://www.brahimsadik.com",
          repoURL: "https://github.com/sadikBr/landing-page",
          featured: true,
        },
        {
          title: "Portfolio Website",
          description:
            "My Portfolio Website where you can find all the information about me and you can contact me through it.",
          imageURL: "/assets/portfolio-project.png",
          tags: "Next.js,TypeScript,Tailwind CSS",
          demoURL: "https://portfolio.brahimsadik.com",
          repoURL: "https://github.com/sadikBr/portfolio",
          featured: true,
        },
        {
          title: "Professional Resume Builder Application",
          description:
            "An application where you can Create a professional resume in minutes. Fill in your details, see a real-time preview, and export to PDF.",
          imageURL: "/assets/resume-builder-project.png",
          tags: "Next.js,TypeScript,Tailwind CSS",
          demoURL: "https://resume-builder.brahimsadik.com",
          repoURL: "https://github.com/sadikBr/resume-builder",
          featured: false,
        },
      ],
    },
  ];

  for (const category of projectCategories) {
    const insertedCategory = await db
      .insert(schema.projectCategory)
      .values({
        name: category.name,
        order: category.order,
      })
      .returning();

    for (const project of category.projects) {
      await db.insert(schema.project).values({
        ...project,
        projectCategoryID: insertedCategory[0].id,
      });
    }
  }

  console.log("Database seeded successfully!");
  pool.end();
}

main().catch((err) => {
  console.error(err);
  pool.end();
});
