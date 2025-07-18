import { getAboutMeSection } from "@/actions";
import { AboutMeForm } from "@/components/admin/about-me-form";

export default async function AboutAdminPage() {
  const aboutMeData = await getAboutMeSection();

  if (!aboutMeData) {
    return <div>No About Me section data found. Please add it.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit About Me Section</h1>
      <AboutMeForm id={aboutMeData.id} aboutMe={aboutMeData.aboutMe} imageUrl={aboutMeData.imageUrl} />
    </div>
  );
}