"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  updateExperienceCategory,
  createExperienceCategory,
  updateExperience,
  createExperience,
} from "@/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

import { experienceCategory, experience } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type ExperienceCategoryType = InferSelectModel<typeof experienceCategory>;
type ExperienceType = InferSelectModel<typeof experience>;

export function ExperienceForm({
  experienceCategories,
}: {
  experienceCategories: (ExperienceCategoryType & {
    experience: ExperienceType[];
  })[];
}) {
  const [activeTab, setActiveTab] = useState(
    experienceCategories[0]?.id || "new-category",
  );

  const handleCreateCategory = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string);
    await createExperienceCategory(name, icon, order);
  };

  const handleUpdateCategory = async (id: string, formData: FormData) => {
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string);
    await updateExperienceCategory(id, name, icon, order);
  };

  const handleCreateExperience = async (
    categoryId: string,
    formData: FormData,
  ) => {
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const period = formData.get("period") as string;
    const description = formData.get("description") as string;
    const skills = formData.get("skills") as string;
    const order = parseInt(formData.get("order") as string);
    await createExperience(
      categoryId,
      title,
      company,
      period,
      description,
      skills,
      order,
    );
  };

  const handleUpdateExperience = async (
    experienceId: string,
    formData: FormData,
  ) => {
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const period = formData.get("period") as string;
    const description = formData.get("description") as string;
    const skills = formData.get("skills") as string;
    const order = parseInt(formData.get("order") as string);
    await updateExperience(
      experienceId,
      title,
      company,
      period,
      description,
      skills,
      order,
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-auto-cols">
        {experienceCategories.map(
          (
            category: ExperienceCategoryType & { experience: ExperienceType[] },
          ) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ),
        )}
        <TabsTrigger value="new-category">New Category</TabsTrigger>
      </TabsList>

      {experienceCategories.map(
        (
          category: ExperienceCategoryType & { experience: ExperienceType[] },
        ) => (
          <TabsContent key={category.id} value={category.id}>
            <Card>
              <CardHeader>
                <CardTitle>Edit {category.name} Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form
                  action={handleUpdateCategory.bind(null, category.id)}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor={`category-name-${category.id}`}>Name</Label>
                    <Input
                      id={`category-name-${category.id}`}
                      name="name"
                      defaultValue={category.name}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`category-icon-${category.id}`}>Icon</Label>
                    <Input
                      id={`category-icon-${category.id}`}
                      name="icon"
                      defaultValue={category.icon}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`category-order-${category.id}`}>
                      Order
                    </Label>
                    <Input
                      id={`category-order-${category.id}`}
                      name="order"
                      type="number"
                      defaultValue={category.order}
                      required
                    />
                  </div>
                  <SubmitButton />
                </form>

                <h3 className="text-xl font-semibold mt-6">
                  Experiences in {category.name}
                </h3>
                {category.experience.map((exp: ExperienceType) => (
                  <Card key={exp.id} className="p-4">
                    <form
                      action={handleUpdateExperience.bind(null, exp.id)}
                      className="space-y-2"
                    >
                      <div>
                        <Label htmlFor={`exp-title-${exp.id}`}>Title</Label>
                        <Input
                          id={`exp-title-${exp.id}`}
                          name="title"
                          defaultValue={exp.title}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`exp-company-${exp.id}`}>Company</Label>
                        <Input
                          id={`exp-company-${exp.id}`}
                          name="company"
                          defaultValue={exp.company}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`exp-period-${exp.id}`}>Period</Label>
                        <Input
                          id={`exp-period-${exp.id}`}
                          name="period"
                          defaultValue={exp.period}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`exp-description-${exp.id}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`exp-description-${exp.id}`}
                          name="description"
                          defaultValue={exp.description}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`exp-skills-${exp.id}`}>Skills</Label>
                        <Input
                          id={`exp-skills-${exp.id}`}
                          name="skills"
                          defaultValue={exp.skills}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`exp-order-${exp.id}`}>Order</Label>
                        <Input
                          id={`exp-order-${exp.id}`}
                          name="order"
                          type="number"
                          defaultValue={exp.order}
                          required
                        />
                      </div>
                      <SubmitButton />
                    </form>
                  </Card>
                ))}

                <h3 className="text-xl font-semibold mt-6">
                  Add New Experience to {category.name}
                </h3>
                <Card className="p-4">
                  <form
                    action={handleCreateExperience.bind(null, category.id)}
                    className="space-y-2"
                  >
                    <div>
                      <Label htmlFor={`new-exp-title-${category.id}`}>
                        Title
                      </Label>
                      <Input
                        id={`new-exp-title-${category.id}`}
                        name="title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-exp-company-${category.id}`}>
                        Company
                      </Label>
                      <Input
                        id={`new-exp-company-${category.id}`}
                        name="company"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-exp-period-${category.id}`}>
                        Period
                      </Label>
                      <Input
                        id={`new-exp-period-${category.id}`}
                        name="period"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-exp-description-${category.id}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`new-exp-description-${category.id}`}
                        name="description"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-exp-skills-${category.id}`}>
                        Skills
                      </Label>
                      <Input
                        id={`new-exp-skills-${category.id}`}
                        name="skills"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-exp-order-${category.id}`}>
                        Order
                      </Label>
                      <Input
                        id={`new-exp-order-${category.id}`}
                        name="order"
                        type="number"
                        required
                      />
                    </div>
                    <SubmitButton />
                  </form>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        ),
      )}

      <TabsContent value="new-category">
        <Card>
          <CardHeader>
            <CardTitle>Create New Experience Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={handleCreateCategory} className="space-y-4">
              <div>
                <Label htmlFor="new-category-name">Name</Label>
                <Input id="new-category-name" name="name" required />
              </div>
              <div>
                <Label htmlFor="new-category-icon">Icon</Label>
                <Input id="new-category-icon" name="icon" required />
              </div>
              <div>
                <Label htmlFor="new-category-order">Order</Label>
                <Input
                  id="new-category-order"
                  name="order"
                  type="number"
                  required
                />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
