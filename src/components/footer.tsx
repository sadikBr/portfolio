import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand-1 to-brand-2 font-mono text-sm text-white">
              BS
            </span>
            <span>
              {site.shortName}
              <span className="text-gradient">.Portfolio</span>
            </span>
          </Link>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {[
              { href: site.github, label: "GitHub", Icon: Github, external: true },
              { href: site.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
              { href: `mailto:${site.email}`, label: "Email", Icon: Mail, external: false },
            ].map(({ href, label, Icon, external }) => (
              <Link
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon className="size-4" />
                <span className="sr-only">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {currentYear} {site.name}. All rights reserved.
          </p>
          <Link href="#main" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            Back to top <ArrowUp className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
