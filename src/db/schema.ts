import { relations } from "drizzle-orm";
import {
  // AnyPgColumn,
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  // varchar,
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

export const headerRelations = relations(header, ({ many }) => ({
  headerLinks: many(headerLink),
}));

export const headerLinkRelations = relations(headerLink, ({ one }) => ({
  header: one(header, {
    fields: [headerLink.parentID],
    references: [header.id],
  }),
  link: one(link, {
    fields: [headerLink.baseLinkID],
    references: [link.id],
  }),
}));

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

export const heroRelations = relations(hero, ({ many }) => ({
  heroLinks: many(heroLink),
}));

export const heroLinkRelations = relations(heroLink, ({ one }) => ({
  hero: one(hero, {
    fields: [heroLink.parentID],
    references: [hero.id],
  }),
  link: one(link, {
    fields: [heroLink.baseLinkID],
    references: [link.id],
  }),
}));

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

export const aboutMeRelations = relations(aboutMe, ({ many }) => ({
  aboutMeLinks: many(aboutMeLink),
}));

export const aboutMeLinkRelations = relations(aboutMeLink, ({ one }) => ({
  aboutMe: one(aboutMe, {
    fields: [aboutMeLink.parentID],
    references: [aboutMe.id],
  }),
  link: one(link, {
    fields: [aboutMeLink.baseLinkID],
    references: [link.id],
  }),
}));

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

export const skillCategoryRelations = relations(skillCategory, ({ many }) => ({
  skills: many(skill),
}));

export const skillRelations = relations(skill, ({ one }) => ({
  skillCategory: one(skillCategory, {
    fields: [skill.categoryID],
    references: [skillCategory.id],
  }),
}));

// Experiences section Content.

export const experienceCategory = pgTable("experience_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull(),
  ...timestamps(),
});

export const experience = pgTable("experience", {
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

export const experienceCategoryRelations = relations(
  experienceCategory,
  ({ many }) => ({
    experiences: many(experience),
  }),
);

export const experienceRelations = relations(experience, ({ one }) => ({
  experienceCategory: one(experienceCategory, {
    fields: [experience.experienceCategoryID],
    references: [experienceCategory.id],
  }),
}));

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

export const projectCategoryRelations = relations(
  projectCategory,
  ({ many }) => ({
    projects: many(project),
  }),
);

export const projectsRelations = relations(project, ({ one }) => ({
  projectCategory: one(projectCategory, {
    fields: [project.projectCategoryID],
    references: [projectCategory.id],
  }),
}));

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
  contactInfoId: uuid("contact_info_id").references(() => contactInfo.id),
  ...timestamps(),
});

export const contactInfoRelations = relations(contactInfo, ({ many }) => ({
  contacts: many(contact),
}));

export const contactRelations = relations(contact, ({ one }) => ({
  contactInfo: one(contactInfo, {
    fields: [contact.contactInfoId],
    references: [contactInfo.id],
  }),
}));

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

export const portfolioRelations = relations(portfolio, ({ one }) => ({
  header: one(header, {
    fields: [portfolio.headerID],
    references: [header.id],
  }),
  hero: one(hero, {
    fields: [portfolio.heroID],
    references: [hero.id],
  }),
  aboutMe: one(aboutMe, {
    fields: [portfolio.aboutMeID],
    references: [aboutMe.id],
  }),
  skillCategory: one(skillCategory, {
    fields: [portfolio.skillCategoryID],
    references: [skillCategory.id],
  }),
  experienceCategory: one(experienceCategory, {
    fields: [portfolio.experienceCategoryID],
    references: [experienceCategory.id],
  }),
  projectCategory: one(projectCategory, {
    fields: [portfolio.projectCategoryID],
    references: [projectCategory.id],
  }),
  contactInfo: one(contactInfo, {
    fields: [portfolio.contactInfoID],
    references: [contactInfo.id],
  }),
}));
