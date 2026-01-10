import { z } from "zod";
export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name is required" })
    .max(120, { message: "name must be less than 120 characters" }),
  slug: z
    .string()
    .min(3, { message: "slug name is required" })
    .max(140, { message: "slug must be less than 140 characters" })
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  tagline: z
    .string()
    .max(200, { message: "tagline must be less than 200 characters" }),
  description: z.string().optional(),
  websiteUrl: z.string().min(1, { message: "Website URL is required" }),
  tags: z
    .string()
    .min(1, { message: "At least one tag is required" })
    .transform((val) => val.split(",").map((tag) => tag.trim().toLowerCase())),
});
