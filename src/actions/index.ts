"use server";

import { db } from "@/db";
import { aboutTable, contactInfoTable } from "@/db/schema";

export async function getHeroSectionTagLine() {
  const value = await db
    .select({ tagLine: aboutTable.heroTagline })
    .from(aboutTable);

  return value[0].tagLine;
}

export async function getAboutMeDescription() {
  const value = await db
    .select({ description: aboutTable.description })
    .from(aboutTable);

  return value[0].description;
}

export async function getSkills() {}

export async function getExperiences() {}

export async function getProjects() {}

export async function getContactInfo() {
  const contactInfo = await db.select().from(contactInfoTable);

  return contactInfo;
}
