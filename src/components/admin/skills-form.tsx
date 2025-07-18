"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  updateSkillCategory,
  updateSkill,
  createSkillCategory,
  createSkill,
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

import { skillCategory, skill } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type SkillCategoryType = InferSelectModel<typeof skillCategory>;
type SkillType = InferSelectModel<typeof skill>;

export function SkillsForm({
  skillCategories,
}: {
  skillCategories: (SkillCategoryType & { skill: SkillType[] })[];
}) {
  const [activeTab, setActiveTab] = useState(
    skillCategories[0]?.id || "Programming Languages",
  );

  const handleCreateCategory = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string);
    await createSkillCategory(name, icon, order);
  };

  const handleUpdateCategory = async (id: string, formData: FormData) => {
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string);
    await updateSkillCategory(id, name, icon, order);
  };

  const handleCreateSkill = async (categoryId: string, formData: FormData) => {
    const name = formData.get("name") as string;
    const level = formData.get("level") as string;
    await createSkill(categoryId, name, level);
  };

  const handleUpdateSkill = async (skillId: string, formData: FormData) => {
    const name = formData.get("name") as string;
    const level = formData.get("level") as string;
    await updateSkill(skillId, name, level);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-auto-cols">
        {skillCategories.map(
          (category: SkillCategoryType & { skill: SkillType[] }) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ),
        )}
        <TabsTrigger value="new-category">New Category</TabsTrigger>
      </TabsList>

      {skillCategories.map(
        (category: SkillCategoryType & { skill: SkillType[] }) => (
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
                  Skills in {category.name}
                </h3>
                {category.skill.map((skill: SkillType) => (
                  <Card key={skill.id} className="p-4">
                    <form
                      action={handleUpdateSkill.bind(null, skill.id)}
                      className="space-y-2"
                    >
                      <div>
                        <Label htmlFor={`skill-name-${skill.id}`}>
                          Skill Name
                        </Label>
                        <Input
                          id={`skill-name-${skill.id}`}
                          name="name"
                          defaultValue={skill.name}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`skill-level-${skill.id}`}>Level</Label>
                        <Input
                          id={`skill-level-${skill.id}`}
                          name="level"
                          defaultValue={skill.level}
                          required
                        />
                      </div>
                      <SubmitButton />
                    </form>
                  </Card>
                ))}

                <h3 className="text-xl font-semibold mt-6">
                  Add New Skill to {category.name}
                </h3>
                <Card className="p-4">
                  <form
                    action={handleCreateSkill.bind(null, category.id)}
                    className="space-y-2"
                  >
                    <div>
                      <Label htmlFor={`new-skill-name-${category.id}`}>
                        Skill Name
                      </Label>
                      <Input
                        id={`new-skill-name-${category.id}`}
                        name="name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-skill-level-${category.id}`}>
                        Level
                      </Label>
                      <Input
                        id={`new-skill-level-${category.id}`}
                        name="level"
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
            <CardTitle>Create New Skill Category</CardTitle>
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
