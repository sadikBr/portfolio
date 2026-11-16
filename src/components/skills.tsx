import type { CSSProperties } from "react";
import {
  siHtml5,
  siCss,
  siReact,
  siVuedotjs,
  siTailwindcss,
  siJavascript,
  siTypescript,
  siNextdotjs,
  siNodedotjs,
  siDeno,
  siExpress,
  siMongodb,
  siMysql,
  siPostgresql,
  siPython,
  siOpenjdk,
  siC,
  siCplusplus,
  siLinux,
  siGit,
  siGithub,
  siNeovim,
  type SimpleIcon,
} from "simple-icons";
import { Code, Server, Braces, Wrench, Database, Monitor, Code2, Webhook, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

type Skill = { name: string; icon: SimpleIcon | LucideIcon };

const categories: {
  title: string;
  blurb: string;
  Icon: LucideIcon;
  className: string;
  skills: Skill[];
}[] = [
  {
    title: "Frontend",
    blurb: "Responsive, accessible interfaces built with modern frameworks.",
    Icon: Code,
    className: "md:col-span-4",
    skills: [
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs },
      { name: "Vue.js", icon: siVuedotjs },
      { name: "TypeScript", icon: siTypescript },
      { name: "JavaScript", icon: siJavascript },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "HTML5", icon: siHtml5 },
      { name: "CSS3", icon: siCss },
    ],
  },
  {
    title: "Languages",
    blurb: "General-purpose languages beyond the browser.",
    Icon: Braces,
    className: "md:col-span-2",
    skills: [
      { name: "Python", icon: siPython },
      { name: "Java SE", icon: siOpenjdk },
      { name: "C", icon: siC },
      { name: "C++", icon: siCplusplus },
    ],
  },
  {
    title: "Backend & Data",
    blurb: "APIs, services and the databases behind them.",
    Icon: Server,
    className: "md:col-span-3",
    skills: [
      { name: "Node.js", icon: siNodedotjs },
      { name: "Express", icon: siExpress },
      { name: "Deno", icon: siDeno },
      { name: "REST APIs", icon: Webhook },
      { name: "MongoDB", icon: siMongodb },
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "MySQL", icon: siMysql },
      { name: "Oracle", icon: Database },
    ],
  },
  {
    title: "Tools & Environment",
    blurb: "The setup I build in every day.",
    Icon: Wrench,
    className: "md:col-span-3",
    skills: [
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
      { name: "Neovim", icon: siNeovim },
      { name: "VS Code", icon: Code2 },
      { name: "Linux", icon: siLinux },
      { name: "Windows", icon: Monitor },
    ],
  },
];

const allSkills = categories.flatMap((c) => c.skills);

function isSimpleIcon(icon: Skill["icon"]): icon is SimpleIcon {
  return typeof icon === "object" && "path" in icon;
}

/** Brand colour for hover, skipped when it's too dark to read on a dark background. */
function brandColor(icon: Skill["icon"]) {
  if (!isSimpleIcon(icon)) return undefined;
  const n = parseInt(icon.hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.25 ? `#${icon.hex}` : undefined;
}

function SkillLogo({ icon, className }: { icon: Skill["icon"]; className?: string }) {
  if (isSimpleIcon(icon)) {
    return (
      <svg role="img" viewBox="0 0 24 24" aria-hidden className={cn("fill-current", className)}>
        <path d={icon.path} />
      </svg>
    );
  }
  const Icon = icon;
  return <Icon aria-hidden className={className} />;
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden py-24 md:py-32 bg-muted/40">
      <div className="container">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="My technical toolbox"
          description="The languages, frameworks and tools I reach for to take an idea from design to deployment."
        />
      </div>

      {/* Decorative logo marquee — the grid below carries the real content */}
      <div aria-hidden className="group relative mb-14 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
            {allSkills.map((skill) => (
              <li
                key={skill.name}
                className="flex items-center gap-2.5 text-muted-foreground/70 transition-colors hover:text-[var(--brand,var(--foreground))]"
                style={{ "--brand": brandColor(skill.icon) } as CSSProperties}
              >
                <SkillLogo icon={skill.icon} className="size-7" />
                <span className="whitespace-nowrap text-lg font-semibold tracking-tight">{skill.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="container">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-6">
          {categories.map(({ title, blurb, Icon, className, skills }, i) => (
            <Reveal key={title} delay={i * 80} className={cn("h-full", className)}>
              <article className="glow-card relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-6 sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br from-brand-1/20 to-brand-2/10 blur-2xl"
                />
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-1 to-brand-2 text-white shadow-md shadow-brand-1/20">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{blurb}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="group/chip flex items-center gap-2 rounded-full border bg-background/60 py-1.5 pr-3.5 pl-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[var(--brand,var(--primary))]/50 hover:shadow-md"
                      style={{ "--brand": brandColor(skill.icon) } as CSSProperties}
                    >
                      <SkillLogo
                        icon={skill.icon}
                        className="size-4 text-muted-foreground transition-colors group-hover/chip:text-[var(--brand,var(--primary))]"
                      />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
