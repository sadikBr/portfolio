import { getProjectsSection } from "@/actions";
import { ProjectsForm } from "@/components/admin/projects-form";

export default async function ProjectsAdminPage() {
  const projectsData = await getProjectsSection();

  const categories = projectsData.reduce((acc, project) => {
    let category;

    if (project.projectCategory && acc.has(project.projectCategory.id)) {
      category = acc.get(project.projectCategory.id);
    } else {
      category = {
        ...project.projectCategory!,
        project: [],
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projectCategory, ...rest } = project;

    category.project.push(rest);

    acc.set(category.id, category);

    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, new Map<string, any>());

  const categoriesArray = Array.from(categories.values());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Projects Section</h1>
      <ProjectsForm projectCategories={categoriesArray} />
    </div>
  );
}
