"use client";

import type { CSSProperties, PointerEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Project = {
  title: string;
  description: string;
  image: StaticImageData;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  featured: boolean;
};

/** Frame aspect ratio (16:10). Screenshots taller than this scroll on hover. */
const FRAME_RATIO = 10 / 16;

export function ProjectCard({ project }: { project: Project }) {
  const { image } = project;
  const host = new URL(project.demoUrl).host.replace(/^www\./, "");

  // Scroll speed scales with how much of the page is hidden below the fold
  const overflow = Math.max(0, image.height / image.width - FRAME_RATIO);
  const panDuration = `${Math.round(Math.min(7000, overflow * 3200))}ms`;

  const trackPointer = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onPointerMove={trackPointer}
      className="group relative flex h-full flex-col rounded-3xl border bg-card p-2 transition-shadow duration-500 ease-out hover:shadow-[0_30px_60px_-25px] hover:shadow-brand-1/35"
      style={{ "--mx": "50%", "--my": "0px", "--pan": panDuration } as CSSProperties}
    >
      {/* Spotlight border: a gradient ring that follows the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: 1.5,
          background:
            "radial-gradient(280px circle at var(--mx) var(--my), var(--brand-2), var(--brand-1) 35%, transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Spotlight fill: soft light on the card surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx) var(--my), color-mix(in oklch, var(--brand-1) 16%, transparent), transparent 60%)",
        }}
      />

      {/* Browser-window preview */}
      <Link
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
        className="relative block overflow-hidden rounded-2xl border bg-muted"
      >
        <div className="flex h-9 items-center gap-3 border-b bg-background/80 px-3.5 backdrop-blur">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex max-w-[60%] items-center truncate rounded-md bg-muted px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
            {host}
          </div>
          <div className="w-[42px]" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            className="object-cover object-top transition-[object-position] duration-700 ease-in-out motion-safe:group-hover:object-bottom group-hover:[transition-duration:var(--pan)]"
          />

          {project.featured && (
            <Badge className="absolute top-3 left-3 gap-1 border-white/20 bg-black/55 text-white backdrop-blur-md">
              <Star className="size-3 fill-amber-400 text-amber-400" /> Featured
            </Badge>
          )}

          <span className="absolute right-3 bottom-3 inline-flex translate-y-3 items-center gap-1 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Visit site <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </Link>

      <div className="relative flex flex-1 flex-col px-4 pt-5 pb-4">
        <h3 className="text-lg font-semibold">
          <Link
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-primary"
          >
            {project.title}
            <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-6">
          <Button size="sm" className="flex-1 rounded-full" asChild>
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Live demo <ArrowUpRight />
            </Link>
          </Button>
          <Button size="sm" variant="outline" className="flex-1 rounded-full" asChild>
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github /> Code
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
