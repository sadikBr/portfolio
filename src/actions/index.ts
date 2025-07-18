"use server";

import { db } from "@/db";
import {
  aboutMe,
  contactInfo,
  experience,
  experienceCategory,
  hero,
  project,
  projectCategory,
  skill,
  skillCategory,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getHeroSection() {
  const value = await db.query.hero.findFirst();
  return value;
}

export async function updateHeroSection(
  id: string,
  title: string,
  tagline: string,
) {
  await db.update(hero).set({ title, tagline }).where(eq(hero.id, id));
}

export async function getAboutMeSection() {
  const value = await db.query.aboutMe.findFirst();
  return value;
}

export async function updateAboutMeSection(
  id: string,
  aboutMeText: string,
  imageUrl: string,
) {
  await db
    .update(aboutMe)
    .set({ aboutMe: aboutMeText, imageUrl })
    .where(eq(aboutMe.id, id));
}

export async function getSkillsSection() {
  const skills = await db.query.skill.findMany({
    with: {
      skillCategory: true,
    },
  });

  return skills;
}

export async function updateSkillCategory(
  id: string,
  name: string,
  icon: string,
  order: number,
) {
  await db
    .update(skillCategory)
    .set({ name, icon, order })
    .where(eq(skillCategory.id, id));
}

export async function createSkillCategory(
  name: string,
  icon: string,
  order: number,
) {
  await db.insert(skillCategory).values({ name, icon, order });
}

export async function updateSkill(id: string, name: string, level: string) {
  await db.update(skill).set({ name, level }).where(eq(skill.id, id));
}

export async function createSkill(
  categoryId: string,
  name: string,
  level: string,
) {
  await db.insert(skill).values({ categoryID: categoryId, name, level });
}

export async function getExperiencesSection() {
  const experiences = await db.query.experience.findMany({
    with: {
      experienceCategory: true,
    },
  });
  return experiences;
}

export async function updateExperienceCategory(
  id: string,
  name: string,
  icon: string,
  order: number,
) {
  await db
    .update(experienceCategory)
    .set({ name, icon, order })
    .where(eq(experienceCategory.id, id));
}

export async function createExperienceCategory(
  name: string,
  icon: string,
  order: number,
) {
  await db.insert(experienceCategory).values({ name, icon, order });
}

export async function updateExperience(
  id: string,
  title: string,
  company: string,
  period: string,
  description: string,
  skills: string,
  order: number,
) {
  await db
    .update(experience)
    .set({ title, company, period, description, skills, order })
    .where(eq(experience.id, id));
}

export async function createExperience(
  categoryId: string,
  title: string,
  company: string,
  period: string,
  description: string,
  skills: string,
  order: number,
) {
  await db.insert(experience).values({
    experienceCategoryID: categoryId,
    title,
    company,
    period,
    description,
    skills,
    order,
  });
}

export async function getProjectsSection() {
  const projects = await db.query.project.findMany({
    with: {
      projectCategory: true,
    },
  });
  return projects;
}

export async function updateProjectCategory(
  id: string,
  name: string,
  order: number,
) {
  await db
    .update(projectCategory)
    .set({ name, order })
    .where(eq(projectCategory.id, id));
}

export async function createProjectCategory(name: string, order: number) {
  await db.insert(projectCategory).values({ name, order });
}

export async function updateProject(
  id: string,
  title: string,
  description: string,
  imageURL: string,
  tags: string,
  demoURL: string | null,
  repoURL: string,
  featured: boolean,
) {
  await db
    .update(project)
    .set({ title, description, imageURL, tags, demoURL, repoURL, featured })
    .where(eq(project.id, id));
}

export async function createProject(
  categoryId: string,
  title: string,
  description: string,
  imageURL: string,
  tags: string,
  demoURL: string | null,
  repoURL: string,
  featured: boolean,
) {
  await db.insert(project).values({
    projectCategoryID: categoryId,
    title,
    description,
    imageURL,
    tags,
    demoURL,
    repoURL,
    featured,
  });
}

export async function getContactInfoSection() {
  const contact = await db.query.contact.findMany({
    with: { contactInfo: true },
  });
  return contact;
}

export async function updateContactInfoSection(
  id: string,
  description: string,
) {
  await db
    .update(contactInfo)
    .set({ description })
    .where(eq(contactInfo.id, id));
}
