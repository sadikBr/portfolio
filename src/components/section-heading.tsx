import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", id }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-12 space-y-4", align === "center" && "text-center")}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={cn("text-muted-foreground text-lg max-w-2xl", align === "center" && "mx-auto")}>{description}</p>
      )}
    </Reveal>
  );
}
