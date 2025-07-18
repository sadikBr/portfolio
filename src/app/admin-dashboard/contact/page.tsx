import { getContactInfoSection } from "@/actions";
import { ContactForm } from "@/components/admin/contact-form";

export default async function ContactAdminPage() {
  const contactInfoData = await getContactInfoSection();

  if (!contactInfoData) {
    return <div>No Contact Info data found. Please add it.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Contact Info Section</h1>
      {contactInfoData.map((item) => (
        <>
          <div>
            {item.title} - {item.value}
          </div>
          <ContactForm
            key={item.id}
            id={item.id}
            description={item.contactInfo?.description || ""}
          />
        </>
      ))}
    </div>
  );
}
