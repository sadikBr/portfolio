import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Code2, Rocket, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Reveal } from "./reveal";
import { site } from "@/lib/site";

import ProfileImage from "@/assets/profile.png";

const highlights = [
  { Icon: Code2, title: "Full-stack", text: "React, Next.js, Node.js, Deno" },
  { Icon: Rocket, title: "Enterprise", text: "Windchill PLM & Java SE" },
  { Icon: BookOpen, title: "Always learning", text: "New tools, new ideas" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div className="container">
        <div className="grid items-center gap-14 md:grid-cols-[5fr_7fr]">
          <Reveal className="flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-1 via-brand-2 to-brand-3 opacity-30 blur-2xl"
              />
              <div className="relative size-64 rotate-3 overflow-hidden rounded-[2rem] border-4 border-background shadow-2xl transition-transform duration-500 hover:rotate-0 sm:size-80">
                <Image
                  src={ProfileImage}
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="(min-width: 640px) 320px, 256px"
                  placeholder="blur"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="glass absolute -bottom-5 -left-5 rounded-2xl border px-4 py-3 shadow-lg">
                <p className="text-xs text-muted-foreground">Currently</p>
                <p className="text-sm font-semibold">Software Engineer @ PercallGroup</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">About me</p>
              <h2 id="about-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Engineer by training, <span className="text-gradient">builder by passion.</span>
              </h2>
            </Reveal>

            <Reveal delay={100} className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hello! I&apos;m {site.name}, a passionate developer with about 5 years of experience creating beautiful,
                functional websites and applications. I specialize in both front-end and back-end development, with
                expertise in React, Next.js, Node.js, Deno, and modern CSS frameworks.
              </p>
              <p>
                My journey in web development began during my third year at the National School of Applied Sciences,
                where I discovered my passion for creating digital experiences. Since then, I have kept growing my skills
                by working with different technologies and building projects.
              </p>
              <p>
                When I&apos;m not coding, you can find me watching YouTube (coding, game development, anime…), reading a
                book, or experimenting with new technologies. I believe in continuous learning and staying up to date
                — in web development and in every other aspect of life.
              </p>
            </Reveal>

            <Reveal delay={200} className="grid gap-3 sm:grid-cols-3">
              {highlights.map(({ Icon, title, text }) => (
                <div key={title} className="rounded-xl border bg-card p-4 transition-colors hover:border-primary/40">
                  <Icon className="size-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground">{text}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={300} className="pt-2">
              <Button className="rounded-full" size="lg" asChild>
                <Link href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
                  View my resume <ExternalLink />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
