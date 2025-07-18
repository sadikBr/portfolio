import { ClerkLoaded, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex">
      <aside className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4">
        <nav className="flex flex-col space-y-4">
          <Link href="/admin-dashboard/hero">Hero</Link>
          <Link href="/admin-dashboard/about">About</Link>
          <Link href="/admin-dashboard/skills">Skills</Link>
          <Link href="/admin-dashboard/experience">Experience</Link>
          <Link href="/admin-dashboard/projects">Projects</Link>
          <Link href="/admin-dashboard/contact">Contact</Link>
        </nav>
      </aside>
      <main className="flex-1 p-4 ml-64">
        <header className="flex justify-end items-center p-4">
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
        </header>
        {children}
      </main>
    </div>
  );
}
