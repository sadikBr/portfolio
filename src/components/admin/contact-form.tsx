"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateContactInfoSection } from "@/actions";
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
      {pending ? "Updating..." : "Update Contact Info"}
    </Button>
  );
}

export function ContactForm({
  id,
  description,
}: {
  id: string;
  description: string;
}) {
  const [state, formAction] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      const description = formData.get("description") as string;
      try {
        await updateContactInfoSection(id, description);
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={description}
          required
        />
      </div>
      <SubmitButton />
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
