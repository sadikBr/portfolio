"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import useTypeWriter from "@/hooks/useTypeWriter";
import { Button } from "./ui/button";
import { site } from "@/lib/site";

const roles = ["a Software Engineer", "a Full-Stack Developer", "a Creator", "a Team Player"] as const;

const stats = [
  { value: "5+", label: "Years coding" },
  { value: "3+", label: "Years in industry" },
  { value: "20+", label: "Technologies" },
];

export function Hero() {
  const { typedText } = useTypeWriter(roles);

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-24 left-1/2 size-[520px] -translate-x-[85%] rounded-full bg-brand-1/30 blur-[110px] animate-blob" />
        <div className="absolute top-10 left-1/2 size-[440px] -translate-x-[10%] rounded-full bg-brand-2/25 blur-[110px] animate-blob [animation-delay:-6s]" />
        <div className="absolute top-64 left-1/2 size-[380px] -translate-x-1/2 rounded-full bg-brand-3/20 blur-[110px] animate-blob [animation-delay:-12s]" />
      </div>

      <div className="container flex flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur animate-in fade-in slide-in-from-bottom-2 duration-700">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Open to new opportunities
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          Hi, I&apos;m <span className="text-gradient animate-gradient">{site.name}</span>
        </h1>

        <p
          className="mt-6 h-10 font-mono text-xl text-foreground/80 sm:text-2xl md:text-3xl animate-in fade-in duration-1000"
          aria-label={`I am ${roles.join(", ")}`}
        >
          <span aria-hidden>
            I am <span className="font-semibold text-primary">{typedText}</span>
            <span className="ml-0.5 inline-block w-[2px] h-[1em] translate-y-[0.15em] bg-primary animate-blink" />
          </span>
        </p>

        <p className="mt-6 max-w-[640px] text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Crafting digital experiences with clean code and thoughtful design. I build modern web applications and
          enterprise software that make an impact.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Button size="lg" className="group h-12 rounded-full px-7 text-base shadow-lg shadow-primary/25" asChild>
            <Link href="#contact">
              Get in touch <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 rounded-full px-7 text-base backdrop-blur" asChild>
            <Link href="#projects">View my work</Link>
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-3">
          {[
            { href: site.github, label: "GitHub", Icon: Github, external: true },
            { href: site.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
            { href: `mailto:${site.email}`, label: "Email", Icon: Mail, external: false },
          ].map(({ href, label, Icon, external }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="grid size-11 place-items-center rounded-full border bg-background/60 text-muted-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              <Icon className="size-5" />
              <span className="sr-only">{label}</span>
            </Link>
          ))}
        </div>

        <dl className="mt-16 grid w-full max-w-xl grid-cols-3 divide-x rounded-2xl border bg-background/50 backdrop-blur">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</dd>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>

        <Link
          href="#about"
          className="mt-16 hidden text-muted-foreground transition-colors hover:text-foreground md:block"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="size-5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
