"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateAboutMeSection } from "@/actions";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

interface FormState {
  success?: boolean;
  error?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Updating..." : "Update About Me Section"}
    </Button>
  );
}

export function AboutMeForm({
  id,
  aboutMe: aboutMeText,
  imageUrl,
}: {
  id: string;
  aboutMe: string;
  imageUrl: string;
}) {
  const [state, formAction] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      const aboutMeText = formData.get("aboutMe") as string;
      const imageUrl = formData.get("imageUrl") as string;
      try {
        await updateAboutMeSection(id, aboutMeText, imageUrl);
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
        <Label htmlFor="aboutMe">About Me</Label>
        <Textarea
          id="aboutMe"
          name="aboutMe"
          defaultValue={aboutMeText}
          required
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" name="imageUrl" defaultValue={imageUrl} required />
      </div>
      <SubmitButton />
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
