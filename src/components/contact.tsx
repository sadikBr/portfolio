"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { site } from "@/lib/site";

const LIMITS = { name: 100, email: 254, subject: 150, message: 2000 } as const;

const contactInfo = [
  { Icon: Mail, title: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { Icon: Phone, title: "Phone", value: site.phone, href: site.phoneHref, external: false },
  { Icon: MapPin, title: "Location", value: site.location, href: site.locationHref, external: true },
];

/** Strip control characters (incl. CR/LF) from single-line fields. */
function clean(value: FormDataEntryValue | null, max: number, multiline = false) {
  const str = typeof value === "string" ? value : "";
  const stripped = multiline ? str.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") : str.replace(/[\u0000-\u001F\u007F]/g, " ");
  return stripped.trim().slice(0, max);
}

export function Contact() {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = clean(data.get("name"), LIMITS.name);
    const email = clean(data.get("email"), LIMITS.email);
    const subject = clean(data.get("subject"), LIMITS.subject);
    const message = clean(data.get("message"), LIMITS.message, true);

    const body = `${message}\n\n— ${name} (${email})`;
    // encodeURIComponent prevents injecting extra mailto parameters (cc, bcc, …)
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setOpened(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 size-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-1/15 blur-[120px]" />
      </div>

      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project in mind or want to discuss an opportunity? My inbox is always open."
        />

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[2fr_3fr]">
          <Reveal className="space-y-4">
            {contactInfo.map(({ Icon, title, value, href, external }) => (
              <a
                key={title}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="glow-card group flex items-center gap-4 rounded-2xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-1/15 to-brand-2/15 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-muted-foreground">{title}</span>
                  <span className="block truncate font-medium">{value}</span>
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}

            <Button variant="outline" className="w-full rounded-2xl" onClick={copyEmail}>
              {copied ? <Check className="text-emerald-500" /> : <Copy />}
              {copied ? "Email copied!" : "Copy email address"}
            </Button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
              {opened ? (
                <div role="status" className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
                  <div className="grid size-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h3 className="text-xl font-semibold">Your email app should be open</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Just hit send there. If nothing opened, write to me directly at{" "}
                    <a className="font-medium text-primary underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    .
                  </p>
                  <Button variant="ghost" onClick={() => setOpened(false)}>
                    Write another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <h3 className="text-xl font-semibold">Send me a message</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This opens your email app with your message ready to send.
                    </p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name">
                      <Input id="name" name="name" autoComplete="name" placeholder="Jane Doe" maxLength={LIMITS.name} required />
                    </Field>
                    <Field label="Email" htmlFor="email">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@example.com"
                        maxLength={LIMITS.email}
                        required
                      />
                    </Field>
                  </div>
                  <Field label="Subject" htmlFor="subject">
                    <Input id="subject" name="subject" placeholder="Project inquiry" maxLength={LIMITS.subject} required />
                  </Field>
                  <Field label="Message" htmlFor="message">
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project…"
                      rows={5}
                      maxLength={LIMITS.message}
                      required
                    />
                  </Field>
                  <Button type="submit" size="lg" className="w-full rounded-full shadow-lg shadow-primary/20">
                    <Send /> Send message
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
