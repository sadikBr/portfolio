CREATE TABLE "about" (
	"hero_tagline" varchar(256) NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"value" varchar NOT NULL,
	"link" varchar NOT NULL,
	"icon_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"icon_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"company" varchar NOT NULL,
	"period" varchar NOT NULL,
	"description" varchar NOT NULL,
	"skills" varchar NOT NULL,
	"experience_category_id" uuid
);
--> statement-breakpoint
CREATE TABLE "project_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"image_url" varchar NOT NULL,
	"tags" varchar NOT NULL,
	"demo_url" varchar,
	"repo_url" varchar NOT NULL,
	"featured" boolean DEFAULT false,
	"project_category_id" uuid
);
--> statement-breakpoint
CREATE TABLE "skill_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"icon_name" varchar NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"level" integer NOT NULL,
	"skill_category_id" uuid
);
--> statement-breakpoint
ALTER TABLE "experience" ADD CONSTRAINT "experience_experience_category_id_experience_category_id_fk" FOREIGN KEY ("experience_category_id") REFERENCES "public"."experience_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_project_category_id_project_category_id_fk" FOREIGN KEY ("project_category_id") REFERENCES "public"."project_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill" ADD CONSTRAINT "skill_skill_category_id_skill_category_id_fk" FOREIGN KEY ("skill_category_id") REFERENCES "public"."skill_category"("id") ON DELETE no action ON UPDATE no action;