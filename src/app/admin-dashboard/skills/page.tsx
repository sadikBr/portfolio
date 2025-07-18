import { getSkillsSection } from "@/actions";
import { SkillsForm } from "@/components/admin/skills-form";

export default async function SkillsAdminPage() {
  const skillsData = await getSkillsSection();

  const categories = skillsData.reduce((acc, skill) => {
    let category;

    if (skill.skillCategory && acc.has(skill.skillCategory.id)) {
      category = acc.get(skill.skillCategory.id);
    } else {
      category = {
        ...skill.skillCategory!,
        skill: [],
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { skillCategory, ...rest } = skill;

    category.skill.push(rest);

    acc.set(category.id, category);

    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, new Map<string, any>());

  const categoriesArray = Array.from(categories.values());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Skills Section</h1>
      <SkillsForm skillCategories={categoriesArray} />
    </div>
  );
}
