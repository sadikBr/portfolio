"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateHeroSection } from "@/actions";
import { useFormState, useFormStatus } from "react-dom";

interface FormState {
  success?: boolean;
  error?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Updating..." : "Update Hero Section"}
    </Button>
  );
}

export function HeroForm({
  id,
  title,
  tagline,
}: {
  id: string;
  title: string;
  tagline: string;
}) {
  const [state, formAction] = useFormState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      const title = formData.get("title") as string;
      const tagline = formData.get("tagline") as string;
      try {
        await updateHeroSection(id, title, tagline);
        return { success: true };
      } catch (e) {
        return { error: (e as Error).message };
      }
    },
    {},
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={title} required />
      </div>
      <div>
        <Label htmlFor="tagline">Tagline</Label>
        <Input id="tagline" name="tagline" defaultValue={tagline} required />
      </div>
      <SubmitButton />
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
