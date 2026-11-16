"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ThemeToggler } from "./theme-toggler";
import { navItems, site } from "@/lib/site";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled || mobileMenuOpen ? "py-3" : "py-5",
      )}
    >
      <div className="container">
        <div
          className={cn(
            "relative flex items-center justify-between rounded-2xl px-4 py-2 transition-all duration-300",
            isScrolled || mobileMenuOpen ? "glass border shadow-lg shadow-black/5" : "border border-transparent",
          )}
        >
          <Link href="/" className="group flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand-1 to-brand-2 font-mono text-sm text-white shadow-md transition-transform group-hover:rotate-6">
              BS
            </span>
            <span>
              {site.shortName}
              <span className="text-gradient">.Portfolio</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  active === item.href && "bg-accent text-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggler />
            <Button asChild size="sm" className="rounded-full">
              <Link href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
                <FileText /> Resume
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggler />
            <Button
              variant="ghost"
              size="icon"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
            </Button>
          </div>

          {mobileMenuOpen && (
            <nav
              id="mobile-nav"
              aria-label="Mobile"
              className="glass absolute inset-x-0 top-full mt-2 rounded-2xl border p-3 shadow-xl animate-in fade-in slide-in-from-top-2 md:hidden"
            >
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="mt-2 w-full" asChild>
                  <Link href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <FileText /> Resume
                  </Link>
                </Button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
