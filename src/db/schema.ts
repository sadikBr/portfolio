import { relations } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  integer,
  pgTable,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const aboutTable = pgTable("about", {
  id: uuid("id").primaryKey().defaultRandom(),
  heroTagline: varchar("hero_tagline", { length: 256 }).notNull(),
  description: varchar("description").notNull(),
});

export const skillCategoryTable = pgTable("skill_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  iconName: varchar("icon_name").notNull(),
  name: varchar("name").notNull(),
});

export const skillTable = pgTable("skill", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  level: integer("level").notNull(),
  skillCategoryID: uuid("skill_category_id").references(
    (): AnyPgColumn => skillCategoryTable.id,
  ),
});

export const skillCategoryRelations = relations(
  skillCategoryTable,
  ({ many }) => ({
    skill: many(skillTable),
  }),
);

export const skillRelations = relations(skillTable, ({ one }) => ({
  skillCategory: one(skillCategoryTable, {
    fields: [skillTable.skillCategoryID],
    references: [skillCategoryTable.id],
  }),
}));

export const experienceCategoryTable = pgTable("experience_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  iconName: varchar("icon_name").notNull(),
});

export const experienceTable = pgTable("experience", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  company: varchar("company").notNull(),
  period: varchar("period").notNull(),
  description: varchar("description").notNull(),
  skills: varchar("skills").notNull(),
  experienceCategoryID: uuid("experience_category_id").references(
    (): AnyPgColumn => experienceCategoryTable.id,
  ),
});

export const experienceCategoryRelations = relations(
  experienceCategoryTable,
  ({ many }) => ({
    experienceTable: many(experienceTable),
  }),
);

export const projectCategoryTable = pgTable("project_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
});

export const projectTable = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
  imageURL: varchar("image_url").notNull(),
  tags: varchar("tags").notNull(),
  demoURL: varchar("demo_url"),
  repoURL: varchar("repo_url").notNull(),
  featured: boolean("featured").default(false),
  projectCategoryID: uuid("project_category_id").references(
    (): AnyPgColumn => projectCategoryTable.id,
  ),
});

export const projectCategoryRelations = relations(
  projectCategoryTable,
  ({ many }) => ({
    projectTable: many(projectTable),
  }),
);

export const contactInfoTable = pgTable("contact_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  value: varchar("value").notNull(),
  link: varchar("link").notNull(),
  iconName: varchar("icon_name").notNull(),
});
