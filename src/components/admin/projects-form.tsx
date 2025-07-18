"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  updateProjectCategory,
  createProjectCategory,
  updateProject,
  createProject,
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

import { projectCategory, project } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type ProjectCategoryType = InferSelectModel<typeof projectCategory>;
type ProjectType = InferSelectModel<typeof project>;

export function ProjectsForm({
  projectCategories,
}: {
  projectCategories: (ProjectCategoryType & { project: ProjectType[] })[];
}) {
  const [activeTab, setActiveTab] = useState(
    projectCategories[0]?.id || "new-category",
  );

  const handleCreateCategory = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const order = parseInt(formData.get("order") as string);
    await createProjectCategory(name, order);
  };

  const handleUpdateCategory = async (id: string, formData: FormData) => {
    const name = formData.get("name") as string;
    const order = parseInt(formData.get("order") as string);
    await updateProjectCategory(id, name, order);
  };

  const handleCreateProject = async (
    categoryId: string,
    formData: FormData,
  ) => {
    const title = String(formData.get("title"));
    const description = String(formData.get("description"));
    const imageURL = String(formData.get("imageURL"));
    const tags = String(formData.get("tags"));
    const demoURL = formData.get("demoURL")
      ? String(formData.get("demoURL"))
      : null;
    const repoURL = String(formData.get("repoURL"));
    const featured = formData.get("featured") === "on";
    await createProject(
      categoryId,
      title,
      description,
      imageURL,
      tags,
      demoURL,
      repoURL,
      featured,
    );
  };

  const handleUpdateProject = async (projectId: string, formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageURL = formData.get("imageURL") as string;
    const tags = formData.get("tags") as string;
    const demoURL = formData.get("demoURL") as string;
    const repoURL = formData.get("repoURL") as string;
    const featured = formData.get("featured") === "on";
    await updateProject(
      projectId,
      title,
      description,
      imageURL,
      tags,
      demoURL,
      repoURL,
      featured,
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-auto-cols">
        {projectCategories.map(
          (category: ProjectCategoryType & { project: ProjectType[] }) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ),
        )}
        <TabsTrigger value="new-category">New Category</TabsTrigger>
      </TabsList>

      {projectCategories.map(
        (category: ProjectCategoryType & { project: ProjectType[] }) => (
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
                  Projects in {category.name}
                </h3>
                {category.project.map((proj: ProjectType) => (
                  <Card key={proj.id} className="p-4">
                    <form
                      action={handleUpdateProject.bind(null, proj.id)}
                      className="space-y-2"
                    >
                      <div>
                        <Label htmlFor={`proj-title-${proj.id}`}>Title</Label>
                        <Input
                          id={`proj-title-${proj.id}`}
                          name="title"
                          defaultValue={proj.title}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`proj-description-${proj.id}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`proj-description-${proj.id}`}
                          name="description"
                          defaultValue={proj.description}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`proj-imageURL-${proj.id}`}>
                          Image URL
                        </Label>
                        <Input
                          id={`proj-imageURL-${proj.id}`}
                          name="imageURL"
                          defaultValue={proj.imageURL}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`proj-tags-${proj.id}`}>Tags</Label>
                        <Input
                          id={`proj-tags-${proj.id}`}
                          name="tags"
                          defaultValue={proj.tags}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor={`proj-demoURL-${proj.id}`}>
                          Demo URL
                        </Label>
                        <Input
                          id={`proj-demoURL-${proj.id}`}
                          name="demoURL"
                          defaultValue={proj.demoURL || ""}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`proj-repoURL-${proj.id}`}>
                          Repo URL
                        </Label>
                        <Input
                          id={`proj-repoURL-${proj.id}`}
                          name="repoURL"
                          defaultValue={proj.repoURL}
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="checkbox"
                          id={`proj-featured-${proj.id}`}
                          name="featured"
                          defaultChecked={proj.featured || false}
                        />
                        <Label htmlFor={`proj-featured-${proj.id}`}>
                          Featured
                        </Label>
                      </div>
                      <SubmitButton />
                    </form>
                  </Card>
                ))}

                <h3 className="text-xl font-semibold mt-6">
                  Add New Project to {category.name}
                </h3>
                <Card className="p-4">
                  <form
                    action={handleCreateProject.bind(null, category.id)}
                    className="space-y-2"
                  >
                    <div>
                      <Label htmlFor={`new-proj-title-${category.id}`}>
                        Title
                      </Label>
                      <Input
                        id={`new-proj-title-${category.id}`}
                        name="title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-proj-description-${category.id}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`new-proj-description-${category.id}`}
                        name="description"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-proj-imageURL-${category.id}`}>
                        Image URL
                      </Label>
                      <Input
                        id={`new-proj-imageURL-${category.id}`}
                        name="imageURL"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-proj-tags-${category.id}`}>
                        Tags
                      </Label>
                      <Input
                        id={`new-proj-tags-${category.id}`}
                        name="tags"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-proj-demoURL-${category.id}`}>
                        Demo URL
                      </Label>
                      <Input
                        id={`new-proj-demoURL-${category.id}`}
                        name="demoURL"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`new-proj-repoURL-${category.id}`}>
                        Repo URL
                      </Label>
                      <Input
                        id={`new-proj-repoURL-${category.id}`}
                        name="repoURL"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="checkbox"
                        id={`new-proj-featured-${category.id}`}
                        name="featured"
                      />
                      <Label htmlFor={`new-proj-featured-${category.id}`}>
                        Featured
                      </Label>
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
            <CardTitle>Create New Project Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={handleCreateCategory} className="space-y-4">
              <div>
                <Label htmlFor="new-category-name">Name</Label>
                <Input id="new-category-name" name="name" required />
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
