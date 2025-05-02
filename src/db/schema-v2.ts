import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

function timestamps() {
  return {
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  };
}

export const LinkType = pgEnum("link_type", ["href", "button"]);

export const link = pgTable("link", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  href: text("href").notNull(),
  type: LinkType("type"),
  order: integer("order"),
  icon: text("icon"),
  ...timestamps(),
});

// Header Content Tables.

export const header = pgTable("header", {
  id: uuid("id").primaryKey().defaultRandom(),
  ...timestamps(),
});

export const headerLink = pgTable("header_link", {
  id: uuid("id").primaryKey().defaultRandom(),
  baseLinkID: uuid("base_link_id").references(() => link.id),
  parentID: uuid("parent_id").references(() => header.id),
  ...timestamps(),
});

// Hero Section Content Tables.

export const hero = pgTable("hero", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  ...timestamps(),
});

export const heroLink = pgTable("hero_link", {
  id: uuid("id").primaryKey().defaultRandom(),
  baseLinkID: uuid("base_link_id").references(() => link.id),
  parentID: uuid("parent_id").references(() => hero.id),
  ...timestamps(),
});

// About me section Content Tables.

export const aboutMe = pgTable("about_me", {
  id: uuid("id").primaryKey().defaultRandom(),
  aboutMe: text("about_me").notNull(),
  imageUrl: text("image_url").notNull(),
  ...timestamps(),
});

export const aboutMeLink = pgTable("about_me_link", {
  id: uuid("id").primaryKey().defaultRandom(),
  baseLinkID: uuid("base_link_id").references(() => link.id),
  parentID: uuid("parent_id").references(() => aboutMe.id),
  ...timestamps(),
});

// Skills section Content.

export const skillCategory = pgTable("skill_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull(),
  ...timestamps(),
});

export const skill = pgTable("skill", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  level: text("level").notNull(),
  categoryID: uuid("category_id").references(() => skillCategory.id),
  ...timestamps(),
});

// Experiences section Content.

export const experienceCategory = pgTable("experience_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull(),
  ...timestamps(),
});

export const expreience = pgTable("experience", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  skills: text("skills").notNull(),
  order: integer("order").notNull(),
  experienceCategoryID: uuid("experience_category_id").references(
    () => experienceCategory.id,
  ),
  ...timestamps(),
});

// Projects section Content.

export const projectCategory = pgTable("project_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  order: integer("order").notNull(),
  ...timestamps(),
});

export const project = pgTable("project", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageURL: text("image_url").notNull(),
  tags: text("tags").notNull(),
  demoURL: text("demo_url"),
  repoURL: text("repo_url").notNull(),
  featured: boolean("featured").default(false),
  projectCategoryID: uuid("project_category_id").references(
    () => projectCategory.id,
  ),
  ...timestamps(),
});

// Contact me section Content.

export const contactInfo = pgTable("contact_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  description: text("description").notNull(),
  ...timestamps(),
});

export const contact = pgTable("contact", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  value: text("value").notNull(),
  link: text("link").notNull(),
  icon: text("icon").notNull(),
  contactInfoId: uuid("contact_info_if").references(() => contactInfo.id),
  ...timestamps(),
});

// Main Portfolio Table.

export const portfolio = pgTable("portfolio", {
  id: uuid("id").primaryKey().defaultRandom(),
  headerID: uuid("header_id").references(() => header.id),
  heroID: uuid("hero_id").references(() => hero.id),
  aboutMeID: uuid("about_me_id").references(() => aboutMe.id),
  skillCategoryID: uuid("skill_category_id").references(() => skillCategory.id),
  experienceCategoryID: uuid("experience_category_id").references(
    () => experienceCategory.id,
  ),
  projectCategoryID: uuid("project_category_id").references(
    () => projectCategory.id,
  ),
  ...timestamps(),
  contactInfoID: uuid("contact_info_id").references(() => contactInfo.id),
});
