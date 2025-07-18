import { getHeroSection } from "@/actions";
import { HeroForm } from "@/components/admin/hero-form";

export default async function HeroAdminPage() {
  const heroData = await getHeroSection();

  if (!heroData) {
    return <div>No Hero section data found. Please add it.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Hero Section</h1>
      <HeroForm id={heroData.id} title={heroData.title} tagline={heroData.tagline} />
    </div>
  );
}