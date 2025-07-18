import { getExperiencesSection } from "@/actions";
import { ExperienceForm } from "@/components/admin/experience-form";

export default async function ExperienceAdminPage() {
  const experiencesData = await getExperiencesSection();

  console.log(experiencesData);

  const categories = experiencesData.reduce((acc, experience) => {
    let category;

    if (
      experience.experienceCategory &&
      acc.has(experience.experienceCategory.id)
    ) {
      category = acc.get(experience.experienceCategory.id);
    } else {
      category = {
        ...experience.experienceCategory!,
        experience: [],
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { experienceCategory, ...rest } = experience;

    category.experience.push(rest);

    acc.set(category.id, category);

    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, new Map<string, any>());

  const categoriesArray = Array.from(categories.values());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Experience Section</h1>
      <ExperienceForm experienceCategories={categoriesArray} />
    </div>
  );
}
